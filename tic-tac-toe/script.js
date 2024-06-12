var style = [
    "border-bottom: 2px solid black;  border-right: 2px solid black;",
    "border-bottom: 2px solid black;  border-right: 2px solid black;border-left:2px solid black;",
    "border-left:2px solid black;border-bottom:2px solid black;",
    "border-bottom: 2px solid black;border-top:2px solid black;border-right:2px solid black;",
    "border:2px solid black;",
    "border-bottom: 2px solid black;border-top:2px solid black;border-left:2px solid black;",
    "border-right:2px solid black;border-top:2px solid black",
    "border-top: 2px solid black;  border-right: 2px solid black;border-left:2px solid black;",
    "border-left:2px solid black;border-top:2px solid black;",
];
var counter = 0;
let player1Score = document.getElementById('player1');
let player2Score = document.getElementById('player2');
let container = document.getElementById('container');
let player, xCounter, oCounter, rounds;
function drawBoard() {
    for (let index = 0; index < 3; index++) {
        container.innerHTML += `<div class = row id = row${index}></div>`;
        var row = document.getElementById(`row${index}`);
        for (let i = 0; i < 3; i++) {
            row.innerHTML += `<button id=${counter} onclick="add(${counter})"></button>`;
            counter++;
        }
    }
    for (let index = 0; index < 9; index++) {
        var button = document.getElementById(`${index}`);
        button.style = style[index];
    }
}
function init() {
    player = 'X';
    xCounter = [0, 0, 0, 0, 0, 0, 0, 0];
    oCounter = [0, 0, 0, 0, 0, 0, 0, 0];
    rounds = 0;
}
function add(param) {
    var clicked = document.getElementById(param);
    if (clicked.textContent == 'X' || clicked.textContent == 'O') {
        return;
    }
    clicked.innerText = player;
    if (player == 'X') {
        editCounter(param, xCounter);
        clicked.style.color = 'green';
        player = 'O';
    }
    else if (player == 'O') {
        editCounter(param, oCounter);
        clicked.style.color = 'red';
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
function showPopup(param) {
    document.getElementById("popup").style.display = "flex";
    document.getElementById("message").innerText += `${param}`;
    document.getElementById('modal-overlay').style.display = 'block';
}

function closePopup() {
    document.getElementById("popup").style.display = "none";
    document.getElementById('modal-overlay').style.display = 'none';
}
function checkWinner() {
    for (let index = 0; index < 8; index++) {
        if (xCounter[index] == 3) {
            showPopup('player X won');
            updateScore(player1Score);
            return;
        }
    }
    for (let index = 0; index < 8; index++) {
        if (oCounter[index] == 3) {
            showPopup('player O won');
            updateScore(player2Score);
            return;
        }
    }
    if (rounds == 8) {
        showPopup('its adraw');
    }
}
function updateScore(param) {
    param.innerText++;
}
function playAgain() {
    for (let index = 0; index < 9; index++) {
        document.getElementById(`${index}`).innerText = '';
    }
    document.getElementById('message').innerText = '';
    closePopup();
    init();
}
function reset() {
    playAgain();
    player1Score.innerText = 0;
    player2Score.innerText = 0;
}
drawBoard();
init();
