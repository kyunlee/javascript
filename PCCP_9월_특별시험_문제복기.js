/*
문제 완벽 분석 (숨겨진 규칙 해독)
직원 번호(Employee ID) 할당 규칙:
업무 번호(뒷 4자리)를 e로 나눈 나머지입니다. 단, 직원 번호는 1부터 e까지이므로 나머지가 0인 경우는 e번 직원이 됩니다.
(예: Case 1에서 e=3일 때, 27 % 3 = 0이므로 3번 직원에게 할당됩니다.)

우선순위 (Tie-breaker) 규칙:

t번 업무(1자리 숫자가 t)를 가장 많이 처리한 직원 번호를 반환합니다.

만약 t번 업무 처리 건수가 같다면, 전체 업무 처리 건수가 더 많은 직원이 승리합니다. (Case 3에서 6번 직원과 10번 직원이 t=9 업무를 2건씩 처리하여 동점이었으나, 전체 건수가 4건인 6번 직원이 승리)

전체 업무 처리 건수마저 같다면, 직원 번호가 가장 작은 직원이 승리합니다. (Case 2에서 12번 직원과 1번 직원이 모두 동점이었으나, 번호가 작은 1번 직원이 승리)
*/

/**
 * @param {number[]} tasks - 5자리 작업 코드 배열
 * @param {number} e - 전체 직원 수 (모듈러 연산의 기준)
 * @param {number} t - 타겟 업무 종류 (첫 1자리)
 * @returns {number} 조건을 만족하는 1등 직원의 번호
 */
function solution1(tasks, e, t) {
    // 인덱스와 직원번호를 일치시키기 위해 크기를 e + 1로 할당 (0번 인덱스는 버림)
    const targetCounts = new Int32Array(e + 1); // t번 업무 처리 건수
    const totalCounts = new Int32Array(e + 1);  // 전체 업무 처리 건수
    
    // 현재까지의 1등을 기억할 변수들
    let bestEmpId = e; // 조건에 맞는 직원이 없을 경우를 대비한 기본값
    let maxTargetCount = -1;
    let maxTotalCount = -1;

    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        
        // V8 엔진 최적화를 위한 수학적 파싱
        const type = Math.floor(task / 10000);
        const taskNum = task % 10000;
        
        // 나머지 연산으로 직원 번호 도출 (1 ~ e)
        let empId = taskNum % e;
        if (empId === 0) empId = e; 
        
        // 건수 누적
        totalCounts[empId]++;
        if (type === t) {
            targetCounts[empId]++;
        }
    }

    // 1등 찾기 로직 (O(E) 순회)
    // 사번이 가장 작은 직원이 우선권을 가지므로 1번부터 오름차순으로 순회
    for (let id = 1; id <= e; id++) {
        const currentTarget = targetCounts[id];
        const currentTotal = totalCounts[id];

        // Tie-breaker 규칙 적용
        if (currentTarget > maxTargetCount) {
            // 1순위: 타겟 업무를 가장 많이 한 경우
            bestEmpId = id;
            maxTargetCount = currentTarget;
            maxTotalCount = currentTotal;
        } else if (currentTarget === maxTargetCount) {
            // 2순위: 타겟 업무 건수가 같을 때, 전체 업무 건수 비교
            if (currentTotal > maxTotalCount) {
                bestEmpId = id;
                maxTotalCount = currentTotal;
            }
            // 3순위: 전체 건수도 같다면 사번이 작은 사람이 승리 
            // (오름차순 순회 중이므로 기존 bestEmpId를 유지하면 자동 해결됨)
        }
    }

    return bestEmpId;
}
//solution1(tasks, e, t)
console.log(solution1([10003,50027,20028,50298,50300,63485],3, 5) );  //result 3
console.log(solution1([10025,10012,10001,10006,10014],13, 1) );       //result 1 
console.log(solution1([50036,40036,90036,90006,90000,99990],10, 9) ); //result 6