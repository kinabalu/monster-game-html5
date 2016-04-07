var gamelib = new GameLib(512, 480);

gamelib.setBackground("images/background.png");

gamelib.registerSprite("hero", new Sprite("images/hero.png"));
gamelib.registerSprite("monster", new Sprite("images/monster.png"));

var hero = gamelib.getSprite("hero");
var monster = gamelib.getSprite("monster");

hero.speed = 256;
var monstersCaught = 0;

var monsterDirection = 0;
var monsterSpeed = 4;

// Reset the game when the player catches a monster
var reset = function () {
	hero.moveCenter(gamelib.canvas);
	monster.moveRandom(gamelib.canvas);
};

var moveHeroUp = function() {
	hero.y -= hero.speed * modifier;
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

		if(monsterDirection == 0) {
			if(monster.x > 10) {
				monster.x -= monsterSpeed;
			} else {
				monsterDirection = 1;
			}
		} else if(monsterDirection == 1) {
			if(monster.x < 500) {
				monster.x += monsterSpeed;
			} else {
				monsterDirection = 0;
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