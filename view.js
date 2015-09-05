(function () {
  window.Snake = window.Snake || {};

  var View = Snake.View = function($el, options) {
    this.$el = $el;
    this.board = new Snake.Board(options);
    this.snake = this.board.snake;

    this.bindKeyHandlers();
  };

  View.prototype.start = function () {
    var render = function () {
      var pace = (7 + this.snake.segments.length);
      var board = this.board.render();
      this.snake.move();
      this.$el.text(board);

      setTimeout(
        render.bind(this),
        1000 / pace
      );
    };

    setTimeout(render.bind(this), 1000 / 10);
  };

  View.prototype.bindKeyHandlers = function () {
    var snake = this.snake;

    $("body").keydown(function (e) {
      if (e.keyCode == 38) {
        snake.dir = "N";
      } else if (e.keyCode == 39) {
        snake.dir = "E";
      } else if (e.keyCode == 40) {
        snake.dir = "S";
      } else if (e.keyCode == 37) {
        snake.dir = "W";
      };
    });
  };
})();
