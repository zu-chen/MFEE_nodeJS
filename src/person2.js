class Person {
    constructor(name='noname', age=20) {
        this.name = name;
        this.age = age;
        this.bbb = 'abc';
    }
    toJSON(){
        return {
            name: this.name,
            age: this.age,
        }
    }
}

// ES6語法 export default 可使用npx babel-node執行
export default Person;
