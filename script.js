const body = document.body;
const player = document.getElementById('player')

let margin_Bottom = 150
body.addEventListener('click', ()=>{
    console.log('Clicked')
    player.style.marginTop = `calc(100% - ${margin_Bottom}px)`;
    setTimeout ( function run(){
        player.style.marginTop = `calc(100% - ${20}px)`;
    }, 300)
})


const obstacles = document.getElementById('obstacles');

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


setInterval(createObstacle, 1000);

setInterval(removeFirstObstacle, 3000);
