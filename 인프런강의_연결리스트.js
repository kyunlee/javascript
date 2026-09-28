/**
 * 연결리스트 뒤집기(연결리스트)
 */
/*
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
*/
/**
 * 영상편집기 타임라인 관리 (이중연결리스트)
 */

class Node{
    constructor(value){
        this.value = value;
        this.prev = null;
        this.next = null;
    }
}

class DobleLinkedList{
    constructor(value){
        this.head = {
            value: value,
            prev: null,
            next: null,
        };
        this.tail = this.head;
        this.selected = null;
        this.stack = [];
    }
    append(value, cursor){
        const newNode = new Node(value);
        newNode.prev = this.tail;
        this.tail.next = newNode;
        this.tail = newNode;
        if(cursor === value){
            this.selected = newNode;
        }
    }
    move(direction, count) {
        let currentNode = this.selected;

        for(let i=0; i<count; i++){
            currentNode = currentNode[direction];
        }
        this.selected = currentNode;

    }
    remove(){
        this.stack.push(this.selected);
        const prevNode = this.selected.prev;
        const nextNode = this.selected.next;

        if(prevNode){
            prevNode.next = nextNode;
        }
        if(nextNode){
            nextNode.prev = prevNode;
            this.selected = nextNode;
        }else{
            this.selected = prevNode;
        }
    }
    recover(){
        const recoverNode = this.stack.pop();
        const prevNode = recoverNode.prev;
        const nextNode = recoverNode.next;
        
        if(prevNode){
            prevNode.next = recoverNode;
        }
        if(nextNode){
            nextNode.prev = recoverNode;
        }
    }
}

function solution2(n, k, cmd) {
    const result = Array.from({length:n},() => "0");

    const linkedList = new DobleLinkedList(0);
    for(let i=1; i < n; i++){
        linkedList.append(i,k);
    }
    for(const command of cmd){
        const [action, count] = command.split(" ");
        
        if( action === "R") {
            linkedList.move("next",count);
        }
        if( action === "L") {
            linkedList.move("prev",count);
        }
        if( action === "D") {
            linkedList.remove();
        }
        if( action === "U") {
            linkedList.recover();
        }
    }

    linkedList.stack.forEach(node => result[node.value] = "X");

    return result.join("");
}
console.log(solution2(5, 2, ["D", "D", "D"]))
console.log(solution2(6, 2, ["D", "R 2", "D", "U"]))
console.log(solution2(8, 3, ['D', 'D', 'L 2', 'D', 'U']))