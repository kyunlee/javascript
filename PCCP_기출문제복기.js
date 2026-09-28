/**
 * 문제분석
   벌점 산정: 연속해서 방향을 틀린(1) 최대 횟수가 게임의 '최대 벌점'이 됩니다.

   벌점 상쇄 (Clear 조건): 게임이 끝날 때(배열의 마지막) 연속으로 맞춘(0) 횟수가 '최대 벌점'보다 크거나 같다면, 벌점이 상쇄되어 무효 처리(-1 반환)됩니다.

   벌점 부과 (Fail 조건): 마지막 연속 정답으로 벌점을 상쇄하지 못했다면, 최초로 틀린 화살표의 1-based index를 반환합니다.

   Case D [1,1,1,0,0,1,0,1,0,0]: 최대 벌점 3 (1,1,1). 마지막 정답 연속 2 (0,0). 상쇄 실패 (2 < 3) ➔ 최초 오답 인덱스 1 반환.

   Case E [1,1,1,0,0,0]: 최대 벌점 3 (1,1,1). 마지막 정답 연속 3 (0,0,0). 상쇄 성공 (3 >= 3) ➔ -1 반환.

 */

   function solution1(arrows) {
    let maxPenalty = 0;       // 최대 연속 오답(1) 횟수
    let currentWrong = 0;     // 현재 연속 오답(1) 횟수
    let trailingCorrect = 0;  // 마지막 연속 정답(0) 횟수
    let firstWrongIndex = -1; // 최초로 틀린 화살표의 인덱스 (0-based)
    
    // V8 엔진 최적화를 위해 forEach나 reduce 대신 전통적인 for문 사용
    for (let i = 0; i < arrows.length; i++) {
        if (arrows[i] === 1) {
            // 오답 처리
            currentWrong++;
            trailingCorrect = 0; // 정답 연속 카운트 초기화
            
            // 최초 오답 위치 기록
            if (firstWrongIndex === -1) {
                firstWrongIndex = i;
            }
            // 최대 벌점 갱신
            if (currentWrong > maxPenalty) {
                maxPenalty = currentWrong;
            }
        } else {
            // 정답 처리
            trailingCorrect++;
            currentWrong = 0; // 오답 연속 카운트 초기화
        }
    }
    
    // 조건: 단 한 번도 틀리지 않았거나, 마지막 연속 정답 횟수가 최대 벌점을 상쇄하는 경우
    if (firstWrongIndex === -1 || trailingCorrect >= maxPenalty) {
        return -1;
    }
    
    // 그 외의 경우 최초로 틀린 화살표의 1-based index 반환
    return firstWrongIndex + 1;
}

/**
 *     arrows              result
 * [0,0,1,1,1,0]             3  
 * [0,0,0,0,0]              -1 
 * [0,0,0,0,1,0,1,1]         5 
 * [1,1,1,0,0,1,0,1,0,0]     1 
 * [1,1,1,0,0,0]            -1
 */