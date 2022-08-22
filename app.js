const express = require('express');
const app = express();
const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const port = 3000;
app.listen(port, () => {
    console.log(`Front-end app listening at http://localhost:${port}`);
});
