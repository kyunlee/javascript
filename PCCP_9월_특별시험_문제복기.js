/*
1번
문제 완벽 분석 (숨겨진 규칙 해독)
직원 번호(Employee ID) 할당 규칙:
업무 번호(뒷 4자리)를 e로 나눈 나머지입니다. 단, 직원 번호는 1부터 e까지이므로 나머지가 0인 경우는 e번 직원이 됩니다.
(예: Case 1에서 e=3일 때, 27 % 3 = 0이므로 3번 직원에게 할당됩니다.)

우선순위 (Tie-breaker) 규칙:

t번 업무(1자리 숫자가 t)를 가장 많이 처리한 직원 번호를 반환합니다.

만약 t번 업무 처리 건수가 같다면, 전체 업무 처리 건수가 더 많은 직원이 승리합니다. (Case 3에서 6번 직원과 10번 직원이 t=9 업무를 2건씩 처리하여 동점이었으나, 전체 건수가 4건인 6번 직원이 승리)

전체 업무 처리 건수마저 같다면, 직원 번호가 가장 작은 직원이 승리합니다. (Case 2에서 12번 직원과 1번 직원이 모두 동점이었으나, 번호가 작은 1번 직원이 승리)
**/

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
    
    //console.log("targetCounts", targetCounts)
    // 현재까지의 1등을 기억할 변수들
    let bestEmpId = e; // 조건에 맞는 직원이 없을 경우를 대비한 기본값
    let maxTargetCount = -1;
    let maxTotalCount = -1;

    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        console.log('task',task);
        // V8 엔진 최적화를 위한 수학적 파싱
        const type = Math.floor(task / 10000);
        console.log('type',type);
        const taskNum = task % 10000;
        console.log('taskNum',taskNum);
        
        // 나머지 연산으로 직원 번호 도출 (1 ~ e)
        let empId = taskNum % e;
        console.log('empId',empId);
        if (empId === 0) empId = e; 
        
        // 건수 누적
        totalCounts[empId]++;
        if (type === t) {
            targetCounts[empId]++;
        }
        console.log('targetCounts=',targetCounts);
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

/**
 * 2번
 * 핵심 요구사항: 주관식 정답 S와 학생들의 답안 배열 arr를 비교하여 정답 여부(1 또는 0)를 배열로 반환해야 합니다.
 * 
 * 대소문자 무시: 대소문자 차이는 정답으로 인정합니다 (NILERIVER  -> 1).
 * 단어 간 공백 유연성: 원래 정답의 단어 사이에 있는 공백은 완전히 생략하거나, 여러 개를 연달아 넣어도 정답입니다 (NileRiver -> 1).
 * 단어 내 공백 삽입 불가 (결정적 규칙): 단어의 중간을 끊어서 임의로 공백을 넣으면 오답 처리됩니다 (ni leRi ver -> 0).
(※ 참고: 제시해주신 입출력 예시 중 "nile Rever" -> 1은 문맥상 "nile River"의 오타로 유추하여, 단어의 스펠링은 완벽히 일치하되 공백의 유연성만 허용하는 기준으로 설계했습니다.)
 */

/**
 * @param {string} S - 정답 문자열
 * @param {string[]} arr - 채점할 학생들의 답안 배열
 * @returns {number[]} - 채점 결과 배열 (1: 정답, 0: 오답)
 */
function solution2(S, arr) {
    // 1. 원본 정답 S를 공백(1개 이상) 단위로 분리하여 유효 단어 추출
    // S.trim()을 통해 선행/후행 공백에 의한 빈 문자열 생성을 방지합니다.
    const words = S.trim().split(/\s+/);
    
    // 2. 단어들 사이에 '\s*' (공백 0개 이상)를 허용하는 정규식 패턴 생성
    // 앞뒤에도 '\s*'를 붙여 유저 답안의 선행 및 후행 공백까지 허용합니다.
    const regexPattern = "^\\s*" + words.join("\\s*") + "\\s*$";
    
    // 3. 'i' 플래그를 사용하여 대소문자 구분을 무시하는 정규식 객체 컴파일
    const regex = new RegExp(regexPattern, "i");
    
    // 4. 고차 함수 map을 사용한 채점 적용
    // V8 엔진 내부 최적화가 잘 되어 있어, 코테에서는 for문과 map의 속도 차이가 미미합니다.
    return arr.map(answer => regex.test(answer) ? 1 : 0);
}

