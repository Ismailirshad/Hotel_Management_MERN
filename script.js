// // console.log("hello")
// // function hello(cd){
// //     return cd("i am")
// // }
// // hello(console.log);

// // function greet(name, callback){
// //     callback("deii myraa"+name);
// // }
// // greet("icchaa", console.log)1

// const p = new Promise((resolve, reject)=> {

//     resolve("success").reject("potti")
// }).then(console.log);

// p.then(reject=> {
//     console.log("catched", reject)
// })
// let StudentArray = ["arun", "varun", "loli", "beeethi"]

// function FindStudent(allStudents, studentname){
// for(let i=0; i<allStudents.length; i++){
//    if(allStudents[i] == studentname){
//      console.log(`${studentname} is in${i} position`)
//    }
// }
// }

// FindStudent(StudentArray, "loli");

// const fruits = ["banana", "orange", "apple", "cherry"]

// const findFruit = (arr, index) => arr[index];

// console.log(findFruit(fruits, 3))

class MyArray{
  constructor(){
    this.length = 0;
    this.data = {};
  }
  push(item){
    this.data[this.length] = item;
    this.length++;
    return this.length;
  }

  get(index){
return this.data[index]
  
  }
  // pop(){
  //   const lastItem = this.data[this.length - 1]
  //   delete this.data[this.length - 1]
  //   this.length --;
  //   return lastItem
  // }
  shift(){
   let firstItem = this.data[0]
   
   for(let i=0; i<this.length ; i++){
    this.data[i] = this.data[i+1]
   }
  
   delete this.data[this.length -1];
   this.length--
   return firstItem;
  }

  deleteByIndex(index){
    let array = this.data[index];
    for(let i=index; i<this.length; i++){
     this.data[i] = this.data[i+1]
    }
    delete this.data[this.length - 1]
    this.length --
    return array;
  }
}




const array1 = new MyArray()
array1.push("insr")
array1.push("jumo")
array1.push("jaaku")
array1.push("mubba")
// console.log(array1)
// console.log(aray1.get(2))
// array1.pop()
// console.log(array1)
// array1.shift()
array1.deleteByIndex(2)
console.log(array1)

// let str = "irsh"
// str.push(array1);
// console.log(array1)

// const item = [1,2,3,4,5]
// item.DeleteByIndex(2)