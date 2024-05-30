const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// Canvas의 크기를 600x800으로 설정
const width = 600;
const height = 800;
canvas.width = width;
canvas.height = height;

// 시작 버튼을 가져옵니다.
const startButton = document.getElementById('start');

// 시작 버튼을 클릭할 때 게임을 시작
startButton.addEventListener('click', function() {
    // 타이틀 화면을 숨깁니다.
    const titleScreen = document.getElementById('main');
    titleScreen.style.display = 'none';

    // 게임 오버 화면을 숨깁니다.
    const gameOverScreen = document.getElementById('Gameover');
    gameOverScreen.style.display = 'none';

    // 캔버스를 표시합니다.
    canvas.style.display = 'block';

    // 1초 후에 게임을 시작합니다.
    setTimeout(startGame, 500); // 500 밀리초 후에
});

// 원을 그리는 함수
function drawCircle(x, y, radius, color) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    for (let angle = 0; angle < Math.PI * 2; angle += 0.01) {
        const circleX = x + radius * Math.cos(angle);
        const circleY = y + radius * Math.sin(angle);
        ctx.lineTo(circleX, circleY);
    }
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
}

// 적 생성 
function createEnemy() {
    let enemyX, enemyY;
    const side = Math.floor(Math.random() * 4);

    switch(side) {
        case 0: // 위쪽
            enemyX = Math.random() * width;
            enemyY = -20;
            break;
        case 1: // 오른쪽
            enemyX = width + 20;
            enemyY = Math.random() * height;
            break;
        case 2: // 아래쪽
            enemyX = Math.random() * width;
            enemyY = height + 20;
            break;
        case 3: // 왼쪽
            enemyX = -20;
            enemyY = Math.random() * height;
            break;
    }

    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    const color = `rgb(${red}, ${green}, ${blue})`;

    const angle = Math.random() * Math.PI * 2;
    const speedX = Math.cos(angle);
    const speedY = Math.sin(angle);

    enemies.push({ x: enemyX, y: enemyY, speedX: speedX, speedY: speedY, color: color });
}

// 적 그리기 함수
function drawEnemies() {
    for (const enemy of enemies) {
        if (!enemy.collided) {
            drawCircle(enemy.x, enemy.y, 10, enemy.color);
        }
    }
}

// 적 이동 함수
function moveEnemies() {
    const enemySpeed = 2;

    for (let i = enemies.length - 1; i >= 0; i--) {
        const enemy = enemies[i];
        enemy.x += enemy.speedX * enemySpeed;
        enemy.y += enemy.speedY * enemySpeed;

        if (enemy.x < -20 || enemy.x > width + 20 || enemy.y < -20 || enemy.y > height + 20) {
            enemies.splice(i, 1);
            createEnemy();
        }
    }
}

// HP를 나타내는 텍스트를 그리는 함수
function drawText(text, x, y, font, color) {
    ctx.fillStyle = color;
    ctx.font = font;
    ctx.fillText(text, x, y);
}

var playerHP = 2;
var gameOver;
var starcount = 0;

// 게임 시작 함수
function startGame() {
    const titleScreen = document.getElementById('main');
    titleScreen.style.display = 'none';

    const gameOverScreen = document.getElementById('Gameover');
    gameOverScreen.style.display = 'none';

    const canvas = document.getElementById('myCanvas');
    canvas.style.display = 'block';

    gameOver = false;
    playerX = width / 2;
    playerY = height / 2;
    enemySpeed = 2;

    // 플레이어 체력
    playerHP = 2;
    
    enemies = [];
    for (let i = 0; i < 10; i++) {
        createEnemy();
    }

    setTimeout(function() {
        requestAnimationFrame(animate);
    }, 500);

    updateHP()
}

// 플레이어의 현재 HP를 업데이트하고 화면에 표시합니다.
function updateHP() {
    // HP를 화면에 표시합니다.
    drawText("HP: " + playerHP, 10, 20, "20px Arial", "white");
    // 별 갯수 표시
    drawText("Kill: " + starcount.toString(), width - 70, 20, "23px Arial", "red");
}

function drawHeart(x, y, size, color, rotationAngle) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotationAngle * Math.PI / 180);
    ctx.fillStyle = color;
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, size / 4);

    for (let i = 0; i < 360; i++) {
        const t = i * Math.PI / 180;
        const heartX = 16 * Math.pow(Math.sin(t), 3);
        const heartY = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
        ctx.lineTo(heartX * size, heartY * size);
    }

    ctx.fill();
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
}

function drawStar(x, y, size) {
    const starPoints = [
        { x: 12.5, y: 0 },
        { x: 15.25, y: 7 },
        { x: 24.5, y: 7 },
        { x: 17, y: 11.4 },
        { x: 19.75, y: 18.2 },
        { x: 12.5, y: 14 },
        { x: 5.25, y: 18.2 },
        { x: 8, y: 11.4 },
        { x: 0.5, y: 7 },
        { x: 9.75, y: 7 }
    ];
    

    ctx.beginPath();
    for (const point of starPoints) {
        ctx.lineTo(x + point.x * size, y + point.y * size);
    }
    ctx.closePath();
    ctx.fillStyle = 'rgb(250, 202, 15)';
    ctx.fill();
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.stroke();
}

