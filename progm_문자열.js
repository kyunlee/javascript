/**
 * 1.문자열이 몇 번 등장하는지 세기
 */

//중첩된 경우도 포함하여 계산해야 하는지, 
//겹치지 않게 계산해야 하는지에 따라 접근 방식이 달라짐

//1-1) indexOf와 반복문을 사용하는 방식 (가장 권장) => 중첩된 경우 포함

function solution(myString, pat){
    let count = 0;
    let pos = myString.indexOf(pat);
    //console.log(pos);

    while(pos !== -1){
        count++;
        pos = myString.indexOf(pat, pos+1);
        //console.log(pos);
    }
    return count;
}

console.log(solution("banana","ana"));

//1-2) split을 활용하는 방식 (매우간결) =>중첩된 패턴 카운드 못함
function solution2(myString, pat){
    console.log(myString.split(pat));
    return myString.split(pat).length-1;
}

console.log(solution2("banana","ana"));
/***
 * 2. 정규식 표현 
 */

//2-1) 세개의 

function solution3(myStr) {
    var answer = myStr.split(/[abc]+/).filter((str)=> str!="");
    return answer.length == 0 ? ["EMPTY"] : answer;
}

console.log(solution3("baconlettucetomato"));

//문자열 묶기
function solution4(strArr){
    const lengthCnt = {};
    
    for(const s  of strArr){
        const len = s.length;
        //lengthCnt[len] = (lengthCnt[len] || 0)+1;
        if(lengthCnt[len] == undefined){
            lengthCnt[len] = 1;
        }else{
            lengthCnt[len] = lengthCnt[len]+1;
        }
    }

    return Math.max(...Object.values(lengthCnt));
}

console.log("solution4=",solution4(["a","bc","d","efg","hi"]));