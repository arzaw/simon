var buttonColours = ["red", "blue", "green", "yellow"]
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

function checkAnswer(cuurentLevel){
    if(gamePattern[cuurentLevel]===userClickedPattern[cuurentLevel]){
        if(gamePattern.length===userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            }, 100);
        }
    }
    else{
        $("body").addClass("game-over")
        playsound("wrong")
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").html("Game over press any key to restart")

        startover()
    }
}
function startover(){
    level = 0;
    started = false;
    gamePattern = [];
}
$('.btn').click(function(){
    userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor)
    playsound(userChosenColor)
    animatepress(randomChosenColour)
    checkAnswer(userClickedPattern.length-1)
})

function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").html("Level " + level)

    var randomNumber = Math.floor(Math.random() * 4);
    
    randomChosenColour = buttonColours[randomNumber] 
    gamePattern.push(randomChosenColour)

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playsound(randomChosenColour)
}

function playsound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatepress(currentColor){
    $("#"+currentColor).addClass("pressed");

    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    }, 100);
}

$(document).keypress(function(){
    if(!started){
        $("#level-title").html("Level " + level)
        nextSequence()
        started = true
    }   
})