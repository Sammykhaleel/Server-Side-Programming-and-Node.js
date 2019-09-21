const express = require("express");
const app = express();

var myLogger = function(req, res, next) {
  req.url;
  console.log(req.url);
  next();
};
var requestTime = function(req, res, next) {
  req.requestTime = Date.now();
  console.log(req.requestTime);
  req.requestTime;
  next();
};

app.use(requestTime);
app.use(myLogger);

app.get("/", function(req, res) {
  //   res.send("Welcome to my app!");
  //   var responseText = "Welcome to my app!";
  //   responseText += "<h1>Requested at: " + req.requestTime + "</h1>";
  //   res.send(responseText);
  var text = "Welcome to Pain Train";
  text += "   url: " + req.url;
  res.send(text);
});

app.get("/secreturl", function(req, res) {
  res.send("This is a secret url with super top-secret content.");
});
app.listen(8080);
