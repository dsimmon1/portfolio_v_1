"use strict";

const nodemailer = require('nodemailer');
const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');

const app = express();

let PORT = process.env.PORT || 8080;


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

      let transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: "simmons.diana93@gmail.com",
            pass: "M!sCMBr0wn4Ever!"
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Diana Simmons" <simmons.diana93@gmail.com>', // sender address
        // to: 'iamariellesimonee@gmail.com',
        to: 'simmons.diana93@gmail.com',
        subject: 'New Contact from Website', // Subject line
        text: 'Hello world?', // plain text body
        html: output // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
    });

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
