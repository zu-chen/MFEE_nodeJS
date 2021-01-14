const Person = require('./person')

// extends繼承
class Employee extends Person {
    constructor(id, name='noname', age=20) {
        // super 呼叫上一層的constructor
        super(name, age)
        this.employee_id = id;
    }

    toJSON(){
        const obj = super.toJSON();
        obj.employee_id = this.employee_id
        return obj
    }

    toString() {
        return JSON.stringify(this.toJSON())
    }
}

module.exports = Employee;