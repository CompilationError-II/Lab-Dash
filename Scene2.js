class Scene2 extends Phaser.Scene{
    constructor(){
        super("playGame");
    }

    create(){
        //background
        this.background = this.add.tileSprite(0, 0, config.width, config.height, "background");
        this.background.setOrigin(0, 0); 

        //player
        this.player = this.physics.add.sprite(100 , config.height/2, "player");
        this.player.play("player_anim");
        this.player.setBounce(0.4);
        this.player.setCollideWorldBounds(true);
        this.player.body.setGravityY(800);

        //obstacle
        this.obstacle1 = this.add.sprite(config.width/2 - 80, config.height/2, "obstacle");
        this.obstacle2 = this.add.sprite(config.width/2, config.height/2 + 75, "obstacle");
        this.obstacle3 = this.add.sprite(config.width/2 + 80, config.height/2 + 25, "obstacle");

        //rocket
        this.rocket1 = this.add.sprite(config.width, config.height - 42, "rocket");
        this.rocket2 = this.add.sprite(config.width, config.height/2, "rocket");

        //coin
        this.coin = this.physics.add.sprite(config.width, config.height/2, "coin");
        this.coin.play("coin_anim");

        this.obstacles = this.physics.add.group();
        this.obstacles.add(this.obstacle1);
        this.obstacles.add(this.obstacle2);
        this.obstacles.add(this.obstacle3);
        this.obstacles.add(this.rocket1);
        this.obstacles.add(this.rocket2);

        this.physics.add.overlap(this.player, this.obstacles, this.hurtPlayer, null, this);

        this.cursorKeys = this.input.keyboard.createCursorKeys();
    }

    moveObstacle(obstacle, speed){
        obstacle.x -= speed;
        if(obstacle.x == 0){
            this.resetObstaclePos(obstacle);
        }
    }

    resetObstaclePos(obstacle){
        obstacle.x = config.width;
        var randomY = Phaser.Math.Between(0, config.height);
        obstacle.y = randomY;
    }

    hurtPlayer(){
        var explosion = this.physics.add.sprite(this.player.x , this.player.y, "explosion");
        explosion.play("explode");

        this.player.disableBody(true, true);
        this.time.addEvent({
            delay: 1000,
            callback: this.resetPlayer,
            callbackScope: this,
            loop: false
        });
    }

    resetPlayer(){
        var x = 0;
        var y = config.height/2;
        this.player.enableBody(true, x, y, true, true);
        this.player.body.setGravityY(0);
        this.player.alpha = 0.5;
        
        var tween = this.tweens.add({
            targets: this.player,
            x: 100,
            ease: 'Power1',
            duration: 1500,
            repeat: 0,
            onComplete: function(){
                this.player.alpha = 1;
                this.player.setBounce(0.4);
                this.player.body.setGravityY(800);
            },
            callbackScope: this
        });
    }

    moveCoin(){
        this.coin.x -= 2;

        if(this.coin.x == 0){
            this.coin.x = config.width;
            var randomY = Phaser.Math.Between(0, config.height);
            this.coin.y = randomY;
        }
    }

    update(){
        this.background.tilePositionX += 2; 

        this.moveCoin();
        
        this.moveObstacle(this.obstacle1, 2);
        this.moveObstacle(this.obstacle2, 2);
        this.moveObstacle(this.obstacle3, 2);

        this.moveObstacle(this.rocket1, 4);
        this.moveObstacle(this.rocket2, 4);

        if (this.cursorKeys.space.isDown) {
            this.player.setVelocityY(-200);
        }  
    }
}