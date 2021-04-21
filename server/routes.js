const config = require('./db-config.js');
const mysql = require('mysql');

config.connectionLimit = 10;
const connection = mysql.createPool(config);

/* -------------------------------------------------- */
/* ------------------- Route Handlers --------------- */
/* -------------------------------------------------- */


/* ---- /getallGenres ---- */
const getallGenres = (req, res) => {
  const query = `
  WITH
  countGenre AS (
      SELECT genre_id, count(*) AS c
      FROM book_has_genre
      GROUP BY genre_id
  )
  SELECT genre_name as genre
  FROM genres g JOIN countGenre cg ON g.genre_id = cg.genre_id
  ORDER BY cg.c DESC
  LIMIT 20;
  `
  connection.query(query, (err, rows, fields) => {
    if (err) console.log(err);
    else res.json(rows);
  });
};

/* ---- /book/:id ---- */
const getBookInfoOnId = (req, res) => {
  var inputId = req.params.id;
  const query = `
  WITH
  findAuthor AS (
    SELECT ba.book_id, a.author_name
    FROM book_author ba JOIN authors a ON ba.author_id = a.author_id
    WHERE ba.book_id = "${inputId}"
  )
  SELECT b.id AS bookid, b.image_url AS coverUrl, b.title AS bookname, GROUP_CONCAT(fa.author_name) AS author, b.rating, b.description
  FROM books b JOIN findAuthor fa ON fa.book_id = b.id
  WHERE id = "${inputId}"
  `;
  connection.query(query, (err, rows, fields) => {
    if (err) console.log(err);
    else res.json(rows);
  });
};


/* ---- /recommendations/bybook/:bookname ---- */
const getByBookBookName = (req, res) => {
  var inputBookName = req.params.bookname;
  const query = `
  WITH
  getBookID AS (
    SELECT bhg.book_id, bhg.genre_id
    FROM books b JOIN book_has_genre bhg ON b.id = bhg.book_id
    WHERE title like "%${inputBookName}%"
    ORDER BY b.rating_num DESC, b.review_num DESC
    LIMIT 1
    ),
  bookGenreCount AS (
    SELECT bhg.book_id, count(*) AS num
    FROM book_has_genre bhg
    INNER JOIN getBookID gbi ON bhg.genre_id = gbi.genre_id
    WHERE gbi.book_id <> bhg.book_id
    GROUP BY book_id),
  getAllInfo AS (
    SELECT DISTINCT b.id AS bookid, b.image_url AS coverUrl,    b.title AS bookname, b.rating
    FROM bookGenreCount bgc JOIN books b ON bgc.book_id = b.id
    ORDER BY bgc.num DESC, b.rating DESC, b.rating_num DESC
    LIMIT 20),
  getAuthorId AS (
    SELECT gai.bookid, gai.coverUrl, gai.bookname, ba.author_id
    FROM getAllInfo gai JOIN book_author ba ON gai.bookid = ba.book_id)
  SELECT ga.bookid, ga.coverUrl, ga.bookname, GROUP_CONCAT(a.author_name) AS author
  FROM getAuthorId ga JOIN authors a ON ga.author_id = a.author_id
  GROUP BY ga.bookid
  `
  connection.query(query, (err, rows, fields) => {
    if (err) console.log(err);
    else res.json(rows);
  });
};

/* ---- /quotes/bytags/:tags ---- */
const getQuotesByTags = (req, res) => {
  var inputTag = req.params.tags;
  const query = `
  SELECT content, author, book AS bookname
  FROM quotes
  WHERE tags like "%${inputTag}%"
  LIMIT 10
  `;
  connection.query(query, (err, rows, fields) => {
    if (err) console.log(err);
    else res.json(rows);
  });
};


/* ---- /quotes/bygenre/:genre ---- */
const getQuotesByGenre = (req, res) => {
  var inputGenre = req.params.genre;
  const query = `
  WITH
  findGenreId AS (
  SELECT genre_id
  FROM genres
  WHERE genre_name like "%${inputGenre}%"
  ),
  bookids AS (
  SELECT book_id AS id
  FROM book_has_genre bhg JOIN findGenreId fgi ON bhg.genre_id = fgi.genre_id
  ),
  tempbooks AS (
  SELECT title AS book
  FROM books NATURAL JOIN bookids
  )
  SELECT DISTINCT content, author, book AS bookname
  FROM quotes NATURAL JOIN tempbooks
  ORDER BY num_like DESC
  LIMIT 10
  `;
  connection.query(query, (err, rows, fields) => {
    if (err) console.log(err);
    else res.json(rows);
  })
};




