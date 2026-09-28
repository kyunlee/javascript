/**
 * 연결리스트 뒤집기(연결리스트)
 */

class Node {
    constructor(value){
        this.value = value;
        this.next = null;
    }
}

class LinkedList {
    constructor(value){
    this.head = {
        value: value,
        next: null,
    };
    this.tail = this.head;
    this.length = 1;
    } 

    append(value) {
        const newNode = new Node(value);
        this.tail.next = newNode;
        this.tail = newNode;
        this.length++;
    }
    reverse(){
        if(!this.head.next){
            return this.head;
        }
        let first = this.head;
        this.tail = this.head;
        let second = first.next;

        while(second){
            const temp = second.next;
            second.next = first;
            first = second;
            second = temp; 
        }

        this.head.next = null;
        this.head = first;
    }
    printList(){
        const array = [];
        let currentNode = this.head;

        while(currentNode != null){
            array.push(currentNode.value);
            currentNode = currentNode.next;
        }
        return array;
    }
}

function solution1(nums){
    if(nums.length === 0){
        return [];
    }

    const linkedList = new LinkedList(nums[0]);
    for(let i=1; i<nums.length; i++) {
        linkedList.append(nums[i]);
    }
    linkedList.reverse();
    return linkedList.printList();

}

console.log(solution1([1,2,3,4,5]));
console.log(solution1([1,2,3]));