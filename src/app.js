const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

// define path for express config
const publicDirectory = path.join(__dirname, "../public");
const viewpath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");


// setup handlebar engine and views location
app.set("view engine", 'hbs');
app.set("views", viewpath);
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicDirectory));


app.get("/", (req, res) => {
    res.render("index", {
        title: "Weather",
        name: "Mohan Kumar"
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About",
        name: "Mohan Kumar"
    });
});

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help",
        name: "Mohan Kumar"
    });
});

app.get("/weather", (req, res) => {

    const query = req.query;

    if(!query.address) {
        return res.send({
            error: "Address must be provided."
        })
    }

    const address = query.address;

    geocode(address, (error, {latitude, longitude, location} = {}) => {
        
        if(error){
            return res.send({error});
        }
    
        forecast(latitude, longitude, (error, {summary, temperature, precipProbability, temperatureLow, temperatureHigh} = {}) => {
            
            if(error){
                return res.send({error});
            }
            
            res.send({
                location,
                summary: `${summary} Temparature high today is ${temperatureHigh} degrees and low today is ${temperatureLow} degrees. It is currently ${temperature} degrees out. There is a ${precipProbability}% chance of rain.`,
                address
            });
        });
    });

});

// app.get("/products", (req, res) => {

//     const query = req.query
    
//     if(!query.search) {
//         return res.send({
//             error: "you must provide a search term"
//         });
//     }
    
//     console.log(query.search);

//     res.send({
//         "products": []
//     });

// });

app.get("/help/*", (req, res) => {
    res.render("404", {
        errorText: "Help article not found.",
        title: "404 page",
        name: "Mohan Kumar"
    })
});

app.get("*", (req, res) => {
    res.render("404", {
        errorText: "Page not found.",
        title: "404 page",
        name: "Mohan Kumar"
    });
});

app.listen(port, () => {
    console.log(`Server is up and running in ${port} port.`)
});