//배열_07.방문길이
/*
1. 기본 상황 설정: 제한된 격자 공간
주인공의 위치: 주인공 캐릭터는 2차원 좌표 평면의 정중앙인 (0, 0) 위치에서 시작합니다.

공간의 한계: 이 좌표 평면은 무한하지 않습니다. X축과 Y축 모두 -5부터 5까지만 이동할 수 있는 닫힌 공간입니다.

2. 이동 규칙: 명령어와 벽
명령어는 문자열로 주어지며, 각 글자는 다음을 의미합니다.

U (Up): 위로 한 칸 이동 (Y좌표 + 1)
D (Down): 아래로 한 칸 이동 (Y좌표 - 1)
R (Right): 오른쪽으로 한 칸 이동 (X좌표 + 1)
L (Left): 왼쪽으로 한 칸 이동 (X좌표 - 1)
*/
/*
function solution(dirs){
    // 1. 이동할 방향에 따른 X, Y 변화량을 객체로 정의합니다.
    const move = {
          U : [0,1]
        , D : [0,-1]
        , R : [1,0]
        , L : [-1,0]
    }

    //2. 현재 위치 (0,0)과 지나간 길을 기록할 Set을 만듭니다.
    let nowX = 0;
    let nowY = 0;
    const visited = new Set();

    //3. 주어진 명령어(dirs)를 하나씩 확인합니다.
    for(const dir of dirs){
        const nextX = nowX + move[dir][0];
        const nextY = nowY + move[dir][1];
       
        console.log("nextX=" + nextX +"nextY=" +nextY);
        //4. 경계선(-5 ~ 5을 벗어나는 명령이면 무시하고 다음 명령으로 넘어감
        if(nextX < -5 || nextX > 5 || nextY <-5 || nextY >5){
            continue;
        }

        // 5. 이동한 길을 문자열로 만들어 기록장(Set)에 넣습니다. (왕복 모두 기록)
        // 예: "0,0 에서 0,1 로 갔다" -> "0001"
        const path1 =`${nowX}${nowY}${nextX}${nextY}`;
        const path2 =`${nextX}${nextY}${nowX}${nowY}`;

        console.log("path1=" + path1 +"path2=" +path2);

        visited.add(path1);
        visited.add(path2);

        console.log(visited);

        //6.캐리턱 위치를 방금 이동한 새위치로 업데이트
        nowX = nextX;
        nowY = nextY;

        
    }

    console.log(visited.size);
    return visited.size /2 ;

}
*/
//ULURRDLLU
function solution(dirs){
    const move = {
        U : [0,1],  //Y
        D : [0,-1], //Y
        R : [1,0],  //X
        L : [-1,0]  //X
    }

    let nowX = 0;
    let nowY = 0;

    var visited = new Set();

    for(let dir of dirs){

        const netX = nowX + move[dir][0];
        const netY = nowY + move[dir][1];

        if( netX < -5 || netX > 5 || netY < -5 || netY > 5){
            continue;
        }

        const path1 = `${nowX}${nowY}${netX}${netY}`;
        const path2 = `${netX}${netY}${nowX}${nowY}`;

        visited.add(path1);
        visited.add(path2);

        nowX = netX;
        nowY = netY;
    }

    return visited.size/2
}



// dirs      answer
// ULURRDLLU  7
// LULLLLLLU  7
console.log(solution("ULURRDLLU"));