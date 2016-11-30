//@flow

import 'babel-polyfill'

import Queue from './Queue'
import { asyncIterableForEach } from './asyncUtils'

/***************************************/

export interface IAsyncIterable<TDest> {
  forEach(asyncFunc: (item: TDest, i: number, brkObj: Symbol) => Promise<Symbol>): Promise<void>;

  toArray(): Promise<Array<TDest>>;

  map<C>(transformFunc: (item: TDest) => C): MapAsyncIterable<TDest, C>;

  filter(filterFunc: (item: TDest) => boolean): FilterAsyncIterable<TDest>;

  take(maxItems: number): TakeAsyncIterable<TDest>;

  //[Symbol.asyncIterator](): AsyncIteratorBase<TDest>;

  size: ?number;  
}

/***************************************/

class IterationError {
  errorObj: any

  constructor(errorObj: any) {
    this.errorObj = errorObj
  }
}

/***************************************/

export class AsyncIterableBase<TDest> {
  static brkObj = Symbol('brkObj')

  async forEach<S>(asyncFunc: (item: TDest, i: number, brkObj: Symbol) => ?Symbol | Promise<?Symbol>): Promise<void> {
    await asyncIterableForEach(this, asyncFunc)
  }

  async toArray(): Promise<Array<TDest>> {
    let array: Array<TDest> = []
    await this.forEach(async (item) => { array.push(item) })    
    return array
  }

  get size(): ?number {
    return undefined
  }

  map<C>(transformFunc: (item: TDest) => C): MapAsyncIterable<C, TDest> {
    return new MapAsyncIterable(this, transformFunc)
  }

  filter(filterFunc: (item: TDest) => boolean): FilterAsyncIterable<TDest> {
    return new FilterAsyncIterable(this, filterFunc)
  }

  take(maxItems: number): TakeAsyncIterable<TDest> {
    return new TakeAsyncIterable(this, maxItems)
  }

  // $FlowIgnore
  [Symbol.asyncIterator](): AsyncIteratorBase<TDest> {
    throw new Error('This function must be overridden by derived classes')
  }
}

export class AsyncIteratorBase<TDest> {
  async next(): Promise<{ done: false, value: TDest } | { done: true }> {
    throw new Error('This function must be overridden by derived classes')
  }
}

/***************************************/

export default class AsyncIterable<TDest> extends AsyncIterableBase<TDest> {
  _innerIterable: Iterable<TDest> | () => stream$Stream
  _queueSize: number

  static from<TDest>(innerIterable: Iterable<TDest> | () => stream$Stream, queueSize: number = 0): AsyncIterable<TDest> {
    return new AsyncIterable(innerIterable, queueSize)
  }

  constructor(innerIterable: Iterable<TDest> | () => stream$Stream, queueSize: number = 0) {
    super()
    this._innerIterable = innerIterable
    this._queueSize = queueSize
  }

  get size(): ?number {
    // $FlowIgnore
    return typeof this._innerIterable.length === 'undefined' ? this._innerIterable.size : this._innerIterable.length // if _innerIterable is not a list, undefined will be returned
  }

  // $FlowIgnore
  [Symbol.asyncIterator](): AsyncIteratorBase<TDest> {
    if (typeof this._innerIterable === 'function') {
      let streamFactory: () => stream$Stream = (this._innerIterable: any)
      return new StreamIterator(streamFactory)
    }
    return this._queueSize ? new QueuedAsyncIterator(this) : new AsyncIterator(this)
  }
}

class QueuedAsyncIterator<TDest> extends AsyncIteratorBase<TDest> {
  _asyncIterable: AsyncIterable<TDest>
  _queue: Queue<TDest>

  constructor(asyncIterable: AsyncIterable<TDest>) {
    super()
    this._asyncIterable = asyncIterable
    this._queue = new Queue({ maxSize: this._asyncIterable._queueSize, sleepPeriodMs: 50 })
    this._start()
  }

