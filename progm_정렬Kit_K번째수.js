//K번째수
/* 내가 푼 소스
function solution(array, commands) {
    var answer = [];
    var temp = [];
    commands.map(([i,j,k])=>{
        console.log(i,j,k)

        temp = array.slice(i-1,j);
        temp.sort((a,b)=>a-b);
        console.log(temp);
        answer.push(temp[k-1]);
    });

    
    return answer;
}
*/
// AI
function solution(array, commands) {

    return commands.map(([i,j,k])=>{
        
        return array.slice(i-1,j).sort((a,b)=>a-b)[k-1];

    });

}


//console.log(solution([1,5,2,6,3,7,4],[[2, 5, 3], [4, 4, 1], [1, 7, 3]]));


function solution2(array, commands) {
    
}
console.log(solution2([1,5,2,6,3,7,4],[[2, 5, 3], [4, 4, 1], [1, 7, 3]]));