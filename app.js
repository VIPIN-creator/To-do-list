const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();
const newItems =["Code","Sleep", "Repeat"];
const workItems = [];

app.use(bodyParser.urlencoded({
  extended : true
}));

app.set('view engine', 'ejs'); // this is used to use ejs as one of our tool for templating as there are many options

app.use(express.static("Public"));

app.get("/", function(req, res) {

const day = date.getDate();

  res.render("list", {
    listTitle: day,
    newItems : newItems
  });

});

app.post("/", function(request, response) {

let item = request.body.listItem;

if(request.body.list === "Work"){// the value of request.body.list is equal to
                                  // that of value passed by element whose name is list
                                  //in our case it is the button element
  workItems.push(item);
response.redirect("/work");
} else{
newItems.push(item);
response.redirect("/");
}

});

app.get("/work", function(req, res) {

  res.render("list", {
    listTitle: "Work List",
    newItems: workItems
  });
});

app.get("/about", function(req, res) {

  res.render("about");
});


app.listen(3000, function() {
  console.log("Server is running at port 3000");
});