  next = async (): Promise<{ done: true } | { done: false, value: TDest }> => {
    while (true) {
      let value = await this._queue.pop()
      if (value === (Queue.empty: Symbol))
        return { done: true }
      return { done: false, value: value }
    }
  }

  _start = async () => {
    try {
      let iterable: Iterable<TDest> = this._asyncIterable._innerIterable
      for (let value of iterable) {
        await this._queue.push(value)
      }
      this._queue.close()
    } catch(err) {
      console.error(`Error during processing QueuedAsyncIterator items`, err) 
    }
  }
}

class AsyncIterator<TDest> extends AsyncIteratorBase<TDest> {
  _asyncIterable: AsyncIterable<TDest>
  _innerIterator: Iterator<TDest>

  constructor(asyncIterable: AsyncIterable<TDest>) {
    super()
    this._asyncIterable = asyncIterable
    // $FlowIgnore
    this._innerIterator = this._asyncIterable._innerIterable[Symbol.iterator]()
  }

  next = async (): Promise<{ done: true } | { done: false, value: TDest }> => {
    let next = this._innerIterator.next()
    if (next.done)
      return { done: true }
    return { done: false, value: next.value }
  }
}

/***************************************/

class TakeAsyncIterable<TDest> extends AsyncIterableBase<TDest> {
  _innerAsyncIterable: AsyncIterableBase<TDest>
  _maxItems: number

  constructor(innerAsyncIterable: AsyncIterableBase<TDest>, maxItems: number) {
    super()
    this._innerAsyncIterable = innerAsyncIterable
    this._maxItems = maxItems
  }

  // $FlowIgnore
  [Symbol.asyncIterator](): TakeAsyncIterator<TDest> {
    return new TakeAsyncIterator(this)
  }

  get size(): ?number {
    let innerSize = this._innerAsyncIterable.size
    if (innerSize != undefined) {
      return Math.min(innerSize, this._maxItems)
    }
  }
}

class TakeAsyncIterator<TDest> extends AsyncIteratorBase<TDest> {
  _iterable: TakeAsyncIterable<TDest>
  _innerAsyncIterator: AsyncIteratorBase<TDest>
  _maxItems: number
  _nextIndex = 0

  constructor(iterable: TakeAsyncIterable<TDest>) {
    super()
    this._iterable = iterable
    // $FlowIgnore
    this._innerAsyncIterator = this._iterable._innerAsyncIterable[Symbol.asyncIterator]()
  }

  async next(): Promise<{ done: false, value: TDest } | { done: true }> {
    if (this._nextIndex >= this._iterable._maxItems)
      return { done: true }
    this._nextIndex++
    return await this._innerAsyncIterator.next()
  }
}

/***************************************/

class MapAsyncIterable<TDest, TOrigin> extends AsyncIterableBase<TDest> {
  _innerAsyncIterable: AsyncIterableBase<TOrigin>
  _transformFunc: (item: TOrigin) => TDest

  constructor(innerAsyncIterable: AsyncIterableBase<TOrigin>, transformFunc: (item: TOrigin) => TDest) {
    super()
    this._innerAsyncIterable = innerAsyncIterable
    this._transformFunc = transformFunc
  }

  // $FlowIgnore
  [Symbol.asyncIterator](): MapAsyncIterator<TDest> {
    return new MapAsyncIterator(this)
  }

  get size(): ?number {
    return this._innerAsyncIterable.size
  }
}

class MapAsyncIterator<TDest, TOrigin> extends AsyncIteratorBase<TDest> {
  _iterable: MapAsyncIterable<TDest, TOrigin>
  _innerAsyncIterator: AsyncIteratorBase<TOrigin>
  _maxItems: number
  _nextIndex = 0

  constructor(iterable: MapAsyncIterable<TDest, TOrigin>) {
    super()
    this._iterable = iterable
    // $FlowIgnore
    this._innerAsyncIterator = this._iterable._innerAsyncIterable[Symbol.asyncIterator]()
  }

