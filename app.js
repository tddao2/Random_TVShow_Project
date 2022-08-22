const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const friendRoutes = require('./routes/friends');
const movieRoutes = require('./routes/movies');
const ejsMate = require('ejs-mate');

app.use(bodyParser.urlencoded({ extended: false }));

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(methodOverride('_method'));
app.use(
    session({
        cookie: { maxAge: 60000 },
        secret: 'mySession',
        resave: false,
        saveUninitialized: false,
    })
);

app.use(flash());

app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.warning = req.flash('warning');
    next();
});

app.get('/', async(req, res) => {
    res.render('pages/home')
});

app.use('/friend', friendRoutes);
app.use('/movie', movieRoutes);

app.all('*', (req, res) => {
    res.render('pages/home')
})

const port = 3000;
app.listen(port, () => {
    console.log(`Front-end app listening at http://localhost:${port}`);
});
