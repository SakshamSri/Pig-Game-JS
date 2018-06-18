/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, currentScore, activePlayer, gamePlaying;

init();

document.querySelector('.btn-roll').addEventListener('click', function() {
    
    if(!gamePlaying) {
        return;
    }
    
    let dice = Math.floor(Math.random() * 6) + 1;
    let diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';
    
    if(dice > 1) {
        
        currentScore += dice;
        document.querySelector('#current-'+activePlayer).textContent = currentScore;
        
    } else {
        
        nextPlayer();
        //document.querySelector('.dice').style.display = 'none';
    }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    
    if(!gamePlaying) {
        return;
    }
    
    scores[activePlayer] += currentScore;
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    
    if(scores[activePlayer] >= 20) {
        document.getElementById('name-' + activePlayer).textContent = 'WINNER!';
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        document.getElementById('current-' + activePlayer).textContent = 0;
        document.querySelector('.dice').style.display = 'none';
        gamePlaying = false;
    } else {
        nextPlayer();
    }
});

document.querySelector('.btn-new').addEventListener('click', function() {
   init(); 
});

function nextPlayer() {
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    activePlayer = (activePlayer === 0) ? 1 : 0;

    currentScore = 0;
}

function init() {
    
    activePlayer = 0;
    currentScore = 0;
    scores = [0, 0];
    gamePlaying = true;
    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    document.querySelector('.dice').style.display = 'none';    
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.getElementById('name-0').textContent = 'PLAYER 1';
    document.getElementById('name-1').textContent = 'PLAYER 2';
}




