(function () {
  window.SnakeGame = window.SnakeGame || {};

  var Board = SnakeGame.Board = function (options) {
    options = options || {};

    this.height = options.height || Board.HEIGHT;
    this.width = options.width || Board.WIDTH;
    this.player = options.player || new SnakeGame.Snake(this);
    this.opponent = options.opponent || new SnakeGame.SnakeAI(this);

    this.placeApple();
  };

  Board.HEIGHT = 24;
  Board.WIDTH = 24;

  Board.prototype.placeApple = function () {
    var emptySpaces = this.emptySpaces();
    var randomSpaceIdx = Math.floor(Math.random() * emptySpaces.length);

    this.applePos = emptySpaces[randomSpaceIdx];
  };

  Board.prototype.emptySpaces = function () {
    var emptySpaces = [];

    for (row = 0; row < this.height; row++) {
      for (col = 0; col < this.width; col++) {
        var pos = [row, col];
        var segments = this.player.segments.concat(this.opponent.segments);

        if (!SnakeGame.Util.samePos(this.applePos, pos) &&
            !SnakeGame.Util.inSegments(segments, pos)) {
          emptySpaces.push([row, col]);
        }
      }
    }
    return emptySpaces;
  }

  Board.prototype.render = function () {
    var board = [];

    for (row = 0; row < this.height; row++) {
      board[row] = $("<ul>").addClass("snake-row").addClass("group");

      for (col = 0; col < this.width; col++) {
        var pos = row + "-" + col;
        var $li = $("<li>").attr("id", pos);

        board[row].append($li);
      }
    }
    return board;
  }

  Board.prototype.inRange = function (pos) {
    return (pos[0] >= 0 && pos[0] < this.height) &&
           (pos[1] >= 0 && pos[1] < this.width);
  }

  Board.prototype.winner = function () {
    if (this.player.isDead) {
      return this.opponent;
    } else if (this.opponent.isDead) {
      return this.player;
    }
  }

  Board.prototype.isOver = function () {
    return !!this.winner();
  }

})();