/**
 * @param {string} S - 정답 문자열
 * @param {string[]} arr - 채점할 학생들의 답안 배열
 * @returns {number[]} - 채점 결과 배열 (1: 정답, 0: 오답)
 */
function solution22(S, arr) {
    // 1. 소문자로 통일하고 유효한 단어만 배열로 추출
    const targetWords = S.trim().toLowerCase().split(/\s+/);
    
    return arr.map(answer => {
        const lowerAnswer = answer.toLowerCase();
        let currentIndex = 0;
        
        for (let i = 0; i < targetWords.length; i++) {
            const word = targetWords[i];
            
            // 현재 인덱스 이후로 타겟 단어가 등장하는지 탐색
            const foundIndex = lowerAnswer.indexOf(word, currentIndex);
            
            // 단어가 아예 없거나 순서가 뒤집혔다면 오답
            if (foundIndex === -1) return 0;
            
            // [검증] 이전에 탐색을 마친 위치 ~ 새로 찾은 단어의 시작 위치 사이 문자열 추출
            const gap = lowerAnswer.substring(currentIndex, foundIndex);
            
            // 그 간격(Gap)에 공백이 아닌 다른 문자가 들어있다면 오답 (단어 끊어짐 방지)
            // ex: "ni leRi ver" 에서 "nile"을 찾으면 gap에 " leRi " 등이 섞여 걸러짐
            if (gap.trim() !== "") return 0;
            
            // 다음 단어는 방금 찾은 단어의 끝부분부터 다시 탐색 시작
            currentIndex = foundIndex + word.length;
        }
        
        // 모든 단어를 순서대로 찾은 후, 문장 끝에 남은 찌꺼기가 공백인지 확인
        const tail = lowerAnswer.substring(currentIndex);
        if (tail.trim() !== "") return 0;
        
        return 1;
    });
}
/*
S              arr
"Nile River"  ["Nile River", "NileRiver", "ni leRi ver", "River Nile", "Mississippi Rever", "nile River", "NILERIVER"] 

result [1,1,0,0,0,1,1]
*/

console.log(solution2("Nile River",["Nile River", "NileRiver", "ni leRi ver", "River Nile", "Mississippi Rever", "nile River", "NILERIVER"] ));

/*
3번 

문제 분석
핵심 요구사항: 0과 1로 이루어진 문자열 배열이 주어질 때, '문자열 내 1의 개수'가 같은 것들끼리 그룹화하여 1부터 시작하는 인덱스(번호)를 묶어서 반환하는 문제입니다.

출력 정렬 규칙: 반환되는 그룹의 순서는 오름차순이나 내림차순이 아니라, 입력 배열에서 먼저 등장한 1의 개수 그룹 순서를 따르고 있습니다. (6개 그룹 -> 5개 그룹 -> 7개 그룹 순으로 등장하므로 결과도 그 순서를 유지함)

제한사항 유추: N(배열의 길이)이 최대 100,000이고 M(문자열 길이)이 100 이하라면, $O(N \times M)$의 시간 복잡도 내에서 단일 순회로 끝내야 효율성 테스트를 통과할 수 있습니다.
*/


/**
 * @param {string[]} datas - 0과 1로 이루어진 문자열 배열
 * @returns {string[]} - 그룹화된 인덱스 문자열 배열
 */
