
function solution(nums) {
    //1.내가 선택할 수 있는 최대 포켓몬 수 
    const maxPick = nums.length/2;

    //2.중복을 제거한 포켓몬의 종류 수 구하기
    //Set 객체를 사용하면 배열의 중복을 쉽게 제거할 수 있습니다.
    const uniqeTypes = new Set(nums).size;

    //3. 고를수 있는 포켓몬 수와 포켓몬 종류 수중 더작은값 반환
    return Math.min(maxPick , uniqeTypes);
}

//console.log(solution([3,1,2,3]));

// 7/21
function solution1(nums) {
    let A = nums.length/2;

    let B = new Set(nums).size;

    return Math.min(A,B);
}
console.log(solution1([3,1,2,3]));