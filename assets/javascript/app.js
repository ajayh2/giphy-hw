$(document).ready(function() {
    var topics = [
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
        "https://api.giphy.com/v1/gifs/search?q=" +
        movie +
        "&api_key=dc6zaTOxFJmzC&limit=10";
  
      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        $("#movies").empty();
  
        var results = response.data;
  
        for (var i = 0; i < results.length; i++) {
          var gifDiv = $("<div class='personMovie'>");
  
          var rating = results[i].rating;
          var pRate = $("<p>").text("Rating: " + rating);
  
          var urlStill = results[i].images.fixed_height_still.url;
          var urlPlay = results[i].images.fixed_height.url;
  
          var gif = $("<img>")
            .addClass("gif")
            .attr("src", urlStill)
            .attr("data-still", urlStill)
            .attr("data-animate", urlPlay)
            .attr("data-state", "still");
  
          gifDiv.append(gif);
          gifDiv.append(pRate);
  
          $("#movies").append(gifDiv);
        }
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
    }
  
    function renderButtons() {
      $("#movieButtons").empty();
      for (var i = 0; i < topics.length; i++) {
        var movieRender = $("<button>");
        movieRender.addClass("movie");
        movieRender.attr("movie-name", topics[i]);
        movieRender.text(topics[i]);
        $("#movieButtons").append(movieRender);
      }
    }
  
    $("#addMovie").on("click", function(event) {
      event.preventDefault();
      var movie = $("#movie-input")
        .val()
        .trim();
  
      topics.push(movie);
      $("#movie-input").val(" ");
      renderButtons();
    });
  
    $(document).on("click", ".movie", displayInfo);
  
    renderButtons();
  });
  
