(function () {
  window.SnakeGame = window.SnakeGame || {};

  var Util = SnakeGame.Util = function () { };

  Util.DIRECTIONS = {
    "N": [-1, 0],
    "E": [0, 1],
    "S": [1, 0],
    "W": [0, -1]
  }

  Util.add = function (pos, dir) {
    var impulse = Util.DIRECTIONS[dir];

    return pos.map(function(coord, i) {
      return coord + impulse[i];
    });
  }

  Util.samePos = function (posX, posY) {
    if (!posX || !posY) { return false; }

    return posX.every(function (coord, i) {
      return coord === posY[i];
    });
  }

  Util.inSegments = function (segments, pos) {
    return segments.some(function (segment) {
      return Util.samePos(segment, pos);
    });
  }
})();
