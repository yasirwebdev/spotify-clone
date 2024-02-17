// initializing the variables
let trackIndex = 0;
let audioElement = new Audio('/songs/1.mp3');
let masterPlay = document.getElementById('master-play');
let myProgressBar = document.getElementById('my-progress-bar');
let playing = document.getElementById('playing');
let trackItem = document.getElementsByClassName('track-item');

let trackList = [
  {trackName: 'track 1', filePath: '/songs/1.mp3', coverPath: '/covers/1.jpg'},
  {trackName: 'track 2', filePath: '/songs/2.mp3', coverPath: '/covers/3.jpg'},
  {trackName: 'track 3', filePath: '/songs/3.mp3', coverPath: '/covers/3.jpg'},
  {trackName: 'track 4', filePath: '/songs/4.mp3', coverPath: '/covers/4.jpg'},
  {trackName: 'track 5', filePath: '/songs/5.mp3', coverPath: '/covers/5.jpg'},
  {trackName: 'track 6', filePath: '/songs/6.mp3', coverPath: '/covers/6.jpg'},
  {trackName: 'track 7', filePath: '/songs/7.mp3', coverPath: '/covers/7.jpg'},
  {trackName: 'track 8', filePath: '/songs/8.mp3', coverPath: '/covers/8.jpg'},
  {trackName: 'track 9', filePath: '/songs/9.mp3', coverPath: '/covers/9.jpg'},
  {trackName: 'track 10', filePath: '/songs/10.mp3', coverPath: '/covers/10.jpg'}
];

// trackItem.forEach(element => {
//   element.getElementsByTagName('');
// });

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
  console.log('timeupdate');

  // Handle Seekbar
  let progress = parseFloat((audioElement.currentTime/audioElement.duration)*100);
  console.log(progress);
  myProgressBar.value = progress;
});

myProgressBar.addEventListener('change', () =>{
  audioElement.currentTime = (audioElement.duration * myProgressBar.value)/100;
});