function solution3(datas) {
    // 삽입 순서를 보장하는 Map 객체 사용
    const groupMap = new Map();

    for (let i = 0; i < datas.length; i++) {
        const data = datas[i];
        let onesCount = 0;
        
        // 1. 문자열 내 1의 개수 카운팅
        // 정규식(data.match(/1/g))이나 split('1')보다 
        // V8 엔진에서 가장 빠른 순수 for문 탐색을 사용합니다.
        for (let j = 0; j < data.length; j++) {
            if (data[j] === '1') {
                onesCount++;
            }
        }

        // 2. Map에 그룹화하여 삽입 (1-based index)
        if (!groupMap.has(onesCount)) {
            groupMap.set(onesCount, []);
        }
        // 인덱스는 1번부터 시작하므로 i + 1을 푸시
        groupMap.get(onesCount).push(i + 1);
    }

    // 3. 결과 포맷팅
    const result = [];
    // Map.prototype.values()는 키가 삽입된 순서대로 값을 반환함
    for (const group of groupMap.values()) {
        result.push(group.join(' '));
    }

    return result;
}
// datas["011010111","100110101","110100111", "011011111","101100101","101101010"] result["1 3" ,"2 5 6", "4"]
console.log(solution3(["011010111","100110101","110100111", "011011111","101100101","101101010"]));

/**
 * 4번
 * 1. 문제 분석핵심 요구사항:대괄호 [ ]로 감싸진 문자열 블록을 2번 반복하도록 디코딩합니다.
 *    디코딩된 문자열에서 l (지문상의 I, 1-based index)부터 r까지의 부분 문자열(Substring)을 추출해야 합니다.
 *    분석 포인트:예시 ABCED에서 l=2, r=4일 때 결과가 BCD인 것으로 보아, 원래 문자열은 ABCDE의 오타로 추정되며 1부터 시작하는 인덱스(1-based Index)를 사용합니다.
 *    대괄호 안의 알파벳 대소문자는 원본 그대로 보존하여 반복해야 합니다.
 *    제한사항 유추:만약 $r$의 최댓값이 100,000 이하 수준이라면 전체 문자열을 메모리에 복원해도 충분합니다.하지만 $r$이 1억(100,000,000)을 넘어가는 효율성 킬러 문제라면, JS의 V8 엔진 힙 메모리 한계(문자열 길이 제한)를 피하기 위해 문자열을 물리적으로 팽창시키지 않고 길이를 추적하는 탐색이 필요합니다.
 */

/**
 * @param {string} message - 압축된 원본 메시지
 * @param {number} l - 추출 시작 인덱스 (1-based, 지문의 I)
 * @param {number} r - 추출 종료 인덱스 (1-based)
 * @returns {string} - 디코딩 및 추출된 문자열
 */
function solution4(message, l, r) {
    // V8 엔진 최적화를 위해 문자열 += 대신 Array를 버퍼로 사용
    const buffer = [];
    let i = 0;
    const len = message.length;

    while (i < len) {
        if (message[i] === '[') {
            // 대괄호 시작을 찾으면 닫히는 위치까지 탐색
            let start = i + 1;
            let end = message.indexOf(']', start);
            
            // 괄호 안의 부분 문자열 추출
            const inside = message.substring(start, end);
            
            // 반복 룰에 따라 버퍼에 2번 추가
            buffer.push(inside);
            buffer.push(inside);
            
            // 탐색 인덱스를 닫는 괄호 다음으로 점프
            i = end + 1;
        } else {
            // 일반 알파벳은 그대로 버퍼에 추가
            buffer.push(message[i]);
            i++;
        }
    }

    // 배열의 조각들을 하나의 문자열로 결합 (Rope 구조 최적화)
    const expanded = buffer.join('');
    
    // JS의 0-based 인덱스에 맞추어 변환 (l - 1 부터 r 미만까지)
    // substring은 (시작 인덱스, 종료 인덱스)를 받으므로 r을 그대로 사용하면 됨
    return expanded.substring(l - 1, r);
}

/**
 * messag          I   r  result
 * "ABCED"         2   4  "BCD" 
 * message 
 * Ba[na]A[P]le    1   11 "BananaApple"
 */
console.log(solution4("ABCDE",2,4));
console.log(solution4("Ba[na]A[P]le ",1,11));