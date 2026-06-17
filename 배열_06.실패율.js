// 실패율
// 실패율 정의 : 스테이지 도달했으나 아직 클리어 못한 플레이어의 수 / 스테이지에 도달한 플레이어의 수
/*
function solution(N, stages){
    //1. 스테이지별 도전자 수 구함
    const 도전자수 = new Array(N+2).fill(0);

    for(const stage of stages){
        도전자수[stage]++;
        console.log(도전자수);    
    }

    //2. 스테이지별 실핸한 사용자 수 계산
    const 실패자수율 = [];
    let total = stages.length;

    //3. 각 스테이지를 순회하며, 실패율 계산
    for(let i=1; i<=N; i++){
           
        // 실패율 계산
        rate = 도전자수[i] / total;
        
        실패자수율.push({ stage: i, rate: rate });
        console.log(실패자수율);

        // 다음 스테이지 실패율 구하기위해 현재 스테이지 인원 뱀
        total -= 도전자수[i];
    }

    실패자수율.sort((a,b) => { 
        if(a.rate == b.rate){
            return a.stage-b.stage;
        }
        
        return b.rate - a.rate; 
    } ); 

    console.log(실패자수율);

    return 실패자수율.map((item)=> item.stage);
}  
*/

// 실패율
// 실패율 정의 : 스테이지 도달했으나 아직 클리어 못한 플레이어의 수 / 스테이지에 도달한 플레이어의 수

function solution(N, stages){
    const 도전자수 = new Array(N+2).fill(0);

    for(let stage of stages){
        도전자수[stage]++;
    }
    console.log(도전자수);

    실패자수율 = [];
    total = stages.length;

    for(let i=1; i<=N; i++){

        rate= 도전자수[i] / total;
        
        실패자수율.push({stage:i ,rate:rate});

        total -= 도전자수[i];
    }
    console.log(실패자수율);

    실패자수율.sort((a,b) => {
        
        if(a.rate == b.rate){
            return a.stage - b.stage; 
        }

        return b.rate - a.rate;
    });

    return 실패자수율.map((a)=> a.stage);
}

//입출력의 예
// 전체 스테이지 개수가 N
// 게임을 이용하는 사용자가 현재 멈춰있는 스테이지의 번호가 담긴 배열 stages
// N    stages                result
// 5   [2,1,2,6,2,4,3,3]     [3,4,2,1,5]
//console.log(solution(5, [2,1,2,6,2,4,3,3]));

// 테스트 해보기
console.log(solution(5, [2, 1, 2, 6, 2, 4, 3, 3])); // 결과: [3, 4, 2, 1, 5]