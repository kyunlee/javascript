// 전체 중복 제거
// [...new Set(arr)] (예: [1, 2, 1] -> [1, 2])
/*
function solution(arr)
{
    
    return [...new Set(arr)];
}


console.log(solution([1,1,3,3,0,1,1]));
*/

// 스택/큐> 같은 숫자는 싫어
// 연속 중복 제거

function solution(arr)
{
    return arr.filter((a,index)=> a != arr[index-1] );
}

console.log(solution([1,1,3,3,0,1,1]));