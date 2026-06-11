
function solution(arr){
    var answer = [];
    for(let i=0; i < arr.length ; i++ ){
        for(let j=0; j <i; j++){
            answer.push(arr[i]+arr[j]);
            //console.log("answer ="+ i+" "+j+" " + answer);
        }
    }
    
    return [...new Set(answer)].sort((a,b)=> a-b);
}

console.log(solution([2,1,3,4,1])); //[2,3,4,5,6,7];
console.log(solution([5,0,2,7]));   //[2,5,7,9,12];
