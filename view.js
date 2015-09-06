(function () {
  window.SnakeGame = window.SnakeGame || {};

  var View = SnakeGame.View = function(el, options) {
    this.$el = $(el);
    this.board = new SnakeGame.Board(options);
    this.snake = this.board.snake;

    this.bindKeyHandlers();
  };

  View.prototype.start = function () {
    var render = function () {
      var pace = (7 + this.snake.segments.length);
      var score = this.board.score

      this.snake.move();
      this.$el.find(".snake-game").empty();
      this.renderBoard();
      this.$el.find(".snake-score").text("Score: " + score);

      if (!this.board.isOver) {
        setTimeout(render.bind(this), 1000 / pace);
      };
    };

    setTimeout(render.bind(this), 1000 / 10);
  };

  View.prototype.renderBoard = function() {
    var board = this.board.render();
    var $board = this.$el.find(".snake-game");
    console.log(board);
    console.log($board);

    board.forEach(function (row) {
      $board.append(row);
    });
  };

  View.prototype.bindKeyHandlers = function () {
    var snake = this.snake;

    $("body").keydown(function (e) {
      if (e.keyCode == 38) {
        snake.changeDir("N");
      } else if (e.keyCode == 39) {
        snake.changeDir("E");
      } else if (e.keyCode == 40) {
        snake.changeDir("S");
      } else if (e.keyCode == 37) {
        snake.changeDir("W");
      };
    });
  };
})();
