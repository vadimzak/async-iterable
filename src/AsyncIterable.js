//@flow

import Queue from './Queue'

/***************************************/

class IterationError extends Error {
  errorObj: Object

  constructor(errorObj) {
    super()
    this.errorObj = errorObj
  }
}

/***************************************/

class AsyncIterableBase<T, B> {
  static brkObj = Symbol('brkObj')

  async toArray(): Array<B> {
    let array = []
    for await (let item of this) {
      array.push(item)
    }
    return array
  }

  async forEach<Symbol>(asyncFunc: (B, number, Symbol) => Symbol): Promise<void> {
    let i = 0
    for await (let item of this) {
      let ret = await asyncFunc(item, i++, AsyncIterableBase.brkObj)
      if (ret === AsyncIterableBase.brkObj)
        break
    }
  }

  size(): ?number {
    return undefined
  }

  map<C>(transformFunc: (B) => C): MapAsyncIterable<T, C> {
    return new MapAsyncIterable(this, transformFunc)
  }

  filter(filterFunc: (T) => boolean): FilterAsyncIterable<T> {
    return new FilterAsyncIterable(this, filterFunc)
  }

  take(maxItems: number): TakeAsyncIterable<T> {
    return new TakeAsyncIterable(this, maxItems)
  }
}

class AsyncIteratorBase<T, B> {
  async next(): Promise<{ done: false, value: B } | { done: true }> {
    throw new Error('This function must be overridden by derived classes')
  }
}

/***************************************/

export default class AsyncIterable<T, B> extends AsyncIterableBase<T, B> {
  _innerIterable: Iterable<T>
  _asyncItemAwaiterFunction: (T) => Promise<B>
  _queueSize: number

  constructor(innerIterable: Iterable<T>, asyncItemAwaiterFunction: (T) => Promise<B> = (i) => i, queueSize: number = 0) {
    super()
    this._innerIterable = innerIterable
    this._asyncItemAwaiterFunction = asyncItemAwaiterFunction
    this._queueSize = queueSize
  }

  size(): ?number {
    return typeof this._innerIterable.length === 'undefined' ? this._innerIterable.size : this._innerIterable.length // if _innerIterable is not a list, undefined will be returned
  }

  [Symbol.asyncIterator](): AsyncIteratorBase<T, B> {
    return this._queueSize ? new QueuedAsyncIterator(this) : new AsyncIterator(this)
  }
}

class QueuedAsyncIterator<T, B> extends AsyncIteratorBase<T, B> {
  _asyncIterable: AsyncIterable<T, B>
  _queue: Queue<B>

  constructor(asyncIterable: AsyncIterable<T, B>) {
    super()
    this._asyncIterable = asyncIterable
    this._queue = new Queue({ maxSize: this._asyncIterable._queueSize, sleepPeriodMs: 50 })
    this._start()
  }

  next = async (): Promise<{ done: false, value: B } | { done: true }> => {
    while (true) {
      let value = await this._queue.pop()
      if (value === Queue.empty)
        return { done: true }
      return { done: false, value: value }
    }
  }

  _start = async () => {
    for (let internalItem of this._asyncIterable._innerIterable) {
      let value = await this._asyncIterable._asyncItemAwaiterFunction(internalItem)
      await this._queue.push(value)
    }
    this._queue.close()
  }
}

class AsyncIterator<T, B> extends AsyncIteratorBase<T, B> {
  _asyncIterable: AsyncIterable<T, B>
  _innerIterator: Iterator<T>

  constructor(asyncIterable: AsyncIterable<T, B>) {
    super()
    this._asyncIterable = asyncIterable
    this._innerIterator = this._asyncIterable._innerIterable[Symbol.iterator]()
  }

  next = async (): Promise<{ done: false, value: B } | { done: true }> => {
    let next = this._innerIterator.next()
    if (next.done)
      return { done: true }
    let value = await this._asyncIterable._asyncItemAwaiterFunction(next.value)
    return { done: false, value: value }
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

  size(): ?number {
    let innerSize = this._innerAsyncIterable.size()
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
  _transformFunc: (T) => B

  constructor(innerAsyncIterable: AsyncIterableBase<T, T>, transformFunc: (T) => B) {
    super()
    this._innerAsyncIterable = innerAsyncIterable
    this._transformFunc = transformFunc
  }

  [Symbol.asyncIterator](): MapAsyncIterator<T, B> {
    return new MapAsyncIterator(this)
  }

  size(): ?number {
    return this._innerAsyncIterable.size()
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
  _filterFunc: (T) => boolean

  constructor(innerAsyncIterable: AsyncIterableBase<T, T>, filterFunc: (T) => boolean) {
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

export class StreamIterable<T, B> extends AsyncIterableBase<T, B> {
  _streamFactory: Function
  _transformer: ?(T) => B

  constructor(streamFactory: Function, transformer: ?(T) => B) {
    super()
    this._streamFactory = streamFactory
    this._transformer = transformer
  }

  [Symbol.asyncIterator]() {
    return new StreamIterator(this._streamFactory(), this)
  }
}

export class StreamIterator<T, B> extends AsyncIteratorBase<T, B> {
  _queue: Queue<B>
  _stream: Object
  _streamIterable: StreamIterable<T, B>

  constructor(stream: Object, streamIterable: StreamIterable<T, B>) {
    super()
    this._queue = new Queue({ maxSize: 10000 })
    this._stream = stream
    this._streamIterable = streamIterable
    //let stat = startStat('steram item')
    this._stream.on('data', async (item: T) => {
      stream.pause()
      let finalItem = this._transformer ? this._streamIterable._transformer(item) : item
      await this._queue.push(finalItem)
      stream.resume()
      //stat.inc()
    })
    this._stream.on('end', () => {
      this._queue.close()
      //stat.end()
    })
    this._stream.on('error', async (errStr) => {
      await this._queue.push(new IterationError(errStr))
      this._queue.close()
      //stat.end()
    })
  }

  async next(): Promise<{ done: false, value: B } | { done: true }> {
    let value = await this._queue.pop()
    if (value instanceof IterationError)
      throw value.errorObj
    if (value === Queue.empty) {
      return { done: true }
    }
    return { value: value, done: false }
  }
}
