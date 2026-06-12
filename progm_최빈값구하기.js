//최빈값구하기

function solution(array) {
    //1단계 장부만들기
    let cntarr = {};

    for(let i of array){
        if(cntarr[i]){
            cntarr[i] +=1;
        }else{
            cntarr[i] =1;
        }
    }

    console.log("cntarr=",cntarr);

    //2단계 최고기록찾기
    let maxcount =0;

    for(let j in cntarr){
        if(cntarr[j] > maxcount){
            maxcount= cntarr[j];
        }
    }
    
    console.log("maxcount="+maxcount)
    //3단계 
    let mod = [];

    for(let key in cntarr){
        if(maxcount == cntarr[key]){
            mod.push(Number(key));
        }
    }

    return mod;

}

// 테스트용 배열을 넣고 함수를 실행해 봅니다.
console.log( solution([1, 2, 2, 2, 3, 3]) );

