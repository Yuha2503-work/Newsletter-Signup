//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){

  var firstName = req.body.fName;
  var lastName = req.body.lName;
  var email = req.body.email;

  var data = {
    members: [
      {
        email_address : email,
        status : "subscribed",
        merge_fields : {
          FNAME : firstName,
          LNAME : lastName,
        }
      }
    ]
  };

  var jsondata = JSON.stringify(data);

  var option = {
    url : "https://us7.api.mailchimp.com/3.0/lists/9e4a2390ec",
    method : "POST",
    headers : { "authorization" : "yuhA2503 683ba16ba35116f16e6568a4d4a008c0-us7" },
    body : jsondata,
  };

  request(option, function(error, response, body){
    if (error) {
      res.sendFile(__dirname + "/failure.html");
    } else {
      if ( response.statusCode === 200 ) {
        res.sendFile(__dirname + "/success.html");
      } else {
        res.sendFile(__dirname + "/failure.html");
      }
    }
  });

});

app.get("/failure",function(req, res){
  res.redirect("/");
});

app.listen( process.env.PORT || 3000, function(){
  console.log("Run success");
});


//apiKey:9e4a2390ec
//683ba16ba35116f16e6568a4d4a008c0-us7
