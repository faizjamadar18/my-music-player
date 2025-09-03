
async function main() {   // async function always returns a promise wich cannnot be directy used as output 

    let a = await fetch("songs.json");


    // Playing the songs present in your library on click : 
    const your_lib = document.querySelectorAll(".music1")
    const audioplayer = document.getElementById("audio-player")

    // playing the first song by default 
    audioplayer.src=your_lib[0].getAttribute("data-src")
    audioplayer.load()
    document.querySelector(".song-info").innerHTML = your_lib[0].getAttribute("data-src1")

    // clicking on your library songs 
    your_lib.forEach(gana => {
        gana.addEventListener("click", () => {
            let songsrc = gana.getAttribute("data-src")
            audioplayer.src = songsrc
            audioplayer.play()
            play.src = "imgs/pause.svg"
            document.querySelector(".song-info").innerHTML = gana.getAttribute("data-src1")
        });
    });

    // next and previous button: 
    let currentindex=0
    function laodsong(songindex){
        audioplayer.src=your_lib[songindex].getAttribute("data-src")
        document.querySelector(".song-info").innerHTML=your_lib[songindex].getAttribute("data-src1")
    }
    next.addEventListener("click",()=>{
        currentindex = (currentindex+1)%your_lib.length
        if(audioplayer.paused){
            laodsong(currentindex)
            audioplayer.pause()
        }
        else{
            laodsong(currentindex)
            audioplayer.play()
        }
    })
    previous.addEventListener("click",()=>{
        currentindex=(currentindex - 1 + your_lib.length)% your_lib.length
        if(audioplayer.paused){
            laodsong(currentindex)
            audioplayer.pause()
        }
        else{
            laodsong(currentindex)
            audioplayer.play()
        }
    })

    // Playing the songs present in your trending songs on click  : 
    const trendingsongs = document.querySelectorAll(".card1")
    trendingsongs.forEach(gana => {
        gana.addEventListener("click", () => {
            let songsrc = gana.getAttribute("data-src")
            audioplayer.src = songsrc
            audioplayer.play()
            play.src = "imgs/pause.svg"
            document.querySelector(".song-info").innerHTML = gana.getAttribute("data-src1")
        });
    });

    // controlling the play button in the playbar to pause and play the song 
    play.addEventListener("click", () => {
        if (audioplayer.paused) {
            audioplayer.play()
            play.src = "imgs/pause.svg"
        }
        else {
            audioplayer.pause()
            play.src = "imgs/playBtn.svg"
        }
    })

    function sec_to_min(second) {
        if(isNaN(second) || second<0){
            return "00:00"
        }
        let minute = Math.floor(second / 60)
        let sec = Math.floor(second % 60)
        return `${String(minute).padStart(2, "0")}:${String(sec).padStart(2, "0")}`          // Ensures the string has at least 2 characters.If it’s shorter, it adds "0" to the start.
    }
    audioplayer.addEventListener("timeupdate", () => {
        document.querySelector(".song-time").innerHTML = `${sec_to_min(audioplayer.currentTime)}/${sec_to_min(audioplayer.duration)}`
    })

    // Moving seek bar: 
    audioplayer.addEventListener("timeupdate",()=>{
        document.querySelector(".circle").style.left= (audioplayer.currentTime / audioplayer.duration)*100 + "%"
    })

    document.querySelector(".seekbar").addEventListener("click" , (e)=>{
        let percent = (e.offsetX/e.target.getBoundingClientRect().width) *100   // offsetX: total width of your click on seekbar 
        document.querySelector(".circle").style.left= percent + "%"
        audioplayer.currentTime = (audioplayer.duration*percent) / 100
    })

    document.querySelector(".hammburger").addEventListener("click" ,()=>{
        document.querySelector(".left").style.left=0
        document.querySelector(".plus").src= "imgs/cross.svg"
    })
    document.querySelector(".plus").addEventListener("click" ,()=>{
        document.querySelector(".left").style.left= "-100%"
        document.querySelector(".plus").src= "imgs/cross.svg"
    })
}
main()