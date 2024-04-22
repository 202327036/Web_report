const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// Canvas의 크기를 600x800으로 설정
const width = 600;
const height = 800;
canvas.width = width;
canvas.height = height;

// 시작 버튼을 가져옵니다.
const startButton = document.getElementById('start');

// 시작 버튼을 클릭할 때 게임을 시작합니다.
startButton.addEventListener('click', function() {
    // 타이틀 화면을 숨깁니다.
    const titleScreen = document.getElementById('main');
    titleScreen.style.display = 'none';

    // 캔버스를 표시합니다.
    const canvas = document.getElementById('myCanvas');
    canvas.style.display = 'block';

    // 1초 후에 게임을 시작합니다.
    setTimeout(startGame, 1000);
});

// 게임을 시작하는 함수
function startGame() {

// 하트 그리기 함수
function drawHeart(x, y, size, color, rotationAngle) {  
    ctx.save(); // 현재 변환 상태를 저장
    ctx.translate(x, y); // 좌표 원점을 하트의 중심으로 이동
    ctx.rotate(rotationAngle * Math.PI / 180); // 회전 변환 적용
    ctx.fillStyle = color;
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, size / 4); // 시작점

    // 곡선 좌표 계산
    for (let i = 0; i < 360; i++) {
        const t = i * Math.PI / 180;
        const heartX = 16 * Math.pow(Math.sin(t), 3);
        const heartY = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
        ctx.lineTo(heartX * size, heartY * size); // 크기에 따라 좌표를 조정하여 하트를 그립니다.
    }

    ctx.fill();
    ctx.closePath();
    ctx.stroke();
    ctx.restore(); // 이전 변환 상태로 복원
}

// 별 그리기 함수
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
        ctx.lineTo(x + point.x * size, y + point.y * size); // 크기에 따라 좌표를 조정하여 별을 그립니다.
    }
    ctx.closePath();
    ctx.fillStyle = 'rgb(250, 202, 15)'; // 색상을 RGB 값 (250, 202, 15)로 고정
    ctx.fill();

    // 테두리 그리기
    ctx.strokeStyle = 'black'; // 검은색 테두리
    ctx.lineWidth = 2; // 테두리 두께 설정
    ctx.stroke();
}

// 초기 별의 위치를 랜덤하게 설정합니다.
let starX = Math.random() * (width - 30);
let starY = Math.random() * (height - 30);
let starSpeed = 2;

// 플레이어의 초기 위치를 화면 중앙으로 설정합니다.
let playerX = width / 2;
let playerY = height / 2;

// 플레이어의 이동 속도를 정의합니다.
const playerSpeed = 2;

// 화면 갱신을 위한 함수
function update() {
    // 플레이어를 그립니다.
    drawHeart(playerX, playerY, 1, 'blue', 0);
}

// 키보드 이벤트 처리
document.addEventListener('keydown', function(event) {
    switch(event.key) {
        case 'ArrowLeft': // 왼쪽 화살표
            starX += starSpeed;
            break;
        case 'ArrowUp': // 위쪽 화살표
            starY += starSpeed;
            break;
        case 'ArrowRight': // 오른쪽 화살표
            starX -= starSpeed;
            break;
        case 'ArrowDown': // 아래쪽 화살표
            starY -= starSpeed;
            break;
    }
});

// 애니메이션 프레임 함수
function animate(currentTime) {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Canvas를 clear하여 이전 프레임의 그림을 지웁니다.
    const heartX = width / 2; // 중앙에 그릴 하트의 x 좌표
    const heartY = height / 2; // 중앙에 그릴 하트의 y 좌표
    const rotationAngle = (currentTime / 5000) * 360 % 360; // 5초에 1바퀴 회전하는 각도
    drawHeart(heartX, heartY, 1, 'red', rotationAngle); // 회전 각도를 적용하여 하트 그리기 함수 호출
    drawStar(starX, starY, 2); // 별 그리기 함수 호출

    // 다음 프레임 요청
    requestAnimationFrame(animate);
}

// 애니메이션 시작
requestAnimationFrame(animate); }