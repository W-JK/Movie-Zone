/// THIS SCRIPT IS ADDED TO THE INDEX_1.HTML

////FUNCTION TO GET SEARCHED MOVIE USING OMDB-API

let title = $("#movieTitle");
let desc = $("#content");
let result;

function getMovie(movieTitle) {
  // $("#container").empty();
  // $("#content").empty();
  $("#wrapper").empty();
  var queryURL = "https://www.omdbapi.com/?t=" + movieTitle + "&apikey=trilogy";

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);

    result = response;

    console.log(response.Ratings[0].Source);

    // <div class="row no-gutters">
    let div2 = $("<div>").addClass("row no-gutters rowContent");
    let col = $("<div>").addClass("col-md-4");
    div2.append(col);
    let poster = $("<img>")
      .addClass("card-image-top")
      .css({ height: "550px", width: "550px" })
      .attr("src", response.Poster);
    col.append(poster);
    $("#wrapper").append(div2);
    //       <div class="col-md-4">
    //         <img class="card-img-top" src="./assets/Images/PvnA3o.jpg" alt="Card image cap">
    //       </div>

    // creating dynamic elements

    //  let div1 = $("<div>").attr("id", "movie-details");
    //  let head = $("<h5>").addClass("card-title").attr("id", "movie-title").text(response.Title);
    //  let poster = $("<img>").addClass("card-image-top").attr("src", response.Poster);

    //  appending dynamic elements to movie-title attribute
    //  $("#movie-details").prepend(head, poster)
    //     $("#wrapper").append(div1)

    // call get ratings func
    getRating(response);
  });
}

const getRating = (response) => {
  //   <div class="col-md-8">
  let divs = $("<div>").addClass("col-md-8");
  $(".rowContent").append(divs);
  let div2 = $("<div>").addClass("card-body");
  let head = $("<h4>").addClass("card-title").text(response.Title);
  let header = $("<p>").text("Description: ");
  let p = $("<p>").text(response.Plot);
  let rating = $("<p>").text("Rating: " + response.Rated);
  let like = $("<button>").attr("id", "thumbsUp");
  let thumbsUp = $("<i>").addClass("far fa-thumbs-up").attr("id", "thumbsU");
  like.append(thumbsUp);
  let unlike = $("<button>").attr("id", "thumbsDown");
  let thumbsDown = $("<i>")
    .addClass("far fa-thumbs-down")
    .attr("id", "thumbsD");
  unlike.append(thumbsDown);
  div2.append(head, header, p, rating);
  let buttonHead = $("<p>").addClass("card-button");
  let button1 = $("<button>")
    .attr("type", "button")
    .addClass("btn-sm btn-primary click-me")
    .text("Watch Now");
  buttonHead.append(button1);
  divs.append(div2);

  //   <div class="card-body">
  //     <h4 class="card-title">Movie Title</h4>
  //     <p class="card-text">Film description goes here. Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate amet beatae incidunt commodi nam officiis, fugiat nihil eveniet sapiente quaerat quo possimus, nesciunt facilis perferendis error autem molestias, itaque eaque.</p>
  //     <p class="card-button"><button type="button" class="btn-sm btn-primary">Watch Now</button></p>
  //   </div>
  // </div>
  // dynamically creating tags and attributes below

  //  let contentDiv = $("<div>").attr("id", "content");

  //   let header = $("<h2>").text("Plot: ")
  //   let p = $("<p>").text(response.Plot);
  //   let rating = $("<p>").text("Rating: " + response.Rated);
  //   let like = $("<button>").attr("id", "thumbsUp");
  //   let thumbsUp = $("<i>").addClass("far fa-thumbs-up").attr("id", "thumbsU");
  //   like.append(thumbsUp)
  //   let unlike = $("<button>").attr("id", "thumbsDown");
  //   let thumbsDown = $("<i>").addClass("far fa-thumbs-down").attr("id", "thumbsD")
  //   unlike.append(thumbsDown)
  //   $("#content").append(header, p, rating);

  for (let i = 0; i < response.Ratings.length; i++) {
    let source = $("<p>").text(response.Ratings[i].Source);
    let val = $("<p>").text(response.Ratings[i].Value);
    $(".card-body").append(source, val, like, unlike, buttonHead);
  }

  // $("#wrapper").append(contentDiv);
};

// click function to callback getMovie function

$(".search-button").on("click", function (event) {
  event.preventDefault();
  let userInput = $("#search-box").val().trim();

  console.log(userInput);

  // saving user input to local storage for manipulation later
  localStorage.setItem("searchInput", userInput);

  // let userInputYear = $("#search-year").val().trim();
  // console.log(userInput);
  // console.log(userInputYear);

  // saving user input to local storage for manipulation later

  //  localStorage.setItem("searchYear", userInputYear),

  getMovie(userInput);
});

$(document).on("click", "#thumbsUp", function (e) {
  if ($("#thumbsU").hasClass("far fa-thumbs-up")) {
    $("#thumbsU").removeClass().addClass("fas fa-thumbs-up");
  } else {
    $("#thumbsU").removeClass().addClass("far fa-thumbs-up");
  }
});

$(document).on("click", "#thumbsDown", function (e) {
  if ($("#thumbsD").hasClass("far fa-thumbs-down")) {
    $("#thumbsD").removeClass().addClass("fas fa-thumbs-down");
  } else {
    $("#thumbsD").removeClass().addClass("far fa-thumbs-down");
  }
});

$(".button5").on("click", function (e) {
  // $(this).data("country");

  let country = $(this).data("country");
  // console.log(this.dataset.country)

  localStorage.setItem("country", country);
});

$(document).on("click", ".click-me", function (e) {
 // window.location.href = "../../pricesearch.html";
 window.open("./pricesearch.html");
});

// modal logic