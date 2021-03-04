const canvas = document.querySelector("canvas");
const ctx = canvas.getContext('2d');

canvas.width = 1000;
canvas.height = 750;
canvas.left = document.querySelector("canvas").offsetLeft;
canvas.right = canvas.left + canvas.width;
canvas.top = document.querySelector("canvas").offsetTop;
canvas.bottom = canvas.top + canvas.height;

let pacman = {
    x : 480,
    y : 710,
    dx : 5,
    radius : 20,
    draw : function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, (Math.PI/180)*290, (Math.PI/180)*250, false);
        ctx.lineTo(this.x, this.y);
        ctx.fill();
        ctx.closePath();
    }
}

let projectile = {
    xProj : 480,
    yProj : 710,
    vx : 3,
    vy : -3,
    radius : 4,
    draw : function() {
        ctx.beginPath();
        ctx.arc(this.xProj, (this.yProj + 2), this.radius, 0, Math.PI*2);
        ctx.fill();
        ctx.closePath();
    }
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

    pacman.draw();

    projectile.draw();
    projectile.xProj += projectile.vx;
    projectile.yProj += projectile.vy;

    drawGhost();

    window.requestAnimationFrame(draw); //plus fluide que setInterval -> s'adapte aux capacités du navigateur

}

canvas.addEventListener('mousemove', function(e) {
    pacman.x = e.clientX - canvas.left;

    if ((pacman.x - 20) <= 0) {
        pacman.x = 20;
    }
    else if ((pacman.x + 20) >= canvas.width) {
        pacman.x = canvas.width - 20;
    }
});

/*canvas.addEventListener('click', () => {

});*/

window.requestAnimationFrame(draw);