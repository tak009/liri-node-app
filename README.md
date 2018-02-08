## **LIRI Bot**
LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a Language Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.

## **What can LIRI do?**
LIRI uses Node packages to send API requests to Twitter, Spotify, and OMDB and give you back the data.
- [Twitter](https://www.npmjs.com/package/twitter)
- [Spotify](https://www.npmjs.com/package/node-spotify-api)
- [OMDB](https://www.npmjs.com/package/request)

## **LIRI's Commands**
LIRI can take in one of the following commands:
- my-tweets
- spotify-this-song
- movie-this
- do-what-it-says

## **What Each Command Does**
1. node liri.js my-tweets
    - LIRI will show your last 20 tweets and when they were created at in your terminal/bash window.

2. node liri.js spotify-this-song '<song name here>'
    - LIRI will show the following information about the song in your terminal/bash window
      * Artist(s)
      * The song's name
      * A preview link of the song from Spotify
      * The album that the song is from
      - If song name is not provided, LIRI will set default to "The Sign" by Ace of Base.

3. node liri.js movie-this '<movie name here>'
    - LIRI will output the following information to your terminal/bash window:
      * Title of the movie.
      * Year the movie came out.
      * IMDB Rating of the movie.
      * Rotten Tomatoes Rating of the movie.
      * Country where the movie was produced.
      * Language of the movie.
      * Plot of the movie.
      * Actors in the movie.
      - If movie name is not provided, LIRI will set default to ["Mr. Nobody"](http://www.imdb.com/title/tt0485947/).

  4. node liri.js do-what-it-says
    - LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
    - Feel free to change the text in that document to test out the feature for other commands.
