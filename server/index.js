require('newrelic');
const express = require('express');
const path = require('path');
const db = require('../database/index.js');
const app = express();
const port = 4000;

const redis = require('redis');
const client = redis.createClient();
// app.use(responseTime());

app.use(express.static(path.join(__dirname, '/../public/dist')));

app.listen(port, () => {
  console.log(`Server is now listening on port: ${port}`)
})

app.use('/stocks/:stockId', express.static(__dirname + '/../public/dist/'));

// app.get('/api/stocks/:stockId', (req, res) => {
//   db.pool.query('SELECT * FROM stocks NATURAL JOIN day NATURAL JOIN weeks NATURAL JOIN months NATURAL JOIN threemonths NATURAL JOIN years NATURAL JOIN fiveyear WHERE stocks.stockid = $1', [req.params.stockId.toUpperCase()])
//   .then(result => res.send(result.rows))
//   .catch(err => console.log('get stocks error', err));
// })

app.post('/api/stocks/:stockId', (req, res) => {
})

app.put('/api/stocks/:stockId', (req, res) => {
})

app.delete('/api/stocks/:stockId', (req, res) => {
})

const getBook = (req, res, isbn) => {
  db.pool.query('SELECT * FROM stocks NATURAL JOIN day NATURAL JOIN weeks NATURAL JOIN months NATURAL JOIN threemonths NATURAL JOIN years NATURAL JOIN fiveyear WHERE stocks.stockid = $1', [req.params.stockId.toUpperCase()])
  .then(result => {
    client.setex(isbn, 3600, JSON.stringify(result.rows))
    res.send(result.rows)
  })
  .catch(err => console.log('get stocks error', err));
};

const getCache = (req, res) => {
  let isbn = req.params.stockId;
  //Check the cache data from the server redis
  client.get(isbn, (err, result) => {
    if (result) {
      res.send(result);
    } else {
      getBook(req, res, isbn);
    }
  });
}

app.get(`/api/stocks/:stockId`, getCache);

  // db.getStocks(req.params.stockId.toUpperCase())
