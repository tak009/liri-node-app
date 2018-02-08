require("dotenv").config();
var keys = require("./keys");
var request = require("request");
var fs = require("fs");
var log4js = require('log4js');
var Spotify = require("node-spotify-api");
var Twitter = require("twitter");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var inputArr = process.argv;
var userCommand = inputArr[2];
var userInput = "";
var spotifyFilter = "";
var movieName = "";

if (inputArr.length <= 4) {
  userInput = inputArr[3];
} else {
  for (var i = 3; i < inputArr.length; i++) {
    userInput += " " + inputArr[i];
  }
}

checkApiType(userCommand);


function checkApiType(type) {
  switch (type) {
    case "my-tweets":
      twitterAPI();
      break;
    case "spotify-this-song":
      spotifyAPI();
      break;
    case "movie-this":
      omdbAPI();
      break;
    case "do-what-it-says":
      openRandomFile();
      break;
    default:
      console.log("Hi! How can I help you?");
  }
}

function twitterAPI() {
  client.get('statuses/home_timeline', {
    count: 20
  }, function(error, tweets, response) {
    if (error) throw error;
    var count = 0;

    appendLogs();
    console.log("\n================  TWITTER  ================\n");

    tweets.forEach(function(tweet) {
      count++;
      console.log("Tweet #" + count + ": " + tweet.text + "\nCreated Date: " + tweet.created_at + "\n");
    });
  });
}

function spotifyAPI() {
  if (userInput !== undefined) {
    spotifyFilter = userInput.trim();
  } else {
    spotifyFilter = "The Sign artist:Ace of Base";
  }

  spotify.search({
      type: "track",
      query: spotifyFilter,
      limit: 1
    })
    .then(function(response) {
      var spotifyObj = response.tracks.items[0];
      var artists = spotifyObj.artists[0].name;
      var songName = spotifyObj.name;
      var previewUrl = spotifyObj.external_urls.spotify;
      var album = spotifyObj.album.name;

      spotifyObj = checkNull(spotifyObj);
      artists = checkNull(artists);
      songName = checkNull(songName);
      previewUrl = checkNull(previewUrl);
      album = checkNull(album);

      appendLogs();
      console.log("\n================  SPOTIFY  ================\nArtist(s): " + artists +
        "\nSong Name: " + songName +
        "\nPreview Link from Spotify : " + previewUrl +
        "\nAlbum: " + album + "\n");
    })
    .catch(function(err) {
      console.log(err);
    });
}

function omdbAPI() {
  if (userInput !== undefined) {
    movieName = userInput.trim();
  } else {
    movieName = "Mr. Nobody";
  }

  var queryUrl = "http://www.omdbapi.com/?i=tt3896198&apikey=77c7f5a3&t=" + movieName;

  request(queryUrl, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var movieObj = JSON.parse(body);

      appendLogs();

      if (movieObj.Ratings[1] !== undefined) {
        console.log("\n================  OMDB  ================\nTitle: " + movieObj.Title +
          "\nYear: " + movieObj.Year +
          "\nIMDB Rating: " + movieObj.imdbRating +
          "\nRotten Tomatoes Rating: " + movieObj.Ratings[1].Value +
          "\nCountry where the movie was produced: " + movieObj.Country +
          "\nLanguage: " + movieObj.Language +
          "\nPlot: " + movieObj.Plot +
          "\nActors: " + movieObj.Actors + "\n");
      } else {
        console.log("Oops! something went wrong. Please check the movie name.");
      }
    } else {
      console.log('error:', error);
    }
  });
}

function openRandomFile() {
  fs.readFile("random.txt", "utf-8", function(error, data) {
    if (error) {
      return console.log(error);
    }
    var contents = data.trim();

    if (contents.indexOf(",") > -1) {
      userInput = contents.substr(contents.indexOf(",") + 1);
      checkApiType(contents.substr(0, contents.lastIndexOf(",")));
    }
    else {
      checkApiType(contents);
    }
  });

}

function appendLogs() {
  log4js.configure({
    appenders: {
      out: {
        type: 'console'
      },
      app: {
        type: 'file',
        filename: 'log.txt'
      }
    },
    categories: {
      default: {
        appenders: ['out', 'app'],
        level: 'info'
      }
    }
  });

  const logger = log4js.getLogger('console');
  console.log = logger.info.bind(logger);;
}

function checkNull(obj) {
  if (obj === null) {
    return "Not Available";
  } else {
    return obj;
  }
}
