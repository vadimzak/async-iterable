// @flow

export async function sleep(periodMs: number = 0) {
  return new Promise(r => setTimeout(r, periodMs))
}

export async function asyncIterableForEach<T, R>(iterable: Object, asyncFunc: (T, number, R) => Promise<R>) {
  let brkObj = Symbol('brkObj')
  let i = 0
  for await (let item of iterable) {
    let ret = await asyncFunc(item, i++, brkObj)
    if (ret === brkObj)
      break
  }
}
