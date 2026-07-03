//K번째수

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

console.log(solution([1,5,2,6,3,7,4],[[2, 5, 3], [4, 4, 1], [1, 7, 3]]));