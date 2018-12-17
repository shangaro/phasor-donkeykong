/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/main.js":
/*!********************!*\
  !*** ./js/main.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("//this game will have only 1 state\nvar GameState = {\n\n  //initiate game settings\n  init: function() {\n    //adapt to screen size, fit all the game\n    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;\n    this.scale.pageAlignHorizontally = true;\n    this.scale.pageAlignVertically = true;\n  },\n\n  //load the game assets before the game starts\n  preload: function() {\n    this.load.image('ground', 'assets/images/ground.png');    \n    this.load.image('platform', 'assets/images/platform.png');    \n    this.load.image('goal', 'assets/images/gorilla3.png');    \n    this.load.image('arrowButton', 'assets/images/arrowButton.png');    \n    this.load.image('actionButton', 'assets/images/actionButton.png');    \n    this.load.image('barrel', 'assets/images/barrel.png');    \n\n    this.load.spritesheet('player', 'assets/images/player_spritesheet.png', 28, 30, 5, 1, 1);    \n    this.load.spritesheet('fire', 'assets/images/fire_spritesheet.png', 20, 21, 2, 1, 1);      \n  },\n  //executed after everything is loaded\n  create: function() {    \n\n    this.ground = this.add.sprite(0, 500, 'ground');\n    //enabling physics for ground\n    this.game.physics.arcade.enable(this.ground);\n    this.ground.body.allowGravity=false;\n    this.ground.body.immovable=true;\n\n     this.platform = this.add.sprite(0, 300, 'platform');\n    //enabling physics for platform\n    this.game.physics.arcade.enable(this.platform);\n    this.platform.body.allowGravity=false;\n    this.platform.body.immovable=true;\n\n    //create player\n    this.player = this.add.sprite(100, 200, 'player', 3);\n    this.player.anchor.setTo(0.5);\n    // this.player.animations.add('walking', [0, 1, 2, 1], 6, true);\n    // this.player.play('walking');\n\n  },\n  update: function() {\n    this.game.physics.arcade.collide(this.player,this.ground,this.landed);\n  },\n  landed:function(player,ground){\n    console.log(\"landed\");\n  }\n  \n};\n\n//initiate the Phaser framework\nvar game = new Phaser.Game(360, 592, Phaser.AUTO);\n\ngame.state.add('GameState', GameState);\ngame.state.start('GameState');\n\n\n\n//# sourceURL=webpack:///./js/main.js?");

/***/ })

/******/ });