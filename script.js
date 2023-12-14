const playBtn = document.querySelector('#playbtn')
const gameContainer = document.querySelector('.gameContainer')
const gameBoard = document.querySelector('#gameboard')
const context = gameBoard.getContext('2d')
const scoreText = document.querySelector('#score')

const WIDTH = gameBoard.width;
const HEIGHT = gameBoard.height;
const UNIT = 25;

let foodX;
let foodY;
let score = 0;

let xVel = 25;
let yVel = 0;

let started = false;
let active = true;

let snake = [
    { x: UNIT * 3, y: 0 },
    { x: UNIT * 2, y: 0 },
    { x: UNIT, y: 0 },
    { x: 0, y: 0 }
]

window.addEventListener('keydown', keyPress)
openGameBoard()
startGame()

function openGameBoard() {
    playBtn.addEventListener('click', () => {
        console.log('clicked')
        gameContainer.style.display = 'block';
        playBtn.style.display = 'none'
    })
}

function replay() {
    playBtn.addEventListener('click', () => {
        clearBoard()
        startGame()
    })
}

function clearBoard() {
    context.fillStyle = 'black';
    context.fillRect(0, 0, WIDTH, HEIGHT)
}

function startGame() {
    context.fillStyle = 'black';
    //fillRect(xstart,ystart,width,height)
    context.fillRect(0, 0, WIDTH, HEIGHT)
    createFood();
    displayFood();
    drawSnake();
}

function createFood() {
    foodX = Math.floor(Math.random() * WIDTH / UNIT) * UNIT
    foodY = Math.floor(Math.random() * HEIGHT / UNIT) * UNIT

}

function displayFood() {
    context.fillStyle = 'red'
    context.fillRect(foodX, foodY, UNIT, UNIT)
}

function drawSnake() {
    context.fillStyle = 'yellow'
    context.strokeStyle = 'black'

    snake.forEach((snakePart) => {
        context.fillRect(snakePart.x, snakePart.y, UNIT, UNIT)
        context.strokeRect(snakePart.x, snakePart.y, UNIT, UNIT)

    })
}

function moveSnake() {
    const headPart = { x: snake[0].x + xVel, y: snake[0].y + yVel }

    snake.unshift(headPart)

    if (snake[0].x == foodX && snake[0].y == foodY) {
        score += 1;
        scoreText.innerHTML = score
        createFood()
    }
    else {
        snake.pop()
    }
}

function next() {
    if (active) {
        setTimeout(() => {
            clearBoard();
            displayFood();
            moveSnake();
            checkGameOver()
            drawSnake();
            next();
        }, 180)
    }

    else {
        clearBoard()
        context.font = "50px bold"
        context.fillStyle = "White"
        context.textAlign = "center"
        context.fillText("Game Over!!!", WIDTH / 2, HEIGHT / 2)
        playBtn.style.display = 'block'
        playBtn.innerHTML = `&#x27F3 Replay`
        playBtn.style.textAlign = 'center'
        playBtn.style.fontSize = '1rem'
        playBtn.style.fontWeight = 'bold'
        playBtn.style.marginLeft = '40vw'
        playBtn.style.boxShadow = '1px 1px 4px'
        replay()
        scoreText.innerHTML = 0
    }

}


function keyPress(event) {

    if (!started) {
        started = true;
        next();
    }

    const LEFT = 37
    const UP = 38
    const RIGHT = 39
    const DOWN = 40

    switch (true) {
        case (event.keyCode == LEFT && xVel != UNIT):
            {
                xVel = -UNIT;
                yVel = 0;
                break;
            }

        case (event.keyCode == RIGHT && xVel != -UNIT):
            {
                xVel = UNIT;
                yVel = 0;
                break;

            }

        case (event.keyCode == UP && yVel != UNIT):
            {
                xVel = 0;
                yVel = -UNIT;
                break;

            }

        case (event.keyCode == DOWN && yVel != -UNIT):
            {
                xVel = 0;
                yVel = UNIT;
                break;

            }
    }

}

function checkGameOver() {
    switch (true) {
        case (snake[0].x < 0):
        case (snake[0].x >= WIDTH):
        case (snake[0].y < 0):
        case (snake[0].y >= HEIGHT):
            active = false
            break;

    }
}
