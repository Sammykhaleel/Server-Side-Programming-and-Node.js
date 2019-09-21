const express = require("express"),
  morgan = require("morgan"),
  bodyParser = require("body-parser"),
  uuid = require("uuid");
const movies = require("./movies.js");

const app = express();

app.use(bodyParser.json());
app.use(morgan("common"));
app.use(express.static("public"));
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("There has been an error.");
});

var movie = [
  {
    title: "one",
    description: "titleone",
    genres: {
      name: "action",
      description: "String"
    },
    director: {
      name: "String",
      bio: "String"
    },
    actors: ["String"],
    imagePath: "String",
    featured: Boolean
  },
  {
    title: "two",
    description: "titletwo",
    genres: {
      name: "string",
      description: "String"
    },
    director: {
      name: "String",
      bio: "String"
    },
    actors: ["String"],
    imagePath: "String",
    featured: Boolean
  }
];

var users = [
  {
    Username: "string",
    Password: "string",
    Email: "string",
    Birthday: Date,
    FavoriteMovies: ["{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }"]
  }
];

app.get("/movies", (req, res) => {
  res.json(movies);
});

app.get("/movies/:title", (req, res) => {
  res.json(
    movies.find(movie => {
      return movie.title === req.params.title;
    })
  );
});

app.get("/movies/:title/:genre/:name", (req, res) => {
  let movie = movies.find(movie => {
    return movie.title === req.params.title;
  });

  if (movie) {
    movie.genres[req.params.genre] = req.params.name;
    res
      .status(201)
      .send(
        "movie name: " +
          req.params.title +
          "  add genre name:  " +
          req.params.name +
          " in " +
          req.params.genre
      );
  } else {
    res
      .status(404)
      .send("movie with the name " + req.params.title + " was not found.");
  }
});

app.listen(8080, () => {
  console.log("Soflix is listening on port 8080");
});
