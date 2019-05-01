const db = require('./index.js');

let row = '955,AABGW56,31.21';


// console.log('queryString', queryString);

const insertDays = (rows, cb) => {
  // console.log('rows', rows);
  // let columns = row.split(',')
  // let queryString = `INSERT INTO day2 (id, priceid, day) values (${columns[0]},'${columns[1]}',${columns[2]})`
  let queryString = `INSERT INTO day2 (id, priceid, day) values ${rows.join(',')};`
  // console.log(queryString);
  return db.pool.query(queryString)
    .then(() => {cb()})
    .catch(err => {cb(err)})
} 

// insertDays(row);

module.exports = {
  insertDays
}