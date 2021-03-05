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
let ghosts = [];
let ghostsCount = 0;
let ghostsAppearingSpeed = 2000;

let pacman = {
    x : 480,
    y : 710,
    dx : 5,
    radius : 20,
    draw : function() {
        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.arc(this.x, this.y, this.radius, (Math.PI/180)*290, (Math.PI/180)*250, false);
        ctx.lineTo(this.x, this.y);
        ctx.fill();
        ctx.closePath();
    }
}

const GAME = {
    restart : () => {
        document.location.reload();
    },
    playable : true,
}

class Projectile {
    constructor(id, x, y, vProjectile) {
        this.id = id;
        this.posX = x;
        this.posY = y;
        this.speed = vProjectile;
    }
    draw() {
        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.arc(this.posX, (this.posY + 2), 4, 0, Math.PI*2);
        ctx.fill();
        ctx.closePath();
    }
    move() {
        this.posY -= this.speed;
    }
    create() {
        projectiles.push(this);
        this.draw();
        projectiles_count += 1;
    }
    destroy(){
        if (this.posY < 0) {
            projectiles.shift()
        };
    }
}

class Ghost {
    constructor(id, x, y) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.speed = 5;
        this.color = 'black';
    }
    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x, this.y-14);
        ctx.bezierCurveTo(this.x, this.y-22, this.x+6, this.y-28, this.x+14, this.y-28);
        ctx.bezierCurveTo(this.x+18, this.y-28, this.x+28, this.y-22, this.x+28, this.y-14);
        ctx.lineTo(this.x+28, this.y); //
        ctx.lineTo(this.x+23.333, this.y-4.667);
        ctx.lineTo(this.x+18.666, this.y); //
        ctx.lineTo(this.x+14, this.y-4.667);
        ctx.lineTo(this.x+9.333, this.y); //
        ctx.lineTo(this.x+4.666, this.y-4.667);
        ctx.lineTo(this.x, this.y); //
        ctx.fill();

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

        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x+18, this.y-14, 2, 0, Math.PI * 2, true);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(this.x+6, this.y-14, 2, 0, Math.PI * 2, true);
        ctx.fill();
    }
    getId(){
        return this.id;
    }
    create() {
        ghosts.push(this);
        ghostsCount += 1;
        this.draw;

        if(ghostsAppearingSpeed >= 0){
            ghostsAppearingSpeed -= 100;
        }
    }
    destroy() {
        let index = ghosts.findIndex(x => x.id === this.id);
        ghosts.splice(index, 1);
    }
    goToPlayer(){
        let opposite = pacman.x - this.x
        let adjacent = pacman.y - this.y
        let hypo = Math.sqrt((opposite)**2 + (adjacent)**2)
        let angle = Math.atan(opposite/adjacent)        
        
        this.x += this.speed * Math.sin(angle)
        this.y += this.speed * Math.cos(angle)


        if(this.y > canvas.bottom ){
            this.destroy();
        }

        if(hypo < 100){
            this.color = "red";
        }
        
        if(hypo <= 28){
            GAME.playable = false;
            document.querySelector('section').innerHTML = '<h1 style="color: red; font-size: 50px; text-align: center; ">YOU LOOSE !</h1>';
            setTimeout(function(){
                GAME.restart();
            },1000);
        }
    }
}

setInterval(() => {
    ghost = new Ghost(ghostsCount, Math.floor(Math.random() * 960) + 40, Math.floor(Math.random() * 335) + 40);
    if(ghosts.length < 10){
        ghost.create();
    }
}, ghostsAppearingSpeed);

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    pacman.draw();
    
    ghosts.forEach(ghost => {
        ghost.draw();
        ghost.goToPlayer();
    });

    projectiles.forEach(projectile => {
        projectile.draw();
        projectile.move();
        projectile.destroy();

        ghosts.forEach(ghost => {
            id = ghost.getId();
            if(projectile.posX >= ghost.x && projectile.posX <= ghost.x+28 && projectile.posY <= ghost.y) {
                ghost.destroy();
            }
        });
    });

    if(GAME.playable){
        window.requestAnimationFrame(draw); //plus fluide que setInterval -> s'adapte aux capacités du navigateur
    }
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
    projectile = new Projectile(projectiles_count, pacman.x, pacman.y, 10);
    projectile.create()
});

window.requestAnimationFrame(draw);