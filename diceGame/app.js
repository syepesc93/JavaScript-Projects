'use strict'
/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


// creating global variables
var scores = [0, 0];
var roundScore = 0;
var activePlayer = 0;

// initializing web site values
document.querySelector('.dice').style.display = 'none';
document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';

// adding functionality to 'roll dice' button
document.querySelector('.btn-roll').addEventListener('click', function() {

    // 1. generate a random number
    var dice = Math.floor(Math.random() * 6) + 1;

    // 2. display result
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';

    // 3. update the round score and dice image
    if (dice !== 1) {
        // add score
        roundScore += dice;

        // change dice image
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
        // next player
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0; // if statement simplify (ternary operator)

        // update round score
        roundScore = 0;
        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';

        // update active player css styles
        document.querySelector('.player-0-panel').classList.toggle('active'); // toggles between active the class or not
        document.querySelector('.player-1-panel').classList.toggle('active');
        document.querySelector('.dice').style.display = 'none';
    }

    // adding functionality to 'hold' button

});