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

const copyWordBank = [...wordBank];
let randomWord = '';
let hits = 0;

let timer = 99;
function timeCount() {
    setInterval(() => {
        if (timer < 0) {
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

function clearInput() {
    userInput.value = '';
}

function checkInput() {
    if (randomWord === userInput.value) {
        hits++;
        userHits.innerText = hits;
        clearInput();
        setRandomWord();
    }
}

function resetButton() {
    startButton.value = 'Restart';
    startButton.style.backgroundColor = 'red';
}

listen('click', startButton, function() {
    timeCount();
    setRandomWord();
});

listen('input', userInput, function() {
    checkInput();
});