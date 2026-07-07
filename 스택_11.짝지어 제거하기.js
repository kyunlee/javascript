function solution(s){
    const stack = [];

    for(const c of s){
        console.log("c",c);
        console.log("stack[stack.length-1]",stack[stack.length-1]);
        if( stack.length > 0 && stack[stack.length-1] == c){
            stack.pop();
        }else{
            stack.push(c);
        }
    }
    return stack.length == 0? 1:0;
}

console.log(solution("baabaa"));
console.log(solution("cdcd"));