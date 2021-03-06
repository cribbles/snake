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
    nodes = [];

    options.coords.forEach(function (node) {
      nodes.push({
        node: node,
        cost: Util.hCost(node, options.goal)
      });
    });

    sorted = nodes.sort(function (left, right) {
      if (left.cost <= right.cost) return -1;
      if (left.cost > right.cost) return 1;
    });

    return sorted;
  }

  Util.hCost = function (node, goal) {
    var goalX = goal[0],
        goalY = goal[1],
        nodeX = node[0],
        nodeY = node[1];

    return Math.abs(goalX - nodeX) + Math.abs(goalY - nodeY);
  }
})();
