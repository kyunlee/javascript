//문제 08..괄호짝맞추기- 올바른 괄호(prog)
//    S       반환값
// (())()      True
// ((())()     false

 function solution(s){ 

    var stack = [];

    for(const c of s){

        if("(" == c){
            stack.push(c);
        }else if(")" == c){
            if(stack.length == 0){
                return false;
            }else{
                stack.pop(c);
            }
        }
    }
    
    if(stack.length == 0){
        return true;
    }
     
 }

 console.log(solution("(())()"));