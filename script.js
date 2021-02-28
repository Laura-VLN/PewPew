var canvas = document.querySelector("canvas");
var ctx = canvas.getContext('2d');

canvas.width = 1000;
canvas.height = 750;

var x = 480;
var y = 710;
var dx = 2;

function drawCannon() {

    ctx.beginPath();
    ctx.fillRect(x, y, 40, 40);
    ctx.closePath();

}

function draw() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawCannon();

    if ((x + 40) < canvas.width) {
        x += dx;
    }
    if ((x + 40) == canvas.width) {
        dx = -2;
        x += dx;
    }
    if (x == 0) {
        dx = 2;
        x += dx;
    }

}

setInterval(draw, 5);