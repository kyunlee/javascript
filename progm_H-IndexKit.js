function solution(citations) {

    citations.sort((a,b)=> b-a);

    var answer = 0;

    for(let i=0; i<citations.length; i++){

        if(citations[i]>= i+1){
            answer++;
        }else{
            break;
        }
    }

    return answer;
}

console.log(solution([3, 0, 6, 1, 5]));