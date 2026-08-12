//최소직사각형
function solution(sizes) {
    var maxLong = 0;
    var maxShort = 0;

    for(let i=0; i < sizes.length; i++){
        let x = sizes[i][0];
        let y = sizes[i][1];

        let log   = x > y ? x:y;
        let short = x > y ? y:x;

        if( log > maxLong ){
            maxLong = log;
        }

        if( short > maxShort){
            maxShort = short;
        }
    }

    return maxShort * maxLong;
}


console.log(solution([[60, 50], [30, 70], [60, 30], [80, 40]]));

