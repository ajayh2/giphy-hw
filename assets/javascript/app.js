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

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
        $("#movies").empty();

      var results = response.data;
      console.log(response.data);

      var results = response.data;
      
      for (var i = 0; i < results.length; i++) {
        var gifDiv = $("<div>");

        var rating = results[i].rating;

        var p = $("<p>").text("Rating: " + rating);

        var gif = $("<img>");

        gif.attr("src", results[i].images.fixed_height_still.url);
        gif.attr(
          "data-still",
          results[i].images.fixed_height_still.url
        );
        gif.attr("data-animate", results[i].images.fixed_height.url);
        gif.attr("data-state", "still");
        gif.addClass("gif");

        gifDiv.append(p);
        gifDiv.append(gif);

        $("movies").prepend(gifDiv);
      }
    });


  $(".gif").on("click", function() {
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
