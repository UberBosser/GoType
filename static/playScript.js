// Typing game logic...

var text = document.getElementById("typingText");

// Text that was typed will be sent here.
var completedText = document.getElementById("typedText");

var inputBox = document.getElementById("inputBox");

// Split text into word array.
var textArrayWithoutSpaces = text.textContent.split(" ");
var textArray = new Array();

// Add whitespaces.
for (var i = 0; i < textArrayWithoutSpaces.length - 1; i++) {
    var word = textArrayWithoutSpaces[i];
    word += " ";
    textArray.push(word);
}

var i = 0;
var finished = false;


function inputKeyUp() {
    // When a key is released check if the start of the current word matches the input.
    // Then check if the word matches the input, if yes then clear the input and move to the next word.
    if (!finished) {
        if (textArray[i].startsWith(inputBox.value)) {
            inputBox.style.backgroundColor = "#ccffcc";
            if (textArray[i] == inputBox.value) {
                inputBox.value = "";
                completedText.innerHTML += textArray[i];
                text.textContent = text.textContent.replace(textArray[i], "");
                i++;
                // Check if we finished typing.
                if (i > textArray.length) {
                    // End screen.
                    finished = true;
                }
            }     
        } else if (inputBox.value != ""){
            inputBox.style.backgroundColor = "#ffb2b2";
        }
    }

}
