//문제 09. 10진수를 2진수로 변환하기
//문제 10. 괄호 회전하기
//문제 11. 짝지어 제거하기 
//문제 12. 주식가격
//문제 13. 크레인 인형 뽑기 게임
//문제 14. 표 편집

//decimal  반환값
// 10      1010

function solution(decimal){ 

    let mok = decimal;
    let nom = 0;
    let stack =[];
    let answer ="";
    
    while(mok != 0){
        nom = mok % 2;
        mok = Math.floor(mok/2);
        stack.push(nom);
    }

    while(stack.length > 0){
        answer += stack.pop();
    }
    return answer;

}

console.log(solution(10));