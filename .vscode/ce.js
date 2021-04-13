const symbol = (index) => Symbol(index)
const iterator = (arr) => {
  return {
    [Symbol.iterator]: function* () {
      for (const item of arr) {
        yield item
      }
    }
  }
}
for (let item of iterator([2, 4, 6, 8, 10])) {
  console.log(item);
}