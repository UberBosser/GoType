// Typing game logic...

// Text that was typed will be sent here.
var completedText = document.getElementById("typedText");
// Text that is currently getting typed will be sent here.
var currentWord = document.getElementById("currentWord");
// Text to type is located here.
var text = document.getElementById("typingText");

var inputBox = document.getElementById("inputBox");


function getWord() {
    var word = "";
    for (var i = 0; i < text.innerHTML.length; i++) {
        word += text.innerHTML.charAt(i);
        if (text.innerHTML.charAt(i) == " ") {
            currentWord.innerHTML = word;
            return;
        }
    }
    currentWord.innerHTML = word;
}

getWord();
text.innerHTML = text.innerHTML.replace(currentWord.innerHTML, "");

function inputKey() {
    if (inputBox.value == currentWord.innerHTML) {
        completedText.innerHTML += currentWord.innerHTML;
        getWord();
        text.innerHTML = text.innerHTML.replace(currentWord.innerHTML, "");
        inputBox.value = "";
    } else if (currentWord.innerHTML.startsWith(inputBox.value) && inputBox.value != "") {
        inputBox.style.backgroundColor = "#ccffcc";
    } else if (inputBox.value != "") {
        inputBox.style.backgroundColor = "#ffb2b2";
    }
}

