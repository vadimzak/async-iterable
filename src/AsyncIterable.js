//@flow

import Queue from './Queue'
import { asyncIterableForEach } from './asyncUtils'

/***************************************/

class IterationError {
  errorObj: any

  constructor(errorObj: any) {
    this.errorObj = errorObj
  }
}

/***************************************/

export class AsyncIterableBase<T, B> {
  static brkObj = Symbol('brkObj')

  async forEach<Symbol>(asyncFunc: (item: B, i: number, brkObj: Symbol) => Promise<Symbol>): Promise<void> {
    await asyncIterableForEach(this, asyncFunc)
  }

  async toArray(): Promise<Array<B>> {
    let array = []
    await this.forEach(async (item) => {
      array.push(item)
    })
    return array
  }

  get size(): ?number {
    return undefined
  }

  map<C>(transformFunc: (item: B) => C): MapAsyncIterable<T, C> {
    return new MapAsyncIterable(this, transformFunc)
  }

  filter(filterFunc: (item: T) => boolean): FilterAsyncIterable<T> {
    return new FilterAsyncIterable(this, filterFunc)
  }

  take(maxItems: number): TakeAsyncIterable<T> {
    return new TakeAsyncIterable(this, maxItems)
  }

  [Symbol.asyncIterator](): AsyncIteratorBase<T, B> {
    throw new Error('This function must be overridden by derived classes')
  }
}

export class AsyncIteratorBase<T, B> {
  async next(): Promise<{ done: false, value: B } | { done: true }> {
    throw new Error('This function must be overridden by derived classes')
  }
}

/***************************************/

export default class AsyncIterable<T> extends AsyncIterableBase<T, T> {
  _innerIterable: Iterable<T> | () => stream$Stream
  _queueSize: number

  static from<T>(innerIterable: Iterable<T> | () => stream$Stream, queueSize: number = 0): AsyncIterable<T> {
    return new AsyncIterable(innerIterable, queueSize)
  }

  constructor(innerIterable: Iterable<T> | () => stream$Stream, queueSize: number = 0) {
    super()
    this._innerIterable = innerIterable
    this._queueSize = queueSize
  }

  get size(): ?number {
    return typeof this._innerIterable.length === 'undefined' ? this._innerIterable.size : this._innerIterable.length // if _innerIterable is not a list, undefined will be returned
  }

  [Symbol.asyncIterator](): AsyncIteratorBase<T, T> {
    if (typeof this._innerIterable === 'function')
      return new StreamIterator(this._innerIterable)
    return this._queueSize ? new QueuedAsyncIterator(this) : new AsyncIterator(this)
  }
}

class QueuedAsyncIterator<T> extends AsyncIteratorBase<T, T> {
  _asyncIterable: AsyncIterable<T>
  _queue: Queue<T>

  constructor(asyncIterable: AsyncIterable<T>) {
    super()
    this._asyncIterable = asyncIterable
    this._queue = new Queue({ maxSize: this._asyncIterable._queueSize, sleepPeriodMs: 50 })
    this._start()
  }

  next = async (): Promise<{ done: false, value: T } | { done: true }> => {
    while (true) {
      let value = await this._queue.pop()
      if (value === Queue.empty)
        return { done: true }
      return { done: false, value: value }
    }
  }

  _start = async () => {
    try {
      for (let value of this._asyncIterable._innerIterable) {
        await this._queue.push(value)
      }
      this._queue.close()
    } catch(err) {
      console.error(`Error during processing QueuedAsyncIterator items`, err) 
    }
  }
}

class AsyncIterator<T> extends AsyncIteratorBase<T, T> {
  _asyncIterable: AsyncIterable<T>
  _innerIterator: Iterator<T>

  constructor(asyncIterable: AsyncIterable<T>) {
    super()
    this._asyncIterable = asyncIterable
    this._innerIterator = this._asyncIterable._innerIterable[Symbol.iterator]()
  }

  next = async (): Promise<{ done: false, value: T } | { done: true }> => {
    let next = this._innerIterator.next()
    if (next.done)
      return { done: true }
    return { done: false, value: next.value }
  }
}

/***************************************/

class TakeAsyncIterable<T> extends AsyncIterableBase<T, T> {
  _innerAsyncIterable: AsyncIterableBase<T, T>
  _maxItems: number

  constructor(innerAsyncIterable: AsyncIterableBase<T, T>, maxItems: number) {
    super()
    this._innerAsyncIterable = innerAsyncIterable
    this._maxItems = maxItems
  }

  [Symbol.asyncIterator](): TakeAsyncIterator<T> {
    return new TakeAsyncIterator(this)
  }

  get size(): ?number {
    let innerSize = this._innerAsyncIterable.size
    if (innerSize != undefined) {
      return Math.min(innerSize, this._maxItems)
    }
  }
}

