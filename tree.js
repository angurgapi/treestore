"use strict";

class TreeStore {
  constructor(array) {
    this.array = array;
  }

  getAll() {
    return this.array;
    // console.log(this.array.find(({id}) => id == objId));
  }

  getItem(id) {
    return this.array.find((obj) => obj.id === id);
  }

  getChildren(id) {
    return this.array.filter((obj) => obj.parent === id);
  }

  getAllChildren(id) {
    let allChildrenArray = this.getChildren(id)   
    allChildrenArray.forEach(child => {        
        allChildrenArray.push(...this.getAllChildren(child.id))
    });  
    return allChildrenArray
  }
}


const items = [
    { id: 1, parent: 'root' },
    { id: 2, parent: 1, type: 'test' },
    { id: 3, parent: 1, type: 'test' },

    { id: 4, parent: 2, type: 'test' },
    { id: 5, parent: 2, type: 'test' },
    { id: 6, parent: 2, type: 'test' },

    { id: 7, parent: 4, type: null },
    { id: 8, parent: 4, type: null },
    { id: 9, parent: 7, type: null },
    { id: 10, parent: 7, type: null },
];

let testTree = new TreeStore(items);
// console.log(2, testTree.getChildren(2));
// console.log(7, testTree.getChildren(7));
console.log('all', testTree.getAllChildren(2))
