const express = require("express");
// We are using HTTPS module for sending requeststo the API endpoint
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
    
});

app.post("/", function(req, res){
// Handling the Post Requests
    const query = req.body.cityName;
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query +"&appid=56ddaa1bd057c22cc454e8c93c3533f5&units=metric"
    // Here we are defining the get request from the api call and we are logging the response using a call back function 
    https.get(url, function(response)
    {

        response.on("data", function(data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const desc = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const cityName = weatherData.name
            const feelsLike = weatherData.main.feels_like
         
            const iconURL = "https://openweathermap.org/img/wn/"+icon+"@2x.png"
            res.write("<p>The Current Climate is: " + desc + "</p>");
            res.write("<h1>The Current Temperature in "  + cityName + " is:  " + temp + "</h1>");
            res.write("<h2>But it Feels Like: " + feelsLike + "</h2>")
            res.write("<img src="+iconURL+">")
            res.send();
        })
    });

});



app.listen(process.env.PORT || 3000, function(req, res){
    console.log("Server is listening on port 3000");
});