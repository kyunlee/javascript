//프로세스

function solution(priorities, location) {

    //1.인덱스와 우선순위를 묶어서관리 하는 방법
    let que = priorities.map((p,i) => [i,p]);
    console.log("que",que);
    let count = 0; //실행된 프로세스 순서

    while (que.length >  0){
        let current = que.shift();
        console.log("current",current);

        let priority = que.some(item=> item[1] > current[1] );
        console.log("priority",priority);

        if(priority){
            que.push(current);
            console.log("que2",que)
        }else{
            count++;

            if( current[0] == location ){
                return count;
            }
        }
    }
}


console.log(solution([2, 1, 3, 2],2)); // 1
console.log(solution([1, 1, 9, 1, 1, 1],0)); // 5