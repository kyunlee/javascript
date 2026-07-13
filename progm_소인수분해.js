

function solution(n) {

    var array = [];
    let i = 2;

    while(n>1){ 
        if( n%i === 0){
            array.push(i);
            n=n/i;
        }else{
            i++
        }
    }
    return [...new Set(array)];
}

// 테스트 실행
console.log(solution(12));  // [2, 2, 3]
console.log(solution(315)); // [3, 3, 5, 7]