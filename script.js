// initializing the variables
let trackIndex = 0;
let audioElement = new Audio('/songs/1.mp3');
// let audioElement = new Audio('');
let masterPlay = document.getElementById('master-play');
let myProgressBar = document.getElementById('my-progress-bar');
let playing = document.getElementById('playing');
let trackItem = Array.from(document.getElementsByClassName('track-item'));
let masterTrackName = document.getElementById('master-track-name');

let trackList = [
  {trackName: 'track 1', filePath: '/songs/1.mp3', coverPath: '/covers/1.jpg'},
  {trackName: 'track 2', filePath: '/songs/2.mp3', coverPath: '/covers/2.jpg'},
  {trackName: 'track 3', filePath: '/songs/3.mp3', coverPath: '/covers/3.jpg'},
  {trackName: 'track 4', filePath: '/songs/4.mp3', coverPath: '/covers/4.jpg'},
  {trackName: 'track 5', filePath: '/songs/5.mp3', coverPath: '/covers/5.jpg'},
  {trackName: 'track 6', filePath: '/songs/6.mp3', coverPath: '/covers/6.jpg'},
  {trackName: 'track 7', filePath: '/songs/7.mp3', coverPath: '/covers/7.jpg'},
  {trackName: 'track 8', filePath: '/songs/8.mp3', coverPath: '/covers/8.jpg'},
  {trackName: 'track 9', filePath: '/songs/9.mp3', coverPath: '/covers/9.jpg'},
  {trackName: 'track 10', filePath: '/songs/10.mp3', coverPath: '/covers/10.jpg'}
]

trackItem.forEach((element, i) => {
  element.getElementsByTagName('img')[0].src = trackList[i].coverPath;
  element.getElementsByClassName('track-name')[0].innerText = trackList[i].trackName;
});

// handle play pause click
masterPlay.addEventListener('click', () =>{
  if(audioElement.paused || audioElement.currentTime <= 0){
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    playing.style.opacity = 1;
  }else{
    audioElement.pause();
    masterPlay.classList.remove('fa-circle-pause');
    masterPlay.classList.add('fa-circle-play');
    playing.style.opacity = 0;
  }
});

// listen to event
audioElement.addEventListener('timeupdate', () =>{
  // console.log('timeupdate');

  // Handle Seekbar
  let progress = parseFloat((audioElement.currentTime/audioElement.duration)*100);
  // console.log(progress);
  myProgressBar.value = progress;
});

// Handle Seekbar Change
myProgressBar.addEventListener('change', () =>{
  audioElement.currentTime = (audioElement.duration * myProgressBar.value)/100;
});

const makeAllPlay = ()=>{
  Array.from(document.getElementsByClassName('track-item-play')).forEach((element)=>{
    element.classList.remove('fa-circle-pause');
    element.classList.add('fa-circle-play');
    playing.style.opacity = 0;    
  })
};

// handle playbutton for every track individual
Array.from(document.getElementsByClassName('track-item-play')).forEach((element)=>{
  element.addEventListener('click', (e)=>{
    // console.log(e.target);
    makeAllPlay();
    trackIndex = parseInt(e.target.id);
    // console.log(trackIndex);
    
    if(audioElement.paused || audioElement.currentTime <= 0){
      console.log('clicked to play');
      e.target.classList.remove('fa-circle-play');
      e.target.classList.add('fa-circle-pause');
      audioElement.src = `/songs/${trackIndex}.mp3`;    
      masterTrackName.innerText = trackList[trackIndex-1].trackName;
      audioElement.currentTime = 0;
      audioElement.play();
      playing.style.opacity = 1;
      masterPlay.classList.remove('fa-circle-play');
      masterPlay.classList.add('fa-circle-pause');
    }else{
      console.log('clicked to pause');
      e.target.classList.remove('fa-circle-pause');
      e.target.classList.add('fa-circle-play');
      masterPlay.classList.remove('fa-circle-play');
      masterPlay.classList.add('fa-circle-pause');
      audioElement.pause();
      playing.style.opacity = 0;
    }
  })
});

// handle next and Previus Button
document.getElementById('next').addEventListener('click', () =>{
  if(trackIndex < trackList.length){
    trackIndex += 1;
  }else if(trackIndex >= trackList.length){
    trackIndex = 1;
  }
  makeAllPlay();  
  masterTrackName.innerText = trackList[trackIndex-1].trackName;
  audioElement.src = `/songs/${trackIndex}.mp3`;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove('fa-circle-play');
  masterPlay.classList.add('fa-circle-pause');
  playing.style.opacity = 1;
});

document.getElementById('previus').addEventListener('click', () =>{
  if(trackIndex > 1){
    trackIndex -= 1;
  }else if(trackIndex == 1){
    trackIndex = parseInt(trackList.length);
  }
  makeAllPlay();
  audioElement.src = `/songs/${trackIndex}.mp3`;
  masterTrackName.innerText = trackList[trackIndex-1].trackName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove('fa-circle-play');
  masterPlay.classList.add('fa-circle-pause');
  playing.style.opacity = 1;
});