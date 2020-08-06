class Scene1 extends Phaser.Scene{
    constructor(){
        super("bootGame");
    }

    preload(){
        //background 
        this.load.image("background", "assets/images/background.png");

        //obstacle
        this.load.image("obstacle", "assets/images/obstacle.png");

        //rocket
        this.load.image("rocket", "assets/images/rocket.png");

        //explosion
        this.load.spritesheet("explosion", "assets/spritesheets/explosion.png",{
            frameWidth: 16,
            frameHeight: 16
        });

        //coin
        this.load.spritesheet("coin", "assets/spritesheets/coin.png",{
            frameWidth: 14,
            frameHeight: 14
        });

        //player
        this.load.spritesheet("player", "assets/spritesheets/player.png",{
            frameWidth: 32,
            frameHeight: 32
        });

        this.load.bitmapFont("pixelFont", "assets/font/font.png", "assets/font/font.xml");
        this.load.audio("jump","assets/jump.wav");
    }

    create(){
        this.scene.start("playGame");

        //coin
        this.anims.create({
            key: "coin_anim",
            frames: this.anims.generateFrameNumbers("coin"),
            frameRate: 5,
            repeat: -1
        });

        //player
        this.anims.create({
            key: "player_anim",
            frames: this.anims.generateFrameNumbers("player"),
            frameRate: 10,
            repeat: -1
        });

        //explosion
        this.anims.create({
            key: "explode",
            frames: this.anims.generateFrameNumbers("explosion"),
            frameRate: 20,
            repeat: 0,
            hideOnComplete: true
        });
    }
}