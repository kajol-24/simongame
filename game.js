
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];
var level = 0;
$(document).keypress(function(event){
    if(level === 0)
    {
        nextSequence();
    }
});
$(".btn").click(function(event) {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);

  animatePress(userChosenColour);
  anscheck(userClickedPattern.length-1);
});

function anscheck(curentlevel){
    if(gamePattern[curentlevel] === userClickedPattern[curentlevel])
    {
        console.log("success");
        if(gamePattern.length === userClickedPattern.length)
        {
            setTimeout(function(){
                nextSequence();
            },1000);
            
        }
    }
    else
    {
        console.log("wrong");
        $("body").addClass("game-over");
        playSound("wrong.mp3");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },300);
        $("h1").html("Game over! Press a key to start.");
        startover();
    }

}

function startover(){
    level = 0;
    gamePattern = [];
}
function nextSequence() {
    level++;
    userClickedPattern=[];
    $("h1").html("Level " +  level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
}







function playSound(name) {
  var audio = new Audio(name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" +currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" +currentColor).removeClass("pressed");
  }, 100);
}
