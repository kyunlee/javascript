function solution(s) {
    var answer = 0;
    var str = s.split(" ");
    for(let i=0; i < str.length; i++)
    {
        if("Z" == str[i]){
            answer -=Number(str[i-1]);
        }else{
            answer += Number(str[i]);
        }
    }
    
    return answer;
}

console.log(solution("10 20 30 40"));