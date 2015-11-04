$(document).ready(function(){
	
	//define variables
	var canvas = $("#canvas")[0];
	var ctx = canvas.getContext("2d");
	var width = canvas.width;
	var height = canvas.height;
	var cw = 15;
	var direction;
	var food;
	var score;
	var color = "green";
	var speed = 130;

	//snake array
	var snake_array;


	//initializer
	function init() {
		d = "right";
		create_snake();
		create_food();
		score = 0;

		if(typeof game_loop != "undefined") {
			clearInterval(game_loop);
		}
		game_loop = setInterval(paint, speed);
	}

	init();


	//create snake
	function create_snake() {
		var length = 5;
		snake_array = [];

		for (var i = length-1; i >= 0; i--) {
			snake_array.push({x:i, y:0});
		}
	}


	//create food
	function create_food() {
		food = {
			x:Math.round(Math.random()*(width-cw)/cw),
			y:Math.round(Math.random()*(height-cw)/cw)
		};
	}


	//paint snake
	function paint() {
		//paint the canvas
		ctx.fillStyle = "black";
		ctx.fillRect(0, 0, width, height);
		ctx.strokeStyle = "white";
		ctx.strokeRect(0, 0, width, height);

		var nx = snake_array[0].x;
		var ny = snake_array[0].y;

		if(direction == "right") {
			nx++;
		} else if(direction == "left") {
			nx--;
		} else if(direction == "up") {
			ny--;
		} else if(direction == "down") {
			ny++;
		}

		//colide code
		if (nx == -1 || nx == width/cw || ny == -1 || ny == height/cw || check_collision(nx, ny, snake_array)) {
			//init();
			//insert final score
			$('#final_score').html(score);
			//show overlay
			$('#overlay').fadeIn(300);
			return;
		}

		if(nx == food.x && ny == food.y) {
			var tail = {
				x : nx, 
				y : ny
			};
			score++;

			//create new food
			create_food();
		} else {
			var tail = snake_array.pop();
			tail.x = nx;
			tail.y = ny;
		}

		snake_array.unshift(tail);

		for(var i = 0; i < snake_array.length; i++) {
			var c = snake_array[i];
			paint_cell(c.x, c.y);
		}

		//paint cell
		paint_cell(food.x, food.y);

		//check score
		checkscore(score);

		//display current score
		$('#score').html('Your score: ' + score);

	}


	//function paint cell
	function paint_cell(x, y) {
		ctx.fillStyle = color;
		ctx.fillRect(x*cw, y*cw, cw, cw);
		ctx.strokeStyle = "white";
		ctx.strokeRect(x*cw, y*cw, cw, cw);
	}


	//check collision
	function check_collision(x, y, array) {
		for (var i =0; i < array.length; i++) {
			if (array[i.x == x && array[i].y == y]) {
				return true;
			}
		}
		return false;
	}


	//check score
	function checkscore(score) {
		if (localStorage.getItem('highscore') === null) {
			//if there is no highscore
			localStorage.setItem('highscore', score);
		} else {
			//if there is a highscore
			if (score > localStorage.getItem('highscore')) {
				localStorage.setItem('highscore', score);
			}
		}

		$('high_score').html('Highscore: ' + localStorage.getItem('highscore'));
	}


	//keyboard controller
	$(document).keydown(function(e){
		var key = e.which;

		if (key == "37" && direction != "right") {
			direction = "left";
		} else if (key == "38" && direction != "down") {
			direction = "up";
		} else if (key == "39" && direction != "left") {
			direction = "right";
		} else if (key == "40" && direction != "up") {
			direction = "down";
		}
	});

});



function resetScore() {
	localStorage.highscore = 0;
	
	//display highscore
	highscorediv = document.getElementById('high_score');
	highscorediv.innerHTML = 'High Score: 0';
}