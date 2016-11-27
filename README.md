## threadpool.js

__An iterator abstraction for async operations__

## Install

```bash
npm install --save async-iterable
```

## Usage (ES6 + modules + async/await)

```javascript
import AsyncIterable from 'async-iterable'

// Create an infinite number generator (for the iteration seed)
function* infiniteNumGen() {
  var index = 0
  while (true)
    yield index++
}

// Create the AsyncIterable.
// note that defining an AsyncIterator is an immediate sync operation,
// none of the callbacks below will be called before it is iterated
let repoNamesEndingWithJsAsyncIterable = new AsyncIterable(infiniteNumGen())
  // (you can define sync or async data transformations)
  .map(async (n) => {
    let res = await axios.get(`https://api.github.com/repositories?since=${n}`)
    return res.data[0].name
  })
  // (you can define sync or async data filters)
  .filter((name) => name.endsWith('js'))
  // (you can define max items count)
  .take(1000000)

// Iterate the AsyncIterator.
let firstMillionJsGithubRepoNames = new Set()
await repoNamesEndingWithJsAsyncIterable.forEach((name) => {
  // requests will fire here, one before each iteration
  firstMillionJsGithubRepoNames.add(name)
})
 
```