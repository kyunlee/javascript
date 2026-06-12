//1번 수포자 : 1,2,3,4,5,| 1,2,3,4,5 ....
//2번 수포자 : 2,1,2,3,2,4,2,5,| 2,1,2,3,2,4,2,5, ....
//3번 수포자 : 3,3,1,1,2,2,4,4,5,5, |3,3,1,1,2,2,4,4,5,5, ....

// [1,2,3,4,5] [1]
// [1,3,2,4,2] [1,2,3]

function solution(answers){
    const patterns = [
        [1, 2, 3, 4, 5],
        [2, 1, 2, 3, 2, 4, 2, 5],
        [3, 3, 1, 1, 2, 2, 4, 4, 5, 5,],
    ];

    const scores = [0,0,0];

    for( const [i,answer] of answers.entries() ){
        for( const [j,patten] of patterns.entries() ){
            if(answer == patten[i%patten.length]){
                scores[j] += 1;
            }
        }
    }

    const higscore = Math.max(...scores);
    const higscorereturn = []

    for(let i=0; i<scores.length; i++){
        if(higscore == scores[i])
        {
            higscorereturn.push(i+1);
        }
    }

    return higscorereturn;
}

console.log(solution([1,2,3,4,5])); //[1];
console.log(solution([1,3,2,4,2])); //[1,2,3];
