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

/* ---- /explore/mostpopularbooks ---- */
const mostpopularbooks = (req, res) => {
  const query = `
  with popular as
  (
      select *, review_num/rating_num as ratio
      from books
      where rating >= 3.5
  ),
  ordered_by_popularity as
  (
      select title, avg(ratio) as ave_ratio
      from popular
      group by title
      order by ave_ratio
  )
  select a.title as bookname, id as bookid
  from ordered_by_popularity a left join books b on a.title = b.title
  order by a.ave_ratio
  limit 10

  `
  connection.query(query, (err, rows, fields) => {
    if (err) console.log(err);
    else res.json(rows);
  });
};

/* ---- /explore/top10authors ---- */
const getTenAuthors = (req, res) => {
  const query = `
  with temp AS (
    SELECT authors.author_id, author_name, ave_rating, book_id
    FROM authors
    JOIN book_author ON authors.author_id = book_author.author_id
  ), temp2 AS (
    SELECT author_id, author_name, ave_rating, id, rating
    FROM temp
    JOIN books ON books.id = temp.book_id
    WHERE books.rating_num > 10000 AND author_id != 404
  ), temp3 AS (
    SELECT author_name, MAX(rating) as max_rating
    FROM temp2 GROUP BY author_id
  ) SELECT author_name AS author FROM temp3
    ORDER BY max_rating DESC LIMIT 10;
  `
  connection.query(query, (err, rows, fields) => {
    if (err) console.log(err);
    else res.json(rows);
  });
};

/* ---- /explore/mostprolific ---- */
const getProlific = (req, res) => {
  const query = `
  with temp AS (
    SELECT authors.author_id, author_name, ave_rating, book_id
    FROM authors
    JOIN book_author ON authors.author_id = book_author.author_id
  ), temp2 AS (
    SELECT author_id, author_name, ave_rating, page_num
    FROM temp
    JOIN books ON books.id = temp.book_id
    WHERE ave_rating > 1 AND author_id != 404
  ), temp3 AS (
    SELECT author_name, AVG(page_num) as avg
    FROM temp2 GROUP BY author_id
  ) SELECT author_name AS author FROM temp3
    ORDER BY avg DESC LIMIT 10;
  `
  connection.query(query, (err, rows, fields) => {
    if (err) console.log(err);
    else res.json(rows);
  });
};

/* ---- /explore/raregems ---- */
const getGems = (req, res) => {
  const query = `
  SELECT title as bookname, id as bookid FROM books
  WHERE rating_num > 1000 AND rating_num < 10000
  ORDER BY rating DESC LIMIT 10;
  `
  connection.query(query, (err, rows, fields) => {
    if (err) console.log(err);
    else res.json(rows);
  });
};

/* ---- /explore/quoteoftheday ---- */
const getRandomQuote = (req, res) => {
  const query = `
  WITH temp AS (
    SELECT * FROM quotes WHERE num_like > 300
  ) SELECT content, author, book AS bookname FROM temp ORDER BY RAND() LIMIT 1;
  `
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
    SELECT bhg.book_id, bhg.genre_id, b.title
    FROM books b JOIN book_has_genre bhg ON b.id = bhg.book_id
    WHERE title = "${inputBookName}"
    GROUP BY b.title
    ORDER BY b.rating_num DESC, b.review_num DESC
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
  GROUP BY ga.bookname
  `
  connection.query(query, (err, rows, fields) => {
    if (err) console.log(err);
    else res.json(rows);
  });
};


/* ---- /recommendations/byauthor/:authorname ---- */
const getByAuthor = (req, res) => {
  var inputAuthor = req.params.authorname;
  const query = `
  WITH
  getAuthorId AS (
    SELECT author_id, author_name
    FROM authors
    WHERE author_name = "${inputAuthor}"
  ), getBookID AS (
    SELECT book_id, author_name FROM book_author
    JOIN getAuthorId ON book_author.author_id = getAuthorId.author_id
  ) SELECT getBookID.book_id AS bookid, image_url AS coverUrl,
  author_name AS author, title AS bookname FROM getBookID
  JOIN books ON books.id = book_id
  GROUP BY bookname
  ORDER BY rating_num DESC LIMIT 20;
  `
  connection.query(query, (err, rows, fields) => {
    if (err) console.log(err);
    else res.json(rows);
  });
};



/* ---- /recommendations/bycountry/:country ---- */
const getByCountry = (req, res) => {
  var inputCountry = req.params.country;
  const query = `
  with authors_with_country as
  (
      select a.book_id, a.author_id, b.birthplace, b.author_name
      from book_author a join authors b on a.author_id = b.author_id
  ),
  that_country as
  (
      select books.image_url, a.author_name, books.title, books.id, books.rating * books.rating_num as popularity
      from books join authors_with_country a on books.id = a.book_id
      where a.birthplace like '%${inputCountry}%'
  ),
  titles as
  (
  select distinct title, avg(popularity) as avp
  from that_country
  group by title
  order by avp desc
  limit 30
  )
  select distinct b.id as bookid, b.image_url as coverUrl, b.title as bookname, b.author_name as author
  from titles a left join that_country b on a.title = b.title

  `
  connection.query(query, (err, rows, fields) => {
    if (err) console.log(err);
    else res.json(rows);
  });
};


/* ---- /recommendations/bygenre/:genre ---- */
const getByGenre = (req, res) => {
  var inputGenre = req.params.genre;
  const query = `
  with gen AS (
    SELECT book_id FROM book_has_genre
    JOIN genres ON book_has_genre.genre_id = genres.genre_id
    WHERE genre_name LIKE '%${inputGenre}%'
  ), temp AS (
    SELECT * FROM books
    JOIN gen ON books.id = gen.book_id
  ), getAuthorId AS (
    SELECT rating, temp.book_id AS bookid, image_url AS coverUrl,
    title AS bookname, author_id FROM temp
    JOIN book_author ON temp.book_id = book_author.book_id
  ) SELECT bookid, coverUrl, bookname, GROUP_CONCAT(a.author_name) AS author
  FROM getAuthorId ga
  JOIN authors a ON ga.author_id = a.author_id
  GROUP BY ga.bookname
  ORDER BY rating DESC LIMIT 20;
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




module.exports = {
  getallGenres: getallGenres,
  getBookInfoOnId: getBookInfoOnId,

  mostpopularbooks: mostpopularbooks,
  getTenAuthors: getTenAuthors,
  getProlific: getProlific,
  getGems: getGems,
  getRandomQuote: getRandomQuote,

  getByBookBookName: getByBookBookName,
  getByCountry: getByCountry,
  getByGenre: getByGenre,
  getByAuthor: getByAuthor,

  getQuotesByTags: getQuotesByTags,
  getQuotesByGenre: getQuotesByGenre
};
