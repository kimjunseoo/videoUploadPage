const video = document.querySelector("video");
const playBtn = document.getElementById("playNstop")
const muteBtn = document.getElementById("muteNunmute")
const volumeRange = document.getElementById("volume")
const currenTime = document.getElementById("currenTime");
const totalTime = document.getElementById("totalTime");
const timeline = document.getElementById("timeline");
const fullScreenBtn = document.getElementById("fullScreenBtn");
const videoContainer = document.getElementById("videoContainer");
const videocontrols = document.getElementById("videoControls");

let controlsMovementTimeout = null;
let controlsTimeout = null;
let volume = 0.5;
video.volume = volume;

const handlePlayClick = (e) => {
    if(video.paused){
        video.play();
        playBtn.innerText = "Stop";
    } else {
        video.pause();
        playBtn.innerText = "Play";
    }
};

const handleMute = (e) => {
    if(video.muted){
        video.muted = false;
        muteBtn.innerText = "Mute"
    } else {
        video.muted = true;
    }
    muteBtn.innerText = video.muted ? "Unmute" : "Mute";
    volumeRange.value = video.muted ? 0 : 0.5;
};



const handleVolumeChange = (e) => {
    const {target: {value }} = e;
    if(video.muted){
        video.muted = false;
        muteBtn.innerText = "Mute";
    }
    volume = value;
    video.volume = value;
}

const formatTime = (seconds) => {
    return new Date(seconds * 1000).toISOString().substring(11, 19);
}

const handleLoadedMetaData = () => {
    totalTime.innerText = formatTime(Math.floor(video.duration));
    timeline.max = Math.floor(video.duration);
};

const handleTimeUpdate = () => {
    currenTime.innerText = formatTime(Math.floor(video.currentTime));
    timeline.value = Math.floor(video.currentTime);
}

const handleTimeLineChange = (event) => {
    const value = event.target.value;
    video.currentTime = value;
}
const handleFullScreenBtn = () => {
    const fullscreen = document.fullscreenElement;
    if (fullscreen) {
        document.exitFullscreen();
        fullScreenBtn.innerText = "Exit Full Screen";
    } else {
        videoContainer.requestFullscreen();
        fullScreenBtn.innerText = "Exit Full Screen";
    }
}

const hideControls = () => videocontrols.classList.remove("showing");


const handleMouseMove = () => {
    if(controlsTimeout) {
        clearTimeout(controlsTimeout);
        controlsTimeout = null;
    }
    if(controlsMovementTimeout){
        clearTimeout(controlsMovementTimeout);
        controlsMovementTimeout = null;
    }
    videocontrols.classList.add("showing");
    controlsMovementTimeout = setTimeout(hideControls, 3000);
};

const handleMouseLeave = () => {
    controlsTimeout = setTimeout(hideControls, 3000);
};

playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMute);
volumeRange.addEventListener("change", handleVolumeChange);
video.addEventListener("loadedmetadata", handleLoadedMetaData);
video.addEventListener("timeupdate", handleTimeUpdate);
timeline.addEventListener("input", handleTimeLineChange);
fullScreenBtn.addEventListener("click", handleFullScreenBtn);
video.addEventListener("mousemove", handleMouseMove);
video.addEventListener("mouseleave", handleMouseLeave);