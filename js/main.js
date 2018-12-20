//this game will have only 1 state
var GameState = {

  //initiate game settings
  init: function() {
    //adapt to screen size, fit all the game
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
    // enable physics through out the game
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.gravity.y = 1000;
    //enable keyboard controls
    this.cursors=this.game.input.keyboard.createCursorKeys();
    this.RUNNING_SPEED=180;
    this.JUMPING_SPEED=651;

    // set the world size
    this.game.world.setBounds(0,0,360,763);

  },

  //load the game assets before the game starts
  preload: function() {
    this.load.image('ground', 'assets/images/ground.png');
    this.load.image('platform', 'assets/images/platform.png');
    this.load.image('goal', 'assets/images/gorilla3.png');
    this.load.image('arrowButton', 'assets/images/arrowButton.png');
    this.load.image('actionButton', 'assets/images/actionButton.png');
    this.load.image('barrel', 'assets/images/barrel.png');
    this.load.image('rightSign','assets/images/signRight.png');
    this.load.spritesheet('player', 'assets/images/player_spritesheet.png', 28, 30, 5, 1, 1);
    this.load.spritesheet('fire', 'assets/images/fire_spritesheet.png', 20, 21, 2, 1, 1);

    // load json file inside game
    this.load.text('gameData','assets/data/gamedata.json');

    // load music
    this.load.audio('botmusic','assets/music/Intro Theme.mp3');
  },
  //executed after everything is loaded
  create: function() {

    //create music
    music=this.add.audio('botmusic');
    console.log("this is music",music);
    music.volume=0.2;
    music.play();


    // create ground
    this.ground = this.add.sprite(0, 638, 'ground');
    this.startSign=this.add.image(0,610,'rightSign');
    this.startSign.scale.setTo(0.5,0.5);
    this.game.physics.arcade.enable(this.ground);
    this.ground.body.allowGravity = false;
    this.ground.body.immovable = true;
   

   

    // create multiple platforms
     this.gameData=JSON.parse(this.game.cache.getText('gameData'));
     console.log("gameData from file",this.gameData);

    
    // instantiate new multiple platforms object
    this.platforms=this.add.group();
    this.platforms.enableBody=true;

    this.gameData.platformData.forEach(function(element){
      this.platforms.create(element.x,element.y,"platform");

    },this);
    this.game.physics.arcade.enable(this.platforms);
    this.platforms.setAll('body.allowGravity',false);
    this.platforms.setAll('body.immovable',true);


    //create player
    this.player = this.add.sprite(this.gameData.playerStartsAt.x,this.gameData.playerStartsAt.y,'player', 3);
    this.player.anchor.setTo(0.5);
    this.player.animations.add('walking', [0, 1, 2, 1], 6, true);
    this.player.animations.play('walking');
    this.game.physics.arcade.enable(this.player);
    this.player.velocity=0;
    

    // attach camera to the player
    this.game.camera.follow(this.player);

    // create barrel
    this.barrels = this.add.group();
    this.barrels.enableBody=true;
    this.game.physics.arcade.enable(this.barrels);
    

    // phasor's timeout to create barrel every 5sec
    this.createBarrel();
    this.game.time.events.loop(Phaser.Timer.SECOND*this.gameData.barrelFrequency,this.createBarrel,this);
  
    // create fire
    this.fires=this.add.group();
    this.fires.enableBody=true;
    this.game.physics.arcade.enable(this.fires);
    this.gameData.fireData.forEach(function(element){
    var fire= this.fires.create(element.x,element.y,"fire");
     fire.animations.add('animatedFire',[0,1],4,true);
     fire.animations.play('animatedFire');
    },this);
    this.fires.setAll('body.allowGravity',true);
    


    

  },
  update: function() {
    this.game.physics.arcade.collide(this.player,this.ground);
    this.game.physics.arcade.collide(this.player,this.platforms,this.landed);
    this.game.physics.arcade.collide(this.barrels,this.platforms);
    this.game.physics.arcade.collide(this.barrels,this.ground);
    this.game.physics.arcade.collide(this.fires,this.platforms);
    this.game.physics.arcade.collide(this.player,this.fires,this.killPlayer);
    this.game.physics.arcade.collide(this.player,this.barrels,this.killPlayer);
    this.player.body.collideWorldBounds=true;
    // keyboard controls
    // if the initial velocity toward horizontal direction is not zero then set zero
    this.player.body.velocity.x=0;
    if(this.cursors.left.isDown){
      console.log("hey i just pressed left key");
      this.player.scale.setTo(1,1);
      this.player.animations.play('walking');
      this.player.body.velocity.x=-this.RUNNING_SPEED; // because left is in negative direction
    }else if(this.cursors.right.isDown){
      console.log("hey I just pressed right key");
      this.player.scale.setTo(-1,1);
      this.player.animations.play('walking');
      this.player.body.velocity.x=this.RUNNING_SPEED; // because right is in positive direction

    } else{
      // stop the animation
      this.player.animations.stop();
      this.player.frame=3;

    }
    if(this.cursors.up.isDown && this.player.body.touching.down){
       console.log("hey I just jumped");
       this.player.body.velocity.y=-this.JUMPING_SPEED;
    }
    this.barrels.children.forEach(function(barrel){
      if(barrel.x > 0 && barrel.y >600){
        barrel.kill();
      }
    },this)
    // destroy barrels stored on the ground;

  },
  landed:function(player,platform){
    console.log("I just touched the platform")
  },
  killPlayer:function(player){
    
    game.state.start('GameState');
    music.stop();
    
  },
  createBarrel:function(){
    // get first dead sprite
    var barrel=this.barrels.getFirstExists(false);
    // if the barrel does not exist then create one
    if(!barrel){
      barrel=this.barrels.create(0,0,'barrel');
    }
    barrel.reset(this.gameData.barrelStartsAt.x,this.gameData.barrelStartsAt.y)
    barrel.body.velocity.x=this.gameData.barrelVelocity;
    barrel.body.collideWorldBounds=true;
    barrel.body.bounce.setTo(1,0.5);
    
  }
 

};

//initiate the Phaser framework
var game = new Phaser.Game(360, 592, Phaser.AUTO);

game.state.add('GameState', GameState);
game.state.start('GameState');
var music;