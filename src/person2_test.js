// ES6語法 import from 可使用npx babel-node執行
import Person from './person2';

const p1 = new Person();
const p2 = new Person('David', 30);

console.log(p1.toJSON());
console.log(p2.toJSON());
