const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Paths for express config
const publicDirectory = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views and partials location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static( publicDirectory ));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        message: 'This perfect site was created by Swhit. It uses data from geoapify and weatherstack to get weather for your location!'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'This page will help you with all your problems even if you are hopeless person!'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please, provide address'
        })
    }

    geocode(req.query.address, (error, { lat, lon, location } = {}) => {
        if (error) {
            return res.send({
                error
            });
        }

        forecast(lat, lon, (error, forecast) => {
            if (error) {
                return res.send({
                    error
                });
            }
            
            res.send({
                forecast,
                location,
                address: req.query.address,
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'No products provided'
        })
    }

    console.log(req.query.search);
    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Help article not found! Sorry UwU'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Page not found! Sorry UwU',
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});