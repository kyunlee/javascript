//["classic", "pop", "classic", "classic", "pop"],[500, 600, 150, 800, 2500]

function solution(genres, plays) {
    
    //1.상태관리를 위한 독립된 두 개의 Map 초기화
    const totalPlayMap = new Map();
    const songMap = new Map();

    //[V8 최적화] 고차 함수 대신 일반 for문 사용하여 Call Stack 오버헤드 방지
    const len = genres.length;

    for(let i=0; i < len; i++){
        const genre = genres[i];
        const play = plays[i];

        //장르별 누적 재생횟수 집계
        totalPlayMap.set(genre, (totalPlayMap.get(genre)||0)+play);
        console.log("totalPlayMap = ", [...totalPlayMap]);

        //장르별 곡 정보 리스크
        if( !songMap.has(genre) ){
            songMap.set(genre, [] );
        }
        songMap.get(genre).push({id:i, play: play});

        console.log("songMap = ",[...songMap]);
    }

    const answer = [];
    console.log("totalPlayMap = ",[...totalPlayMap.entries()]);
    //2.Map 이터레이터를 활용한 배열 변환 및 장르 정렬 O (G log G)
    const sortedGenres = [...totalPlayMap.entries()].sort((a,b) => b[1] - a[1]) //Value(총 재생수) 기준 내림차순 정려
                                                    .map(entry => entry[0]); //정렬된 장르 이름(key)만 추출

    //3.장르 내부의 곡 정렬 및 Top 2 추출 O(N log N)
    for(let i=0; i < sortedGenres.length; i++){
        const genre = sortedGenres[i];
        const songs = songMap.get(genre);

        //조건 2$3: 재생수 내림차순, 동일하면 고유번호(id) 오름차순
        //In-Place 정렬을 통해 추각적인 메모리 할당 최소화
        songs.sort((a,b)=>{
            if( a.play == b.play){
                return a.i - b.id;
            }
            return b.play - a.play;
        });

        //최대 2개 곡 추출
        answer.push(songs[0].id);
        if(songs.length > 1){
            answer.push(songs[1].id);
        }
    }

    return answer;
}

console.log(solution(["classic", "pop", "classic", "classic", "pop"],[500, 600, 150, 800, 2500]));

function solution2(genres, plays) {
    const totalPlayMap = new Map();
    const songMap = new Map();

    const len = genres.length;
    for(let i = 0; i < len; i++) {
        const genre = genres[i];
        const play = plays[i];

        totalPlayMap.set(genre, (totalPlayMap.get(genre) || 0) + play);

        if(!songMap.has(genre)){
            songMap.set(genre,[]);
        }
        songMap.get(genre).push({id:i, play:play});
    }

    const answer = [];
    const sortedGenres = [...totalPlayMap.entries()].sort((a,b) => b[1] -a[1])
                                                    .map(entry => entry[0]);

    for(let i = 0; i < sortedGenres.length; i++){
        const genre = sortedGenres[i];
        const songs = songMap.get(genre);

        songs.sort((a,b) => {
            if(a.play == b.play){
                return a.id - bid;
            }
            return a.id - b.id;
        });

        answer.push(songs[0].id);
        if(songs.length > 1){
            answer.push(songs[1].id);
        }
    }

    return answer;
}