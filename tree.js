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

  getDirectParent(id) {
    let parentId = this.array.find((child) => child.id === id)?.parent || null;
    switch (typeof parentId) {
      case 'string':
        return parentId      

      case 'number':
        return this.array.find(({id}) => id === parentId)      

      default:
        return 'element not found'
      
    }
  }

  getAllParents(id) {    
    let allParentsArray = []
    allParentsArray.push(this.getDirectParent(id))
    
    if(typeof (allParentsArray[allParentsArray.length - 1].parent) === 'number') {      
      allParentsArray.push(...this.getAllParents(allParentsArray[allParentsArray.length - 1].id))
    }
    return allParentsArray
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
console.log('all children of 2', testTree.getAllChildren(2))
console.log('all children of 9', testTree.getAllChildren(9))
console.log('parent of 1', testTree.getDirectParent(1))
console.log('parent of 7', testTree.getDirectParent(7))
console.log('parent of 100', testTree.getDirectParent(100))
console.log('all parents of 10', testTree.getAllParents(10))
