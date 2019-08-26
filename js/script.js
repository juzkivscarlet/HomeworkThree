$("#jumbotron").hide();
$("#jumbotron").fadeIn(1000);

$("#game").hide();
$("#game").fadeIn(1000);

$(document).ready(function() {

    var canvas = document.getElementById("canvas");
    var isPlaying = false;

    // Word array
    var words = [
        "guitar", 
        "canvas", 
        "monitor", 
        "mathematics", 
        "science", 
        "history", 
        "foreign", 
        "malignant", 
        "drone", 
        "technology",
        "connotation",
        "definition",
        "grandmother",
        "antarctica",
        "auroraborealis"
    ];

    var answerArr = [];

    // Choose random word from array
    var rightWord = words[Math.floor(Math.random()*words.length)];

    // Counter variables
    var winCount = 0;
    var lossCount = 0;
    var livesCount = 10;

    // Keep letters guessed by users in these arrays, used for validation later
    var wrongGuesses = [];
    var correctGuesses = [];

    // Generate new word
    function newWord() {
        rightWord = words[Math.floor(Math.random()*words.length)];
        isPlaying = true;

        // Reset guessing
        $("#guess").text("");
        for(var i=0; i < rightWord.length; i++) {
            $("#guess").prepend("_");
            answerArr[i] = "_";
        }

        // Reset displayed guesses & arrays
        correctGuesses = [];
        wrongGuesses = [];
        $("#correctGuesses").text("");
        $("#wrongGuesses").text("");

        $("#title").text("Guess the letters: ");

        // Reset lives & hangman
        livesCount = 10;
        $("#lives").text(livesCount);
        draw(10);
    }

    // Onclick events: generate new word, give up
    $("#new-word").click(function() {
        newWord();
    });

    $("#give-up").click(function() {
        if(isPlaying==true) lose();

        // Draw entire hangman
        for(var m=livesCount; m>-1; m--) {
            draw(m);
        }

        // Set lives = 0
        livesCount=0;
        $("lives").text(livesCount);
    });

    // Display default text for counters
    $("#wins").text(winCount);
    $("#losses").text(lossCount);
    $("#lives").text(livesCount);

    // Generate new word on page load
    newWord();

    // On key down function
    document.onkeydown = function(event) {

        // Get key pressed, lower case
        var y = String.fromCharCode(event.keyCode);
        y=y.toLowerCase();

        if(rightWord.includes(y)) {

            if(isPlaying==true && correctGuesses.includes(y)==false) getLetter(y);
            

        } else {
            if(livesCount==0) {

                // End game
                lose();

            } else {
                if(isPlaying==true) {
                    
                    // check if letter has already been entered
                    if(wrongGuesses.includes(y)==false) {

                        livesCount--;
                        $("#lives").text(livesCount);

                        wrongGuesses.push(y);
                        $("#wrongGuesses").append(y);

                        draw(livesCount);
                    }
                }
            }
        }
    }

    // Check letter guess
    function getLetter(l) {
        
        // Put correct guesses in array
        correctGuesses.push(l);
        $("#correctGuesses").append(l);
        $("#guess").text("");

        for(var k=0; k < rightWord.length; k++) {
            if(rightWord[k]===l) {
                answerArr[k] = l;
            }
            $("#guess").append(answerArr[k]);
        }

        if(answerArr.indexOf("_") == -1) win();
        
    }

    // Draw hangman
    function draw(n) {
        if(canvas.getContext) {
            var ctx = canvas.getContext("2d");

            if(n==10) {
                ctx.clearRect(0,0, canvas.width, canvas.height);
            } else if(n==9) {
                // Draw frame, when n = 9, 8, 7, or6 6
                ctx.fillRect(25,175,150,5);
            } else if(n==8) {
                ctx.fillRect(50,25,5,150);
            } else if(n==7) {
                ctx.fillRect(50,25,50,5);
            } else if(n==6) {
                ctx.fillRect(100,25,5,25);
            } else if(n==5) {
                // draw head
                ctx.beginPath();
                ctx.arc(102,65,15,0,Math.PI*2,false);
                ctx.stroke();
                ctx.fill();
            } else if(n==4) {
                // draw spine
                ctx.fillRect(100,80,5,50);
            } else if(n==3) {
                // draw left arm
                ctx.fillRect(75,90,25,3);
            } else if(n==2) {
                // draw right arm
                ctx.fillRect(105,90,25,3);
            } else if(n==1) {
                // draw left leg
                ctx.fillRect(70,126,30,4);
            } else if(n==0) {
                // draw right leg
                ctx.fillRect(105,126,30,4);
            }
        }
    }

    function lose() {
        isPlaying = false;
        lossCount++;
        $("#guess").text(rightWord);
        $("#losses").text(lossCount);
        $("#title").text("You lose!")
    }

    function win() {
        isPlaying = false;
        winCount++;
        $("#wins").text(winCount);
        $("#title").text("You win!");
    }

});