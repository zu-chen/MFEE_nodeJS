class Person {
    constructor(name='noname', age=20) {
        this.name = name;
        this.age = age;
    }
    // JSON.stringify --->轉換JSON
    toJSON(){
        return {
            name: this.name,
            age: this.age,
        }
        // 字串
        // return JSON.stringify({
        //     name: this.name,
        //     age: this.age,
        // })
    }
    aaa = ()=>{
        return 123;
    }
}

module.exports = Person;