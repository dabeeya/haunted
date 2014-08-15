console.log("Hello");

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
  game.load.image('ghost', '/ghost.png');
  game.load.image('person', '/person.png');
  game.load.image('star', '/star.png');
  game.load.image('platform', '/firstaid.png');
  game.load.image('diamond', '/diamond.png');
}

var characters = []; //Pacman + All Ghosts
var ghosts = []; //All Ghosts
var person; //Pacman
var ghost1, ghost2, ghost3, ghost4; //Individual Ghosts
var dots = []; //All Dots
var platforms;

var score = 0;
var scoreText;

var key1, key2, key3, key4;



function create() {

  game.physics.startSystem(Phaser.Physics.ARCADE);

  createBoard();
  createPerson();
  createGhosts();
  createHotkeys();
  createDots();

  //  Enable physics for sprites, make world boundaries.
  game.physics.arcade.enable(characters);
  game.physics.arcade.enable(dots);

  characters.forEach(function(character) { character.body.collideWorldBounds = true; });

  key1.onDown.add(function() { setUserControl(ghosts, 1) });
  key2.onDown.add(function() { setUserControl(ghosts, 2) });
  key3.onDown.add(function() { setUserControl(ghosts, 3) });
  key4.onDown.add(function() { setUserControl(ghosts, 4) });

  scoreText = game.add.text(32, 550, 'score: 0', { font: "20px Arial", fill: "#ffffff", align: "left" });
} // End create()


function update() {

  game.physics.arcade.overlap(person, ghosts, loseLife, null, this);
  game.physics.arcade.overlap(person, dots, eatDot, null, this);

  characters.forEach(function(character) {
    if (character.userControl === true) {
      if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
        character.x -= 4;
        returnCoordinates(character);
      }
      else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
        character.x += 4;
        returnCoordinates(character);
      }
      else if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
        character.y -= 4;
        returnCoordinates(character);
      }
      else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
        character.y += 4;
        returnCoordinates(character);
      }
    }
  });

  // Ghost random
  // ghosts.forEach(function(item) {
  //     if (item.body.enable == false) {
  //       item.body.velocity.x = 100;
  //     }
  // });
}

function returnCoordinates(sprite) {
  var coordinates = [sprite.x, sprite.y];
  //console.log(coordinates);
  return coordinates;
}

function gameOver () {
  // ghost eats pac OR checks to see if if .count equals 0
}

function loseLife (person, ghosts) {
  person.kill();
}

function eatDot (person, dots) {
  dots.kill();
  score++;
  scoreText.text = 'score: ' + score;
}
