const bodyParser = require('body-parser');
const express = require('express');
var routes = require("./routes.js");
const cors = require('cors');

const app = express();

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

/* ---------------------------------------------------------------- */
/* ------------------- Route handler registration ----------------- */
/* ---------------------------------------------------------------- */

//utilities
app.get('/getallGenres', routes.getallGenres);
app.get('/book/:id', routes.getBookInfoOnId);

//explore


//recommendations
app.get('/recommendations/bybook/:bookname', routes.getByBookBookName);


//search


//quotes
app.get('/quotes/bytags/:tags', routes.getQuotesByTags);
app.get('/quotes/bygenre/:genre', routes.getQuotesByGenre);


app.listen(8081, () => {
	console.log(`Server listening on PORT 8081`);
});
