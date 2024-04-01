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

listen('click', startButton, function() {
    timeCount();
});