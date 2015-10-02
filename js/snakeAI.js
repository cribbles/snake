(function () {
  window.SnakeGame = window.SnakeGame || {};

  var SnakeAI = SnakeGame.SnakeAI = function (board) {
    this.tagName = "opponent";
    this.segments = [[26, 26], [26, 25], [25, 25]];
    this.board = board;
  }

  SnakeAI.prototype.currentPos = function () {
    return this.segments[(this.segments.length - 1)];
  }

  SnakeAI.prototype.nextPos = function() {
    var coords = SnakeGame.Util.adjacentCardinalCoords(this.currentPos());

    for (var i = 0; i < coords.length; i++) {
      if (!this.safeMove(coords[i])) {
        delete coords[i];
      }
    }

    var costs = SnakeGame.Util.sortCoordsByCost({
      coords: coords,
      goal: this.board.applePos
    });

    return costs[0].node;
  }

  SnakeAI.prototype.move = function() {
    var nextPos = this.nextPos();
    if (!nextPos) {
      this.board.isOver();
    }
    this.segments.push(nextPos);

    if (SnakeGame.Util.samePos(nextPos, this.board.applePos)) {
      this.board.incrementScore();
      this.board.placeApple();
    } else {
      this.segments.shift();
    }
  }

  SnakeAI.prototype.safeMove = function(pos) {
    var segments = this.segments.concat(this.board.player.segments);

    return this.board.inRange(pos) &&
      !SnakeGame.Util.inSegments(segments, pos);
  }
})();
