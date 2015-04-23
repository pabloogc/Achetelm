var testTiles = [
    [' ', ' ', 'S', '#', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', '#', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', '#', ' ', '#', ' ', ' '],
    [' ', ' ', ' ', '#', ' ', '#', ' ', ' '],
    [' ', ' ', ' ', '#', ' ', '#', ' ', ' '],
    ['#', '#', ' ', ' ', ' ', '#', 'F', ' ']
];

pathFinder = {
    solution: [],
    tiles: undefined,
    distanceMap: undefined,
    solve: function (tiles) {
        this.tiles = tiles;
        this.distanceMap = [];
        var start, finish;
        for (var i = 0; i < tiles.length; i++) {
            this.distanceMap[i] = [];
            for (var j = 0; j < tiles[i].length; j++) {
                if (tiles[i][j] == 'S') start = [i, j];
                if (tiles[i][j] == 'F') finish = [i, j];
                this.distanceMap[i][j] = 0;
            }
        }
        var stack = [[start[0], start[1], 1]];
        while (stack.length > 0) {
            var current = stack.shift();
            var y = current[0];
            var x = current[1];
            var jumps = current[2];
            if (this.distanceMap[current[0]][current[1]] > 0) continue; //Already visited
            this.distanceMap[current[0]][current[1]] = jumps;

            if (y == finish[0] && x == finish[1]) break;

            var canMove = this.testDirections(current);
            if (canMove[0]) stack[stack.length] = [y - 1, x, jumps + 1];
            if (canMove[1]) stack[stack.length] = [y, x - 1, jumps + 1];
            if (canMove[2]) stack[stack.length] = [y + 1, x, jumps + 1];
            if (canMove[3]) stack[stack.length] = [y, x + 1, jumps + 1];
        }
        this.generateDirections(finish);

    },
    testDirections: function (position) {
        var y = position[0];
        var x = position[1];
        var test = [true, true, true, true];

        test[0] = y > 0 && this.isEmpty(y - 1, x);
        test[1] = x > 0 && this.isEmpty(y, x - 1);
        test[2] = y < this.tiles.length - 1 && this.isEmpty(y + 1, x);
        test[3] = x < this.tiles[y].length - 1 && this.isEmpty(y, x + 1);

        return test;
    },
    generateDirections: function (position) {
        var jump = this.distanceMap[position[0]][position[1]];
        while (jump != 1) {
            var y = position[0];
            var x = position[1];
            var canMove = this.testDirections(position);

            if (canMove[0] && this.getJumps(y - 1, x) == jump - 1) {
                this.solution.unshift('down');
                position = [y - 1, x]
            }
            if (canMove[1] && this.getJumps(y, x - 1) == jump - 1) {
                this.solution.unshift('right');
                position = [y, x - 1]
            }
            if (canMove[2] && this.getJumps(y + 1, x) == jump - 1) {
                this.solution.unshift('up');
                position = [y + 1, x]
            }
            if (canMove[3] && this.getJumps(y, x + 1) == jump - 1) {
                this.solution.unshift('left');
                position = [y, x + 1]
            }

            jump--;
        }
    },
    isEmpty: function (row, col) {
        var v = this.tiles[row][col];
        return ['#'].indexOf(v) == -1;
    },
    getJumps: function (row, col) {
        return this.distanceMap[row][col];
    }
};

//gameMapTiles = [];
//for (var i = 0; i < map.getWidth(); i++){
//    for(var j = 0; j < map.getHeight(); j++){
//        var object = map.getObjectTypeAt(i,j);
//        if(object == 'empty')
//            gameMapTiles[i][j] = ' ';
//        else
//            gameMapTiles[i][j] = object.symbol;
//    }
//}

pathFinder.solve(testTiles);
console.log(pathFinder.solution);