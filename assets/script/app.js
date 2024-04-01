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

let timer = 10;
function timeCount() {
    const timed = setInterval(() => {
        userInput.disabled = false;
        if (timer === -1) {
            wordDisplay.innerText = 'Time\'s Up!!!';
            wordDisplay.style.color = 'red';
            userInput.disabled = true;
            clearInterval(timed);
            return;
        } else {
            timeDisplay.innerText = timer;
            timer--;
        }
    }, 1000);
}

function setRandomWord() {
    const randomIndex = Math.floor(Math.random() * copyWordBank.length);
    randomWord = copyWordBank[randomIndex];
    copyWordBank.splice(randomIndex, 1);
    wordDisplay.innerText = randomWord;
    return randomWord;
}

// function displayWord() {
//     wordDisplay.innerText = randomWord;
    
//     setTimeout(() => {
//         displayWord();
//     }, 1000);
// }

function clearInput() {
    userInput.value = '';
}

function checkInput() {
    if (randomWord === userInput.value) {
        correctSound.play();
        hits++;
        userHits.innerText = hits;
        clearInput();
        setRandomWord();
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
    }
}

listen('click', startButton, function() {
    restartGame(); // Reset Game


    timeCount();
    setRandomWord();
    // displayWord();
    startSound.play();
    resetButton();
});

listen('input', userInput, function() {
    checkInput();
});