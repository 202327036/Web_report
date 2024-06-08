const canvas = document.getElementById('mycanvas');
const ctx = canvas.getContext('2d');

let rotation = 0;
let Color = 'green';

// 삼각형을 그리는 함수
function drawTriangle() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // 초기화
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2); // 캔버스 중앙으로 좌표
    ctx.rotate(rotation); //회전각도 만큼 회전
    ctx.beginPath();
    ctx.moveTo(0, -150); // 삼각형 꼭짓점
    ctx.lineTo(130, 75); // 삼각형 오른쪽 아래 점
    ctx.lineTo(-130, 75); // 삼각형 왼쪽 아래 점
    ctx.closePath();
    ctx.fillStyle = Color; //색 지정
    ctx.fill();
    ctx.restore();
}

// 회전을 적용하는 함수
function rotateTriangle() {
    rotation += 0.01; // 회전각도
    drawTriangle(); // 삼각형 그리기 함수
    requestAnimationFrame(rotateTriangle); // 다음 애니메이션 프레임 요청
}

// 클릭 이벤트를 처리하는 함수
canvas.addEventListener('click', (event) => {
    //const rect = canvas.getBoundingClientRect(); // 캔버스 위치 좌표 불러오기
    const x = event.clientX - canvas.width / 2; // 클릭점에서 중앙 좌표만큼 빼기
    const y = event.clientY - canvas.height / 2;
    
    // 회전된 좌표 계산
    const cos = Math.cos(-rotation); // 삼각형을 다시 구분하기 위해 회전 -회전값
    const sin = Math.sin(-rotation); // 삼각형을 다시 구분하기 위해 회전 -회전값
    const rotatedX = x * cos - y * sin; // 회전 후 새 x좌표 계산
    const rotatedY = x * sin + y * cos; // 회전 후 새 y좌표 계산
    
    // 삼각형 내부 클릭 여부 확인
    if (rotatedY > -150 && rotatedY < 75 && rotatedX > -130 + (rotatedY + 150) * 130 / 225 && rotatedX < 130 - (rotatedY + 150) * 130 / 225) {
        Color = 'red'; // 클릭이 아래 꼭짓점보다는 크고, 좌측 우측 이은 X좌표 사이에 있어야함
    } else {
        Color = 'green';
    }

    drawTriangle();
});

// 삼각형 회전 시작
rotateTriangle();