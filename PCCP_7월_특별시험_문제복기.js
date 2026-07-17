//1.'손익분기점(Break-even Point)'을 구하는 전형적인 알고리즘 문제

//2. 대문자 암호 해독
function solution2(password, hints) {
    let answer = '';
    const hintMap = {};

    // 1. hints 배열을 순회하며 알파벳이 가지는 숫자 값을 계산합니다.
    for (const hint of hints) {
        const parts = hint.split(' ');
        
        let letter = '';
        const nums = [];
        
        // 힌트 안에서 알파벳과 숫자를 분리합니다. (순서가 섞여 있어도 대응 가능)
        for (const part of parts) {
            // isNaN()을 사용해 숫자로 변환할 수 없으면 알파벳으로 처리
            if (isNaN(part)) { 
                letter = part;
            } else {
                nums.push(parseInt(part, 10));
            }
        }
        
        // 2. 규칙 적용: 두 숫자의 합이 10 미만이면 합, 10 이상이면 차이(절대값)
        const sum = nums[0] + nums[1];
        let val;
        
        if (sum < 10) {
            val = sum;
        } else {
            val = Math.abs(nums[0] - nums[1]);
        }
        
        // 객체에 계산된 값을 저장합니다. (예: { N: 2, B: 3, A: 6 })
        hintMap[letter] = val;
    }

    // 3. password 문자열을 순서대로 읽어 값을 이어 붙입니다.
    for (const char of password) {
        if (hintMap[char] !== undefined) {
            answer += hintMap[char];
        }
    }

    // 결과값이 숫자 형태이므로 Number로 변환하여 반환합니다.
    // (단, 결과가 매우 길어질 수 있는 문제라면 Number()를 빼고 answer 문자열 그대로 반환해야 할 수 있습니다.)
    return Number(answer); 
}

// 테스트 케이스 실행
const password = "BANANA";
const hints = ["9 N 7", "B 4 7", "3 3 A"];

console.log(solution2(password, hints)); // 출력: 362626

//3. 문제는 전형적인 백트래킹(Backtracking, DFS) 알고리즘 문제입니다. 
//   위층의 카드가 아래층의 두 카드 중 하나로 결정된다는 것은, 반대로 말해 아래층을 배치할 때 바로 위층의 부모 카드 조건을 만족시켜야 한다는 강력한 제약 조건이 됩니다.

function solution3(numbers, board) {
    // 1. 전체 카드 개수를 통해 보드판의 층수(N)를 계산합니다.
    const totalCards = numbers.reduce((acc, cur) => acc + cur, 0);
    let n = 1;
    while ((n * (n + 1)) / 2 < totalCards) {
        n++;
    }

    // 2. 초기 보드판 배열을 만들고, 사용한 카드를 차감합니다.
    const grid = Array.from({ length: n }, (_, i) => Array(i + 1).fill(0));
    const remainingCards = [...numbers];

    for (let r = 0; r < board.length; r++) {
        for (let c = 0; c < board[r].length; c++) {
            const val = parseInt(board[r][c], 10);
            grid[r][c] = val;
            remainingCards[val - 1]--; // 사용한 카드 차감
        }
    }

    let answer = 0;

    // 3. 백트래킹(DFS)으로 빈칸을 채웁니다.
    // r: 현재 행(층), c: 현재 열(칸)
    function dfs(r, c) {
        // 보드판의 끝(N층)까지 무사히 다 채웠다면 경우의 수 1 증가
        if (r === n) {
            answer++;
            return;
        }

        // 현재 층의 끝에 도달했다면 다음 층의 첫 번째 칸으로 이동
        if (c === r + 1) {
            dfs(r + 1, 0);
            return;
        }

        // 이미 입력값으로 주어진 초기 보드판 부분이라면 건너뜁니다.
        if (grid[r][c] !== 0) {
            dfs(r, c + 1);
            return;
        }

        // 1부터 5까지의 숫자를 하나씩 놓아봅니다.
        for (let v = 1; v <= 5; v++) {
            if (remainingCards[v - 1] > 0) {
                // 핵심 규칙: 현재 놓으려는 위치가 오른쪽 자식(c > 0)일 때,
                // 위층의 부모 카드(r-1, c-1)가 왼쪽 자식(r, c-1)과도 다르고
                // 지금 놓으려는 오른쪽 자식(v)과도 다르다면 규칙 위반이므로 건너뜀
                if (c > 0) {
                    const parent = grid[r - 1][c - 1];
                    const leftChild = grid[r][c - 1];
                    if (parent !== leftChild && parent !== v) {
                        continue; 
                    }
                }

                // 카드를 놓고, 다음 칸으로 탐색 진행
                grid[r][c] = v;
                remainingCards[v - 1]--;
                
                dfs(r, c + 1);
                
                // 탐색이 끝난 후 상태를 복구 (백트래킹)
                grid[r][c] = 0;
                remainingCards[v - 1]++;
            }
        }
    }

    // 채우기 시작 (이미 채워진 board의 다음 층, 첫 번째 칸부터 시작)
    dfs(board.length, 0);

    return answer;
}

// 테스트 케이스 확인
const numbers = [1, 3, 2, 0, 0];
const board = ["2", "23"];
console.log(solution3(numbers, board)); // 출력: 3

//4."격자 내의 값을 방향 지시등으로 삼아, 첫 번째 열에서 출발해 마지막 열까지 무사히 도달하는(격자 밖으로 이탈하지 않는) 출발점의 개수를 구하는 시뮬레이션 문제" 였습니다.

function countSuccessfulPaths(grid) {
    if (!grid || grid.length === 0) return 0;

    const rows = grid.length;
    const cols = grid[0].length;
    let successCount = 0;

    // 첫 번째 열(col = 0)의 모든 행을 출발점으로 삼아 테스트
    for (let startRow = 0; startRow < rows; startRow++) {
        let currentRow = startRow;
        let currentCol = 0;
        let isSuccess = true;

        // 마지막 열(cols - 1)에 도달할 때까지 반복
        while (currentCol < cols - 1) {
            const move = grid[currentRow][currentCol];
            
            // 이동 규칙 적용: 행은 현재 칸의 값만큼 이동, 열은 1칸 오른쪽으로
            currentRow = currentRow + move;
            currentCol = currentCol + 1;

            // 격자 위아래 경계를 벗어나면 실패 처리 후 반복문 탈출
            if (currentRow < 0 || currentRow >= rows) {
                isSuccess = false;
                break;
            }
        }

        // 끝까지 무사히 도달했다면 성공 카운트 증가
        if (isSuccess) {
            successCount++;
        }
    }

    return successCount;
}

// 테스트 케이스 실행
const grid = [
    [ 0,  0,  1, -1,  0],
    [-1,  1,  1, -1,  0],
    [ 0,  0,  1, -1,  0],
    [-1,  1, -1, -1,  0]
];

const result = countSuccessfulPaths(grid);
console.log(`끝까지 도달한 경로의 수: ${result}`); // 결과: 4