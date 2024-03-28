// Canvas Element 불러오기
var canvas = document.getElementById("GameScreenCanvas");
var ctx = canvas.getContext('2d');

var studentID = 202327036;

// 함수의 기능 선언
function drawNum(studentID) {

var studentString = studentID.toString();  // 학번을 문자열로 바꿔줌

ctx.font = "bold 24px Arial"; // 폰트 설정 (그냥은 답답해보여서 좀 크게)

for (var i = 0; i < studentString.length; i++) // i가 저 studentID 글자 수 값보다 크지 않을 때까지 숫자 적어주기
{
  ctx.fillStyle = "blue";
  ctx.fillText(studentString[i], i*20 , 30); // 저 길이만큼 x는 숫자마다 20씩 띄워서, y 30 좌표에 생성
  
}

}


drawNum(studentID); // 화면 우측 상단에 숫자 쓰기

/* ctx.beginPath();
ctx.moveTo(50,canvas.height/2);
ctx.lineTo(canvas.width-50,canvas.height/2);
ctx.strokeStyle="Blue";
ctx.lineWidth = 3;
ctx.stroke();
ctx.closePath(); */



