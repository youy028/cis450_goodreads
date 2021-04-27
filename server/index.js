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
app.get('/explore/twentymostpopular', routes.twentymostpopularbooks);
app.get('/explore/randomquote', routes.getRandomQuote);
app.get('/explore/top10authors', routes.getTenAuthors);
app.get('/explore/mostprolific', routes.getProlific);
app.get('/explore/raregems', routes.getGems);

//recommendations
app.get('/recommendations/bybook/:bookname', routes.getByBookBookName);
app.get('/recommendations/byauthor/:authorname', routes.getByAuthor);
app.get('/recommendations/bycountry/:country', routes.getByCountry);
app.get('/recommendations/bygenre/:genre', routes.getByGenre);

//search



//quotes
app.get('/quotes/bytags/:tags', routes.getQuotesByTags);
app.get('/quotes/bygenre/:genre', routes.getQuotesByGenre);


app.listen(8081, () => {
	console.log(`Server listening on PORT 8081`);
});
