const express = require("express");
const https = require("https");
const path = require('path')
const bodyParser = require("body-parser");

const app = express();
// serving static files
app.use('/', express.static(path.join(__dirname, 'public')))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
    res.sendFile(__dirname + "/index.html");

});

app.post("/", function(req, res) {
    const query = (req.body.cityName).slice(0, 1).toUpperCase() + (req.body.cityName).slice(1).toLowerCase();
    console.log(query);
    const apiKey = "ba5cd6df97458072af2feb17bcfdf75c";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;
    https.get(url, function(response) {

        console.log(response.statusCode);
        response.on("data", function(data) {

            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;

            const description = weatherData.weather[0].description;

            const icon = weatherData.weather[0].icon;
            const imgURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";

            res.write("<h1> The weather is currently " + description + "</h1>");

            res.write("<h1>The temperature in " + query + " is " + temp + " degrees celcius</h1>");
            res.write("<img src=" + imgURL + ">");
            res.send();
        })
    })
});

app.listen(3000, function() {
    console.log("Server running on port 3000");
});