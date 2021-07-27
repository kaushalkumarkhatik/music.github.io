const music = document.querySelector("audio");
const img = document.querySelector("img");
const play = document.getElementById('play');
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
let  progress = document.getElementById('progress');
let total_duration = document.getElementById("duration");
let current_time = document.getElementById("current_time");
const progressDiv = document.getElementById("progressDiv");


//data
const songs = [{
  name: "kk1",
  title: "Lotus Lane",
  artist: "the loyalist",
},
  {
    name: "kk2",
    title: "sappherios",
    artist: "Aurora",
  },

  {
    name: "kk3",
    title: "Walking Firiri",
    artist: "Gorkhali Takma",
  }]






let isplaying = false;
//play function
const playMusic = ()=> {
  isplaying = true;
  music.play()
  play.classList.replace("fa-play", "fa-pause");
  img.classList.add("anime");

}
//function pause
const pauseMusic = ()=> {
  isplaying = false;
  music.pause()
  play.classList.replace("fa-pause", "fa-play");
  img.classList.remove("anime");

}


play.addEventListener("click", ()=> {
  isplaying ? pauseMusic(): playMusic();

})



//change music data
const loadSong = (songs)=> {
  title.textContent = songs.title;
  artist.textContent = songs.artist;
  music.src = `music/${songs.name}.mp3`;
  img.src = `images/${songs.name}.jpg`;

}

songIndex = 0;
//loadSong(songs[0]);

const nextSong = ()=> {
  songIndex = (songIndex+1) % songs.length;
  loadSong(songs[songIndex]);
  playMusic()
}
const prevSong = ()=> {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songs[songIndex]);
  playMusic()
}

//prgress  work




music.addEventListener("timeupdate", (event)=> {
  const {
    currentTime, duration
  } = event.srcElement;
  let progress_time = (currentTime/duration)*100;
  progress.style.width = `${progress_time}%`;
  //duration
  let min_duration = Math.floor(duration/60);
  let sec_duration = Math.floor(duration % 60);

  let tot_duration = `${min_duration}:${sec_duration}`;

  if (duration) {
    total_duration.textContent = `${tot_duration}`;
  }

  //current time duration
  let min_currenTime = Math.floor(currentTime/60);
  let sec_currentTime = Math.floor(currentTime % 60);


  if (sec_currentTime < 10) {
    sec_currentTime = `0${sec_currentTime}`
  }
  let tot_currentTime = `${min_currenTime}:${sec_currentTime}`;
  current_time.textContent = `${tot_currentTime}`;

})

//progress click
progressDiv.addEventListener("click", (event)=> {
  const {
    duration
  } = music;

  let move_progress = (event.offsetX /event.srcElement.clientWidth) *duration;

  music.currentTime = move_progress;

})

//auto next song
music.addEventListener("ended", nextSong)

next.addEventListener("click", nextSong);
prev.addEventListener("click", prevSong);

