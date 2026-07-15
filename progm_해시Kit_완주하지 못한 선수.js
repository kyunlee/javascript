function solution(participant, completion) {

    const map = new Map();

    //1.참가자 명단을 Map에 넣고 +1 기록 (동명이인이 있을 수 있으므로 기존값에 더함)
    for(let i=0; i<participant.length; i++){
        let p=participant[i];
        map.set(p,(map.get(p)||0)+1);
    }

    //2. 완주자 명단을 돌면서 Map에서 -1 차감
    for(let i=0; i<completion.length; i++){
        let c = completion[i];
        map.set(c, map.get(c)-1);
    }

    //3. 값이 1로 남아있는(차감되지 않은) 사람이 완주하지 못한 사람
    for(let [key,value] of map){
        if(value >0){
            return key;
        }
    }

}

console.log(solution(["leo", "kiki", "eden"],["eden", "kiki"])); //"leo"