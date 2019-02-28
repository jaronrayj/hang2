// Create arry
var wordArray = ["string", "number"]

// get random word
var word = wordArray[Math.floor(Math.random() * wordArray.length)];

// Split word into array
var splitWord = word.split("");

var blanksSpaces = [];
var guesses = [];
var correct = 0;
var guessesLeft = 10;

// display split array - whether span or just directly displaying

// blankspaces of word.length
// display blankspaces
function initialBlanks() {
    for (let i = 0; i < splitWord.length; i++) {
        blanksSpaces.push("_ ")
        $("#blanks").append(blanksSpaces[i]);
    }
}


initialBlanks();
// var userInput = userInput.toLowerCase()
// Add guesses
document.onkeyup = function (event) {
    var userInput = event.key.toLowerCase();

    guesses.push(userInput);
    if (event.keyCode >= "65" && event.keyCode <= "90") {
        console.log(guesses);
        // for loop
        for (let i = 0; i < splitWord.length; i++) {
            if (userInput === splitWord[i]) {
                blanksSpaces[i] = userInput;
                correct++;
                if (correct === splitWord.length) {
                    alert("You Won!")
                }
                $("#blanks").empty(blanksSpaces[i]);

                for (let i = 0; i < splitWord.length; i++) {
                    $("#blanks").append(blanksSpaces[i]);
                }

            } else {
                guessesLeft--;
                console.log("guesses left " + guessesLeft);
                if (guessesLeft === 0) {
                    alert("You lost")
                }

            }

        }

    }
}