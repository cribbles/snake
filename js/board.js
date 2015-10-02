(function () {
  window.SnakeGame = window.SnakeGame || {};

  var Board = SnakeGame.Board = function (options) {
    options = options || {};

    this.height = options.height || Board.HEIGHT;
    this.width = options.width || Board.WIDTH;
<<<<<<< HEAD
    this.player = new SnakeGame.Snake(this);
    this.opponent = new SnakeGame.SnakeAI(this);
    this.isOver = false;
    this.score = 0;
=======
    this.player = options.player || new SnakeGame.Snake(this);
    this.opponent = options.opponent || new SnakeGame.SnakeAI(this);
    this.isOver = false;
>>>>>>> gh-pages

    this.placeApple();
  };

<<<<<<< HEAD
  Board.HEIGHT = 30;
  Board.WIDTH = 30;

  Board.prototype.placeApple = function () {
    var emptySpaces = this.emptySpaces();

    this.applePos = emptySpaces[Math.floor(Math.random() * emptySpaces.length)];
=======
  Board.HEIGHT = 24;
  Board.WIDTH = 24;

  Board.prototype.placeApple = function () {
    var emptySpaces = this.emptySpaces();
    var randomSpaceIdx = Math.floor(Math.random() * emptySpaces.length);

    this.applePos = emptySpaces[randomSpaceIdx];
>>>>>>> gh-pages
  };

  Board.prototype.emptySpaces = function () {
    var emptySpaces = [];
<<<<<<< HEAD

    for (row = 0; row < this.height; row++) {
      for (col = 0; col < this.width; col++) {
        var pos = [row, col];

        if (!SnakeGame.Util.samePos(this.applePos, pos) &&
            !this.player.hasSegment(pos)) {
=======
    for (row = 0; row < this.height; row++) {
      for (col = 0; col < this.width; col++) {
        var pos = [row, col];
        var segments = this.player.segments.concat(this.opponent.segments);

        if (!SnakeGame.Util.samePos(this.applePos, pos) &&
            !SnakeGame.Util.inSegments(segments, pos)) {
>>>>>>> gh-pages
          emptySpaces.push([row, col]);
        }
      }
    }
<<<<<<< HEAD

=======
>>>>>>> gh-pages
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
<<<<<<< HEAD

  Board.prototype.incrementScore = function () {
    this.score += (this.player.segments.length - 2) * 5;
  }
=======
>>>>>>> gh-pages
})();
