// Jeffrey Phelps - DU Web Dev Bootcamp 2017/2018 - Week-6 Homework - APIs & AJAX

var topics = ["Trending", "Sports", "News", "Television", "Movies"];

// displayMovieInfo function re-renders the HTML to display the appropriate content
function giffyGiffer() {

	var topic = $(this).attr("data-name");
	var queryURL = "https://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC&limit=12";

	// Creating an AJAX call for the specific movie button being clicked
	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response) {

		var results = response.data;
		
		// Looping over every result item
		for (var i = 0; i < results.length; i++) {

			// Creating a div with the class "item"
			var itemDiv = $("<div class='item'>");
			// Storing the result item's rating
			var rating = results[i].rating;
			// Creating a paragraph tag with the result item's rating
			var p = $("<p>").text("Rating: " + rating);
			// Creating an image tag
			var image = $("<img>");
			// Giving the image tag an src attribute of a proprty pulled off the result item
			image.attr("src", results[i].images.fixed_height.url);
			// Appending the paragraph and image we created to the "item" div we created
			itemDiv.append(p);
			itemDiv.append(image);
			// Prepending the gifDiv to the div in the HTML
			$("#gifDiv").prepend(itemDiv);

		};

	});

}

// Function for displaying gif data
function renderButtons() {

	// Deleting the buttons prior to adding new buttons
	// (this is necessary otherwise you will have repeat buttons)
	$("#buttonsDiv").empty();

	// Looping through the array of topics
	for (var i = 0; i < topics.length; i++) {

		// Then dynamicaly generating buttons for each topic in the array
		var a = $("<button>");
		// Adding a class of topic to our button
		a.addClass("topic");
		// Adding a data-attribute
		a.attr("data-name", topics[i]);
		// Providing the initial button text
		a.text(topics[i]);
		// Adding the button to the buttons div
		$("#buttonsDiv").append(a);
	};

};

// This function handles events where a topic button is clicked
$("#addTopic").on("click", function(event) {
	event.preventDefault();
	// This line grabs the input from the textbox
	var topic = $("#topicInput").val().trim();
	// Adding topic from the textbox to our array
	topics.push(topic);
	// Calling renderButtons which handles the processing of our topic array
	renderButtons();
});

// Adding a click event listener to all elements with a class of "topic"
$(document).on("click", ".topic", giffyGiffer);

// Calling the renderButtons function to display the intial buttons
renderButtons();