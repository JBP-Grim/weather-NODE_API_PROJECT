const express = require("express");
const app = express();

const https = require("https");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.listen(3000, function(){
    console.log("port 300 running");
});

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
    const city = req.body.cityName;

    //get the API request
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=metric&appid=8fa4212c21e831937fed1e7af2dee687";
    
    https.get(apiUrl, function(apiResponse){
        //extract the data of the api response, parse it to JSON format and console.log it.
        apiResponse.on("data", function(data){
            const weatherData = JSON.parse(data);
            const weatherDescription = weatherData.weather[0].description;
            const temp = weatherData.main.temp;
            const icon = weatherData.weather[0].icon;
            const srcIcon = "https://openweathermap.org/img/wn/"+icon+"@2x.png";
            //send a message that contains the weather information
            res.write("<h1>The weather in "+city+" is " + weatherDescription + "</h1>");
            res.write("<h3>The temperature in "+city+" is " + temp + "</h3><img src='"+srcIcon+"'>");
            res.send();
        });
    });
});