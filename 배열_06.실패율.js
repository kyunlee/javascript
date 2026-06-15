// 실패율

function solution(N, stages){
    const temparr = new Array(N+2).fill(0);
    console.log(temparr);
    
    for(const stage of stages){

        temparr[stage]++;
    }
    console.log(temparr);
    // 정리가 끝난 상태: [0, 1, 3, 2, 1, 0, 1]

}  

//입출력의 예
// N    stages                result
// 5   [2,1,2,6,2,4,3,3]     [3,4,3,2,5]
//console.log(solution(5, [2,1,2,6,2,4,3,3]));

// 테스트 해보기
console.log(solution(5, [2, 1, 2, 6, 2, 4, 3, 3])); // 결과: [3, 4, 2, 1, 5]