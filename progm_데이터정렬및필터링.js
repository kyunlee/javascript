function solution(rank, attendance){

    const availStudents = rank.map((r,i) =>({id:i, rank:r}))
                              .filter((_,i) => attendance[i]);

    availStudents.sort((a,b) => a.rank - b.rank);

    const [a,b,c]=[availStudents[0].id,
                   availStudents[1].id,
                   availStudents[2].id 
                ];

    return 10000*a + 100*b + c;
}

console.log(solution( [3, 7, 2, 5, 4, 6, 1], [false, true, true, true, true, false, false]));
