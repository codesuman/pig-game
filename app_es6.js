class Player{
    constructor(name, className, isActive = false){
        this.name = name;
        this.className = className;
        this.winningScore = 100;
    
        this.init(isActive);
    }

    rollDice(){
        if(!this.isActive) return;
    
        let diceVal = Math.floor((Math.random() * 6) + 1);
        document.getElementsByClassName('dice')[0].src = `dice-${diceVal}.png`;
    
        this.updateScore(diceVal);
    }

    updateScore(roundScore){
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

    holdScore(){
        if(!this.isActive) return;
    
        this.updateScore();
    
        if(this.score >= this.winningScore){
            // Display winner message
            alert(`${this.name} has won the game !!`);
            initNewGame();
        } else {
            // Flip Players active status
            this.togglePlayerActiveStatus();
        }
    }
    
    init(isActive = false){
        this.isActive = isActive;
    
        this.score = 0;
        this.roundScore = 0;
    
        document.querySelector(`.${this.className} .player-name`).innerText = this.name;
    
        this.updateUIScore();
        this.togglePlayerActiveDisplay();
    }
    
    togglePlayerActiveDisplay(){
        if(this.isActive) document.querySelector(`.${this.className}`).classList.add("active");
        else document.querySelector(`.${this.className}`).classList.remove("active");
    }
    
    updateUIScore(){
        // Update UI players round-score & score
        document.querySelector(`.${this.className} .player-score`).innerText = this.score;
        document.querySelector(`.${this.className} .player-current-score`).innerText = this.roundScore;
    }
    
    togglePlayerActiveStatus(){
        players.forEach(player => {
            player.isActive = !player.isActive;
    
            player.togglePlayerActiveDisplay();
        });
    }
}