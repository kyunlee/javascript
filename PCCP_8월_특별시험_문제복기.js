//1. 질문해주신 "고대유적 알파벳 격자 n*n 형태"는 알고리즘 코딩 테스트에서 자주 등장하는 2차원 배열(격자) 기반의 그래프 탐색(DFS/BFS) 및 백트래킹 유형

/**
 * @param {string[]} board - 유적 알파벳 격자
 * @returns {string} 단일 레이어에만 존재하는 알파벳들을 오름차순 정렬한 문자열
 */
function solution(board) {
    const N = board.length;
    const M = board[0].length;
    
    // 알파벳(a-z) 26개의 깊이 상태를 저장할 고정 크기 배열
    // TypedArray를 사용하면 V8 엔진 최적화에 더욱 유리합니다.
    const depthMasks = new Int32Array(26);
    
    // 1. 격자 순회 및 깊이(Layer) 비트 기록
    // Array 내장 메서드(forEach, map) 대신 전통적인 for문을 사용하여 콜백 함수 오버헤드를 제거합니다.
    for (let r = 0; r < N; r++) {
        for (let c = 0; c < M; c++) {
            const charCode = board[r].charCodeAt(c) - 97; // 'a'는 0
            
            // 현재 셀의 테두리 깊이(Depth) 계산
            const depth = Math.min(r, c, N - 1 - r, M - 1 - c);
            
            // 해당 알파벳의 인덱스에 깊이 비트 켜기 (Bitwise OR)
            depthMasks[charCode] |= (1 << depth);
        }
    }
    
    // 2. 단일 깊이에만 존재하는 알파벳 추출
    const result = [];
    for (let i = 0; i < 26; i++) {
        const mask = depthMasks[i];
        
        // mask가 0이면 존재하지 않는 알파벳
        // (mask & (mask - 1)) === 0 이면 켜진 비트가 정확히 1개라는 의미 (2의 거듭제곱 판별 기법)
        if (mask > 0 && (mask & (mask - 1)) === 0) {
            result.push(String.fromCharCode(i + 97));
        }
    }
    
    // 알파벳 순서대로 탐색했으므로 별도의 sort() 없이 join만 수행해도 정렬이 보장됩니다.
    return result.join('');
}

console.log(solution(["aaaaa","bcccb","bcebb","bcbbb","aaaa"]));