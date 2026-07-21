// 7/21

function solution(phone_book) {

    phone_book.sort();

    console.log(phone_book)
    let len = phone_book.length;

    for(let i=0; i < len-1; i++){
        if(phone_book[i+1].startsWith(phone_book[i])){
            return false;
        }
    }
    return  answer = true;
;
}


console.log(solution(["119", "97674223", "1195524421"]));