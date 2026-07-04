//02.배열 제어하기 -전체 중복제거
function solution(arr){

    var uniquearr = [...new Set(arr)];
    return uniquearr;
}


console.log(solution([4, 2, 2, 1, 3, 4]));  //[ 4, 2, 1, 3 ]
