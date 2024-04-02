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
let timer = 99;
let timed;

function timeCount() {
  clearInterval(timed);
  timed = setInterval(() => {
    userInput.disabled = false;
    if (timer === -1) {
      wordDisplay.innerText = 'Time\'s Up!!!';
      wordDisplay.style.color = 'red';
      userInput.disabled = true;
      startSound.pause();
      startSound.currentTime = 0;
      return;
    } else {
      timeDisplay.innerText = timer;
      timer--;
      userInput.focus();
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

function checkInput() {
  if (randomWord === userInput.value.toLowerCase()) {
    correctSound.play();
    hits++;
    userHits.innerText = hits;
    clearInput();
    setRandomWord();
    userInput.style.borderColor = 'rgb(38 144 53)';
  } else {
    userInput.style.borderColor = 'red';
    const highlightedWord = highlightMatchedAlphabets(randomWord, userInput.value);
    wordDisplay.innerHTML = highlightedWord;
  }
}

function resetButton() {
  startButton.innerText = 'Restart';
  startButton.style.backgroundColor = 'red';
}

function restartGame() {
  if (startButton.innerText === 'Restart') {
    hits = 0;
    userHits.innerText = hits;
    timer = 99;
    timeDisplay.innerText = timer;
    wordDisplay.style.color = '#fff';
    clearInput();
    setRandomWord()
    startSound.play();
    startSound.currentTime = 0;
    userInput.focus();
  }
}

listen('click', startButton, function() {
  restartGame(); // Reset Game
  timeCount();
  setRandomWord();
  startSound.play();
  resetButton();
});

listen('input', userInput, function() {
  checkInput();
});

listen('focus', userInput, function() {
  userInput.style.borderColor = 'red';
});

listen('blur', userInput, function() {
  userInput.style.borderColor = 'rgb(48 23 193 / 0.6)';
});