console.log("Hello")

const geroceries = [ 'milk', 'butter', 'bun', 'choco'];


const serachItem = (item) => {
    for ( let i= 0; i<geroceries.length; i++){
      if(geroceries[i] == item){
        console.log(`item ${item} found at ${i} position `)
      }
    }
}

// serachItem('butter');

const items = [ 'bun', 'butter', 'bun', 'choco'];



const removeDup = (arr) => 
    arr.filter((item, index) => arr.indexOf(item) === index)
//     for(let i =0; i<arr.length; i++){
//         if(!newArray.includes(arr[i])){
//           newArray.push(arr[i])
//         }
//     }
//     return newArray;


// console.log(removeDup(items))

class MyArray{
  constructor(){
    this.length = 0;
    this.data = {}
  }

  push(data){
 this.data[this.length] = data;
 this.length++;
 return this.data;
  }

  get(index){
    console.log(this.data[index])
  }

  pop(data){
    // delete this.data[index];
    for(let i=0; i<this.length ; i++){
      if(this.data[i] == data){
        delete this.data[i]
      }
    }
  }

  shift(){
    for(let i=1; i<this.length; i++){
      this.data[i-1] = this.data[i];

    }
    delete this.data[this.length -1]
    this.length--;
    return this.data;
  }

}

const newArray1 = new MyArray();
newArray1.push("neeu")
newArray1.push("naanu")
newArray1.push("nenduu")
newArray1.push("nammuruu")
// console.log(newArray1)

// newArray1.get(1)
// newArray1.pop(2)
// newArray1.pop("naanu")

console.log(newArray1)
newArray1.shift()
console.log(newArray1)

