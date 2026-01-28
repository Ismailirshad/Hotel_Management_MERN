class Node {
  constructor(value) {
    this.data = value;
    this.next = null;
  }
}

class LinkedList {
  constructor(value) {
    this.head = new Node(value);
    this.tail = this.head;
    this.length = 1;
  }


  push(value) {
    let newNode = new Node(value)
    if (this.head == null) {
      this.head = newNode;
      this.tail = newNode;
      this.length = 1;
      return
    }
    this.tail.next = newNode;
    this.tail = newNode;
    this.length++;
  }

  delete(value) {
    if (this.head == null) return;

    if (this.head.data === value) {
      this.head = this.head.next;
      this.length--;
      return;
    }
    console.log("helloo")
    let current = this.head;
    let prev = null;

    while (current != null) {
      if (current.data === value) {
        prev.next = current.next;
        this.length--;
        return;
      }
      prev = current
      current = current.next
    }
  }

  pop() {
    let current = this.head;
    let prev = null;

    if (!this.head) return;

    if (this.head == this.tail) {
      this.head = null;
      this.tail = null;
      this.length = 0;
      return;
    }

    while (current.next != null) {
      prev = current;
      current = current.next;
    }
    this.tail = prev;
    this.tail.next = null;
    this.length--
  }

  deleteAfter(value) {
    let current = this.head;
    while (current !== null && current.next !== null) {
      if (current.data === value) {
        current.next = current.next.next;
        this.length--;
        return;
      }
      current = current.next;
    }
  }

  shift() {

    if (!this.head) return;

    this.head = this.head.next;
    this.length--;

    if (this.head === this.tail) {
      this.head == null;
      this.tail == null;
      this.length--;
      return;
    }
  }

  unshift(value) {
    const newNode = new Node(value)

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    }

    newNode.next = this.head;
    this.head = newNode;
    this.length++;
  }

  getFirst() {
    if (!this.head) return;
    return this.head;
  }

  getLast() {
    let current = this.head
    if (!this.head) return;

    if (this.head === this.tail) {
      return this.tail;
    }
    while (current) {
      if (!current.next) {
        return current
      }
      current = current.next;
    }
  }

  getElementByIndex(index) {
    if (!this.head || index < 0) return null;

    let current = this.head
    let counter = 0;

    while (current) {
      if (counter === index) {
        return current
      }
      counter++
      current = current.next;
    }
    return null;
  }

  set(value, newValue) {
    if (!this.head) return;
    let current = this.head

    while (current) {
      if (current.data === value) {
        current.data = newValue;
        return current;
      }
      current = current.next
    }
    return null;
  }
  insertData(value, nextTo) {
    if (!this.head) return;
    let current = this.head;

    while (current) {
      if (current.data === nextTo) {
        current.next.data = value
      }
      current = current.next;
    }
  }

  insertNode(value, nextTo) {
    const newNode = new Node(value);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      this.length = 1;
    }
    if (this.head === this.tail) {
      this.head.next = newNode;
      this.tail = newNode;
      this.length++;
    }
    if (nextTo === this.tail.data) {
      this.tail.next = newNode;
      this.tail = newNode;
      this.length++;
    }

    let current = this.head;
    let temp = null;
    while (current) {
      if (current.data === nextTo) {
        temp = current.next;
        current.next = newNode;
        newNode.next = temp;
        this.length++;

        // { this also works in }
      //    newNode.next = current.next;
      // current.next = newNode;

      // // If inserted after tail
      // if (current === this.tail) {
      //   this.tail = newNode;
      // }

      }
      current = current.next;
    }

  }

  size(){
    if(!this.head) return null;
    let counter = 0;
    let temp = this.head;

    while(temp){
      counter++;
      temp = temp.next;
    }
    return counter;
  }

  clear(){
    this.head = null;
  }
}

const list = new LinkedList(1)
list.push(2)
list.push(3)
list.push(4)
list.push(5)
// console.log(list)
// list.delete(2)
// console.log(list)
// list.pop()
// list.deleteAfter(2)
// console.log(list)
// list.shift()
list.unshift(8)
// console.log(list)
// console.log(list.getLast())
// list.set(3,30)
// console.log(list.getElementByIndex(3))
// list.insertData(9,8)
list.insertNode(9,8)
// console.log(list.size())
// console.log(list)
console.log(list.clear())
