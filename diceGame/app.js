'use strict'
/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


////////// init web site
window.addEventListener('load', initializeWebPage);

////////// web site functionality
// adding functionality to 'roll dice' button
document.querySelector('.btn-roll').addEventListener('click', function() {
    // determine if game is playing
    if (gamePlaying) {
        // 1. generate a random number
        var dice = Math.floor(Math.random() * 6) + 1;

        // 2. display result - change dice image
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        // 3. update the round score and dice image
        if (dice !== 1) {
            // add score
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            // next player
            nextPlayer();
        }
    }
});

// adding functionality to 'hold' button
document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        // add current score to global score
        scores[activePlayer] += roundScore;

        // update UI
        document.querySelector('#socre' + activePlayer).textContent = scores[activePlayer];
        nextPlayer();

        // check if player won the game
        if (scores[activePlayer] >= 100) {
            document.querySelector('.player-' + activePlayer + '0-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '0-panel').classList.remove('remove');
        } else {
            nextPlayer();
            gamePlaying = false;
        }
    } else {
        // next player
        nextPlayer;
    }
});

// adding functionality to the 'new game' button
document.querySelector('btn-new').addEventListener('click', initializeWebPage);


////////// methods - functions
function initializeWebPage() {
    // creating global variables
    var scores = [0, 0];
    var roundScore = 0;
    var activePlayer = 0;
    var gamePlaying = true;

    // setting up the 'board of the game'
    document.querySelector('.dice').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    // setting player names
    document.querySelector('name-0').textContent = 'PLAYER 1';
    document.querySelector('name-1').textContent = 'PLAYER 1';

    document.querySelector('player-0-panel').classList.remove('winner');
    document.querySelector('player-1-panel').classList.remove('active');
    document.querySelector('player-0-panel').classList.remove('winner');
    document.querySelector('player-1-panel').classList.remove('active');
    document.querySelector('player-0-panel').classList.add('active');
};

function nextPlayer() {
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
};