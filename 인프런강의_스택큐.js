/* 1.택배 박스 정리 시스템 (스택) */

function solution1(boxes) {

    var answer = [];
    for(let i=0; i<boxes.length; i++){
        if(answer[answer.length-1] != boxes[i]){
            answer.push(boxes[i]);
        }
    }
    return answer;
}
console.log(solution1([2, 2, 5, 5, 5, 1, 1]));  // 2, 5, 1
console.log(solution1([7, 7, 8, 8, 0, 0, 0]));  // 7, 8, 0

/* 2.성문 열고 닫기(스택) */

function solution2(gate) {
}
console.log(solution2("<<>>"))
console.log(solution2("<<>>"))
console.log(solution2(">><<"))
console.log(solution2("<<<>"))

/* 알파벳 폭발 ( 스택 ) */

function solution3(s) {
    const stack = [];
    
    for(const char of s){
        const top = stack[stack.length -1];
        if( top && Math.abs(top.charCodeAt() - char.charCodeAt()) === 32){
            // A는 65 , a는 97 => 둘의 차이는 32
            stack.pop();
        }else{
            stack.push(char);
        }
    }
    return stack.join("");
}
console.log(solution3("infFflearn"));
console.log(solution3("aAbBcC"));
console.log(solution3("xYyX"));
console.log(solution3("a"));
console.log(solution3("Code"))

/* 명령어 수행하기(큐) */
function solution4(commands) {
}
console.log(
solution4(["ENQUEUE 3", "ENQUEUE 5", "DEQUEUE", "DEQUEUE", "DEQUEUE"])
);

/*두줄 대기열에서 짝수 번호 뽑기 (큐) */

function solution(queue1, queue2, k) {
}
console.log(solution([1, 3, 4, 6, 5, 8, 3`
    
    
    
    `