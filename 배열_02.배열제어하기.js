//02.배열 제어하기

var num_list = [4, 2, 2, 1, 3, 4];

//출력 [4,3,2,1]

var uniqarr = [... new Set(num_list)];

console.log(uniqarr.sort((a,b)=>b-a));