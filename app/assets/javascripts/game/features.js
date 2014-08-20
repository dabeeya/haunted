var features = {};

features.eatApple = function(person, apples) {
  score++;
  apples.kill();

  if (score === MAX_SCORE) {
    features.gameOver("Player 1");
  }
}

features.cherry = function(person, cherry) {
  cherry.kill();
  person.cherry = true;
  setTimeout(function(){person.cherry = false}, 5000);
}

features.speedUp = function(character, speedUp) {
  speedUp.kill();
  character.speedMultiplyer = 1.5;
  game.add.audio('powerup');
  powerup.play();
  setTimeout(function(){character.speedMultiplyer = 1}, 5000);
}

features.slowDown = function(character, slowDown) {
  slowDown.kill();
  character.speedMultiplyer = 0.5;
  setTimeout(function(){character.speedMultiplyer = 1}, 5000);
}

features.teleportOne = function(person, starOne) {
  person.kill();
  person.reset(790,353);
  person.body.velocity.x = -200;
};

features.teleportTwo = function(person, starTwo) {
  person.kill();
  person.reset(40,353);
  person.body.velocity.x = 200;
};

features.pacMeetsGhost = function(person, ghost) {
  if (person.cherry === true){
    features.eatGhost(person, ghost);
  }
  else {
    features.loseLife(person, ghost);
  }
}

features.eatGhost = function(person, ghost) {
  ghost.kill();
  ghost.reset(Math.random() * CANVAS_WIDTH, Math.random() * CANVAS_HEIGHT);
};

features.loseLife = function(person) {
  lives--;
  person.kill();

  if (lives === 0) {
    features.gameOver("Player 2");
  } else {
    person.reset(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
  }
};

features.movePlayer = function(character) {
  if (cursors.left.isDown || this.pointer('left')){
    character.body.velocity.x = -VELOCITY * character.speedMultiplyer;
    character.body.velocity.y = 0;
    character.animations.play('left', 10, true);
  } else if (cursors.right.isDown || this.pointer('right')){
    character.body.velocity.x = VELOCITY * character.speedMultiplyer;
    character.body.velocity.y = 0;
    character.animations.play('right', 10, true);
  } else if (cursors.up.isDown || this.pointer('up')){
    character.body.velocity.y = -VELOCITY * character.speedMultiplyer;
    character.body.velocity.x = 0;
    character.animations.play('up', 10, true);
  } else if (cursors.down.isDown || this.pointer('down')) {
    character.body.velocity.y = VELOCITY * character.speedMultiplyer;
    character.body.velocity.x = 0;
    character.animations.play('bottom', 10, true);
  }
}

features.pointer = function(direction) {
  if (game.input.activePointer.isDown) {
    if (direction === "up") {
      if (game.input.activePointer.y < VELOCITY) {
        return true;
      }
    } else if (direction === "down") {
      if (game.input.activePointer.y > 600) {
        return true;
      }
    } else if (direction === "left") {
      if (game.input.activePointer.x < VELOCITY) {
        return true;
      }
    } else if (direction === "right") {
      if (game.input.activePointer.x > 600) {
        return true;
      }
    }
  }
  return false;
}

features.gameOver = function(winner) {
  features.reset();
  alert("Game Over. " + winner + " wins!");
  location.reload();
};

features.reset = function() {
  fb.ghost.set({
    x : Math.random() * CANVAS_WIDTH,
    y : Math.random() * CANVAS_HEIGHT
  });

  fb.person.set({
    x : Math.random() * CANVAS_WIDTH,
    y : Math.random() * CANVAS_HEIGHT
  });

  fb.pause.set(true);
  fb.player1.set(true);
  fb.player2.set(true);
}
