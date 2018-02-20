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
    // Get GameID and create AJAX URL.
    var gameId = userData.attr("data-gameid");
    var dataUrl = "/data/" + gameId;
    // To calculate wpm. 
    var startTime = new Date;
    // On input logic...
    setInterval(function() {
        // Percentage & wpm bar updating.
        var percentage = (typedText.text().length/typingTextSize) * 100;
        // Send data.
        $.ajax({
            url: dataUrl,
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
            url: dataUrl,
            dataType: "json",
            data: data,
            success: function(data) {
                if (data.CountdownTime == 0) {
                    if ($("#inputBox").prop("disabled") == true) {
                        $("#inputBox").prop("disabled", false);
                        $("#inputBox").focus();
                    } else {
                        if (data.GameTime == 0) {
                              
                        } else {
                            $("#countdownTime").text("Time 'til finish: " + data.GameTime);
                        }
                    }
                } else {  
                    $("#countdownTime").text("Starting in " + data.CountdownTime + " seconds...");
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

