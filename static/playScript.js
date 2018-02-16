// Typing game logic...

function getWord(text) {
    // Gets next word, delimits at a space (" ").
    var word = "";
    for (var i = 0; i < text.text().length; i++) {
        word += text.text().charAt(i);
        if (text.text().charAt(i) == " ") {
            return word;
        }
    }
    return word;
}

$(document).ready(function() {
    // Text to type, whole text.
    var typingText = $("#typingText");
    // Starting length of typingText.
    var typingTextSize = typingText.text().length;
    // Currently typing word.
    var currentWord = $("#currentWord");
    // Already typed text.
    var typedText = $("#typedText");
    // Percentage & wpm bar.
    var progressBar = $("#progressBar");
    // Set starting word.
    currentWord.text(getWord(typingText));
    typingText.text(typingText.text().replace(currentWord.text(), ""));
    // To calculate wpm. 
    var startTime = new Date;
    // On input logic...
    $("#inputBox").on('input', function() { 
        if ($(this).val() == currentWord.text()) {
            typedText.text(typedText.text() + currentWord.text());
            currentWord.text(getWord(typingText));
            typingText.text(typingText.text().replace(currentWord.text(), ""));
            $(this).val("");
            // Percentage & wpm bar updating.
            var percentage = (typedText.text().length/typingTextSize) * 100;
            var wpm = Math.floor((typedText.text().length/5)/((new Date() - startTime)/60000));
            progressBar.css("width", percentage + "%");
            progressBar.text("wpm: " + wpm);
        } else if (currentWord.text().startsWith($(this).val())) {
            $(this).css("background-color", "#ccffcc");
        } else if ($(this).val() != "") {
            $(this).css("background-color", "#ffb2b2");
        }
    });
});

