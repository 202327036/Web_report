const canvas = document.getElementById('mycanvas');
const ctx = canvas.getContext('2d');

let rotation = 0;
let color = 'green';

// 삼각형 그리기
function drawTriangle() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // 캔버스 초기화
    ctx.save(); // 상태 저장
    ctx.translate(canvas.width / 2, canvas.height / 2); // 캔버스 중심 이동
    ctx.rotate(rotation); // 회전
    ctx.beginPath();
    ctx.moveTo(0, -150); // 첫 번째 꼭짓점 이동
    ctx.lineTo(100, 50); // 두 번째 꼭짓점 이동
    ctx.lineTo(-100, 50); // 세 번째 꼭짓점 이동
    ctx.closePath();
    ctx.fillStyle = color; // 색상 설정
    ctx.fill(); // 삼각형 그리기
    ctx.restore(); // 상태 복원
}

function turning() {
    rotation += 0.01; // 회전 각도 증가
    drawTriangle(); // 삼각형 다시 그리기
    requestAnimationFrame(turning); // 애니메이션 프레임 요청
}

canvas.addEventListener('click', (event) => {
    const x = event.clientX - canvas.width / 2; // 캔버스 중심을 기준으로 클릭한 x, y 좌표값 구하기
    const y = event.clientY - canvas.height / 2;

    // 회전된 좌표 계산
    const cos = Math.cos(-rotation); // 회전 각도의 코사인 값 계산
    const sin = Math.sin(-rotation); // 회전 각도의 사인 값 계산
    const rotatedX = x * cos - y * sin; // 클릭한 점의 회전 후 x 좌표 계산
    const rotatedY = x * sin + y * cos; // 클릭한 점의 회전 후 y 좌표 계산

    // 삼각형 내부 클릭 여부 확인
    if (rotatedY > -150 && rotatedY < 50 && // y 범위 확인
        rotatedX > -100 + (rotatedY + 150) / 2 && // 왼쪽 변 확인
        rotatedX < 100 - (rotatedY + 150) / 2) { // 오른쪽 변 확인
        color = 'red'; // 삼각형 내부를 클릭한 경우 색상을 빨간색으로 변경
    } else {
        color = 'green'; // 삼각형 외부를 클릭한 경우 색상을 녹색으로 유지
    }

    drawTriangle(); // 색상이 변경된 삼각형 다시 그리기
});

turning(); // 애니메이션 시작