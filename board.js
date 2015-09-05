(function () {
  window.SnakeGame = window.SnakeGame || {};

  var Board = SnakeGame.Board = function (options) {
    options = options || {};

    this.height = options.height || Board.HEIGHT;
    this.width = options.width || Board.WIDTH;
    this.snake = options.snake || new SnakeGame.Snake(this);

    this.placeApple();
  };

  Board.HEIGHT = 20;
  Board.WIDTH = 40;

  Board.prototype.placeApple = function () {
    var emptySpaces = this.emptySpaces();

    this.applePos = emptySpaces[Math.floor(Math.random() * emptySpaces.length)];
  };

  Board.prototype.emptySpaces = function () {
    var emptySpaces = [];

    for (row = 0; row < this.height; row++) {
      for (col = 0; col < this.width; col++) {
        var pos = [row, col];

        if (this.applePos !== pos && this.snake.segments.indexOf(pos) === -1) {
          emptySpaces.push([row, col]);
        };
      };
    };

    return emptySpaces;
  };

  Board.prototype.render = function () {
    var board = [];

    for (row = 0; row < this.height; row++) {
      board[row] = [];

      for (col = 0; col < this.width; col++) {
        var pos = [row, col];

        if (SnakeGame.Util.inSegments(this.snake.segments, pos)) {
          board[row].push("S");
        } else if (SnakeGame.Util.samePos(this.applePos, pos)) {
          board[row].push("A");
        } else {
          board[row].push(".");
        };
      };
    };

    return board.map(function (row) {
      return row.join("");
    }).join("\n");
  };
})();
