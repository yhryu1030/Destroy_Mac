import stages from "./stages.js";
var defaultSpeed=100;
/** The following is setting up and running codes for the stealth mode. */
export default new Phaser.Class({
    Extends: Phaser.Scene,

    initialize: function sceneA ()
    {
        Phaser.Scene.call(this, { key: 'stealth' });
    },

    init: function(data){
        //Declaring needed variables
        this.player;
        this.computers=[];
        this.guards=[];
        this.guardsInfo=[];
        this.platforms=this.physics.add.staticGroup();
        this.exit;
        this.caught=false;
        //Texts at the top left corner
        this.targetText;
        this.hpText;

        //Setting keyboard.
        this.cursors=this.input.keyboard.createCursorKeys();
        this.gameClear = false;
        this.level=data.level;
        this.camera = this.cameras.main.setBounds(0, 0,1080,620); //For zooming in for limited vision
        this.reset=false;
    },

    preload: function ()
    {
        this.load.image('obstacle', 'assets/images/obstacle.png');
        this.load.image('student', 'assets/images/player.png');
        this.load.image('guard','assets/images/guard.png');
        this.load.image('computer','assets/images/computer.png');
        this.load.image('wallH','assets/images/wallH.png');//https://all-free-download.com/free-photos/download/green_leafy_wood_background_03_hd_picture_170049_download.html
        this.load.image('wallV','assets/images/wallV.png');//https://all-free-download.com/free-photos/download/green_leafy_wood_background_03_hd_picture_170049_download.html
        this.load.image('exit','assets/images/exit.png');
        this.load.image('background', 'assets/images/background.png'); //https://www.webdesigndev.com/free-dark-backgrounds/ by Gre3g
        this.load.spritesheet('explosion', 'assets/images/explode2.png', {
            frameWidth: 300, 
            frameHeight: 300
        }); // https://raw.githubusercontent.com/photonstorm/phaser-examples/master/examples/assets/games/invaders/explode.png
    },

    create: function ()
    {
        var background=this.add.image(540, 310, 'background').setScale(5.4,3.1);

        // explosion animation
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion'),
            frameRate: 30,
            repeat: 1,
            hideOnComplete: true
        });

        //Setting obstacles
        this.currentLevel=stages[this.level-1];
        this.setWalls(this.platforms,this.currentLevel);

        //Setting player
        this.setPlayer(this.currentLevel);

        if(this.currentLevel.level=='tutorial1'){
            this.arrowInstruction=this.add.text(this.player.x, this.player.y, 
                'Use arrow keys to move', { fontSize: '16px', fill: '#fff' });
            this.frenzyInstruction=this.add.text(300, 300, 
                'Time in smashing dependent \non distance from the guard', { fontSize: '12px', fill: '#fff' });
            this.timeInFrenzy=this.add.text(400, 400, 
                    'Smash now,\nyou have :', { fontSize: '16px', fill: '#fff' });
            this.clickReset=this.add.text(750, 350, 
                'When caught, click to restart.', { fontSize: '16px', fill: '#fff' });
        }        

        //Zoom in on the player with limited vision.
        this.cameras.main.startFollow(this.player);
        this.camera.zoomTo(1.5);

        //Setting computer(s)
        var compList=this.currentLevel.computers;
        this.setComputers(this.computers,compList);

        //Setting exit
        this.exit=this.physics.add.sprite(this.currentLevel.exit.X, this.currentLevel.exit.Y, 'exit');
        this.exit.setDisplaySize(30,30);
        this.exit.setActive(false).setVisible(false);

        //Setting guards
        this.setGuards(this.guards, this.currentLevel,this.guardsInfo);

        //Setting physics and logics
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.platforms, this.guards);
        this.physics.add.collider(this.player, this.guards,this.getCaught,null,this);
        this.physics.add.overlap(this.player, this.computers, this.breakComp, null, this);
        this.physics.add.overlap(this.player, this.exit, this.clearLevel, null, this);

        //Display computer numbers
        this.targetText = this.add.text(200, 120, 'Time Left: ', { fontSize: '20px', fill: '#fff' });
        this.hpText=this.add.text(200, 150, 'Lives Left: ', { fontSize: '20px',fill: '#fff' });
        this.hpText.setScrollFactor(0,0);
        this.targetText.setScrollFactor(0,0);

        // Click to return to starting point.
        this.input.on('pointerdown', function () {
            if(this.caught){
                this.player.setTint();
                this.player.setPosition(this.currentLevel.player.X, this.currentLevel.player.Y);
                this.physics.resume();
                this.caught=false;
            }
        }, this);
    },


    update: function()
    {
        this.patrol();

        this.checkForDestroyedComp();

        if(this.currentLevel.level=='tutorial1'){
            var distance=this.closestGuard();
            var totTime;
            if(distance>=300){
                totTime=11;
            }
            else if(distance>=150){
                totTime=7;
            }
            else{
                totTime=5;
            }
            this.timeInFrenzy.setText('Enter Frenzy now,\nyou have :' + totTime.toFixed(2) + ' secs');
        }

        this.targetText.setText('Computers Left: ' + this.currentLevel.targets);
        this.hpText.setText('Lives Left: ' + this.player.health);

        if (this.cursors.up.isUp && this.cursors.down.isUp){
            this.player.setVelocityY(0);
        }
        if (this.cursors.left.isUp && this.cursors.right.isUp){
            this.player.setVelocityX(0);
        }
        //This a way to stop the bug of nonzero velocity even when the key is not pressed.
        if((!this.cursors.left.isDown && !this.cursors.right.isDown)&&this.player.body.velocity.x!=0){
            this.player.setVelocityX(0);
        }
        if((!this.cursors.up.isDown && !this.cursors.down.isDown)&&this.player.body.velocity.y!=0){
            this.player.setVelocityY(0);
        }

        if (this.cursors.up.isDown)
        {
            this.player.setVelocityY(-160);
        }
        if (this.cursors.down.isDown)
        {
            this.player.setVelocityY(160);
        }
        if(this.cursors.right.isDown)
        {
            this.player.setVelocityX(160);
        }
        if (this.cursors.left.isDown)
        {
            this.player.setVelocityX(-160);
        }
    },

    setWalls: function(platforms,currentLevel){
        for(var wall of currentLevel.walls){ //for-of loop,
            platforms.create(wall.X, wall.Y, wall.type).setScale(wall.scale.w,wall.scale.h).refreshBody();
        }
    },

    setComputers: function(computers,compList){
        var i=0;
        for(var computer of compList){ //for-of loop,
            computers[i]=this.physics.add.sprite(computer.X,computer.Y, 'computer');
            computers[i].setDisplaySize(30,30);
            computers[i].body.immovable = true;
            computers[i].health=33;
            i++;
        }
    },

    setGuards:function(guards,currentLevel,guardsInfo){
        var i =0;
        var coin;
        var patrolSpeed;
        for(var guard of currentLevel.guards){
            this.guardsInfo[i]={patrol:guard.patrol,chase:false};
            //Random Speed
            patrolSpeed=Math.floor((Math.random() * (200-100)) + defaultSpeed);
            //Add the guards to the scene.
            this.guards[i] = this.physics.add.sprite(guard.X,
                guard.Y, 'guard');
            this.guards[i].setDisplaySize(30,40)
            this.guards[i].setBounce(0);
            this.guards[i].setCollideWorldBounds(true);
            this.guards[i].body.immovable = true;
            this.guards[i].allowGravity = false;
            //Setting up initial condition of the guard in the x-direction.
            coin=Math.floor((Math.random() * 2) + 1);
            if(this.guards[i].x != this.guardsInfo[i].patrol.point1.X ||
                this.guards[i].x != this.guardsInfo[i].patrol.point2.X){
                if(coin==2){
                    this.guards[i].setVelocityX(patrolSpeed);
                }
                else{
                    this.guards[i].setVelocityX(-patrolSpeed);
                }
            }
            // Setting up initial condition of the guard in y-direction.
            else if(this.guards[i].y != this.guardsInfo[i].patrol.point1.Y ||
                this.guards[i].y != this.guardsInfo[i].patrol.point2.Y){
                if(coin==2){
                    this.guards[i].setVelocityY(patrolSpeed);
                }
                else{
                    this.guards[i].setVelocityY(-patrolSpeed);
                }
            }
            i++;
        }
    },

    setPlayer: function(currentLevel){
        this.player = this.physics.add.sprite(currentLevel.player.X, currentLevel.player.Y, 'student');
        this.player.setDisplaySize(20,26);
        this.player.setBounce(0);
        this.player.setCollideWorldBounds(true);
        this.player.setVelocityX(0);
        this.player.setVelocityY(0);
        this.player.health=3;
    },

    patrol: function(){
        var i=0;
        var patrol,patrolSpeed;
        for(var guard of this.guards){
            patrol=this.guardsInfo[i].patrol;
            patrolSpeed=Math.floor((Math.random() * (200-100)) + defaultSpeed);
            if(guard.x < patrol.point1.X){
                guard.setVelocityX(+patrolSpeed);
            }
            else if(guard.x > patrol.point2.X){
                guard.setVelocityX(-patrolSpeed);
            }
            else if(guard.y< patrol.point1.Y){
                guard.setVelocityY(+patrolSpeed);
            }
            else if(guard.y > patrol.point2.Y){
                guard.setVelocityY(-patrolSpeed);
            }
            i++;
        }
    },

    getCaught: function(player,guard){
        this.physics.pause();

        player.setTint(0xff0001);

        player.health--;

        this.caught=true;
        if(player.health<=0){
            this.input.keyboard.enabled=false;
            this.cursors.space.isDown=false;

            this.cursors.down.isDown=false;
            this.cursors.up.isDown=false;
            this.cursors.right.isDown=false;
            this.cursors.left.isDown=false;

            this.scene.start('gameover',{keys:this.input.keyboard});

        }


        
    },

    breakComp: function(player,computer){
        //Prevents the scene from constantly switching back and forth exploding.
        if (computer.health <= 0) {
            return;
        }

        //Reset keys
        this.input.keyboard.enabled=false;
        this.cursors.space.isDown=false;
        this.cursors.down.isDown=false;
        this.cursors.up.isDown=false;
        this.cursors.right.isDown=false;
        this.cursors.left.isDown=false;

        //Reset the player's velocity
        player.setVelocityY(0);
        player.setVelocityX(0);

        //Start the frenzy mode.
        this.scene.launch('frenzy', {comp:computer, keys:this.input.keyboard, stage:this.currentLevel,
            exit:this.exit, distance: this.closestGuard()/**This passes down the smallest distance between
        the player and one of the guards. */, player:this.player});
        this.scene.pause();
    },

    checkForDestroyedComp: function() {
        for (var computer of this.computers) {
            if (computer.health <= 0 && !computer.destroyed) {
                computer.play('explode');
                computer.destroyed = true;
            }
        }
    },
    //Returns the closest guard's distance from the player.
    closestGuard: function(){
        var distance;
        var shortest=Phaser.Math.Distance.Between(this.player.x,this.player.y,
            this.guards[0].x,this.guards[0].y); //Start off with any of the guard's distance.
        for(var guard of this.guards){
            distance=Phaser.Math.Distance.Between(this.player.x,this.player.y,guard.x,guard.y);
            if(distance<shortest){
                shortest=distance;
            }
        }
        return shortest;
    },

    clearLevel: function(player,exit){
        if(this.currentLevel.targets<=0){
            if(this.level==stages.length){
                this.input.keyboard.enabled=false;

                this.cursors.space.isDown=false;

                this.cursors.down.isDown=false;
                this.cursors.up.isDown=false;
                this.cursors.right.isDown=false;
                this.cursors.left.isDown=false;
                this.scene.start('gameclear',{keys:this.input.keyboard});
            }
            else{
                this.scene.start('stealth',{level:this.level+1});
            }
        }
    }

});
