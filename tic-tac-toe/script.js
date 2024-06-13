var counter = 0;
let player1Score = document.getElementById('player1');
let player2Score = document.getElementById('player2');
let container = document.getElementById('container');
let gameOver = document.getElementById('gameOver');
let message = document.getElementById('message');
let score = document.getElementById('foot-content');
let player, xCounter, oCounter, rounds;
let Game;
function drawBoard() {
    for (let index = 0; index < 3; index++) {
        container.innerHTML += `<div class = row id = row${index}></div>`;
        var row = document.getElementById(`row${index}`);
        for (let i = 0; i < 3; i++) {
            row.innerHTML += `<button id=${counter} onclick="add(${counter})"></button>`;
            counter++;
        }
    }
}
function init() {
    player = 'X';
    xCounter = [0, 0, 0, 0, 0, 0, 0, 0];
    oCounter = [0, 0, 0, 0, 0, 0, 0, 0];
    rounds = 0;
    Game = true;
    for (let index = 0; index < 9; index++) {
        document.getElementById(`${index}`).innerText = '';
    }
}
function add(param) {
    if (!Game) {
        return;
    }
    var clicked = document.getElementById(param);
    if (clicked.textContent == 'X' || clicked.textContent == 'O') {
        return;
    }
    clicked.innerText = player;
    if (player == 'X') {
        editCounter(param, xCounter);
        clicked.style.color = '#f67333';
        player = 'O';
    }
    else if (player == 'O') {
        editCounter(param, oCounter);
        clicked.style.color = '#bad856';
        player = 'X';
    }
    checkWinner();
    rounds++;
}
function editCounter(index, arr) {
    switch (index) {
        case 0:
            arr[0]++;
            arr[3]++;
            arr[6]++;
            break;
        case 1:
            arr[0]++;
            arr[4]++;
            break;
        case 2:
            arr[0]++;
            arr[5]++;
            arr[7]++;
            break;
        case 3:
            arr[1]++;
            arr[3]++;
            break;
        case 4:
            arr[1]++;
            arr[4]++;
            arr[6]++;
            arr[7]++;
            break;
        case 5:
            arr[1]++;
            arr[5]++;
            break;
        case 6:
            arr[2]++;
            arr[3]++;
            arr[7]++;
            break;
        case 7:
            arr[2]++;
            arr[4]++;
            break;
        case 8:
            arr[2]++;
            arr[5]++;
            arr[6]++;
            break;
    }
}
function checkWinner() {
    for (let index = 0; index < 8; index++) {
        if (xCounter[index] == 3) {
            popupe('player X won');
            updateScore(player1Score);
            Game = false;
            return;
        }
    }
    for (let index = 0; index < 8; index++) {
        if (oCounter[index] == 3) {
            popupe('player O won');
            updateScore(player2Score);
            Game = false;
            return;
        }
    }
    if (rounds == 8) {
        popupe('its a Draw');
        Game = false;
    }
}
function updateScore(param) {
    param.innerText++;
}
function popupe(param) {
    gameOver.style.display = 'flex';
    message.innerText = param;
    score.style.display = 'none';
}
function playAgain() {
    gameOver.style.display = 'none';
    message.innerText = '';
    score.style.display = 'flex';
    init();
}
function resetScore() {
    playAgain();
    player1Score.innerText = 0;
    player2Score.innerText = 0;
}
drawBoard();
init();
