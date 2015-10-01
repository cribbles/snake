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

  Util.adjacentCardinalCoords = function (pos) {
    var x = pos[0], y = pos[1];

    return [[x, y-1], [x-1, y], [x+1, y], [x, y+1]];
  }

  Util.sortCoordsByCost = function (options) {
    var nodes = {};
    var costs = [];

    options.coords.forEach(function (node) {
      nodes[node] = Util.hCost(node, options.goal);
      costs.push({ node: Util.hCost(node, options.goal) });
    });

    return costs;
  }

  Util.hCost = function (node, goal) {
    var goalX = goal[0],
        goalY = goal[1],
        nodeX = node[0],
        nodeY = node[1];

    return (goalX - nodeX) + (goalY - nodeY);
  }
})();
