//var  _firstMove;
var _typeCount;
// _typeArray = new Array();
var _fruitArray;
var _myFruit;
var _nextMove;

function new_game() {
//    _firstMove = true;
    _typeCount = 0;
    // _typeArray = new Array();
    _fruitArray = new Array();
    _nextMove = null;
    fill_data();
}

function make_move() {
    var board = get_board();
    
    // we found an item! take it!
    var item = board[get_my_x()][get_my_y()];
    if (item > 0) {
	_myFruit[item-1]++;
	_nextMove = null;
	return TAKE;
    }
    
    return next_move();
}

function fill_data() {
    var count = _typeCount = get_number_of_item_types();
    _fruitArray = new Array(count);
    _myFruit = new Array(count);
    for (var i=0; i<count; i++) {
	_fruitArray[i] = get_total_item_count(i+1);
	_myFruit[i] = 0;
    }
}

function is_valid(x, y) {
    if(x >= WIDTH || y >= HEIGHT || x<0 || y<0) return false;
    return true;
}

function should_target(item) {
//    if !is_valid(x,y) return false;
//    var target_item = get_board()[x][y];
    if(_myFruit[item-1] > Math.ceil(get_total_item_count(item)/2)) return false;
    return true;
}

function next_move() {
    return move_to(get_closest_fruit());
}

function get_closest_fruit() {
    var board = get_board();
    if(_nextMove == null || board[_nextMove.x][_nextMove.y] == 0) {
	var checked = new Array(WIDTH);
	for(var i=0; i<WIDTH; i++) {
	    checked[i] = new Array(HEIGHT);
	    for(var j=0; j<HEIGHT; j++) {
		checked[i][j] = false;
	    }
	}
	_nextMove = bfs_move(board, get_my_x(), get_my_y(), checked);
    }
    return _nextMove;
}

function bfs_move(board, x, y, checked) {
    var queue = [];
    queue.push(new cell(x,y));

    while (queue.length > 0) {
	var next = queue.shift();
	if (has_item(board[next.x][next.y]) && should_target(board[next.x][next.y])) return next;
	x = next.x;
	y = next.y;
	if (is_valid(x+1, y) && !checked[x+1][y]) queue.push(new cell(x+1,y));
	if (is_valid(x-1, y) && !checked[x-1][y]) queue.push(new cell(x-1,y));
	if (is_valid(x, y+1) && !checked[x][y+1]) queue.push(new cell(x,y+1));
	if (is_valid(x, y-1) && !checked[x][y-1]) queue.push(new cell(x,y-1));
    }
}

function move_to(target) {
    var to_x = target.x;
    var to_y = target.y;
    var my_x = get_my_x();
    var my_y = get_my_y();

    if(to_x > my_x) return EAST;
    if(to_y > my_y) return SOUTH;
    if(to_y < my_y) return NORTH;
    if(to_x < my_x) return WEST;
}

function cell(x, y) {
    this.x = x;
    this.y = y;
}

// Optionally include this function if you'd like to always reset to a 
// certain board number/layout. This is useful for repeatedly testing your
// bot(s) against known positions.
//
//function default_board_number() {
//    return 123;
//}
