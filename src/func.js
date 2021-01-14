// const f1=function(a){
//    return a*a
// }

//箭頭函式
const f1 = a=> a*a
const f2 = a=> a*a*a
console.log(f1(7))

// 一定要key f1---> const某個function的名字
// module.exports在另外一個檔案要與require('')配

// module.exports = f1  // 引用一個
module.exports = {f1, f2} //引用兩個


