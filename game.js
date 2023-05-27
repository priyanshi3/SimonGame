 var buttonColours=["red", "blue", "green", "yellow"];
 var randomChosenColour;
 var gamePattern=[];
 var userClickedPattern=[];
 var level = 0;
 var started = false;

 $(document).keypress(function() {
    if(started == false) {
        $('#level-title').text("Level " + level);
        nextSequence();
        started = true;
    }
 });

$('.btn').click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function nextSequence() {
    level++;
    userClickedPattern=[];
    $('#level-title').text("Level " + level);

    var randomNumber=Math.random();
    randomNumber=Math.floor(randomNumber*4);
    randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $('#'+randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(name) {
    var audio = new Audio('sounds/'+name+'.mp3');
    audio.play();
}

function animatePress(currentColour) {
    $('#'+currentColour).addClass("pressed");
    setTimeout(function() {
        $('#'+currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    if(userClickedPattern[currentLevel]==gamePattern[currentLevel]) { 
        console.log("success");
        if(userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000); 
        }
    } 
    else { 
        playSound("wrong");
        $(document).addClass("game-over");
        setTimeout(function() {
            $(document).removeClass("game-over");
        }, 200); 
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    } 
}

function startOver() {
    level=0;
    gamePattern=[];
    started = false;
}