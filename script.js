const intro = document.getElementById('intro');
const howto = document.getElementsByClassName('howto');
const howtoMod = document.getElementById('howto-mod');
const start = document.getElementById('start');
const playagain = document.getElementById('play-again')

for (let i = 0; i < howto.length; i++) {
    howto[i].addEventListener('click', function () {
        //console.log('how to clicked');
        howtoMod.style.display = getComputedStyle(howtoMod).display === 'none' ? 'block' : 'none';
    })
}

const closemod = document.getElementById('close');
closemod.addEventListener('click', function () {
    //console.log('closed');
    howtoMod.style.display = getComputedStyle(howtoMod).display === 'block' ? 'none' : 'block';
})

start.addEventListener('click', function () {
    //console.log('start game');
    intro.style.display = getComputedStyle(intro).display === 'block' ? 'none' : 'block';
    //console.log(intro.style.display);
    //console.log(game.style.display);
})

/*const giveup = document.getElementById('reset');
giveup.addEventListener('click', function () {
    console.log('give up');
    intro.style.display = getComputedStyle(intro).display === 'none' ? 'block' : 'none';
    game.style.display = getComputedStyle(game).display === 'grid' ? 'none' : 'grid';
})*/

const rps = {
    rock: 'scissors',
    paper: 'rock',
    scissors: 'paper'
};
const compChoices = Object.keys(rps);
const playerChoices = document.getElementsByClassName('rps-opt');
const playerStat = document.getElementById('player-stat');
const moneyDisplay = document.getElementById('money');
const end = document.getElementById('end');
const game = document.getElementById('game');
const endStat = document.getElementById('end-status');
const contGame = document.getElementById('continue');
const handdown = document.getElementById('handdown');

function randomMoney(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let playerMoney = 0;
let compMoney = 0

let isPlaying = false;

for (let i = 0; i < playerChoices.length; i++) {
    //console.log(`${playerChoices[i].value}`);
    playerChoices[i].addEventListener('click', function () {
        if (!isPlaying) return;
        if (playerMoney < 10 || compMoney < 10) return;

        const playerPick = this.value;
        //console.log(`${playerPick}`);
        const compPick = compChoices[Math.floor(Math.random() * compChoices.length)];
        //console.log(`${compPick}`);

        if (playerPick === compPick) {
            playerStat.textContent = 'Tie!'
        }
        else if (rps[playerPick] === compPick) {
            playerStat.textContent = 'You win! Player earns $10, Computer loses $10.'
            playerMoney += 10;
            compMoney -= 10;
        }
        else { //rps[compPick] === playerPick 
            playerStat.textContent = 'You lose. Computer earns $10, Player loses $10.'
            compMoney += 10;
            playerMoney -= 10;
        }
        moneyDisplay.textContent = playerMoney;
        //console.log(`Player Money: ${playerMoney} | Computer Money: ${compMoney}`);

        if (shouldCompHanddown()) {
            isPlaying = false;
            setRpsEnabled(false);
            isCont.style.display = 'none';
            handdownComp();
            return;
        }

        if (playerMoney < 10 || compMoney < 10) {
            endGame();
        } else {
            isPlaying = false;
            setRpsEnabled(false);
            isCont.style.display = 'block'
        }
    })
}

const isCont = document.getElementById('is-cont');

function startGame() {
    isPlaying = true;
    setRpsEnabled(true);
    isCont.style.display = 'none';
    compMoney = randomMoney(10, 250);
    playerMoney = randomMoney(10, 250);
    moneyDisplay.textContent = playerMoney;
    playerStat.textContent = '';
    end.style.display = 'none';
    game.style.display = 'grid';
    //console.log(`New Game: Player Money = ${playerMoney} | Computer Money = ${compMoney}`);
}

function endGame() {
    setRpsEnabled(false);
    game.style.display = 'none';
    end.style.display = 'flex';

    endStat.textContent = 'The game has ended.';
    if (playerMoney > compMoney) {
        endStat.textContent += ' Player has won!';
    } else if (compMoney > playerMoney) {
        endStat.textContent += ' Computer has won!';
    };
    endStat.textContent += ` Player Money: ${playerMoney} VS Computer Money: ${compMoney}.`
}

contGame.addEventListener('click', function () {
    if (playerMoney >= 10 && compMoney >= 10) {
        isPlaying = true;
        setRpsEnabled(true);
        isCont.style.display = 'none';
        playerStat.textContent = '';
    }
})

handdown.addEventListener('click', function () {
    isPlaying = false;
    setRpsEnabled(false);
    end.style.display = getComputedStyle(end).display === 'none' ? 'flex' : 'none';
    game.style.display = getComputedStyle(game).display === 'grid' ? 'none' : 'grid';
    endGame();
})

function setRpsEnabled(enabled) {
    for (let i = 0; i < playerChoices.length; i++) {
        playerChoices[i].disabled = !enabled;
    }
}

function shouldCompHanddown() {
    return (
        compMoney < 50 || //comp has less than $50
        Math.random() < 0.2 //random 20% chance of handdown
    );
}

function handdownComp() {
    game.style.display = 'none';
    end.style.display = 'flex'
    endStat.textContent = 'Computer had put down their hand.';
    if (playerMoney > compMoney) {
        endStat.textContent += ' Player has won!';
    } else if (compMoney > playerMoney) {
        endStat.textContent += ' Computer has won!';
    };
    endStat.textContent += ` Player Money: ${playerMoney} VS Computer Money: ${compMoney}.`
}