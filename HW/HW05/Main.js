
var canvas = document.getElementById("GameScreenCanvas");
var ctx = canvas.getContext('2d');

//setInterval (draw, 1000.0 / 60.0)  // 1초에 60프레임이라는 뜻, 즉 1초에 60번 그리라는 뜻

var sun_rot = 0;
var earth_rot = 0;
var moon_rot = 0;

function draw() 
{
    
    ctx.clearRect(0, 0, canvas.width, canvas.height); // 전체 초기화

    //태양
    ctx.save(); // 상태 저장
    ctx.fillStyle = "rgb(255, 94, 0)"; // 태양 색상 코드
    ctx.translate(canvas.width / 2, canvas.height / 2); // 캔버스 중심으로 좌표 변환
    ctx.rotate(sun_rot); // 회전각 설정
    ctx.fillRect(-50, -50, 100, 100); // x, y 50씩 뒤로 땡겨서 사각형 만들고 중심으로 맞춰주기 안 되면 translate랑 위치 바꾸기
    ctx.restore(); // save 된 상태로 태양 복구

    // fillRect를 좌표와 회전 전에 그려넣었을 경우, 위치 오류 발생. 먼저 캔버스의 중심으로 이동시키고 회전을 적용시키고 그림을 그려야 정확히 적용됨.

    //지구
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2); // 캔버스 중심 이동
    ctx.rotate(sun_rot); // 태양 주위 돌게 하기
    ctx.translate(200, 0); // 태양에서부터 떨어지게끔
    ctx.rotate(earth_rot);
    ctx.fillStyle = "rgb(103, 153, 255)"; // 지구 색상 코드 안 되면 맨 뒤 순서로
    ctx.fillRect(-20, -20, 40, 40);

    //달
    ctx.save();
    ctx.rotate(moon_rot);
    ctx.translate(50, 0); // 지구에서부터 거리
    ctx.fillStyle = "rgb(166, 166, 166)";
    ctx.fillRect(-15, -15, 30, 30);
    ctx.restore(); // 지구, 달 복구

    ctx.restore(); // 전체 재복구
    
    sun_rot += Math.PI / 100; // 태양의 제자리 회전? 속도
    earth_rot += Math.PI / 200; // 지구의 공전 속도
    moon_rot += Math.PI / 80; // 달의 지구 주위 공전 속도


    requestAnimationFrame(draw);

}

    draw();


/* var rotAngle = 0;

function draw()

{

rotAngle += Math.PI / 100;

ctx.save(); // 현상태 저장

ctx.fillStyle = "purple";
ctx.translate(canvas.width/2, canvas.height/2); //캔버스 1/2만큼 이동
ctx.clearRect(-canvas.width/2, -canvas.height/2, canvas.width, canvas.height); // 이 면적만큼 지우기
ctx.rotate(rotAngle); // 회전 각도
ctx.fillRect(0,0,100,100); 

ctx.restore(); // 복원

ctx.save();

ctx.fillStyle = "green";
ctx.translate(100, 100);
ctx.rotate(rotAngle);
ctx.fillRect(0,0,100,100);

ctx.restore();

requestAnimationFrame(draw); // 모니터 hz 맞춰서 애니 프레임을 씌울 거냐? 라서 살짝 더 유리
} */