class TakeAsyncIterator<T> extends AsyncIteratorBase<T, T> {
  _iterable: TakeAsyncIterable<T>
  _innerAsyncIterator: AsyncIteratorBase<T, T>
  _maxItems: number
  _nextIndex = 0

  constructor(iterable: TakeAsyncIterable<T>) {
    super()
    this._iterable = iterable
    this._innerAsyncIterator = this._iterable._innerAsyncIterable[Symbol.asyncIterator]()
  }

  async next(): Promise<{ done: false, value: T } | { done: true }> {
    if (this._nextIndex >= this._iterable._maxItems)
      return { done: true }
    this._nextIndex++
    return await this._innerAsyncIterator.next()
  }
}

/***************************************/

class MapAsyncIterable<T, B> extends AsyncIterableBase<T, B> {
  _innerAsyncIterable: AsyncIterableBase<T, T>
  _transformFunc: (item: T) => B

  constructor(innerAsyncIterable: AsyncIterableBase<T, T>, transformFunc: (item: T) => B) {
    super()
    this._innerAsyncIterable = innerAsyncIterable
    this._transformFunc = transformFunc
  }

  [Symbol.asyncIterator](): MapAsyncIterator<T, B> {
    return new MapAsyncIterator(this)
  }

  size(): ?number {
    return this._innerAsyncIterable.size
  }
}

class MapAsyncIterator<T, B> extends AsyncIteratorBase<T, B> {
  _iterable: MapAsyncIterable<T, B>
  _innerAsyncIterator: AsyncIteratorBase<T, T>
  _maxItems: number
  _nextIndex = 0

  constructor(iterable: MapAsyncIterable<T, B>) {
    super()
    this._iterable = iterable
    this._innerAsyncIterator = this._iterable._innerAsyncIterable[Symbol.asyncIterator]()
  }

  async next(): Promise<{ done: false, value: B } | { done: true }> {
    let item = await this._innerAsyncIterator.next()
    if (item.done === true)
      return { done: true }
    let value = await this._iterable._transformFunc(item.value)
    return { value: value, done: false }
  }
}

/***************************************/

class FilterAsyncIterable<T> extends AsyncIterableBase<T, T> {
  _innerAsyncIterable: AsyncIterableBase<T, T>
  _filterFunc: (item: T) => boolean

  constructor(innerAsyncIterable: AsyncIterableBase<T, T>, filterFunc: (item: T) => boolean) {
    super()
    this._innerAsyncIterable = innerAsyncIterable
    this._filterFunc = filterFunc
  }

  [Symbol.asyncIterator](): FilterAsyncIterator<T> {
    return new FilterAsyncIterator(this)
  }
}

class FilterAsyncIterator<T> extends AsyncIteratorBase<T, T> {
  _iterable: FilterAsyncIterable<T>
  _innerAsyncIterator: AsyncIteratorBase<T, T>
  _maxItems: number
  _nextIndex = 0

  constructor(iterable: FilterAsyncIterable<T>) {
    super()
    this._iterable = iterable
    this._innerAsyncIterator = this._iterable._innerAsyncIterable[Symbol.asyncIterator]()
  }

  async next(): Promise<{ done: false, value: T } | { done: true }> {
    let item: { done: false, value: T } | { done: true } = { done: true }
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

export class StreamIterable<T, T> extends AsyncIterableBase<T, T> {
  _streamFactory: () => stream$Stream
  _queueConfig: Object

  constructor(streamFactory: () => stream$Stream, queueConfig: Object) {
    super()
    this._streamFactory = streamFactory
    this._queueConfig = queueConfig
  }

  [Symbol.asyncIterator]() {
    return new StreamIterator(this._streamFactory(), this._queueConfig)
  }
}

class StreamIterator<T> extends AsyncIteratorBase<T, T> {
  _queue: Queue<T>
  _stream: stream$Stream

  constructor(streamFactory: () => stream$Stream, queueConfig: Object = { maxSize: 10000 }) {
    super()
    this._queue = new Queue(queueConfig)
    this._stream = streamFactory()
    
    //let stat = startStat('steram item')
    this._stream.on('data', async (item: T) => {
      try {
        this._stream.pause()
        await this._queue.push(item)
        this._stream.resume()
        //stat.inc()
      } catch (err) {
        let errMsg = `Error during handling StreamIterator stream data`
        console.error(errMsg, err) 
        this._queue.push(new IterationError(`${errMsg}: ${err.toString()}`))
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

  async next(): Promise<{ done: false, value: T } | { done: true }> {
    let value = await this._queue.pop()

    if (value instanceof IterationError) {
      throw value.errorObj instanceof Error ? value.errorObj : new Error(value.errorObj)
    }
    if (value === Queue.empty) {
      return { done: true }
    }
    return { value: value, done: false }
  }
}
