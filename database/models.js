const db = require('./index.js');
const fs = require('fs');
const path = require('path');

let row = '955,AABGW56,31.21';


// console.log('queryString', queryString);

const insertDays = (rows, cb, count) => {
  // console.log('rows', rows);
  // let columns = row.split(',')
  // let queryString = `INSERT INTO day2 (id, priceid, day) values (${columns[0]},'${columns[1]}',${columns[2]})`
  let queryString = `INSERT INTO day2 (id, priceid, day) values ${rows.join(',\n')};`
  
  // console.log(queryString);

  fs.writeFile(path.join(__dirname, `./chunks/${count}.txt`), queryString, (err) => {
    cb(err);
  })
  


  // return db.pool.query(queryString)
  //   .then(() => {cb()})
  //   .catch(err => {cb(err)})
} 

// insertDays(row);

module.exports = {
  insertDays
}