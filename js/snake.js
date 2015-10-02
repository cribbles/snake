(function () {
  window.SnakeGame = window.SnakeGame || {};

  var Snake = SnakeGame.Snake = function (board) {
    this.dir = "S";
    this.segments = [[4, 4], [4, 5], [5, 5]];
    this.board = board;
  }

  Snake.prototype.currentPos = function () {
    return this.segments[(this.segments.length - 1)];
  }

  Snake.prototype.nextPos = function(dir) {
    dir = dir || this.dir;
    return SnakeGame.Util.add(this.currentPos(), dir);
  }

  Snake.prototype.hasSegment = function (pos) {
    return SnakeGame.Util.inSegments(this.segments, pos);
  }

  Snake.prototype.move = function() {
    var nextPos = this.nextPos();

    if (!this.safeMove(nextPos)) {
      this.board.isOver = true;
      return;
    }

    if (SnakeGame.Util.samePos(nextPos, this.board.applePos)) {
      this.board.incrementScore();
      this.board.placeApple();
    } else {
      this.segments.shift();
    }
    this.segments.push(nextPos);
  }

  Snake.prototype.changeDir = function(dir) {
    if (!SnakeGame.Util.DIRECTIONS[dir]) { return; }
    if (this.safeMove(this.nextPos(dir))) {
      this.dir = dir;
    }
  }

  Snake.prototype.safeMove = function(pos) {
    return this.board.inRange(pos) &&
      !SnakeGame.Util.inSegments(this.segments, pos);
  }
})();
