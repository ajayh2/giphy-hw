$(document).ready(function() {
  var localButtons = [
    "Batman Begins",
    "The Dark Knight",
    "Dark Knight Rises",
    "Breakfast at Tiffany's",
    "Once Upon a Time in Hollywood",
    "Joker",
    "Lighthouse"
  ];

  function displayInfo() {
    var movie = $(this).attr("movie-name");
    var queryURL =
      "http://api.giphy.com/v1/gifs/search?q=" +
      movie +
      "&api_key=dc6zaTOxFJmzC&limit=10";
  }

  $("button").on("click", function() {
    var person = $(this).attr("data-person");

    var queryURL =
      "https://api.giphy.com/v1/gifs/search?q=" +
      person +
      "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      var results = response.data;
      console.log(response.data);

      for (var i = 0; i < results.length; i++) {
        var gifDiv = $("<div>");

        var rating = results[i].rating;

        var p = $("<p>").text("Rating: " + rating);

        var personImage = $("<img>");

        personImage.attr("src", results[i].images.fixed_height_still.url);
        personImage.attr(
          "data-still",
          results[i].images.fixed_height_still.url
        );
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
