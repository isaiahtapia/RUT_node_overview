const express = require('express');
const path = require('path');

const app = express();

//Import Routes
const api_routes = require('./routes/api_routes');
const view_routes = require('./routes/view_routes')

//Base route = domain.com (root route) is represented by a '/' - this slash directly follows the domain address 

///Middleware - adding a layer to the server 'onion' or removing a layer from the onion
app.use(express.static('./public'));
//Allow form data to be attached in our routes 
app.use(express.json())

//Load Routes
app.use('/', view_routes);
//When you load in all the routes from api_routes.js, prefix all of them with '/api' -meaning, if my route is something like app.get ('/notes'), change that to app.get('/api/notes)
app.use('/api', api_routes);

app.get('*', (requestObj, responseObj) => {
    responseObj.sendFile(path.join(__dirname, './public/notfound.html'));
});

app.listen(3333, () => {
    console.log('Server Started');
})








// app.get('/', (requestObj, responseObj) => {
//     responseObj.sendFile(path.join(__dirname, './public/index.html'));
// });

// app.get('/images/sad-dino.avif', (requestObj, responseObj) => {
//     responseObj.sendFile(path.join(__dirname, './public/images/sad-dino.avif'));
// });

// app.get('/css/style.css', (requestObj, responseObj) => {
//     responseObj.sendFile(path.join(__dirname, './public/images/css/style.css'));
// });

//the wildcard route must be below all other routes