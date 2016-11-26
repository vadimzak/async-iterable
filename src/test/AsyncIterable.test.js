// @flow

import "babel-polyfill"
import { Readable } from 'stream'
import fs from 'fs'

import AsyncIterable from '../AsyncIterable'
import { sleep } from '../asyncUtils'
import { expect } from 'chai'

// mocha flow type declarations
declare function describe(name: string, spec: () => void): void
declare function it(name: string, spec: Function): void

describe('AsyncIterable', () => {

  describe('#from() (static)', () => {
    it('creates an AsyncIterable from an Iterable', async () => {
      let ai = AsyncIterable.from(new Set([1, 2, 3]).values())
      let res = await ai.toArray()
      expect(res).to.eql([1, 2, 3])
    })

    it('creates an AsyncIterable from an Array', async () => {
      let ai = AsyncIterable.from([1, 2, 3])
      let res = await ai.toArray()
      expect(res).to.eql([1, 2, 3])
    })

    it('creates an AsyncIterable from an Stream', async () => {
      let s = new Readable()
      s.push("1")
      s.push("2")
      s.push(null)

      //let s = fs.createReadStream('package.json')

      let ai = AsyncIterable.from(() => s)
      let res = await ai.toArray()
      expect(res.map(buf => buf.toString())).to.eql(["1", "2"])
    })
  })

  it('#toArray() returns correct results', async () => {
    let ai = new AsyncIterable([1,2,3])
    let res = await ai.toArray()
    expect(res).to.eql([1,2,3])
  })

  describe('Queued', () => {
    it('#toArray() returns correct results', async () => {
      let ai = new AsyncIterable(new Set([1, 2, 3]).values())
      let res = await ai.toArray()
      expect(res).to.eql([1, 2, 3])
    }, 1)
  })

  describe('#forEach()', () => {

    it('is called on all items', async () => {
      let ai = new AsyncIterable([1, 2, 3])
      let res = []
      await ai.forEach((n) => {
        res.push(n)
      })
      expect(res).to.eql([1, 2, 3])
    })

    it('stoppes when brkObj is returned', async () => {
      let ai = new AsyncIterable([1, 2, 3])
      let res = []
      await ai.forEach((n, i, brkObj) => {
        res.push(n)
        return brkObj
      })
      expect(res).to.eql([1])
    })

  })

  describe('#size', () => {

    it('returns size on Array', async () => {
      let ai = new AsyncIterable([1, 2, 3])
      let res = ai.size
      expect(res).to.eql(3)
    })

    it('returns undefined size on Iterable', async () => {
      let ai = new AsyncIterable(new Set([1, 2, 3]).values())
      let res = ai.size
      expect(res).to.eql(undefined)
    })

  })

  it('#map() returns mapped results', async () => {
    let ai = new AsyncIterable([1,2,3])
    let res = await ai
      .map((n) => n.toString())
      .toArray()
    expect(res).to.eql(['1', '2', '3'])
  })

  it('#filter() returns filtered results', async () => {
    let ai = new AsyncIterable([1,2,3])
    let res = await ai
      .filter((n) => n % 2 === 0)
      .toArray()
    expect(res).to.eql([2])
  })

  describe('#take()', () => {

    it('returns less results', async () => {
      let ai = new AsyncIterable([1, 2, 3])
      let res = await ai
        .take(2)
        .toArray()
      expect(res).to.eql([1, 2])
    })

    it('#take().size returns correct size on Array', async () => {
      let ai = new AsyncIterable([1, 2, 3])
      let res = await ai
        .take(2)
        .size
      expect(res).to.eql(2)
    })

    it('#take().size returns undefiend size on Iterable', async () => {
      let ai = new AsyncIterable(new Set([1, 2, 3]).values())
      let res = await ai
        .take(2)
        .size
      expect(res).to.eql(undefined)
    })  

  })
  
})