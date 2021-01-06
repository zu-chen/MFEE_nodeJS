const Employee = require('./employee')

const em = new Employee('A002', 'Bill', 25)

console.log('' + em)
console.log(em.toJSON())