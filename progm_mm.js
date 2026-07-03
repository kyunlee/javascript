function solution1(s) {
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

//console.log(solution1("10 20 30 40"));

function solution(numLog) {
    var answer = '';
    for(let i=0; i < numLog.length; i++){
        
        let sum = numLog[i+1]-numLog[i];
        console.log(sum);
        if( sum == 1){
            answer += "w";
        }else if( sum == -1){
            answer += "s";
        }else if( sum == 10){
            answer += "d";
        }else if( sum == -10){
            answer += "a";
        }
        
    }
    return answer;
}

//console.log(solution([0, 1, 0, 10, 0, 1, 0, 10, 0, -1, -2, -1]));

const convert = {
    '1': 'w', '-1': 's', '10': 'd', '-10': 'a'
};
