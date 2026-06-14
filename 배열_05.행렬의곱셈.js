//행렬의 곱셈
//수학적 행렬 곱셈
// 배열 arr1 [ [1,4] ,          arr2 [ [3,3] ,
//            [3,2] ,                 [3,3] ]
//            [4,1] ] 
//    
/*
function solution(arr1, arr2) {
    let answer = [];

    // 1. arr1의 행(가로줄) 개수만큼 반복 (i)
    for (let i = 0; i < arr1.length; i++) {
        let row = []; // 새로운 행렬의 한 줄을 만들 빈 상자
        
        // 2. arr2의 열(세로줄) 개수만큼 반복 (j)
        for (let j = 0; j < arr2[0].length; j++) {
            let sum = 0; // 곱해서 더한 값을 저장할 변수
            
            // 3. 요소들을 하나씩 곱해서 누적하기 (k)
            for (let k = 0; k < arr1[0].length; k++) {
                console.log('ik='+i,k,'kj='+k,j);
                sum += arr1[i][k] * arr2[k][j]; 
            }
            
            // 한 칸의 계산이 끝났으니 row에 넣습니다.
            row.push(sum);
        }
        
        // 한 줄의 계산이 끝났으니 최종 정답 배열에 넣습니다.
        answer.push(row);
    }
    
    return answer;
}
*/

function solution(arr1, arr2) {
    let answer =[];

    for(let i=0; i < arr1.length; i++){
        let row =[];

        for(let j=0; j<arr2[0].length; j++){
            let sum = 0;
            
            for(let k=0; k<arr1[0].length; k++){
                sum += arr1[i][k] * arr2[k][j];
            }
            row.push(sum);
        }
        answer.push(row);
    }

    return answer;
}
const arr1 = [[1, 4], [3, 2], [4, 1]];
const arr2 = [[3, 3], [3, 3]];

console.log(solution(arr1, arr2));
// 출력: [[15, 15], [15, 15], [15, 15]]

