// const test_exports = require('./func')
// const f1 = require('./func')

// 引用一個
// console.log(test_exports(10))
// console.log(f1(12))
// console.log(test_exports===f1)

// 引用兩個---> 寫法一
// console.log(test_exports.f1(10))
// console.log(f1.f2(12))
// console.log(test_exports===f1)

// 引用兩個---> 寫法二
const {f1: func1, f2} = require('./func')
console.log(func1(10))
console.log(f2(12))
console.log(func1===f2)