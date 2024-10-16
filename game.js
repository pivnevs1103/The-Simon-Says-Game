// Creates an array of 4 possible choices
let buttonColors = ["red", "blue", "green", "yellow"];
// This is the random color thats chosen from the array above
let randomChosenColour;
// This will store the random pattern that the user has to match
let gamePattern = [];
// This stores users input which will be compared to the game Pattern
let userChosenPattern = [];
// Checks if we are in a game or now
let inGame = false;
// Keeps track of the level
let level = 0;
// Using this index to triverse the userChosenPattern array
let index;

// User must press a key to start the game
$(document).on("keydown", function(){
    // If we are not in game the first sequence is given
    if(!inGame){
    nextSequence();
    // Now we are in game and if the user presses any button the game wont start over
    inGame = true;
    }
});

// Creates a randomized pattern and adds it to the array 
function nextSequence(){
    // Getting a random number between 0 - 3;
    let randomNumber = Math.floor(Math.random() * 4);
    // Getting the random color from the array using a random number
    randomChosenColour = buttonColors[randomNumber];
    // Pushing that random color to the gamePattern array which will be stored
    gamePattern.push(randomChosenColour);
    // The color that gets chosen is highlighed using the function call
    highlighting(randomChosenColour);
    // Plays the sound for the matching color
    playSound(randomChosenColour);
    // Changing the text so that the user knows what level he is on
    $("h1").text("Level "  + (level + 1));
    // Level gets incremented after each function call
    level++;
    // Once the pattern is fully correct the index gets set to 0
    // so that the user input gets checked from the start
    index = 0;
}

// Event Listener that activates on user clicking one of the 4 buttons
$(".button").on("click", function(){
    // Getting the color/ID of the button that the user pressed
    let chosenButton = $(this).attr("id")
    // Highlighting the button
    highlighting(chosenButton);
    // Playing the sound for the button that was clicked
    playSound(chosenButton);
    // Pushing that color onto the stack, so that we can compare it later
    userChosenPattern.push(chosenButton);
    // Calling the method that will check the current input and making sure
    // It matches the pattern
    checkingInput(chosenButton);
    
    // If the index is the same as the lengh of the array that means that
    // every input was correct. We call the method to pop everything of the
    // user stack and resetting the index to 0 and calling the nextSequence
    // fucntion to get the next sequence
    if(index == gamePattern.length){
        popStack(userChosenPattern);
        setTimeout(nextSequence, 1000);
    }
});

// Checks if the current user input is correct
function checkingInput(chosenButton){
    
    // If the input is correct, the index gets incremented and program waits for input
    if(chosenButton == gamePattern[index]){
        index++;
    }
    // IF the input doesnt match the pattern, the gameOver method gets called
    else if (chosenButton !== gamePattern[index]){
        gameOver();
    }
}

// Once the input doesnt match the pattern, everything gets reset
function gameOver(){
    // Changes the h1 to let the user know the game is done and how to start a new one
    $("h1").html("Game Over, Press Any Key to Restart");
    // Plays the sound
    playSound("wrong");
    // Makes the background red to let the user know the game is over
    $("html").addClass("flashRed");
    // removes the red background after 500ms
    setTimeout(function(){
        $("html").removeClass("flashRed");  
    }, 500);
    // We are not in game anymore and allows the user the press any key
    // to start the game over
    inGame = false;
    // Reseting the level to 0 again
    level = 0;
    //Popping everything off the stacks
    popStack(userChosenPattern);
    popStack(gamePattern);
}

// Traverses the array backwards and pops everything of the stack
function popStack(array){
    for(let i = array.length; i > 0; i--){
        array.pop();
    }
}


// Highlights the button based on the color that gets passed in
function highlighting(color){
    $("#" + color).animate({ opacity: 0 }).animate({ opacity: 1 });
}

// Uses a switch statement to play the sound based on the color that gets 
// passed in
function playSound(color){
    let audio;
    switch(color){
        case "red": 
            audio = new Audio("./sounds/red.mp3");
            break;
        case "green": 
            audio = new Audio("./sounds/green.mp3");
            break;
        case "blue": 
            audio = new Audio("./sounds/blue.mp3");
            break;
        case "yellow": 
            audio = new Audio("./sounds/yellow.mp3");
            break;
        default: audio = new Audio("./sounds/wrong.mp3")
    }
    audio.play();
}