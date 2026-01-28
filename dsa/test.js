class Array {
    constructor() {
        this.length = 0;
        this.data = {};
    }
    push(data) {
        this.data[this.length] = data;
        this.length++;
        return this.data;
    }

    delete(data) {
        for (let i = 0; i < this.length; i++) {
            if (this.data[i] === data) {

                // shift elements
                for (let j = i; j < this.length - 1; j++) {
                    this.data[j] = this.data[j + 1];
                }

                delete this.data[this.length - 1];
                this.length--;

                return this.data;
            }
        }
    }
    deleteByIndex(index) {
        for (let i = index; i < this.length; i++) {
            this.data[i] = this.data[i + 1];
        }
        delete this.data[this.length - 1];
        this.length--;
        return this.data;
    }
    pop() {
        delete this.data[this.length - 1];
        this.length--;
        return this.data;

    }

    get(i) {
        return this.data[i]
    }
    shift() {
        for (let i = 1; i < this.length; i++) {
            this.data[i - 1] = this.data[1];
        }
        delete [this.length - 1];
        this.length--;
        return this.data;
    }

}

const newArray1 = new Array();

newArray1.push("john")
newArray1.push("stev")
newArray1.push("moosa")
newArray1.push("mamdan")
console.log(newArray1)

// console.log(newArray1.pop("moosa"))
console.log(newArray1.deleteByIndex(2))
console.log(newArray1)
console.log(newArray1.pop())

console.log(newArray1.get(1))
// console.log(newArray1.shift())

const handleImageSubmit = (e) => {
    const file = e.target.files[0];
    if(!file) return;

    const reader = new FileReader;
    reader.onloadend(() => {
        setHotel((prev) => ({...prev, image:reader.result}))
    })
    reader.readAsDataURL(file)
}

const chunk = (arr, size) => {
    const chunked = [];
    let index = 0;

    while(index < arr.length) {
        const chunk = arr.slice(index, index + size);
        chunked.push(chunk);
        index += size;
    }
    return chunked;
}

console.log(chunk([5,5,8,3,2,1,4,5,5,4,4,4,4], 4))