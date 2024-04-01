import wordBank from '../data/word-bank.js';
import Score from './Score.js';
'use strict';

function listen(event, selector, callback) {
    return selector.addEventListener(event, callback);
}
 
function select(selector) {
    return document.querySelector(selector);
}