
const forEach = (array, fn) => {
  for (let index = 0; index < array.length; index++)
  {
    fn(array[index], index)
  }
}
const filter = (array, fn) => {
  let results = []
  for (let index = 0; index < array.length; index++)
  {
    if (fn(array[index], index))
    {
      results.push(array[index])
    }
  }
  return results
}
const map = (array, fn) => {
  let results = []
  for (let index = 0; index < array.length; index++)
  {
    results.push(fn(array[index], index))
  }
  return results
}
const every = (array, fn) => {
  let result = true
  for (let index = 0; index < array.length; index++)
  {
    result = fn(array[index], index)
    if (!result)
    {
      break;
    }
  }
  return result
}
const some = (array, fn) => {
  let result = false
  for (let index = 0; index < array.length; index++)
  {
    result = fn(array[index], index)
    if (result)
    {
      break
    }
  }
  return result
}


let arr = [1, 3, 5, 7, 8, 8]
forEach(arr, (item, index) => {
  console.log(item, index);
})
let r = filter(arr, (item, index) => {
  return item % 2 === 0
})
console.log(r);
let s = map(arr, v => v * v)
console.log(s);
let a = every(arr, v => v < 8)
console.log(a);
let b = some(arr, v => v > 8)
console.log(b);
/* export default {
  symbol: (index) => Symbol(index),
  forEach,
} */