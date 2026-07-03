/*
arr	                         queries	          result
[0, 1, 2, 4, 3]	[[0, 4, 2],[0, 3, 2],[0, 2, 2]]	[3, 4, -1]
*/
/*
function solution(arr, queries) {

    return queries.map(([s,e,k]) => {
        
        const onarr = arr.slice(s,e+1);
        
        const twoarr = onarr.filter((n)=> n > k);

        if( twoarr.length == 0){
            return -1;
        }else{
            return Math.min(...twoarr);
        }

    });

}
*/
//console.log(solution([0, 1, 2, 4, 3],[[0, 4, 2],[0, 3, 2],[0, 2, 2]]));

function solution(array) {
   
    console.log(array.join('').split('7'));
    return array.join('').split('7').length-1;
}

console.log(solution([7]));