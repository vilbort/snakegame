
var blockSize = 25
var rows = 20;
var cols = 20;
var board;
var conetxt;

//pää
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

var velocityX = 0;
var velocityY = 0;

var snakeBody = [];


//ruoka
var foodX;
var foodY;


//vihut
var enemyX
var enemyY

var gameOver = false;





window.onload = function() {
    board = document.getElementById("board"); 
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d"); // piirtämiseen


    placeFood();
    document.addEventListener("keydown", changeDirection);
    placeEnemy();
    setInterval(update, 100); //100 millisekunnin välein päivittyy

}

placeEnemy();




function update() {
    if  (gameOver) {
        return;
    }
    context.fillStyle="black";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle="red"
    context.fillRect(foodX, foodY, blockSize, blockSize);

    context.fillStyle="white"
    context.fillRect(enemyX, enemyY, blockSize, blockSize);

    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY])
        placeFood();
        placeEnemy();
    }


    for (let i = snakeBody.length-1; i > 0; i--) {
        snakeBody[i] = snakeBody[i-1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    context.fillStyle="lime";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize)
    }

    if (snakeX < 0 || snakeX > cols*blockSize -1 || snakeY < 0 || snakeY > rows*blockSize -1) {
        gameOver = true
        const gameover = document.createElement('div');
        gameover.classList.add('gameover');
        gameover.innerHTML = 'Game Over';
        document.body.appendChild(gameover);
    }
    if (snakeX == enemyX && snakeY == enemyY) {
        gameOver = true
        const gameover = document.createElement('div');
        gameover.classList.add('gameover');
        gameover.innerHTML = 'Game Over';
        document.body.appendChild(gameover);
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true
            const gameover = document.createElement('div');
            gameover.classList.add('gameover');
            gameover.innerHTML = 'Game Over';
            document.body.appendChild(gameover);
        }
    }
    
}



function changeDirection(e) {
    if (e.code == "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    }
    else if (e.code == "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    }
    else if (e.code == "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }
    else if (e.code == "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}

function placeFood() {
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * cols) * blockSize;
}

function placeEnemy() {
    enemyX = Math.floor(Math.random() * cols) * blockSize;
    enemyY = Math.floor(Math.random() * cols) * blockSize;
    enemyX != foodX
    enemyY != foodY
}
