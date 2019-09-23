/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

function Player(name, className, isActive = false){
    this.name = name;
    this.className = className;
    this.winningScore = 100;

    this.init(isActive);
}

Player.prototype.rollDice = function(){
    if(!this.isActive) return;

    let diceVal = Math.floor((Math.random() * 6) + 1);
    document.getElementsByClassName('dice')[0].src = `dice-${diceVal}.png`;

    this.updateScore(diceVal);
}

Player.prototype.updateScore = function(roundScore){
    if(this.roundScore === 0) toggleDiceDisplay(); // If round score of player is 0, its a fresh start - display dice image with round score.

    if(roundScore){
        if(roundScore === 1) {
            this.roundScore = 0;
            this.updateUIScore();
            // Flip Players active status
            this.togglePlayerActiveStatus();
            toggleDiceDisplay();
        }
        else this.roundScore += roundScore;
    } else {
        // Called from hold score
        this.score += this.roundScore;
        this.roundScore = 0;
    
        toggleDiceDisplay();
    }

    this.updateUIScore();
}

Player.prototype.holdScore = function(){
    if(!this.isActive) return;

    this.updateScore();

    if(this.score >= this.winningScore){
        // Display winner message
        document.querySelector(`.${this.className} .player-name`).classList.add("winner");

        // alert(`${this.name} has won the game !!`);

        setTimeout(() => {initNewGame()}, 2000);
    } else {
        // Flip Players active status
        this.togglePlayerActiveStatus();
    }
}

Player.prototype.init = function(isActive = false){
    this.isActive = isActive;

    this.score = 0;
    this.roundScore = 0;

    document.querySelector(`.${this.className} .player-name`).innerText = this.name;

    this.updateUIScore();
    this.togglePlayerActiveDisplay();
}

Player.prototype.togglePlayerActiveDisplay = function(){
    if(this.isActive) document.querySelector(`.${this.className}`).classList.add("active");
    else document.querySelector(`.${this.className}`).classList.remove("active");
}

Player.prototype.updateUIScore = function(){
    // Update UI players round-score & score
    document.querySelector(`.${this.className} .player-score`).innerText = this.score;
    document.querySelector(`.${this.className} .player-current-score`).innerText = this.roundScore;
}

Player.prototype.togglePlayerActiveStatus = function(){
    Player.prototype.players.forEach(player => {
        player.isActive = !player.isActive;

        player.togglePlayerActiveDisplay();
    });
}

document.getElementById('roll-dice').addEventListener('click', () => {
    const player = (playerOne.isActive) ? playerOne : playerTwo;
    player.rollDice();
});

document.getElementById('hold-score').addEventListener('click', () => {
    const player = (playerOne.isActive) ? playerOne : playerTwo;
    player.holdScore();
});

document.getElementById('new-game').addEventListener('click', () => {
    initNewGame();
});

document.getElementById('winning_score').addEventListener('keyup', customDebounce(function(event){
    Player.prototype.players.forEach(player => player.winningScore = parseInt(event.target.value));
}, 1000));

function toggleDiceDisplay(displayVal){
    const diceImgs = document.getElementsByClassName('dice');

    Array.from(diceImgs).forEach(diceImg => {
        if(displayVal) diceImg.style.display = displayVal;
        else diceImg.style.display = (diceImg.style.display === 'none') ? 'block' : 'none';
    });
}

function initNewGame(){
    Player.prototype.players.forEach(player => {
        player.init();
    });

    toggleDiceDisplay('none');

    playerOne.isActive = true;
    playerOne.togglePlayerActiveDisplay();
}

function customDebounce(cb, delay){
    let timer = null;

    return function(){
        let _this = this, _event = arguments[0];

        if(timer) clearTimeout(timer);

        timer = setTimeout(() => {
            cb.call(_this, _event);
        }, delay);
    }
}

// Creating Players
const playerOne = new Player('Suman','player-0-panel', true);
const playerTwo = new Player('Swetha','player-1-panel');

Player.prototype.players = [playerOne, playerTwo];

/**
 * ADVANTAGES :
 * 1. You can completely get rid of id for player-name, player-score & player-current-score
 */