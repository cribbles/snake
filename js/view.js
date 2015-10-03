(function () {
  window.SnakeGame = window.SnakeGame || {};

  var View = SnakeGame.View = function(el, options) {
    this.$el = $(el);
    this.$board = this.$el.find(".snake-game");
    this.board = new SnakeGame.Board(options);
    this.player = this.board.player;
    this.opponent = this.board.opponent;
    this.paused = false;
    this.pace = 10;

    this.bindKeyHandlers();
  }

  View.DIRECTIONS = [
    [38, "N"],
    [39, "E"],
    [40, "S"],
    [37, "W"]
  ];

  View.prototype.start = function () {
    this.renderBoard();
    setTimeout(this.moveSnakes.bind(this), 1000 / this.pace);
  }

  View.prototype.moveSnakes = function () {
    if (!this.paused) {
      this.pace = (7 + this.player.segments.length);

      this.player.move();
      this.opponent.move();
      this.renderSnakes();
      this.renderApple();
      this.$el.find(".snake-score").text("Score: " + this.player.score);
    }
    if (!this.board.isOver) {
      setTimeout(this.moveSnakes.bind(this), 1000 / this.pace);
    }
  }

  View.prototype.renderBoard = function () {
    var view = this;
    var board = this.board.render();

    board.forEach(function (row) {
      view.$board.append(row);
    });
  }

  View.prototype.renderSnakes = function () {
    this.renderSnakeSegments(this.player);
    this.renderSnakeSegments(this.opponent);
  }

  View.prototype.renderSnakeSegments = function (snake) {
    this.$board.find("li").removeClass(snake.tagName);
    var $board = this.$board;

    snake.segments.forEach(function (pos) {
      var id = "#" + pos[0] + "-" + pos[1];
      $board.find(id).addClass(snake.tagName);
    });
  }

  View.prototype.renderApple = function () {
    this.$board.find("li").removeClass("apple");

    var applePos = this.board.applePos;
    var id = "#" + applePos[0] + "-" + applePos[1];
    this.$board.find(id).addClass("apple");
  }

  View.prototype.bindKeyHandlers = function () {
    var view = this;
    var player = this.player;

    $("body").keydown(function (e) {
      e.preventDefault();

      View.DIRECTIONS.forEach(function (dir) {
        if (e.keyCode == dir[0]) {
          player.changeDir(dir[1]);
        }
      });

      if (e.keyCode == 32) {
        if (view.board.isOver) { return; }
        if (view.paused) {
          view.paused = false;
          view.$el.find(".snake-splash").hide();
        } else {
          view.paused = true;
          view.$el.find(".snake-splash").show();
        }
      }
    });
  }
})();
