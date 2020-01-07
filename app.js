const express = require('express'),
    path = require('path'),
    hbs = require('hbs'),
    bodyParser = require('body-parser'),
    urlencodedParser = bodyParser.urlencoded({ extended: false });

const app = express();
const routes = require('./routes');

hbs.registerPartials(path.join(__dirname, 'views/partials'));

// app setting
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static('public'));
app.use(urlencodedParser)

routes(app);

app.listen(8000, () => {
    console.log('App is running on http://localhost:8000');
})