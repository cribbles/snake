(function () {
  window.Snake = window.Snake || {};

  var Snake = window.Snake.Snake = function (board) {
    this.dir = "S";
    this.segments = [[4, 4], [4, 5], [5, 5]];
    this.board = board;
  };

  Snake.prototype.currentPos = function () {
    return this.segments[(this.segments.length - 1)];
  };

  Snake.prototype.move = function() {
    var nextPos = window.Snake.Util.add(this.currentPos(), this.dir);

    this.segments.push(nextPos);

    if (!window.Snake.Util.samePos(nextPos, this.board.applePos)) {
      this.segments.shift();
    } else {
      this.board.placeApple();
    }
  };

  Snake.prototype.changeDir = function(dir) {
    if (window.Snake.Util.DIRECTIONS[dir]) {
      if (dir == "N" && this.dir != "S") {
        this.dir = "N";
      } else if (dir == "S" && this.dir != "N") {
        this.dir = "S";
      } else if (dir == "W" && this.dir != "E") {
        this.dir = "W";
      } else if (dir == "E" && this.dir != "W") {
        this.dir = "E";
      };
    };
  };
})();
