$(document).ready(function () {

    var localButtons = ["Arnold Schwarzenegger","Michael J Fox","Lucille Ball","Taylor Swift","Samuel Jackson",]

    var button;
    var gifSavedButtons = "";

    $("button").on("click", function() {
    var person = $(this).attr("data-person");

    var queryURL =
        "https://api.giphy.com/v1/gifs/search?q=" +
        person +
        "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function(response) {
        var results = response.data;

        for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div>");

            var rating = results[i].rating;

            var p = $("<p>").text("Rating: " + rating);

            var personImage = $("<img>");

            personImage.attr("src", results[i].images.fixed_height_still.url);
            personImage.attr("data-still", results[i].images.fixed_height_still.url);
            personImage.attr("data-animate", results[i].images.fixed_height.url);
            personImage.attr("data-state", "still");
            personImage.addClass("gif");

            gifDiv.append(p);
            gifDiv.append(personImage);

            $("#gifs-appear-here").prepend(gifDiv);
        }
        });
    });

    $("#gifs-appear-here").on("click", ".gif", function() {
    var state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
    });
});