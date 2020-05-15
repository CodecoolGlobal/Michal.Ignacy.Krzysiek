const text = document.querySelector(".title");
const strText = text.textContent;
const splitText = strText.split("");
text.textContent = "";
es = true;



for(let i=0; i < splitText.length; i++){
    text.innerHTML += "<span>" + splitText[i] + "</span>";
}

let char = 0;
let timer = setInterval(onTick, 50);

function onTick() {
    const span = text.querySelectorAll('span')[char];
    span.classList.add("fade");
    char++;
    if (char === splitText.length) {
        complete();
        return;
    }
}

function complete() {
    clearInterval(timer);
    timer = null;

}

setTimeout(function(){
window.location='cube.html';},5000);


let scores, roundScore, activePlayer, gamePlaying, previous;

const menuElement = document.getElementById('menu');
const startGameButton = document.getElementById('btn-start');
const instructionButton = document.getElementById('btnHowtoPlay');
const instructionElement = document.getElementById('howToPlay');
const instructionBackButton = document.getElementById('btnBack');
const contentElement = document.getElementById('content');

startGameButton.addEventListener('click', function () {
    [menuElement, instructionElement].forEach(element => hide(element));
    show(contentElement);
    init();
});

instructionButton.addEventListener('click', function () {
    hide(menuElement);
    show(instructionElement);
});

instructionBackButton.addEventListener('click', function () {
    hide(instructionElement);
    show(menuElement);
});

function show(element) {
    element.classList.remove('hide');
    element.classList.add('show');
}

function hide(element) {
    element.classList.remove('show');
    element.classList.add('hide');
}

document.querySelector('.btn-new').addEventListener('click', init);
init();

document.querySelector('.btn-roll').addEventListener('click', function () {

    if (gamePlaying) {
        //1.RANDOM NUMBER
        const dice = Math.floor(Math.random() * 6) + 1;
        //2.DISPLAY THE RESULT
        const diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = '../resources/images/dice-' + dice + '.png';
        //3.UPDATE THE ROUND SCORE IF THE ROLLED NUMBER WAS NOT A 1
        if(dice === 6 && previous === 6){
            document.querySelector('#current-' + activePlayer).textContent = 0;
            scores[activePlayer];
            nextPlayer();
        } else if (dice !== 1) {
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            // document.querySelector('.dice').style.display = 'none';
            nextPlayer();
        }
        previous = dice;
    }
});

document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {

        //add current score to global score
        scores[activePlayer] += roundScore;

        //update the ui
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        const inputScore = document.querySelector('.winningScore').value;

        //check if player won the game
        if (scores[activePlayer] >= inputScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('#name-' + activePlayer).classList.add('winnerAnimation');
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            //Next player
            nextPlayer();
        }
    }
});

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

}

function init() {

    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;

    document.querySelector('.dice').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('#name-0').classList.remove('winnerAnimation');
    document.querySelector('#name-1').classList.remove('winnerAnimation');
}
