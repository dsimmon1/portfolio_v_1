"use strict";

const sgMail = require('@sendgrid/mail');
const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');
const mongojs = require("mongojs");

const app = express();

let PORT = process.env.PORT || 3000;


app.set('views', __dirname + '/views');
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, '/public')));
app.use("/css", express.static(__dirname + "/css"));
app.use("/js", express.static(__dirname + "/js"));



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get("/", function(req, res) {
    res.render("pages/index");
    });

app.get("/projects", function(req, res) {
    res.render("pages/projects");
    });

app.get("/contact", function(req, res) {
    res.render("pages/contact");
    });

app.post("/contact", function(req, res) {
  const output = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>  
      <li>Name: ${req.body.name}</li>
      <li>Email: ${req.body.email}</li>
      <li>Phone: ${req.body.phone}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
  `
  console.log(output);


  var databaseUrl = 'mongodb://dianna:password@ds013192.mlab.com:13192/boardgame';
var collections = ["contact"];
var db = mongojs(databaseUrl, collections);

db.on("error", function(error) {
  console.log("Database Error:", error);
});

db.contact.find({}, function(err, found) {
    // Log any errors if the server encounters one
    if (err) {
      console.log(err);
    }
    // Otherwise, send the result of this query to the browser
    else {
      console.log(found[0].key2);
  

  sgMail.setApiKey(found[0].key2);
const msg = {
  to: 'simmons.diana93@gmail.com',
  from: 'simmons.diana93@gmail.com',
  subject: req.body.name + ' sent you a new messgae',
  text: 'and easy to do anywhere, even with Node.js',
  html: output
};
sgMail.send(msg);

      }
  });
    });

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
