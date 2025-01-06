const soundKey = {
    q: "sounds/crash.mp3",
    w: "sounds/kick-bass.mp3",
    e: "sounds/snare.mp3",
    p: "sounds/tom-1.mp3",
    o: "sounds/tom-2.mp3",
    i: "sounds/tom-3.mp3",
    u: "sounds/tom-4.mp3",
    // Piano sounds (add 15 piano sounds)
    a: "sounds/a.mp3",
    s: "sounds/s.mp3",
    d: "sounds/d.mp3",
    f: "sounds/f.mp3",
    g: "sounds/g.mp3",
    l: "sounds/l.mp3",
    k: "sounds/k.mp3",
    j: "sounds/j.mp3",
    h: "sounds/h.mp3",
    m: "sounds/m.mp3",
    z: "sounds/z.mp3",
    x: "sounds/x.mp3",
    v: "sounds/v.mp3",
    c: "sounds/c.mp3",
    b: "sounds/b.mp3",
};

function playSound(key) {
    const audioFile = soundKey[key];
    if (audioFile) {
        const audio = new Audio(audioFile);
        audio.play();
        buttonAnimation(key);
    } else {
        console.log("No audio for this");
    }
}

function buttonAnimation(key) {
    const button = document.querySelector(`.${key}`);
    if (button) {
        button.classList.add("pressed");
        setTimeout(() => button.classList.remove("pressed"), 100);
    }
}


document.querySelectorAll(".drum, .piano").forEach((button) => {
    button.addEventListener("click", () => {
        const key = button.classList[0];
        playSound(key);
    });
});

document.addEventListener("keydown", (event) => {
    playSound(event.key);
});

const songs = [
    { title: "7 Years", src: "sounds/7Years.mp3" },
    { title: "Thousand Years", src: "sounds/ThousandYears.mp3" },
    { title: "The Hanging Trees", src: "sounds/TheHangingTree.mp3" },
];

const songList = document.getElementById("songList");
const playButton = document.getElementById("play");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const progressBar = document.getElementById("progressBar");

let currentIndex = 0;
let audio = new Audio(songs[currentIndex].src);

// Populate song list
songs.forEach((song, index) => {
    const songItem = document.createElement("div");
    songItem.className = "song-item";
    songItem.textContent = song.title;
    songItem.addEventListener("click", () => playSong(index));
    songList.appendChild(songItem);
});

// Play or pause the song
playButton.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
        audio.volume = 0.;
        playButton.textContent = "⏸";
    } else {
        audio.pause();
        playButton.textContent = "▶️";
    }
});

// Play the previous song
prevButton.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + songs.length) % songs.length;
    playSong(currentIndex);
});

// Play the next song
nextButton.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % songs.length;
    playSong(currentIndex);
});

// Play a specific song
function playSong(index) {
    audio.src = songs[index].src;
    audio.play();
    playButton.textContent = "⏸";
    currentIndex = index;
}

// Update progress bar
audio.addEventListener("timeupdate", () => {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = `${progress}%`;
});

// Reset progress bar on song end
audio.addEventListener("ended", () => {
    playButton.textContent = "▶️";
    progressBar.style.width = "0%";
});
