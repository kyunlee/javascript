// 괄호 회전하기
/**
 *    S       result
 *  [](){}      3
 *  }]()[{      2
 *  [)(]        0
 *  }}}         0    
 */

function solution(s){
    let count = 0;
    let str = s.split('');
    console.log(str);

    //1.문자열 길이만큼 회전
    for(let i=0; i<s.length; i++){
        if(isValid(str)){
            count++;
        }
        //왼쪽으로 한칸 회전 :Shift()로 첫 글자 빼서 push
        str.push(str.shift());
    }

    return count;

    //2스택 이용한 유효성 검사
    function isValid(arr) {
        const stack = [];
        const map = {
            ')' : '(',
            '}' : '{',
            ']' : '['
        };

        for(let char of arr){
            //여는 괄호일 경우 스택 넣음
            if(char == '(' || char == '{' || char == '['){
                stack.push(char);
            }else{
                //닫는 괄호일 경우 스택 확인
                if( stack.length == 0 || stack.pop() != map[char]){
                    return false;
                }
            }
        }
        
        //최종적으로 스택 비어있어야함
        return stack.length == 0;
    }
}

//console.log(solution("[](){}"));

function solution2(s){
    const n = s.length;
    let answer = 0;

    for(let i=0; i <s.length; i++){
        const stack = [];
        let isCorrect = true;

        for(let j=0; j<n; j++){

            //1.괄호 문자열을 회전시키면서 참조
            const c = s[(i+j)%n];
            console.log('i=',i,'j=',j)
            console.log('c',c)

            if( c=="[" || c=="(" || c == "{" ){
                //2.열린괄호 푸시
                stack.push(c);
            }else{
                if( stack.length == 0){
                    //3.괄호없는 경우
                    isCorrect = false;
                    break;
                }
                
                //닫힌 괄호는 스택의 top과 짝이 맞는지 비교
                const top = stack[stack.length-1];
                if(c=="]" && top == "["){
                    stack.pop();
                }else  if(c==")" && top == "("){
                    stack.pop();
                }else  if(c=="}" && top == "{"){
                    stack.pop();
                }else{
                    isCorrect=false;
                    break;
                }
            }
        }

        //모든 괄호의 짝이 맞는 경우
        if(isCorrect && stack.length==0){
            answer +=1;
        }
    }

    return answer;
}

//console.log(solution2("[](){}"));

function solution3(s) {
    const n = s.length;
    const doubledS = s+s; //문자열 두배로 늘림
    let count = 0;

    for(let i=0; i < n; i++){
        console.log(doubledS.substring(i,i+n));
        if(isValid(doubledS.substring(i,i+n))){
            count++;
        }
    }
    return count;

    function isValid(str){
        const stack = [];
        
        for(let char of str){
            if(char == '(' || char == "{" || char == '[' ){
                stack.push(char);
            }else{
                //스택이 비어있거나, 짝이 맞지않으면 즉시 false
                const top = stack.pop();
                if(char == ')' && top != "(") return false;
                if(char == '}' && top != "{") return false;
                if(char == ']' && top != '[') return false;
            }
        }
        return stack.length == 0;
    }

}
console.log(solution3("[](){}"));