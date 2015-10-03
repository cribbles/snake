(function () {
  window.SnakeGame = window.SnakeGame || {};

  var View = SnakeGame.View = function(el) {
    this.$el = $(el);
    this.$board = this.$el.find(".snake-game");
    this.$splash = this.$el.find(".snake-splash");
    this.paused = false;
    this.endGame = false;

    this.$el.on("click", "button", this.start.bind(this));
  }

  View.DIRECTIONS = [
    [38, "N"],
    [39, "E"],
    [40, "S"],
    [37, "W"]
  ];

  View.prototype.start = function (e) {
    e && e.preventDefault();

    this.endGame = false;
    this.board = new SnakeGame.Board();
    this.player = this.board.player;
    this.opponent = this.board.opponent;

    this.renderBoard();
    this.bindKeyHandlers();
    this.$splash.hide().find("span").empty();
    setTimeout(this.moveSnakes.bind(this), this.pace());
  }

  View.prototype.moveSnakes = function () {
    if (!this.paused) {
      this.moveSnake(this.player);
      this.moveSnake(this.opponent);
      this.renderApple();
      this.$el.find(".snake-score").text("Score: " + this.player.score);
    }
    if (this.board.isOver()) {
      this.gameOver();
    } else {
      setTimeout(this.moveSnakes.bind(this), this.pace());
    }
  }

  View.prototype.pace = function () {
    return 1000 / (7 + this.player.segments.length);
  }

  View.prototype.renderBoard = function () {
    this.$board.children("ul").remove();
    var view = this;
    var board = this.board.render();

    board.forEach(function (row) {
      view.$board.append(row);
    });
  }

  View.prototype.moveSnake = function (snake) {
    snake.move();
    this.renderSnakeSegments(snake);
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
    $("body").off("keydown");
    $("body").on("keydown", this._onKeydown.bind(this));
  }

  View.prototype.gameOver = function () {
    this.endGame = true;
    var $splash = this.$splash.show().find("span");
    var playerWon = (this.board.winner == this.player);
    var status = (playerWon ? "You win!" : "Game over!");
    var $h2 = $("<h2>").text(status);
    var $button = $("<button>").text("Play Again");

    $splash.append($h2, $button);
    this._endGame();
  }

  View.prototype._endGame = function () {
    this.moveSnake(this.opponent);
    this.renderApple();
    if (this.endGame && !this.opponent.isDead) {
      setTimeout(this._endGame.bind(this), this.pace());
    }
  }

  View.prototype._onKeydown = function (e) {
    e.preventDefault();
    var view = this;

    View.DIRECTIONS.forEach(function (dir) {
      if (e.keyCode == dir[0]) {
        view.player.changeDir(dir[1]);
      }
    });

    if (e.keyCode == 32) {
      if (view.board.isOver()) { return; }
      if (view.paused) {
        view.paused = false;
        view.$splash.hide();
      } else {
        view.paused = true;
        view.$splash.show();
      }
    }
  }

})();
