(function () {
  window.SnakeGame = window.SnakeGame || {};

  var Board = SnakeGame.Board = function (options) {
    options = options || {};

    this.height = options.height || Board.HEIGHT;
    this.width = options.width || Board.WIDTH;
    this.snake = options.snake || new SnakeGame.Snake(this);
    this.isOver = false;
    this.score = 0;

    this.placeApple();
  }

  Board.HEIGHT = 20;
  Board.WIDTH = 40;

  Board.prototype.placeApple = function () {
    var emptySpaces = this.emptySpaces();

    this.applePos = emptySpaces[Math.floor(Math.random() * emptySpaces.length)];
  }

  Board.prototype.emptySpaces = function () {
    var emptySpaces = [];

    for (row = 0; row < this.height; row++) {
      for (col = 0; col < this.width; col++) {
        var pos = [row, col];

        if (this.applePos !== pos && this.snake.segments.indexOf(pos) === -1) {
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

  Board.prototype.incrementScore = function () {
    this.score += this.snake.segments.length * 5;
  }
})();
