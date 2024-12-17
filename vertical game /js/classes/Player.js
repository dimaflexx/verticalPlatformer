function collision({
                       object1,
                       object2,})
{
    return  object1.position.y + object1.height >= object2.position.y
        && object1.position.y <= object2.position.y + object2.height &&
        object1.position.x <= object2.position.x + object2.width &&
        object1.position.x + object1.width >= object2.position.x;

}
class Player extends Sprite{
    constructor({position, collisionBlocks, imgSrc, frameRate, scale = 0.5, animations, platformCollisionBlocks,onGround = false} ) {
        super({imgSrc, frameRate, scale})
        this.position = position
        this.velocity = { x: 0, y: 1 }
        this.width = 100
        this.height = 100
        this.collisionBlocks = collisionBlocks
        this.platformCollisionBlocks = platformCollisionBlocks
        this.animations = animations
        this.lastDirection = 'right'
        for(let key in this.animations){
            const image = new Image()
            image.src = this.animations[key].imgSrc
            this.animations[key].image = image
            this.onGround = onGround

        }
    }

    switchSprite(key){
        if(this.image === this.animations[key].image || !this.loaded) return

        this.currentFrame = 0
        this.image = this.animations[key].image
        this.frameRate = this.animations[key].frameRate
        this.frameBuffer = this.animations[key].frameBuffer
        console.log(this.animations[key].image)
    }

    update(){
        this.updateFrames()
        this.updateHitbox()
       /* c.fillStyle = 'rgba(0, 0, 250, 0.2)'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
        c.fillStyle = 'rgba(0, 250, 0, 0.2)'
        c.fillRect(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.width, this.hitbox.height)*/
        this.draw()
        this.position.x+=this.velocity.x;
        this.updateHitbox()
        this.checkForHorizontalCollision()
        this.applyGravity()
        this.updateHitbox()
        this.checkForVerticalCollision()

    }
    updateHitbox(){
        this.hitbox = {
            position: {
                x: this.position.x + 35,
                y: this.position.y + 25
            },
            width: 15,
            height: 27
        }
    }
    checkForHorizontalCollision(){
        for(let i = 0; i < this.collisionBlocks.length; i++){
            const collisionBlock = this.collisionBlocks[i];

            if(collision({
                object1:this.hitbox,
                object2 : collisionBlock,
            })

            ) {
                if(this.velocity.x > 0){
                    this.velocity.x = 0

                    const offset = this.hitbox.position.x - this.position.x

                    this.position.x = collisionBlock.position.x - offset - 0.01
                    break
                }
                if(this.velocity.x < 0){
                    this.velocity.x = 0

                    const offset = this.hitbox.position.x - this.position.x

                    this.position.x = collisionBlock.position.x + collisionBlock.width - offset + 0.01
                    break
                }
            }
        }
    }
    applyGravity(){
        this.velocity.y += gravity;
        this.position.y+=this.velocity.y;
    }
   checkForVerticalCollision(){
        for(let i = 0; i < this.collisionBlocks.length; i++){

            const collisionBlock = this.collisionBlocks[i];

            if(collision({
                object1: this.hitbox,
                object2 : collisionBlock,
            })
            ) {
                if(this.velocity.y > 0){
                    this.velocity.y = 0

                    const offset = this.hitbox.position.y - this.position.y + this.hitbox.height

                    this.position.y = collisionBlock.position.y - offset - 0.01
                    this.onGround = true
                    break
                }
                if(this.velocity.y < 0){
                    this.velocity.y = 0

                    const offset = this.hitbox.position.y - this.position.y

                    this.position.y = collisionBlock.position.y + collisionBlock.height - offset + 0.01
                    this.onGround = true
                    break
                }
            }
        }

//che2cks for platform collision

       for(let i = 0; i < this.platformCollisionBlocks.length; i++){

           const platformCollisionBlock = this.platformCollisionBlocks[i];

           if(collision({
               object1: this.hitbox,
               object2 : platformCollisionBlock,
           })
           ) {
               if(this.velocity.y > 0){
                   this.velocity.y = 0

                   const offset = this.hitbox.position.y - this.position.y + this.hitbox.height

                   this.position.y = platformCollisionBlock.position.y - offset - 0.01
                   break
               }
               }
           }
       }

}