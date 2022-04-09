//Global Contants
const cluePauseTime = 333; //how long to pause in between clues
const nextClueWaitTime = 1000; //how long to wait before starting playback of the clue sequence
//Global variables
var clueHoldTime = 400; //how long to hold each clue's light/sound
var pattern = [];
var clueLength = 10;
var progress = 0;
var gamePlaying = false;
var tonePlaying = false;
var volume = 0.5; //must be between 0.0 and 1.0
var guessCounter = 0;

function startGame() {
  progress = 0;
	 pattern = []; // reset so array doesn't get longer then 10 if we restart game
   for (var i =0; i < clueLength; i ++) {
      pattern.push(getRandomInt(5));
    }
    console.log('pattern: ' + pattern);
  gamePlaying = true;
  document.getElementById("startBtn").classList.add("hidden");
  document.getElementById("stopBtn").classList.remove("hidden");
  playClueSequence();
}
function stopGame() {
  //initialize game variables
  gamePlaying = false;
  // swap the Start and Stop buttons
  document.getElementById("startBtn").classList.remove("hidden");
  document.getElementById("stopBtn").classList.add("hidden");
}
// Sound Synthesis Functions
const freqMap = {
  1: 209.6,
  2: 265.6,
  3: 292.9,
  4: 344.2,
  5: 399.6,
  6: 440.6,
  7: 491,
  8: 530.2,
};
function playTone(btn, len) {
  o.frequency.value = freqMap[btn];
  g.gain.setTargetAtTime(volume, context.currentTime + 0.05, 0.025);
  context.resume();
  tonePlaying = true;
  setTimeout(function () {
    stopTone();
  }, len);
}
function startTone(btn) {
  if (!tonePlaying) {
    context.resume();
    o.frequency.value = freqMap[btn];
    g.gain.setTargetAtTime(volume, context.currentTime + 0.05, 0.025);
    context.resume();
    tonePlaying = true;
  }
}
function stopTone() {
  g.gain.setTargetAtTime(0, context.currentTime + 0.05, 0.025);
  tonePlaying = false;
}

// Page Initialization
// Init Sound Synthesizer
var AudioContext = window.AudioContext || window.webkitAudioContext;
var context = new AudioContext();
var o = context.createOscillator();
var g = context.createGain();
g.connect(context.destination);
g.gain.setValueAtTime(0, context.currentTime);
o.connect(g);
o.start(0);

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max) + 1);
}
function lightButton(btn) {
  document.getElementById("button" + btn).classList.add("lit");
}
function clearButton(btn) {
  document.getElementById("button" + btn).classList.remove("lit");
}
function playSingleClue(btn) {
  if (gamePlaying) {
    lightButton(btn);
    playTone(btn, clueHoldTime);
    setTimeout(clearButton, clueHoldTime, btn);
  }
}
function playClueSequence() {
  guessCounter = 0;
  context.resume();
  let delay = nextClueWaitTime; //set delay to initial wait time
  for (let i = 0; i <= progress; i++) {
    // for each clue that is revealed so far
    console.log("play single clue: " + pattern[i] + " in " + delay + "ms");
    setTimeout(playSingleClue, delay, pattern[i]); // set a timeout to play that clue
    delay += clueHoldTime;
    delay += cluePauseTime;
  }
}
function loseGame() {
  stopGame();
  alert("Game Over. You lost!");
}
function winGame() {
  stopGame();
  alert("Game Over. You won!");
}
function guess(btn) {
  console.log("user guessed: " + btn);

  if (!gamePlaying) {
    return;
  }
  // add game logic here
  if (pattern[guessCounter] == btn) {
    //Guess was correct!
    if (guessCounter == progress) {
      if (progress == pattern.length - 1) {
        //GAME OVER: WIN!
        winGame();
      } else {
        //Pattern correct. Add next segment
        progress++;
        playClueSequence();
      }
    } else {
      //so far so good... check the next guess
      guessCounter++;
    }
  } else {
    //Guess was incorrect
    //GAME OVER: LOSE!
    loseGame();
  }
}
document.getElementById("button1").onclick = function() {
    document.getElementById("cat").style.visibility = "visible";
}
document.getElementById("button2").onclick = function() {
    document.getElementById("sheep").style.visibility = "visible";
}
document.getElementById("button3").onclick = function() {
    document.getElementById("snake").style.visibility = "visible";
}
document.getElementById("button4").onclick = function() {
    document.getElementById("cow").style.visibility = "visible";
}
document.getElementById("button5").onclick = function() {
    document.getElementById("lion").style.visibility = "visible";
}
document.getElementById("button6").onclick = function() {
    document.getElementById("dog").style.visibility = "visible";
}
document.getElementById("button7").onclick = function() {
    document.getElementById("bear").style.visibility = "visible";
}
document.getElementById("button8").onclick = function() {
    document.getElementById("bird").style.visibility = "visible";
}
