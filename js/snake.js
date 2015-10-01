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

  Snake.prototype.hasSegment = function (pos) {
    return SnakeGame.Util.inSegments(this.segments, pos);
  }

  Snake.prototype.move = function() {
    var nextPos = SnakeGame.Util.add(this.currentPos(), this.dir);

    if (!this.safeMove(nextPos)) {
      this.board.isOver = true;
    } else {
      this.segments.push(nextPos);

      if (!SnakeGame.Util.samePos(nextPos, this.board.applePos)) {
        this.segments.shift();
      } else {
        this.board.incrementScore();
        this.board.placeApple();
      }
    }
  }

  Snake.prototype.changeDir = function(dir) {
    if (SnakeGame.Util.DIRECTIONS[dir]) {
      if (dir == "N" && this.dir != "S") {
        this.dir = "N";
      } else if (dir == "S" && this.dir != "N") {
        this.dir = "S";
      } else if (dir == "W" && this.dir != "E") {
        this.dir = "W";
      } else if (dir == "E" && this.dir != "W") {
        this.dir = "E";
      }
    }
  }

  Snake.prototype.safeMove = function(pos) {
    return this.board.inRange(pos) &&
      !SnakeGame.Util.inSegments(this.segments, pos);
  }
})();
