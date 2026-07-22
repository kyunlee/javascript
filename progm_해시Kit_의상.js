//의상
/**
 * 할인행사
 * 오픈 채팅방
 * 신고 결과받기
 * 메뉴 리뉴얼
 * 
 * 두괄식 미괄식
 */

function solution(clothes) {
    const map = new Map();

    for(let i=0; i < clothes.length; i++){
        let c = clothes[i][1];
        console.log(c);
        map.set(c,(map.get(c)||0)+1);
    }
    let cnt = 1;

    for(let count of map.values()){
        cnt = cnt * (count+1);
    }
    
    return cnt-1;

}



console.log(solution([["yellow_hat", "headgear"], ["blue_sunglasses", "eyewear"], ["green_turban", "headgear"]]));