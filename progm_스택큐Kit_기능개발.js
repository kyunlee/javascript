function solution(progresses, speeds) {
    // 1. 각 작업이 며칠 걸리는지 계산 (Math.ceil 사용)
    const days = progresses.map((prog,i)=> Math.ceil((100-prog)/speeds[i]));
    console.log("days",days);

    let maxday = days[0];
    let answer = [];
    let cnt = 0;

    for(let i=0; i<days.length; i++){
        if( days[i] <= maxday){
            cnt++;
        }else{
            answer.push(cnt);
            maxday = days[i];
            cnt =1;
        }
    }
    answer.push(cnt);

    return answer;
}

console.log(solution([93, 30, 55],[1, 30, 5]));