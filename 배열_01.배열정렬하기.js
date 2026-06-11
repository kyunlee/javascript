//01.배열정렬하기
function solution(arr){

    //출력 [-5, 1, 2, 3, 4]

    arr.sort((a, b) => a - b);
    return arr;
}


console.log(solution([1, -5, 2, 4, 3]));
