const canvas = document.querySelector("canvas");
const ctx = canvas.getContext('2d');

canvas.width = 1000;
canvas.height = 750;
canvas.left = document.querySelector("canvas").offsetLeft;
canvas.right = canvas.left + canvas.width;
canvas.top = document.querySelector("canvas").offsetTop;
canvas.bottom = canvas.top + canvas.height;

let projectiles = [];
let projectiles_count = 0;

let randomX = (Math.floor(Math.random() * 960) + 40);
let randomY = (Math.floor(Math.random() * 335) + 40);

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

class Projectile {
    constructor(id, x, y, v_projectile) {
        this.id = id;
        this.posX = x;
        this.posY = y;
        this.speed = v_projectile;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.posX, (this.posY + 2), 4, 0, Math.PI*2);
        ctx.fill();
        ctx.closePath();
    }
    move() {
        this.posY -= this.speed;
    }
}

function projectileDestroy() {
    if (projectile.posY < 0) {projectiles.shift()};
}

class Ghost {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    draw() {
        /*ctx.beginPath();
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
        ctx.fill();*/

        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x, this.y-14);
        ctx.bezierCurveTo(this.x, this.y-22, this.x+6, this.y-28, this.x+14, this.y-28);
        ctx.bezierCurveTo(this.x+18, this.y-28, this.x+28, this.y-22, this.x+28, this.y-14);
        ctx.lineTo(this.x+28, this.y);
        ctx.lineTo(this.x+23.333, this.y-4.667);
        ctx.lineTo(this.x+18.666, this.y);
        ctx.lineTo(this.x+14, this.y-4.667);
        ctx.lineTo(this.x+9.333, this.y);
        ctx.lineTo(this.x+4.666, this.y-4.667);
        ctx.lineTo(this.x, this.y);
        ctx.fill();

        /*ctx.fillStyle = "white";
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
        ctx.fill();*/

        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.moveTo(this.x+8, this.y-20);
        ctx.bezierCurveTo(this.x+6, this.y-20, this.x+4, this.y-17, this.x+4, this.y-15);
        ctx.bezierCurveTo(this.x+4, this.y-13, this.x+6, this.y-10, this.x+8, this.y-10);
        ctx.bezierCurveTo(this.x+11, this.y-10, this.x+12, this.y-13, this.x+12, this.y-15);
        ctx.bezierCurveTo(this.x+12, this.y-17, this.x+11, this.y-20, this.x+8, this.y-20);
        ctx.moveTo(this.x+20, this.y-20);
        ctx.bezierCurveTo(this.x+17, this.y-20, this.x+16, this.y-17, this.x+16, this.y-15);
        ctx.bezierCurveTo(this.x+16, this.y-13, this.x+17, this.y-10, this.x+20, this.y-10);
        ctx.bezierCurveTo(this.x+23, this.y-10, this.x+24, this.y-13, this.x+24, this.y-15);
        ctx.bezierCurveTo(this.x+24, this.y-17, this.x+23, this.y-20, this.x+20, this.y-20);
        ctx.fill();

        /*ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.arc(101, 102, 2, 0, Math.PI * 2, true);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(89, 102, 2, 0, Math.PI * 2, true);
        ctx.fill();*/

        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.arc(this.x+18, this.y-14, 2, 0, Math.PI * 2, true);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(this.x+6, this.y-14, 2, 0, Math.PI * 2, true);
        ctx.fill();
    }
}

function createGhost() {
    ghost = new Ghost(randomX, randomY);
    ghost.draw();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    pacman.draw();
    
    projectiles.forEach(projectile => {
        projectile.draw();
        projectile.move();
        projectileDestroy();
    });

    createGhost();

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

canvas.addEventListener('click', () => {
    projectile = new Projectile(projectiles_count, pacman.x, pacman.y, 3);
    projectiles.push(projectile);
    projectile.draw();
    projectiles_count += 1;
});

window.requestAnimationFrame(draw);