var starX = Math.random() * (width - 30);
var starY = Math.random() * (height - 30);
var playerX = width / 2;
var playerY = height / 2;
var enemies = [];
var heartSize = 1;
var heartTargetSize = 1;
var heartGrowing = false;

canvas.addEventListener('click', function() {
    heartTargetSize = 6; // 하트의 크기를 여섯 배로 설정
    heartGrowing = true;
});

function playerEatStar() {
    // 별의 중심 좌표와 플레이어의 중심 좌표 간의 거리 계산
    const distanceX = Math.abs(playerX - (starX + 12.5)); // 별의 중심 x좌표에 12.5를 더합니다.
    const distanceY = Math.abs(playerY - (starY + 9.1)); // 별의 중심 y좌표에 9.1을 더합니다.
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    // 플레이어와 별의 거리가 충분히 가까우면
    if (distance < 25) {

        if (playerHP < 3) {
        // 플레이어의 HP 회복
        playerHP += 1; }

        // 별 갯수 추가
        starcount++;

        // 새로운 별 생성
        starX = Math.random() * (width - 30);
        starY = Math.random() * (height - 30);
    }
}

function movePlayer() {
    if (buffer[0] == 1) playerY -= 3;
    if (buffer[1] == 1) playerY += 3;
    if (buffer[2] == 1) playerX -= 3;
    if (buffer[3] == 1) playerX += 3;
}

const buffer = [0, 0, 0, 0];

document.addEventListener('keydown', function(event) { // 키를 누를 동안 버퍼는 1이 되고, X, Y 좌표를 증감 떼면 0이 되며 취소
    if (event.key === 'ArrowUp') buffer[0] = 1;
    if (event.key === 'ArrowDown') buffer[1] = 1; 
    if (event.key === 'ArrowLeft') buffer[2] = 1;
    if (event.key === 'ArrowRight') buffer[3] = 1;
});

document.addEventListener('keyup', function(event) {
    if (event.key === 'ArrowUp') buffer[0] = 0;
    if (event.key === 'ArrowDown') buffer[1] = 0;
    if (event.key === 'ArrowLeft') buffer[2] = 0;
    if (event.key === 'ArrowRight') buffer[3] = 0;
});

function playerHit() {
    
    if(!heartGrowing) {
        playerHP--;
    }

    if (playerHP <= 0) {
        endGame();
    }
}

function removeEnemy(index) {
    if (index !== -1) {
        enemies.splice(index, 1);
    }
}

function checkCollision() {
    const collisionRadius = 20 * heartSize; // 하트의 크기에 비례한 충돌 반경 설정
    for (let i = 0; i < enemies.length; i++) {
        const enemy = enemies[i];
        const distanceX = Math.abs(playerX - enemy.x);
        const distanceY = Math.abs(playerY - enemy.y);
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

        if (distance < collisionRadius) {
            playerHit();
            enemies.splice(i, 1);
            createEnemy();
            break;
        }
    }
}

function endGame() {
    gameOver = true;
    const gameOverScreen = document.getElementById('Gameover');
    gameOverScreen.style.display = 'block';
    const canvas = document.getElementById('myCanvas');
    canvas.style.display = 'none';

    document.getElementById('Restart').addEventListener('click', function() {
        gameOverScreen.style.display = 'none';
        gameOver = false;
        canvas.style.display = 'block';
        setTimeout(startGame, 1000);
    });
}

function animate(currentTime) { //currentTime => 전역에다 써놓으면 나는 리퀘스트를 그리는 용도로 애니메이트를 실행시키겠다, currentTime 넣어줌. 
    //선언을 안해도 리퀘스트애니메이션프레임에서 주는 값이기 때문에 적용이 됨. 브라우저에서 currentTime을 받아옴.

    if (gameOver) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawStar(starX, starY, 2);
    drawEnemies();
    moveEnemies();
    update(currentTime);
    movePlayer();
    checkCollision();
    playerEatStar();
    updateHP();
    requestAnimationFrame(animate);
}

function update(currentTime) {
    const rotationSpeed = 5000; // 5000 밀리초 ,5초에 1번 회전
    const rotationAngle = (currentTime / rotationSpeed) * 360 % 360;

    if (heartGrowing) {
        if (heartSize < heartTargetSize) {
            heartSize += 0.1; // 하트 크기를 증가시킴
        } else {
            heartGrowing = false;
            heartTargetSize = 1; // 다시 원래 크기로 설정
            heartSize = 1;
        }
    }

    drawHeart(playerX, playerY, heartSize, 'red', rotationAngle);
}

requestAnimationFrame(animate);