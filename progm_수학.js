//배열의 길이를 2의 거듭제곱으로 만들기

function solution(arr){
    const n = arr.length;
    let targetLength = 1;

    while( targetLength < n){
        targetLength *= 2;
    }

    console.log("targetLength", targetLength);
    const zeros = new Array(targetLength -n).fill(0);

    return arr.concat(zeros);
}
 
console.log(solution([1, 2, 3, 4, 5, 6]));