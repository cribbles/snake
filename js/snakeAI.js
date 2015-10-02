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

  SnakeAI.prototype.hasSegment = function (pos) {
    return SnakeGame.Util.inSegments(this.segments, pos);
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
    this.segments.push(nextPos);

    if (SnakeGame.Util.samePos(nextPos, this.board.applePos)) {
      this.board.incrementScore();
      this.board.placeApple();
    } else {
      this.segments.shift();
    }
  }

  SnakeAI.prototype.safeMove = function(pos) {
    return this.board.inRange(pos) &&
      !SnakeGame.Util.inSegments(this.segments, pos);
  }
})();