  async next(): Promise<{ done: false, value: TDest } | { done: true }> {
    let item = await this._innerAsyncIterator.next()
    if (item.done === true)
      return { done: true }
    let value = await this._iterable._transformFunc(item.value)
    return { value: value, done: false }
  }
}

/***************************************/

class FilterAsyncIterable<TDest> extends AsyncIterableBase<TDest> {
  _innerAsyncIterable: AsyncIterableBase<TDest>
  _filterFunc: (item: TDest) => boolean

  constructor(innerAsyncIterable: AsyncIterableBase<TDest>, filterFunc: (item: TDest) => boolean) {
    super()
    this._innerAsyncIterable = innerAsyncIterable
    this._filterFunc = filterFunc
  }

  // $FlowIgnore
  [Symbol.asyncIterator](): FilterAsyncIterator<TDest> {
    return new FilterAsyncIterator(this)
  }
}

class FilterAsyncIterator<TDest> extends AsyncIteratorBase<TDest> {
  _iterable: FilterAsyncIterable<TDest>
  _innerAsyncIterator: AsyncIteratorBase<TDest>
  _maxItems: number
  _nextIndex = 0

  constructor(iterable: FilterAsyncIterable<TDest>) {
    super()
    this._iterable = iterable
    // $FlowIgnore
    this._innerAsyncIterator = this._iterable._innerAsyncIterable[Symbol.asyncIterator]()
  }

  async next(): Promise<{ done: false, value: TDest } | { done: true }> {
    let item: { done: false, value: TDest } | { done: true } = { done: true }
    while (true) {
      item = await this._innerAsyncIterator.next()
      if (item.done === true)
        break
      if (await this._iterable._filterFunc(item.value))
        break
    }
    return item
  }
}

/***************************************/

export class StreamIterable<TDest> extends AsyncIterableBase<TDest> {
  _streamFactory: () => stream$Stream
  _queueConfig: Object

  constructor(streamFactory: () => stream$Stream, queueConfig: Object) {
    super()
    this._streamFactory = streamFactory
    this._queueConfig = queueConfig
  }

  // $FlowIgnore
  [Symbol.asyncIterator]() {
    return new StreamIterator(this._streamFactory(), this._queueConfig)
  }
}

class StreamIterator<TDest> extends AsyncIteratorBase<TDest> {
  _queue: Queue<TDest>
  _stream: stream$Stream

  constructor(streamFactory: () => stream$Stream, queueConfig: Object = { maxSize: 10000 }) {
    super()
    this._queue = new Queue(queueConfig)
    this._stream = streamFactory()
    
    //let stat = startStat('steram item')
    this._stream.on('data', async (item: TDest) => {
      try {
        this._stream.pause()
        await this._queue.push(item)
        this._stream.resume()
        //stat.inc()
      } catch (err) {
        let errMsg = `Error during handling StreamIterator stream data`
        console.error(errMsg, err)
        let errToken: TDest = ((new IterationError(`${errMsg}: ${err.toString()}`): any): TDest)
        this._queue.push(errToken)
      }
    })
    this._stream.on('end', () => {
      try {
        this._queue.close()
        //stat.end()
      } catch (err) {
        console.error(`Error during handling StreamIterator stream end`, err) 
      }
    })
    this._stream.on('error', async (errStr) => {
      try {
        await this._queue.push(new IterationError(errStr))
        this._queue.close()
        //stat.end()
      } catch (err) {
        console.error(`Error during handling StreamIterator stream error`, err) 
      }
    })
  }

  async next(): Promise<{ done: false, value: TDest } | { done: true }> {
    let value: TDest = await this._queue.pop()
    let castVal = (value: any)
    if (castVal instanceof IterationError) {
      throw castVal.errorObj instanceof Error ? castVal.errorObj : new Error(castVal.errorObj)
    }
    if (castVal === Queue.empty) {
      return { done: true }
    }
    return { value: value, done: false }
  }
}
