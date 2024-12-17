

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');


canvas.width = 1024;
canvas.height = 576;
const scaledCanvas= {
    width: canvas.width / 4,
    height: canvas.height / 4
}

const floorCollision2D = []
for(let i = 0; i < floorCollision.length; i += 36){
    floorCollision2D.push(floorCollision.slice(i, i + 36))
}
    const collisionBlocks = [];
floorCollision2D.forEach((row, y ) => {
    row.forEach((symbol, x)=>{
        if(symbol === 202){
            collisionBlocks.push(new CollisionBlock({
                position: {
                    x : x * 16,
                    y : y * 16
                }
            }))

        }
    })
})
const platformCollision2D = []
for(let i = 0; i < platformCollision.length; i += 36){
    platformCollision2D.push(platformCollision.slice(i, i + 36))
}
const platformCollisionBlocks = [];
platformCollision2D.forEach((row, y ) => {
    row.forEach((symbol, x)=>{
        if(symbol === 202){
            platformCollisionBlocks.push(new CollisionBlock({
                position: {
                    x : x * 16,
                    y : y * 16,
                },
                height: 4

            }))

        }
    })
})


const gravity = (0.5 / 4)

const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    }
}

const background = new Sprite({
    position: {
        x: 0,
        y: 0,
    },
    imgSrc: './img/background.png'
})

const player = new Player({
    position:{
    x: 100, y: 300},
    collisionBlocks,
    platformCollisionBlocks,
    onGround: false,
    imgSrc: './img/warrior/Idle.png',
    frameRate: 8,
    animations: {
        Idle: {
            imgSrc: './img/warrior/Idle.png',
            frameRate: 8,
            frameBuffer: 3
        },
        IdleLeft: {
            imgSrc: './img/warrior/IdleLeft.png',
            frameRate: 8,
            frameBuffer: 3
        },
        Run : {
            imgSrc: './img/warrior/Run.png',
            frameRate: 8,
            frameBuffer: 5
        },
        Jump : {
            imgSrc: './img/warrior/Jump.png',
            frameRate: 2,
            frameBuffer: 0.1
        },
        Fall : {
            imgSrc: './img/warrior/Fall.png',
            frameRate: 2,
            frameBuffer: 1
        },
        RUnLeft: {
            imgSrc: './img/warrior/RunLeft.png',
            frameRate: 8,
            frameBuffer: 7
        },
        JumpLeft : {
            imgSrc: './img/warrior/JumpLeft.png',
            frameRate: 2,
            frameBuffer: 1
        },
        FallLeft : {
            imgSrc: './img/warrior/FallLeft.png',
            frameRate: 2,
            frameBuffer: 1
        }

    }
})

function animate(){
    window.requestAnimationFrame(animate);
    c.fillStyle = 'white'
    c.fillRect(0, 0, canvas.width, canvas.height);
    c.save()
    c.scale(4, 4)
    c.translate(0, -background.image.height + scaledCanvas.height)
    background.update()

    collisionBlocks.forEach(collisionBlock => {
        collisionBlock.update()
    })

    platformCollisionBlocks.forEach(collisionPlat => {
        collisionPlat.update()
    })
    player.update()
    player.velocity.x = 0
    if(keys.a.pressed){
        player.switchSprite('RUnLeft')
        player.velocity.x = -5 / 4
        player.lastDirection = 'left'
    }
    else if(keys.d.pressed){
        player.switchSprite('Run')
        player.velocity.x = 5 / 4
        player.lastDirection = 'right'
    }
    else if(player.velocity.y > 0){
        if(player.lastDirection === 'right'){
            player.switchSprite('Fall')}
        else{
            player.switchSprite('FallLeft')
        }
    }
    if(player.velocity.y < 0 ){
        player.velocity.x += 0.1
        if(player.lastDirection === 'right'){
            player.switchSprite('Jump')}
        else{
            player.switchSprite('JumpLeft')
        }
    }
    else if(player.velocity.y ===0 && player.velocity.x === 0){
        if(player.lastDirection === 'right'){
            player.switchSprite('Idle')
        }
        else{
            player.switchSprite('IdleLeft')
        }
    }


    c.restore()

}
animate()

window.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "d":
           keys.d.pressed = true;
            break;
        case "a":
            keys.a.pressed = true;
            break;
        case "w":
            player.velocity.y = -15 / 4;
            break;
    }
})
window.addEventListener("keyup", (event) => {
    switch (event.key) {
        case "d":
            keys.d.pressed = false;
            break;
        case "a":
            keys.a.pressed = false;
            break;
    }
})

