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
let counter = 0;

let pacman = {
    x : 480,
    y : 710,
    dx : 5,
    radius : 20,
    speed : 10,
    moving : false,
    direction : 0,
    draw : function() {
        ctx.beginPath();
        ctx.fillStyle = "yellow";
        ctx.strokeStyle = "black";
        ctx.arc(this.x, this.y, this.radius, (Math.PI/180)*290, (Math.PI/180)*250, false);
        ctx.lineTo(this.x, this.y);
        ctx.fill();
        ctx.closePath();
        ctx.stroke();
    },
    move : function() {
        if (pacman.moving) {
            if (this.x - this.radius < 0) {
                this.x = this.radius * 2;
                this.direction = 0;
            }
            else if (this.x + this.radius > canvas.width) {
                this.x = canvas.width - this.radius * 2;
                this.direction = 0;
            }
            else {
                this.x += this.speed * this.direction;
            }
        }
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
        this.colors = ["#ffc8dd", "#ff0033", "#b2f0f1", "#fdd24b"];
        this.color = this.colors[Math.floor(Math.random() * this.colors.length)];
    }
    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.strokeStyle = "black";
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
        ctx.stroke();

        ctx.fillStyle = "white";
        ctx.strokeStyle = "black";
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
        ctx.stroke();

        ctx.fillStyle = "black";
        ctx.strokeStyle = "black";
        ctx.beginPath();
        ctx.arc(this.x+18, this.y-14, 2, 0, Math.PI * 2, true);
        ctx.fill();
        ctx.stroke();

        ctx.strokeStyle = "black";
        ctx.beginPath();
        ctx.arc(this.x+6, this.y-14, 2, 0, Math.PI * 2, true);
        ctx.fill();
        ctx.stroke();
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
        counter += 1;
        console.log(counter)
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
        
        if(hypo <= 25){
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
    pacman.move();
    
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

    window.addEventListener('keydown', event => {
        if (event.code == "Space") {
            projectile = new Projectile(projectiles_count, pacman.x, pacman.y, 10);
            projectile.create();
        }
        pacman.moving = true;
        switch(event.code) {
            case "ArrowLeft" :
                pacman.direction = -1;
                break
            case "ArrowRight" :
                pacman.direction = 1;
                break
        }
    })

    if(GAME.playable){
        window.requestAnimationFrame(draw);
    }
}

window.requestAnimationFrame(draw);