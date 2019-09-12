const express = require("express");
const app = express();
const morgan = require("morgan");
const Movie = require("./movies");
const Text = require("./text");
// const http = require("http"),
//   url = require("url");

// http
//   .createServer((request, response) => {
//     var requestURL = request.url;
//     if (requestURL.pathname == "documentation.html") {
//       response.writeHead(200, { "Content-Type": "text/plain" });
//       response.end("Documentation on the bookclub API.\n");
//     } else {
//       response.writeHead(200, { "Content-Type": "text/plain" });
//       response.end("Welcome to my book club!\n");
//     }
//   })
//   .listen(8080);

// console.log("My first Node test server is running on Port 8080.");

let topBooks = [
  {
    title: "Harry Potter and the Sorcerer's Stone",
    author: "J.K. Rowling"
  },
  {
    title: "Lord of the Rings",
    author: "J.R.R. Tolkien"
  },
  {
    title: "Twilight",
    author: "Stephanie Meyer"
  }
];

// GET requests
var myLogger = function(req, res, next) {
  console.log(req.url);
  next();
};
var requestTime = function(req, res, next) {
  req.requestTime = Date.now();
  next();
};
app.use(myLogger);
app.use(requestTime);
app.use(morgan("common"));
app.use(express.static("public"));
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});
// app.get("/", function(req, res) {
//   res.send("Welcome to my book club!");
// });
// app.get("/", function(req, res) {
//   res.send("Welcome to my app!");
// });
app.get("/index.html", function(req, res) {});
app.get("/", function(req, res) {
  res.send("Welcome to my app!");
  //   var responseText = "Welcome to my app!";
  //   responseText += "<small>Requested at: " + req.requestTime + "</small>";
  //   res.send(responseText);
});
app.get("/secreturl", function(req, res) {
  res.send("This is a secret url with super top-secret content.");
  //   var responseText = "This is a secret url with super top-secret content.";
  //   responseText += "<small>Requested at: " + req.requestTime + "</small>";
  //   res.send(responseText);
});

app.get("/documentation", function(req, res) {
  res.sendFile("public/documentation.html", { root: __dirname });
});
app.get("/books", function(req, res) {
  res.json(topBooks);
});

app.get("/movies", function(req, res) {
  console.log(Movie);
  res.json(Movie);
});

app.get("/text", function(req, res) {
  //   console.log(Movie);
  res.send(Text);
});

// listen for requests
app.listen(8080, () => console.log("Your app is listening on port 8080."));
