function ProfilePage() {
    document.getElementById("ProfileOverlay").style.display = "block";
}

function MeanPage() {
    document.getElementById("MeanOverlay").style.display = "block";
}

function ResultsPage() {
    document.getElementById("ResultsOverlay").style.display = "block";
}

function off() {
    document.getElementById("ProfileOverlay").style.display = "none";
    document.getElementById("MeanOverlay").style.display = "none";
    document.getElementById("ResultsOverlay").style.display = "none";
}


var calmresponse = "Great!";
var tenseresponse = "Oh dear!"
var happyresponse = "Yay!"
var sadresponse = "Hang in there!"

function calm() {
    document.getElementById('anx-result').innerHTML = calmresponse;
    console.log()
}

function tense() {
    document.getElementById('anx-result').innerHTML = tenseresponse
}

function happy() {
    document.getElementById('dep-result').innerHTML = happyresponse
}

function sad() {
    document.getElementById('dep-result').innerHTML = sadresponse
}

function 

