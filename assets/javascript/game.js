// Create arry
var wordArray = [
    "Bulbasaur", "Ivysaur", "Venusaur", "Charmander", "Charmeleon", "Charizard", "Squirtle", "Wartortle", "Blastoise", "Caterpie", "Metapod", "Butterfree", "Weedle", "Kakuna", "Beedrill", "Pidgey", "Pidgeotto", "Pidgeot", "Rattata", "Raticate", "Spearow", "Fearow", "Ekans", "Arbok", "Pikachu", "Raichu", "Sandshrew", "Sandslash", "Nidoran", "Nidorina", "Nidoqueen", "Nidoran", "Nidorino", "Nidoking", "Clefairy", "Clefable", "Vulpix", "Ninetales", "Jigglypuff", "Wigglytuff", "Zubat", "Golbat", "Oddish", "Gloom", "Vileplume", "Paras", "Parasect", "Venonat", "Venomoth", "Diglett", "Dugtrio", "Meowth", "Persian", "Psyduck", "Golduck", "Mankey", "Primeape", "Growlithe", "Arcanine", "Poliwag", "Poliwhirl", "Poliwrath", "Abra", "Kadabra", "Alakazam", "Machop", "Machoke", "Machamp", "Bellsprout", "Weepinbell", "Victreebel", "Tentacool", "Tentacruel", "Geodude", "Graveler", "Golem", "Ponyta", "Rapidash", "Slowpoke", "Slowbro", "Magnemite", "Magneton", "Farfetchd", "Doduo", "Dodrio", "Seel", "Dewgong", "Grimer", "Muk", "Shellder", "Cloyster", "Gastly", "Haunter", "Gengar", "Onix", "Drowzee", "Hypno", "Krabby", "Kingler", "Voltorb", "Electrode", "Exeggcute", "Exeggutor", "Cubone", "Marowak", "Hitmonlee", "Hitmonchan", "Lickitung", "Koffing", "Weezing", "Rhyhorn", "Rhydon", "Chansey", "Tangela", "Kangaskhan", "Horsea", "Seadra", "Goldeen", "Seaking", "Staryu", "Starmie", "MrMime", "Scyther", "Jynx", "Electabuzz", "Magmar", "Pinsir", "Tauros", "Magikarp", "Gyarados", "Lapras", "Ditto", "Eevee", "Vaporeon", "Jolteon", "Flareon", "Porygon", "Omanyte", "Omastar", "Kabuto", "Kabutops", "Aerodactyl", "Snorlax", "Articuno", "Zapdos", "Moltres", "Dratini", "Dragonair", "Dragonite", "Mewtwo", "Mew"
]


var word;
var pokeDexNumber;
// get random word
function randomWord() {
    var random = (Math.floor(Math.random() * wordArray.length));
    word = wordArray[random];
    pokeDexNumber = random + 1;
}

$("#caughtText").hide();

randomWord();
// Split word into array
var splitWord = word.split("");

var blanksSpaces = [];
var guesses = [];
var correct = 0;
var guessesLeft = 10;
var pokePic;

// display split array - whether span or just directly displaying

// blankspaces of word.length
// display blankspaces
function initialBlanks() {
    for (let i = 0; i < splitWord.length; i++) {
        blanksSpaces.push("_ ")
        $("#blanks").append(blanksSpaces[i]);
    }
}

function display() {
    $("#guessesLeft").text("Guesses left: " + guessesLeft);
    $("#guesses").text("Guesses made: " + guesses);
}

// var userInput = userInput.toUpperCase()
// Add guesses
document.onkeyup = function (event) {
    var userInput = event.key.toUpperCase();


    // NEED TO BE ABLE TO DO MULTIPLE LETTERS

    if (event.keyCode >= "65" && event.keyCode <= "90") {
        // for loop
        for (let i = 0; i < splitWord.length; i++) {
            if (userInput === splitWord[i].toUpperCase()) {
                blanksSpaces[i] = userInput;

                if (!(guesses.includes(userInput))) {
                    guesses.push(userInput);
                    display();
                }
                $("#blanks").empty(blanksSpaces[i]);

                for (let i = 0; i < splitWord.length; i++) {
                    $("#blanks").append(blanksSpaces[i]);
                }

                if (!(blanksSpaces.includes("_ "))) {
                    $("#display").hide();
                    caught();
                    $("#caughtText").show().text("Gotcha! Wild " + word + " was caught! Gotta Catch 'em all?");
                    $("#caughtText").click(function () {
                        newGame();
                    });

                    // .text("Gotcha! Wild " + word + " was caught!")
                    urlCombine();
                    $("#pokePic").append("<img src=" + pokePic + ">");
                }
            } else if (guesses.includes(userInput) || i < (splitWord.length - 1)) {

            } else {
                guessesLeft--;
                guesses.push(userInput);
                console.log("guesses left " + guessesLeft);
                display();
                if (guessesLeft === 0) {
                    $("#display").hide();
                    $("#caughtText").show().text("You missed... The pokémon was " + word + ". Gotta Catch 'em all?");
                    $("#caughtText").click(function () {
                        newGame();
                    });
                }
            }
        }
    }
}

function newGame() {
    $("#appear").hide();
    $("#caughtText").hide();
    battle();
    randomWord();
    splitWord = word.split("");
    $("#blanks").empty();
    correct = 0;
    guessesLeft = 10;
    guesses = [];
    blanksSpaces = [];
    display();
    $("#display").show();
    initialBlanks();
    console.log(word);
}

$("#newGame").on("click",
    function () {
        newGame()
    })

// Picture
function urlCombine() {
    var url = "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/"
    if (pokeDexNumber < 10) {
        pokePic = url + "00" + pokeDexNumber + ".png";
    } else if (pokeDexNumber < 100) {
        pokePic = url + "0" + pokeDexNumber + ".png";
    } else {
        pokePic = url + pokeDexNumber + ".png"
    }
}

// Play beginning audio
var battleMusic = document.getElementById("battle");

function battle() {
    caughtMusic.pause();
    caughtMusic.currentTime = 0;
    battleMusic.play();
}

// Play victory audio
var caughtMusic = document.getElementById("caught");

function caught() {
    battleMusic.pause();
    battleMusic.currentTime = 0;
    caughtMusic.play();
}