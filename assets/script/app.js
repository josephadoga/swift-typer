import wordBank from '../data/word-bank.js';
import Score from './Score.js';
'use strict';

function listen(event, selector, callback) {
  return selector.addEventListener(event, callback);
}
 
function select(selector) {
  return document.querySelector(selector);
}

const timeDisplay = select('.time-display');
const startButton = select('.start-button');
const userInput = select('.word-input');
const wordDisplay = select('.word-display');
const userHits = select('.user-hits span');

const startSound = new Audio('./assets/audio/epic.mp3');
startSound.type = 'audio/mp3';

const correctSound = new Audio('./assets/audio/right-hit.mp3');
correctSound.type = 'audio/mp3';

const copyWordBank = [...wordBank];
let randomWord = '';
let hits = 0;
userInput.disabled = true;
let timer = 15;
let timed;

function calculatePercentage(number) {
    let percentage = (number / 90) * 100
    return percentage;
}

function timeCount() {
  clearInterval(timed);
  timed = setInterval(() => {
    userInput.disabled = false;
    if (timer === -1) {
      wordDisplay.innerText = 'Time\'s Up!!!';
      wordDisplay.style.color = 'red';
      userInput.placeholder = 'Click Start to play';
      userInput.disabled = true;
      startSound.pause();
      startSound.currentTime = 0;
      resetButton();
      clearInput();
      const score = new Score(new Date(), hits, calculatePercentage(hits)); // Initialized Class
      return;
    } else {
      timeDisplay.innerText = timer;
      timer--;
      userInput.focus();
      changeButton()
    }
  }, 1000);
}

function highlightMatchedAlphabets(word, userInput) {
  let highlightedWord = '';
  for (let i = 0; i < word.length; i++) {
    if (userInput[i] && word[i].toLowerCase() === userInput[i].toLowerCase()) {
      highlightedWord += `<span class="matched">${word[i]}</span>`;
    } else {
      highlightedWord += word[i];
    }
  }
  return highlightedWord;
}

function setRandomWord() {
  const randomIndex = Math.floor(Math.random() * copyWordBank.length);
  randomWord = copyWordBank[randomIndex];
  copyWordBank.splice(randomIndex, 1);
  const highlightedWord = highlightMatchedAlphabets(randomWord, userInput.value);
  wordDisplay.innerHTML = highlightedWord;
  return randomWord;
}

function clearInput() {
  userInput.value = '';
}

function validateHits() {
  if (hits < 10) {
    userHits.innerText = `Hits: 0${hits}`;
  } else {
    userHits.innerText = `Hits: ${hits}`;
  } 
}

function checkInput() {
  if (randomWord === userInput.value.toLowerCase()) {
    correctSound.play();
    hits++;
    validateHits();
    clearInput();
    setRandomWord();
    userInput.style.borderColor = 'rgb(38 144 53)';
  } else {
    userInput.style.borderColor = '#ff0000';
    const highlightedWord = highlightMatchedAlphabets(randomWord, userInput.value);
    wordDisplay.innerHTML = highlightedWord;
  }
}

function resetButton() {
  startButton.innerText = 'Start';
  startButton.style.backgroundColor = 'rgb(211 4 248)';
}

function changeButton() {
  startButton.innerText = 'Restart';
  startButton.style.backgroundColor = '#ff0000';
}

function restartGame() {
  timer = 15;
  wordDisplay.style.color = '#fff';
  timeDisplay.innerText = timer;
  if (startButton.innerText === 'Restart') {
    hits = 0;
    validateHits();
    clearInput();
    setRandomWord();
    startSound.play();
    startSound.currentTime = 0;
    userInput.focus();
  }
}

listen('click', startButton, function() {
  timeCount();
  restartGame();
  userInput.placeholder = 'Enter word here';
  setRandomWord();
  startSound.play();
  changeButton();
  hits = 0;
  validateHits();
});


listen('input', userInput, function() {
  checkInput();
});

listen('focus', userInput, function() {
  userInput.style.borderColor = '#ff0000';
});

listen('blur', userInput, function() {
  userInput.style.borderColor = 'rgb(48 23 193 / 0.6)';
});