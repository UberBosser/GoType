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
    typingText.text(typingText.text().replace("\n", ""));
    // Use data like UUID and UserNumber. 
    var userData = $("#userData");
    // Starting length of typingText.
    var typingTextSize = typingText.text().length;
    // Currently typing word.
    var currentWord = $("#currentWord");
    // Already typed text.
    var typedText = $("#typedText");
    // Percentage & wpm bar.
    var progressBar = $("#userBar" + userData.attr("data-usernumber"));
    // Set starting word.
    currentWord.text(getWord(typingText));
    typingText.text(typingText.text().replace(currentWord.text(), ""));
    // To calculate wpm. 
    var startTime = new Date;
    // On input logic...
    setInterval(function() {
        // Percentage & wpm bar updating.
        var percentage = (typedText.text().length/typingTextSize) * 100;
        // Send data.
        $.ajax({
            url: "/data",
            type: "PUT",
            data: JSON.stringify({
                "Uuid": userData.attr("data-uuid"), 
                "UserNumber": parseInt(userData.attr("data-usernumber")), 
                "Characters": typedText.text().length,
                "Percentage": Math.floor(percentage)
            }),
            contentType: "application/json" ,
        });
        // Get data & update Bars. 
        var data;
        $.ajax({
            url: "/data",
            dataType: "json",
            data: data,
            success: function(data) {
                $("#countdownTime").text("Time: " + data.CountdownTime);
                if (data.CountdownTime == 0) {
                    $("#inputBox").prop("disabled", false);
                    $("#inputBox").focus();
                }
                for (var i = 0; i < data.Users.length; i++) {
                    $("#userBar" + i).css("width", data.Users[i].Percentage + "%");
                    $("#userBar" + i).text("wpm: " + Math.floor(data.Users[i].Wpm));
                }
            }
        });
    }, 1000);
    $("#inputBox").on('input', function() {
        if ($(this).val() == currentWord.text()) {
            typedText.text(typedText.text() + currentWord.text());
            currentWord.text(getWord(typingText));
            typingText.text(typingText.text().replace(currentWord.text(), ""));
            $(this).val("");  
        } else if (currentWord.text().startsWith($(this).val())) {
            $(this).css("background-color", "#ccffcc");
        } else if ($(this).val() != "") {
            $(this).css("background-color", "#ffb2b2");
        }
    });
});

