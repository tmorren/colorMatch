var instance;
var score;
var precision = 20;

var count;//Number of seconds the player has
var counter; //Will be used to setInterval

$( document ).ready(function() {
    $("#startScreen").fadeIn();
});

class colorMatch{
	constructor(){
		instance = this;
		this.red = getRandomInt(0, 255);
		this.green = getRandomInt(0, 255);
		this.blue = getRandomInt(0, 255);

		this.bindEvents();
	}

	bindEvents(){
	}
}

/* Function that executes when the start button is clicked */
$(".startButton").click(function(){
	score = 0;
	count = 60;

	currentScreen = $(this).parent().attr("id");

	if (currentScreen == "startScreen") {
		$("#startScreen").fadeOut(300, function() {
			$("#gameScreen").fadeIn();
		});
	} else if (currentScreen == "endScreen") {
		$("#endScreen").fadeOut(300, function() {
			$("#gameScreen").fadeIn();
		});
	}

	playerRed = $("#playerRed").val();
	playerGreen = $("#playerGreen").val();
	playerBlue = $("#playerBlue").val();
	$("#playerRedVal").val(playerRed);
	$("#playerGreenVal").val(playerGreen); 
	$("#playerBlueVal").val(playerBlue);
	
	$("#gameScreenScore").html(score);
	newColor();
	document.getElementById("gameTimer").innerHTML = count; 
	counter = setInterval(timer, 1000);
});

/* Function that executes when a player slides any of the color values */
$('input[type=range]').on('input', function () {
	playerRed = $("#playerRed").val();
	playerGreen = $("#playerGreen").val();
	playerBlue = $("#playerBlue").val();

	$("#playerRedVal").val(playerRed);
	$("#playerGreenVal").val(playerGreen); 
	$("#playerBlueVal").val(playerBlue);

	matchRed = instance.red;
	matchGreen = instance.green;
	matchBlue = instance.blue;

	colorString = playerRed + ", " + playerGreen + ", " + playerBlue;
	$("#playerColor").css("background-color", "rgb(" + colorString + ")");

	check = matchCheck(playerRed, playerGreen, playerBlue, matchRed, matchGreen, matchBlue);
	
	if (check == 3) {
		score++;
		$("#gameScreenScore").html(score);
		newColor();
	}
});

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* Function that executes when a new match color is needed */
function newColor(){
	color = new colorMatch();
	red = color.red;
	blue = color.blue;
	green = color.green;

	colorString = red + ", " + green + ", " + blue;

	$("#matchColor").css("background-color", "rgb(" + colorString + ")");
}

/* Checks to see if the color is a match. If it is, it will return 3 */
function matchCheck(pR, pG, pB, mR, mG, mB){
	check = 0;

	//Check to see if all the three colors are within ten of the match value
	if (Math.abs(pR - mR) <= precision ) {
    	check++;
 	}

 	if (Math.abs(pG - mG) <= precision ) {
    	check++;
 	}

 	if (Math.abs(pB - mB) <= precision ) {
    	check++;
 	}

 	return check;
};

/* Count down timer */
function timer()
{
    if (count <= 1)
    {
        clearInterval(counter);
        $("#gameScreen").fadeOut(300, function() {
			$("#endScreen").fadeIn();
			$("#finalScore").html("Final Score: " + score);
		});
		
        return;
    }
    count--;
    document.getElementById("gameTimer").innerHTML= count; 
 }