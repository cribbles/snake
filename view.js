(function () {
  window.SnakeGame = window.SnakeGame || {};

  var View = SnakeGame.View = function($el, options) {
    this.$el = $el;
    this.board = new SnakeGame.Board(options);
    this.snake = this.board.snake;

    this.bindKeyHandlers();
  };

  View.prototype.start = function () {
    var render = function () {
      var pace = (7 + this.snake.segments.length);
      var board = this.board.render();
      this.snake.move();
      this.$el.text(board);

      if (!this.board.isOver) {
        setTimeout(
          render.bind(this),
          1000 / pace
        );
      };
    };

    setTimeout(render.bind(this), 1000 / 10);
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
