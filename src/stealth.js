// var player;
var platforms;
var computers=[];
var guards=[];

import frenzy from "./frenzy.js";

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
        this.platforms=this.physics.add.staticGroup();;

        //Setting keyboard.
        this.cursors=this.input.keyboard.createCursorKeys();
        this.gameOver=false;
        this.level=data.level;
        this.camera = this.cameras.main.setBounds(0, 0,1080,620); //For zooming in for limited vision
        this.reset=false;
    },

    stages: [
        //Stage 1
        {//Player starting location
        player: {X:300,Y:400},
        walls:[
        //Big bottom room    
        {X:1020, Y:120,scale:{w:0.4,h:0.5},type:'wallH'},
        {X:960, Y:140,scale:{w:0.25,h:0.5},type:'wallV'},
        {X:960, Y:430,scale:{w:0.25,h:1},type:'wallV'},
        {X:885, Y:500,scale:{w:0.5,h:0.5},type:'wallH'},
        {X:700, Y:500,scale:{w:0.35,h:0.5},type:'wallH'},
        {X:560, Y:500,scale:{w:0.25,h:0.5},type:'wallH'},
        {X:530, Y:590,scale:{w:0.25,h:1},type:'wallV'},
        //Top long room
        {X:960, Y:0,scale:{w:0.25,h:0.5},type:'wallV'},
        {X:550, Y:100,scale:{w:2,h:0.5},type:'wallH'},
        {X:100, Y:100,scale:{w:0.75,h:0.5},type:'wallH'},
        //Side Room
        {X:180, Y:180,scale:{w:0.25,h:0.7},type:'wallV'},
        {X:90, Y:350,scale:{w:0.7,h:0.4},type:'wallH'},
        //Main Room walls
        {X:540, Y:320,scale:{w:0.7,h:0.7},type:'wallV'},
        {X:440, Y:320,scale:{w:0.7,h:0.7},type:'wallV'},
        {X:640, Y:320,scale:{w:0.7,h:0.7},type:'wallV'},
        {X:740, Y:320,scale:{w:0.7,h:0.5},type:'wallV'}],
        computers:[
        {X:100,Y:160},
        {X:1050,Y:150},
        {X:560,Y:570}]},
        //Stage 2
        {platforms:[{X:400, Y:0}, {X:400, Y:100},{X:400, Y:200}]} //Level 2
    ],
    preload: function ()
    {
        this.load.image('obstacle', 'assets/images/obstacle.png');
        this.load.image('student', 'assets/images/student.png');
        this.load.image('guard','assets/images/guard.png');
        this.load.image('computer','assets/images/computer.png');
        this.load.image('wallH','assets/images/wallH.png');//https://all-free-download.com/free-photos/download/green_leafy_wood_background_03_hd_picture_170049_download.html
        this.load.image('wallV','assets/images/wallV.png');//https://all-free-download.com/free-photos/download/green_leafy_wood_background_03_hd_picture_170049_download.html
    },

    create: function ()
    {
        //Setting obstacles
        var currentLevel=this.stages[this.level-1];
        this.setWalls(this.platforms,currentLevel);
        
        //Setting player
        this.setPlayer(currentLevel);

        //Zoom in on the player with limited vision.
        this.cameras.main.startFollow(this.player);
        this.camera.zoomTo(4);
        
        //Setting computer(s)
        var compList=currentLevel.computers;
        this.setComputers(this.computers,compList);

        //Setting guards
        this.guards[0] = this.physics.add.sprite(100, 60, 'guard');
        this.guards[0].setDisplaySize(30,40)
        this.guards[0].setBounce(0);
        this.guards[0].setCollideWorldBounds(true);
        
        this.guards[0].allowGravity = false;
        this.guards[0].setVelocityX(100);
        
        //Setting physics and logics
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.platforms, this.guards);
        this.physics.add.collider(this.player, this.guards,this.getCaught,null,this);
        this.physics.add.overlap(this.player, this.computers, this.breakComp, null, this);
    },


    update: function()
    {
        this.patrol();
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
            console.log('pressing right --------->')
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

    setPlayer: function(currentLevel){
        this.player = this.physics.add.sprite(currentLevel.player.X, currentLevel.player.Y, 'student');
        this.player.setBounce(0);
        this.player.setScale(0.5);
        this.player.setCollideWorldBounds(true);
        this.player.setVelocityX(0);
        this.player.setVelocityY(0);
    },

    patrol: function(){
        if(this.guards[0].x>600){
            this.guards[0].setVelocityX(-100);
        }
        if(this.guards[0].x<100){ 
            this.guards[0].setVelocityX(100);
        }
    },

    getCaught: function(player){
        this.physics.pause();

        // this.player.setTint(0xff0001);
    
        this.gameOver = true;

        if(this.gameOver){

            this.input.keyboard.enabled=false;
            this.cursors.space.isDown=false;
            
            this.cursors.down.isDown=false;
            this.cursors.up.isDown=false;
            this.cursors.right.isDown=false;
            this.cursors.left.isDown=false;
            this.scene.start('gameover',{keys:this.input.keyboard, cursors:this.cursors});


        }

    
        console.log('Game Over'); //debugging
    },

    breakComp: function(player,computer){
        if(this.cursors.space.isDown){
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
            this.scene.launch('frenzy', {comp:computer, keys:this.input.keyboard});
            this.scene.pause();
            console.log('from stealth to frenzy');  
        }

    }

});
