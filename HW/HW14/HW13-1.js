const canvas = document.getElementById('mycanvas');
const ctx = canvas.getContext('2d');

let rotation = 0; // 회전각도
let Color = 'green'; // 삼각형 색

// 삼각형을 그리는 함수
function drawTriangle() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // 캔버스 초기화
    ctx.save(); // 저장
    ctx.translate(canvas.width / 2, canvas.height / 2); // 캔버스 중심으로 이동
    ctx.rotate(rotation); //회전각도 만큼 회전
    ctx.beginPath(); 
    ctx.moveTo(0, -150); // 삼각형 꼭짓점
    ctx.lineTo(130, 75); // 삼각형 오른쪽 아래 점
    ctx.lineTo(-130, 75); // 삼각형 왼쪽 아래 점
    ctx.closePath();
    ctx.fillStyle = Color;
    ctx.fill();
    ctx.restore();
}

// 회전을 적용하는 함수
function rotateTriangle() { 
    rotation += 0.01; // 0.01씩 증가
    drawTriangle(); // 삼각형 그리기 함수 적용
    requestAnimationFrame(rotateTriangle); // 애니메이션 요청
}

// 벡터 크로스 곱 계산
function crossProduct(v1, v2) { // 곱은 두 벡터가 이루는 평면의 방향
    return v1.x * v2.y - v1.y * v2.x;
}

// 점이 삼각형 내부에 있는지 확인하는 함수
function isPointInTriangle(p, a, b, c) { // 배리센터릭 좌표
    const v0 = { x: c.x - a.x, y: c.y - a.y };
    const v1 = { x: b.x - a.x, y: b.y - a.y };
    const v2 = { x: p.x - a.x, y: p.y - a.y };

    const dot00 = v0.x * v0.x + v0.y * v0.y;
    const dot01 = v0.x * v1.x + v0.y * v1.y;
    const dot02 = v0.x * v2.x + v0.y * v2.y;
    const dot11 = v1.x * v1.x + v1.y * v1.y;
    const dot12 = v1.x * v2.x + v1.y * v2.y;

    const invDenom = 1 / (dot00 * dot11 - dot01 * dot01);
    const u = (dot11 * dot02 - dot01 * dot12) * invDenom;
    const v = (dot00 * dot12 - dot01 * dot02) * invDenom;

    return (u >= 0) && (v >= 0) && (u + v < 1); // p가 삼각형 내부에 있어야 결과값 참
}

// 클릭 이벤트를 처리하는 함수
canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect(); // 캔버스 위치, 크기 가져오기 캔버스 중심으로 좌표 변환
    const x = event.clientX - rect.left - canvas.width / 2;
    const y = event.clientY - rect.top - canvas.height / 2;
    
    // 회전된 좌표 계산
    const cos = Math.cos(-rotation);
    const sin = Math.sin(-rotation);
    const rotatedX = x * cos - y * sin; // 회전 좌표 계산
    const rotatedY = x * sin + y * cos; // 회전 좌표 계산
    
    const p = { x: rotatedX, y: rotatedY };
    const a = { x: 0, y: -150 }; // 삼각형 각 꼭짓점 좌표 정의
    const b = { x: 130, y: 75 }; // 삼각형 각 꼭짓점 좌표 정의
    const c = { x: -130, y: 75 }; // 삼각형 각 꼭짓점 좌표 정의

    // 삼각형 내부 클릭 여부 확인
    if (isPointInTriangle(p, a, b, c)) {
        Color = 'red';
    } else {
        Color = 'green';
    }

    drawTriangle();
});

// 삼각형 회전 시작
rotateTriangle();