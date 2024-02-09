const body = document.body;
const player = document.getElementById('player');
const obstacles = document.getElementById('obstacles');
const playerPoints = document.getElementById('points');
const container = document.getElementById('container');
const over_screen = document.getElementById('over');
const jumpSound = document.getElementById('jumpSound'); // New line added
let margin_Bottom = 150;
let points = 0;
function jump() {
    points = points + 1;
    playerPoints.innerHTML = points;
    player.style.marginTop = `calc(100% - ${margin_Bottom}px)`;
    setTimeout(() => {
        player.style.marginTop = `calc(100% - 20px)`;
    }, 300);
    jumpSound.currentTime = 0; // Reset the audio to the beginning
    jumpSound.play(); // Play the jump sound
}

// Function to handle spacebar key press
function handleKeyPress(event) {
    if (event.code === 'Space') {
        jump();
    }
}

// Event listeners for click and spacebar key press
body.addEventListener('click', jump);
document.addEventListener('keydown', handleKeyPress);

function createObstacle() {
    var obstacle = document.createElement("div");
    obstacle.classList.add("obstacle");
    obstacle.style.height = Math.random() < 0.5 ? '20px' : '40px';
    obstacle.style.marginLeft = `calc(100% - ${20}px)`;
    obstacles.appendChild(obstacle);
    return obstacle;
}

function removeFirstObstacle() {
    var firstObstacle = obstacles.querySelector('.obstacle');
    if (firstObstacle) {
        firstObstacle.remove();
    }
}

function checkCollision() {
    const playerRect = player.getBoundingClientRect();
    const obstaclesArray = Array.from(document.querySelectorAll('.obstacle'));

    obstaclesArray.forEach((obstacle) => {
        const obstacleRect = obstacle.getBoundingClientRect();
        if (
            playerRect.left < obstacleRect.right &&
            playerRect.right > obstacleRect.left &&
            playerRect.top < obstacleRect.bottom &&
            playerRect.bottom > obstacleRect.top
        ) {
            gameOver();
        }
    });
}

const new_game = document.getElementById('new');
const exit_game = document.getElementById('exit');

exit_game.addEventListener('click', ()=>{
    body.innerHTML = '';
});

new_game.addEventListener('click', () => {
    over_screen.style.display = 'none';
    container.style.display = 'flex';
    points = 0;
    // Clear obstacles
    Array.from(document.querySelectorAll('.obstacle')).forEach((obstacle) => {
        obstacle.remove();
    });
    // Restart player position
    player.style.marginTop = `calc(100% - ${margin_Bottom}px)`;
});

function gameOver() {
    container.style.display = 'none';
    over_screen.style.display = 'grid';
}

setInterval(createObstacle, 1000);
setInterval(removeFirstObstacle, 3000);
setInterval(checkCollision, 100); // Check collision every 100 milliseconds
