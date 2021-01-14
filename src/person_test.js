const Person = require('./person')

const p1 = new Person();
const p2 = new Person('David', 30);

console.log(p1.toJSON());
console.log(p2.toJSON());

console.log(p2.constructor.name);
console.log(typeof p2);
// instanceof:檢視建構函數的屬性是否出現在物件的原型鍊中的任意位置
console.log(p2 instanceof Person);
console.log(p2.aaa());