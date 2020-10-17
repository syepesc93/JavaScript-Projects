/*
V 1.1.0
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/


/*
V 1.1.1

CHANGES ON JS:
ADDED 3 NEW RULES:

1. A player looses his ENTIRE score when he rolls two 6 in a row.After that, it 's the next player'
s turn.(Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100.(Hint: you can read that value with the.value property in JavaScript.This is a good oportunity to use google to figure this out: )
3. Add another dice to the game, so that there are two dices now.The player looses his current score when one of them is a 1.(Hint: you will need CSS to position the second dice, so take a look at the CSS code
    for the first one.)

CHANGES ON HTML:
 -added new input to set final score. -
    added new dice: dice2.


CHANGES ON CSS:
-added styles for new input created on HTML. 
- Added styles for dice2.
*/


/*
V 1.1.2
CHANGES ON JS:
- Display messages on every game action.
- bug fixes on winner display panel

CHANGES ON HTML:
- Added <p> tag for messages on each player panel to display actions for each roll dice.


CHANGES ON CSS:
- Style the new <p> tags.
*/

// initialize web site
var scores, roundScore, activePlayer, gamePlaying, lastDiceValue, lastDice2Value;
init();


// web button functionalities
document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gamePlaying) {
        // 1. Random number
        var dice = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;

        // 2. Display the result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';
        var dice2DOM = document.querySelector('.dice2');
        dice2DOM.style.display = 'block';
        dice2DOM.src = 'dice-' + dice2 + '.png';

        // 3. Check GAME RULES
        if (dice == 1 || dice2 == 1) {
            document.getElementById('message-' + activePlayer).innerHTML = "";
            document.getElementById('message-' + activePlayer).innerHTML += "<strong>Player just hit a 1:</strong><br><br>- Loses current round score<br>- Loses turn";
            nextPlayer()
        } else if ((lastDiceValue == 6 || lastDice2Value == 6) && (dice == 6 || dice2 == 6)) {
            // player loose score
            scores[activePlayer] = 0;
            document.getElementById('score-' + activePlayer).textContent = '0';

            document.getElementById('message-' + activePlayer).innerHTML = "";
            document.getElementById('message-' + activePlayer).innerHTML += "<strong>Player just hit a 6 in two consecutive rounds:</strong><br><br>- Loses current round score<br>- Loses global score<br>- Loses turn";
            nextPlayer();
        } else {
            //Add score
            roundScore += (dice + dice2);
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
            document.getElementById('message-' + activePlayer).innerHTML = "";
        }
        lastDiceValue = dice;
        lastDice2Value = dice2;
    }
});


document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        // Add CURRENT score to GLOBAL score
        scores[activePlayer] += roundScore;

        // Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        var input = document.querySelector('.final-score').value;

        var winningScore;
        // U defined, 0, null or "" are COERCED to false
        if (input) {
            winningScore = input;
        } else {
            winningScore = 50;
        }

        // Check if player won the game
        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.dice2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            //Next player
            nextPlayer();
        }
    }
});

document.querySelector('.btn-new').addEventListener('click', init);


// methods - functions
function init() {
    // setting values for global variables
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    lastDiceValue = 0;
    lastDice2Value = 0;

    // cleaning UI
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('message-0').textContent = "";
    document.getElementById('message-1').textContent = "";
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

function nextPlayer() {
    //Next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}