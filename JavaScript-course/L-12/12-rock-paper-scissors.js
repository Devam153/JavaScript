let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
};

updateScoreElement();
/*
if (score === null) {
    score = {
        wins: 0,
        losses: 0,
        ties: 0
    };
}
*/

function pickcomputermove() {
    const randomNumber = Math.random();
    let ComputerMove = '';

    if (randomNumber >= 0 && randomNumber < 1 / 3) {
        ComputerMove = 'rock';
    }
    else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
        ComputerMove = 'paper';
    }
    else {
        ComputerMove = 'scissors';
    }
    return ComputerMove;
}

let isautoplaying = false;
let intervalId;

//const autoplay = () => {

//};

function autoplay(){
    if (!isautoplaying){
        intervalId = setInterval(() => {
            const playermove = pickcomputermove();
            playgame(playermove);
        }, 1000);
        isautoplaying = true;
    }
    else {
        clearInterval(intervalId);
        isautoplaying = false;
    }
}

document.querySelector('.js-rock-button')
.addEventListener('click', () => {
    playgame('rock');
});

document.querySelector('.js-paper-button')
.addEventListener('click', () => {
    playgame('paper');
});

document.querySelector('.js-scissor-button')
.addEventListener('click', () => {
    playgame('scissors');
});

document.body.addEventListener('keydown', (event) => {
    if(event.key === 'r'){
        playgame('rock');
    }
    else if(event.key === 'p'){
        playgame('paper');
    }
    else if(event.key === 's'){
        playgame('scissors');
    }
});

function playgame(playermove) {
    let ComputerMove = pickcomputermove();

    let result = '';

    if (playermove === 'rock') {
        if (ComputerMove === 'rock') {
            result = 'tie.';
        }
        else if (ComputerMove === 'paper') {
            result = 'you lose.';
        }
        else if (ComputerMove === 'scissors') {
            result = 'you win.';
        }
    }

    if (playermove === 'paper') {
        if (ComputerMove === 'rock') {
            result = 'you win.';
        }
        else if (ComputerMove === 'paper') {
            result = 'tie.';
        }
        else if (ComputerMove === 'scissors') {
            result = 'you lose.';
        }
    }

    if (playermove === 'scissors') {
        if (ComputerMove === 'rock') {
            result = 'you lose.';
        }
        else if (ComputerMove === 'paper') {
            result = 'you win.';
        }
        else if (ComputerMove === 'scissors') {
            result = 'tie.';
        }
    }

    if (result === 'you win.') {
        score.wins += 1;
    }

    else if (result === 'you lose.') {
        score.losses += 1;
    }

    else {
        score.ties += 1;
    }

    localStorage.setItem('score', JSON.stringify(score)); // local storage only supports strings so json

    updateScoreElement();

    document.querySelector('.js-result')
        .innerHTML = result;

    document.querySelector('.js-moves')
        .innerHTML = `        you
<img src="images/${playermove}-emoji.png" class="move-icon">
<img src="images/${ComputerMove}-emoji.png" class="move-icon">
Computer`;

}

function updateScoreElement() {
    document.querySelector('.js-score')
        .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}