//@flow

import { sleep } from './asyncUtils'

const DEFAULT_MAX_QUEUE_SIZE = -1
const DEFAULT_SLEEP_PERIOD_MS = 0

export default class Queue<T> {
  config: Object
  items: Array<T> = []
  blockingCount = 0
  closed = false

  static empty = Symbol('empty')

  constructor(config: Object = {}) {
    this.config = config
    this.config.maxSize = this.config.maxSize || DEFAULT_MAX_QUEUE_SIZE
    this.config.sleepPeriodMs = this.config.sleepPeriodMs || DEFAULT_SLEEP_PERIOD_MS

    this.items = []
    this.blockingCount = 0
    this.closed = false
  }

  push = async (newItem: T) => {
    // wait if queue is full
    while (this.config.maxSize > 0 && this.items.length >= this.config.maxSize) {
      this.blockingCount++
      await sleep(this.config.sleepPeriodMs)
      this.blockingCount--
    }

    this.items.push(newItem)
  }

  pop = async (): Promise<T> | Promise<Symbol> => {
    // wait if queue is empty
    while (this.items.length === 0) {
      if (this.closed) {
        return Queue.empty
      }
      this.blockingCount++
      await sleep(this.config.sleepPeriodMs)
      this.blockingCount--
    }

    return this.items.shift()
  }

  close = async () => {
    this.closed = true
    while (this.items.length > 0) {
      await sleep(this.config.sleepPeriodMs)
    }
  }

  isBlocking = () => {
    return this.blockingCount > 0
  }

  getLength = () => {
    return this.items.length
  }
}
