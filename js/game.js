var gamelib = new GameLib(512, 480);

gamelib.setBackground("images/background.png");

gamelib.registerSprite("hero", new Sprite("images/hero.png"));
gamelib.registerSprite("monster", new Sprite("images/monster.png"));

var hero = gamelib.getSprite("hero");
var monster = gamelib.getSprite("monster");

hero.speed = 256;
monster.speed = 320;
var monstersCaught = 0;

var monsterDirection = 0;
var monsterHorizontal = 0;
var changeHappened = false;

// Reset the game when the player catches a monster
var reset = function () {
	hero.moveCenter(gamelib.canvas);
	monster.moveRandom(gamelib.canvas);
};

// Update game objects
var update = function (modifier) {
	gamelib.processKeystroke({
		up: function() { hero.y -= hero.speed * modifier },
		down: function() { hero.y += hero.speed * modifier },
		left: function() { hero.x -= hero.speed * modifier },
		right: function() { hero.x += hero.speed * modifier }
	});

	// Are they touching?
	if (gamelib.spritesCollide(hero, monster)) {
		++monstersCaught;
		reset();
	} else {

		elapsedTime = Math.round(gamelib.elapsedTime() / 1000);
		if(elapsedTime % 5 == 0 && !changeHappened) {
				monsterDirection = gamelib.randomBetween(0, 3);
				changeHappened = true;
		} else if(elapsedTime % 5 != 0) {
				changeHappened = false;
		}

		// console.log("Elapsed time:", gamelib.elapsedTime());
		if(monsterDirection == 0) {
				if(monster.x < 500) {
					monster.x += monster.speed * modifier;
				} else {
					monsterDirection = 1;
				}
		} else if(monsterDirection == 1) {
				if(monster.x > 5) {
					monster.x -= monster.speed * modifier;
				} else {
					monsterDirection = 0;
				}
		} else if(monsterDirection == 2) {
				if(monster.y < 475) {
					monster.y += monster.speed * modifier;
				} else {
						monsterDirection = 3;
				}
		} else if(monsterDirection == 3) {
				if(monster.y > 5) {
					monster.y -= monster.speed * modifier;
				} else {
					monsterDirection = 2;
				}
		}

	}
};

// Draw everything
var render = function () {
	gamelib.drawText("Goblins caught: " + monstersCaught, 32, 32);
};

// Let's play this game!
reset();
gamelib.init(update, render);
gamelib.gameLoop();
