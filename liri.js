//============================= required items and vars go here =====================================

//spotify
var Spotify = require('node-spotify-api');

//npm request
var request = require('request');

require('dotenv').config()

//fs
var fs = require('fs');

//twitter keys
var keys = require('./keys.js');

//store the log in a variable
var logName = './log.txt';

//store the users command
var command = process.argv[2];

//store the users argument
var argument = "";


//============================= call the start App function =========================

startApp(command, argument);

//defining the start app function
function startApp(command, argument) {

  //define argument again
	argument = process.argv.slice(3).join(" ");

  //switch block for different commands
	switch (command) {
    
    //====================== Bands In Town ========================
		// Gets list of tweets.
		case "my-bands": 
		  bandsInTown();
		  break;

    //============================ Spotify ========================
		// Gets song information.
    case "spotify-song":
    
      // First gets song title argument.
      var songTitle = argument;
    
      // Get song information from Spotify.
      getSongInfo(songTitle);
      break;

    //=========================== OMDBapi ========================
		// Gets movie information.
		case "movie":

      // First gets movie title argument.
      var movieTitle = argument;

      getMovieInfo(movieTitle);
      break;
		
	}
}


// Function to show my last tweets.
function bandsInTown() {
	
	
}

// Calls Spotify API to retrieve song information for song title.
function getSongInfo(songTitle) {

	// Calls Spotify API to retrieve a track.
	spotify.search({type: 'track', query: songTitle}, function(err, data) {
		if (err) {
			logOutput.error(err);
			return
		}

		/* The Spotify node module defaults to 20 no matter what.
		Attempted to add a limit, which seems to do nothing.
		Homework requirements suggest we should only return one song.
		Used array properties to retrict songs returns.
		There could very well be a better way to do this.
		But it's as close to requirements I could get using Spotify module.
		*/
		var artistsArray = data.tracks.items[0].album.artists;

		// Array to hold artist names, when more than one artist exists for a song.
		var artistsNames = [];

		// Pushes artists for track to array.
		for (var i = 0; i < artistsArray.length; i++) {
			artistsNames.push(artistsArray[i].name);
		}

		// Converts artists array to string, and makes it pretty.
		var artists = artistsNames.join(", ");

		// Prints the artist(s), track name, preview url, and album name.
		logOutput("Artist(s): " + artists);
		logOutput("Song: " + data.tracks.items[0].name)
		logOutput("Spotify Preview URL: " + data.tracks.items[0].preview_url)
		logOutput("Album Name: " + data.tracks.items[0].album.name);
	});
	
}

// gets movie information.
function getMovieInfo(movieTitle) {

  
	// Runs a request to the OMDB API with the users input
	var queryUrl = "http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&tomatoes=true&r=json";

	request(queryUrl, function(error, response, body) {
    
    var movie = JSON.parse(body);
       
    // Prints out movie info.
    console.log("Movie Title: " + movie.Title);
    console.log("Release Year: " + movie.Year);
    console.log("IMDB Rating: " + movie.imdbRating);
    console.log("Country Produced In: " + movie.Country);
    console.log("Language: " + movie.Language);
    console.log("Plot: " + movie.Plot);
    console.log("Actors: " + movie.Actors);
    console.log("Rotten Tomatoes URL: " + movie.tomatoURL);
	});
}


