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

/* ---- (Dashboard) ---- */
// The route localhost:8081/keywords is registered to the function
// routes.getTop20Keywords, specified in routes.js.
//app.get('/keywords', routes.getTop20Keywords);


/* ---- Q1b (Dashboard) ---- */
//app.get('/keywords/:keyword', routes.getTopMoviesWithKeyword);


/* ---- Q2 (Recommendations) ---- */
//app.get('/recommend/:title', routes.getRecs);


/* ---- (Best Movies) ---- */
//app.get('/decades', routes.getDecades);
app.get('/getallGenres', routes.getallGenres);
app.get('/book/:id', routes.getBookInfoOnId);
app.get('/recommendations/bybook/:bookname', routes.getByBookBookName);
app.get('/quotes/bytags/:tags', routes.getQuotesByTags);
app.get('/quotes/bygenre/:genre', routes.getQuotesByGenre);



/* ---- Q3b (Best Movies) ---- */
//app.get('/bestmovies/:decade/:genre', routes.bestMoviesPerDecadeGenre);


app.listen(8081, () => {
	console.log(`Server listening on PORT 8081`);
});
