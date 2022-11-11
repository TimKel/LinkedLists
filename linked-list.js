/** Node: node for a singly linked list. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** LinkedList: chained together nodes. */

class LinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of vals) this.push(val);
  }

  /** _get(idx): retrieve node at idx. */

  _get(idx) {
    let cur = this.head;
    let count = 0;

    while (cur !== null && count != idx) {
      count += 1;
      cur = cur.next;
    }

    return cur;
  }


  /** push(val): add new value to end of list. */

  push(val) {
    let newNode = new Node(val);

    if (!this.head){
      this.head = newNode;
      this.tail = this.head;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length += 1;
  }

  /** unshift(val): add new value to start of list. */

  unshift(val) {
    let newNode = new Node(val);

    if (this.head === null){
      this.head = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
    
    if (this.length === 0) this.tail = this.head;

    this.length += 1;
  }

  /** pop(): return & remove last item. */

  pop() {
    // return this.removeAt(this.length - 1);

    if (!this.length) {
      return null;
    } else {
      let currentNode = this.head;
      let secondToLastNode = this.head;
      while (currentNode.next){
        secondToLastNode = currentNode;
        currentNode = currentNode.next;
      }

      secondToLastNode.next = null;

      this.tail = secondToLastNode;

      this.length -= 1;

      if (!this.length){
        this.head = null;
        this.tail = null;
      }
      console.log("CURRENT NODE", currentNode)
      return ("CURRENT NODE", currentNode);
    }
  }

  /** shift(): return & remove first item. */

  shift() {
    // return this.removeAt(0);
    if (!this.length) {
      return null;
    } else {
      const nodeToRemove = this.head
      this.head = this.head.next;
      this.length -= 1;
      if (!this.length){
        this.tail = null;
      }
      return nodeToRemove;
    }
  }

  /** getAt(idx): get val at idx. */

  getAt(idx) {
    let counter = 0;
    let node = this.head;
    while (node) {
     if (counter === idx) {
      return node;
     }
     counter++;
     node = node.next;
    }
   return null;

  }

  /** setAt(idx, val): set val at idx to val */

  setAt(idx, val) {
    if (idx >= this.length || idx < 0) {
      throw new Error("Invalid index.");
    }

    let cur = this._get(idx);
    cur.val = val;
  }

  /** insertAt(idx, val): add node w/val before idx. */

  insertAt(idx, val) {
    if (idx > this.length || idx < 0) {
      throw new Error("Invalid index.");
    }

    if (idx === 0) return this.unshift(val);
    if (idx === this.length) return this.push(val);

    // get the one before it
    let prev = this._get(idx - 1);

    let newNode = new Node(val);
    newNode.next = prev.next;
    prev.next = newNode;

    this.length += 1;
  }

  /** removeAt(idx): return & remove item at idx, */

  removeAt(idx) {
    if (idx >= this.length || idx < 0) {
      throw new Error("Invalid index.");
    }

    // special case: remove first item

    if (idx === 0) {
      let val = this.head.val;
      this.head = this.head.next;
      this.length -= 1;
      if (this.length < 2) this.tail = this.head;
      return val;
    }

    let prev = this._get(idx - 1);

    // special case: remove tail

    if (idx === this.length - 1) {
      let val = prev.next.val;
      prev.next = null;
      this.tail = prev;
      this.length -= 1;
      return val;
    }

    // normal case: remove in middle

    let val = prev.next.val;
    prev.next = prev.next.next;
    this.length -= 1;
    return val;
  }

  /** average(): return an average of all values in the list */

  average() {
    if (this.length === 0) return 0;

    let total = 0;
    let current = this.head;

    while (current) {
      total += current.val;
      current = current.next;
    }

    return total / this.length;
  }
}

/*Test Code*/
let ll = new LinkedList();

ll.push("skateboard");
ll.push("rollerblades");
ll.push("scooter")
ll.push("bicycle");

console.log("---------Contents---------")
console.log("all contents", ll)

console.log("---------Unshift---------")
ll.unshift("basketball")
console.log("Updated contents", ll)
ll.unshift("football")
console.log("Updated contents", ll)

console.log("---------POP-----------")
ll.pop();

console.log("all contents", ll)
console.log("New Tail:", ll.tail.val)





module.exports = LinkedList;

