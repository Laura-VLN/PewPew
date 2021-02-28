var canvas = document.querySelector("canvas");
var ctx = canvas.getContext('2d');

canvas.width = 1000;
canvas.height = 750;

var x = 480;
var y = 710;
var dx = 5;

var xProj = 480;
var yProj = 710;
var vx = 3;
var vy = -3;
var running = false;

function drawPacman() {
    ctx.beginPath();
    ctx.arc(x, y, 20, (Math.PI/180)*290, (Math.PI/180)*250, false);
    ctx.lineTo(x, y);
    ctx.fill();
    ctx.closePath();
}

function drawProjectile() {
    ctx.beginPath();
    ctx.arc(xProj, (yProj + 2), 4, 0, Math.PI*2);
    ctx.fill();
    ctx.closePath();
}

function drawGhost() {

    ctx.beginPath();
    ctx.moveTo(83, 116);
    ctx.lineTo(83, 102);
    ctx.bezierCurveTo(83, 94, 89, 88, 97, 88);
    ctx.bezierCurveTo(105, 88, 111, 94, 111, 102);
    ctx.lineTo(111, 116);
    ctx.lineTo(106.333, 111.333);
    ctx.lineTo(101.666, 116);
    ctx.lineTo(97, 111.333);
    ctx.lineTo(92.333, 116);
    ctx.lineTo(87.666, 111.333);
    ctx.lineTo(83, 116);
    ctx.fill();

    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.moveTo(91, 96);
    ctx.bezierCurveTo(88, 96, 87, 99, 87, 101);
    ctx.bezierCurveTo(87, 103, 88, 106, 91, 106);
    ctx.bezierCurveTo(94, 106, 95, 103, 95, 101);
    ctx.bezierCurveTo(95, 99, 94, 96, 91, 96);
    ctx.moveTo(103, 96);
    ctx.bezierCurveTo(100, 96, 99, 99, 99, 101);
    ctx.bezierCurveTo(99, 103, 100, 106, 103, 106);
    ctx.bezierCurveTo(106, 106, 107, 103, 107, 101);
    ctx.bezierCurveTo(107, 99, 106, 96, 103, 96);
    ctx.fill();

    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(101, 102, 2, 0, Math.PI * 2, true);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(89, 102, 2, 0, Math.PI * 2, true);
    ctx.fill();
    
}

function draw() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawPacman();

    drawProjectile();
    xProj += vx;
    yProj += vy;

    /*if ((x + 20) < (canvas.width - 10)) {
        x += dx;
    }
    if ((x + 20) == (canvas.width - 10)) {
        dx = -5;
        x += dx;
    }
    if ((x - 20) == 10) {
        dx = 5;
        x += dx;
    }*/

    drawGhost();

    window.requestAnimationFrame(draw); //plus fluide que setInterval -> s'adapte aux capacités du navigateur

}

canvas.addEventListener('mousemove', function(e){
    if (!running) {
      x = e.clientX - 500;
      drawPacman();
    }
});

canvas.addEventListener('mousemove', () => {

});

window.requestAnimationFrame(draw);