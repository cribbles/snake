(function () {
  window.SnakeGame = window.SnakeGame || {};

  var View = SnakeGame.View = function(el, options) {
    this.$el = $(el);
    this.$board = this.$el.find(".snake-game");
    this.board = new SnakeGame.Board(options);
    this.snake = this.board.snake;

    this.bindKeyHandlers();
  }

  View.prototype.start = function () {
    this.renderBoard();

    var render = function () {
      var pace = (7 + this.snake.segments.length);
      var score = this.board.score

      this.snake.move();
      this.renderSnake();
      this.renderApple();
      this.$el.find(".snake-score").text("Score: " + score);

      if (!this.board.isOver) {
        setTimeout(render.bind(this), 1000 / pace);
      }
    }
    setTimeout(render.bind(this), 1000 / 10);
  }

  View.prototype.renderBoard = function () {
    var board = this.board.render();

    board.forEach(function (row) {
      this.$board.append(row);
    }, this);
  }

  View.prototype.renderSnake = function () {
    this.$board.find("li").removeClass("snake");

    this.snake.segments.forEach(function (pos) {
      var id = "#" + pos[0] + "-" + pos[1];

      this.$board.find(id).addClass("snake");
    }, this);
  }

  View.prototype.renderApple = function () {
    this.$board.find("li").removeClass("apple");

    var applePos = this.board.applePos;
    var id = "#" + applePos[0] + "-" + applePos[1];
    this.$board.find(id).addClass("apple");
  }

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
      }
    });
  }
})();