/* ---- Q1a (Dashboard) ---- */
// Equivalent to: function getTop20Keywords(req, res) {}
const getTop20Keywords = (req, res) => {
  const query = `
    SELECT kwd_name
    FROM movie_keyword
    GROUP BY kwd_name
    ORDER BY count(*) DESC
    LIMIT 20;
  `;

  connection.query(query, (err, rows, fields) => {
    if (err) console.log(err);
    else res.json(rows);
  });
};


/* ---- Q1b (Dashboard) ---- */
const getTopMoviesWithKeyword = (req, res) => {
  var keyword = req.params.keyword;
  const query = `
    WITH t1 as (
    SELECT movie_id
    FROM movie_keyword
    WHERE kwd_name = "${keyword}")
    SELECT title, rating, num_ratings FROM t1 NATURAL JOIN movie
    ORDER BY rating DESC, num_ratings DESC LIMIT 10;
  `;
  connection.query(query, (err, rows, fields) => {
    if (err) console.log(err);
    else res.json(rows);
  });
};


/* ---- Q2 (Recommendations) ---- */
const getRecs = (req, res) => {
  var title = req.params.title;
  const query = `
  WITH
  target_movie as (
  	SELECT movie_id
  	FROM movie
  	WHERE title = "${title}"
  	LIMIT 1),
  target_cast as (
  	SELECT movie_id, cast_id
  	FROM cast_in
  	NATURAL JOIN target_movie),
  cast_is_match as (
  	SELECT *
  	FROM cast_in ci
  	WHERE ci.cast_id in (select cast_id from target_cast)),
  similar_stat as (
  	SELECT movie_id, count(*) AS similarity
  	FROM cast_is_match
  	GROUP BY movie_id)
  SELECT title, movie_id, rating, num_ratings, similarity
  FROM movie NATURAL JOIN similar_stat
  ORDER BY similarity DESC, rating DESC, num_ratings DESC LIMIT 1, 10;
  `;
  connection.query(query, (err, rows, fields) => {
    if (err) console.log(err);
    else res.json(rows);
  });
};


/* ---- Q3a (Best Movies) ---- */
const getDecades = (req, res) => {
  const query = `
    WITH
    t1 AS (
    	SELECT FLOOR(release_year/10)*10 AS decade
    	FROM movie
    	GROUP BY release_year
    	ORDER BY release_year ASC)
    SELECT DISTINCT decade FROM t1;
  `;

  connection.query(query, (err, rows, fields) => {
    if (err) console.log(err);
    else res.json(rows);
  });
};


/* ---- (Best Movies) ---- */
const getGenres = (req, res) => {
  const query = `
    SELECT name
    FROM genre
    WHERE name <> 'genres'
    ORDER BY name ASC;
  `;

  connection.query(query, (err, rows, fields) => {
    if (err) console.log(err);
    else res.json(rows);
  });
};


/* ---- Q3b (Best Movies) ---- */
const bestMoviesPerDecadeGenre = (req, res) => {
  var decade = req.params.decade;
  var genre = req.params.genre;
  const query = `
    With
    t1 as (SELECT * from movie natural join movie_genre),
    t2 as (SELECT * from t1 where ${decade} <= release_year and release_year < (${decade}+10)),
    t3 as (SELECT * from t2 where genre_name = "${genre}"),
    t4 as (select movie_id, title, rating, movie_genre.genre_name as genre_name, t3.genre_name as requested_genre from t3 join movie_genre using (movie_id)),
    t5 as (select distinct genre_name from t4),
    t6 as (select genre_name, avg(rating) as genre_avg_rating from t2 natural join t5 group by genre_name),
    t7 as (SELECT * from t4 natural join t6),
    t8 as (select * from t7 where rating <= genre_avg_rating)
    select movie_id, title, rating from t3 where t3.movie_id not in (select movie_id from t8) order by title limit 100
  `;

  connection.query(query, (err, rows, fields) => {
    if (err) console.log(err);
    else res.json(rows);
  });
};


//getTop20Keywords: getTop20Keywords,
//getTopMoviesWithKeyword: getTopMoviesWithKeyword,
//getRecs: getRecs,
//getDecades: getDecades,
//bestMoviesPerDecadeGenre: bestMoviesPerDecadeGenre,

module.exports = {
  getallGenres: getallGenres,
  getBookInfoOnId: getBookInfoOnId,
  getByBookBookName: getByBookBookName,
  getQuotesByTags: getQuotesByTags,
  getQuotesByGenre: getQuotesByGenre
};
