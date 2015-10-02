(function () {
  window.SnakeGame = window.SnakeGame || {};

  var SnakeAI = SnakeGame.SnakeAI = function (board) {
<<<<<<< HEAD
    this.tagName = "opponent";
    this.segments = [[26, 26], [26, 25], [25, 25]];
=======
    this.score = 0;
    this.tagName = "opponent";
    this.segments = [[20, 20], [20, 19], [19, 19]];
>>>>>>> gh-pages
    this.board = board;
  }

  SnakeAI.prototype.currentPos = function () {
    return this.segments[(this.segments.length - 1)];
  }

<<<<<<< HEAD
  SnakeAI.prototype.hasSegment = function (pos) {
    return SnakeGame.Util.inSegments(this.segments, pos);
  }

=======
>>>>>>> gh-pages
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
<<<<<<< HEAD
    this.segments.push(nextPos);

    if (SnakeGame.Util.samePos(nextPos, this.board.applePos)) {
      this.board.incrementScore();
=======
    if (!nextPos) { this.board.isOver(); }
    this.segments.push(nextPos);

    if (SnakeGame.Util.samePos(nextPos, this.board.applePos)) {
      this.incrementScore();
>>>>>>> gh-pages
      this.board.placeApple();
    } else {
      this.segments.shift();
    }
  }

  SnakeAI.prototype.safeMove = function(pos) {
<<<<<<< HEAD
    return this.board.inRange(pos) &&
      !SnakeGame.Util.inSegments(this.segments, pos);
  }
=======
    var segments = this.segments.concat(this.board.player.segments);

    return this.board.inRange(pos) &&
      !SnakeGame.Util.inSegments(segments, pos);
  }

  SnakeAI.prototype.incrementScore = function () {
    this.score += (this.segments.length - 2) * 5;
  }

>>>>>>> gh-pages
})();
