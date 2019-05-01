const pg = require('pg');
const { Client } = require('pg');
// var Sequelize = require('sequelize');
// var db = new Sequelize('charts', 'macbookpro', '', {
//   host: '13.58.67.174',
//   dialect: 'postgres',  
//   logging: false,
// });

const connection = process.env.DATABASE_URL ? 
  { connectionString: process.env.DATABASE_URL } : 
  { host: 'localhost', database: 'charts', logging: false};

// const connection = process.env.DATABASE_URL ? 
//   { connectionString: process.env.DATABASE_URL } : 
//   { host: '13.58.67.174:5432', database: 'charts', user: 'macbookpro', password: 'password', logging: false};

// var connection = {
//   host: '13.58.67.174',
//   user: 'macbookpro', // name of the user account
//   database: 'charts', // name of the database
//   password: 'password',
//   max: 10, // max number of clients in the pool
//   idleTimeoutMillis: 30000 
// }

// var string = 'postgres://macbookpro:password@ec2-13-58-67-174.us-east-2.compute.amazonaws.com:5432/charts'
// var string = 'postgres://macbookpro:password@ec2-13-58-67-174.us-east-2.compute.amazonaws.com:5432/charts'
// var string = 'postgres://macbookpro:password@localhost:5432/charts'

// const pool = new Client({
//   host: 'ec2-13-58-67-174.us-east-2.compute.amazonaws.com',
//   port: 5432,
//   user: 'user1',
//   password: '',
//   database: 'charts'
// })

const pool = new pg.Pool(connection);
pool.connect((err) => {
  if (err) {
    console.error('connection error', err.stack)
  } else {
    console.log('connected')
  }
});


const getStocks = function (stockId) {
  return pool.query('SELECT * FROM stocks NATURAL JOIN day NATURAL JOIN weeks NATURAL JOIN months NATURAL JOIN threemonths NATURAL JOIN years NATURAL JOIN fiveyear WHERE stocks.stockid = $1', [stockId]);
};

module.exports = {
  pool
};

// SELECT * FROM stocks inner join day on stocks.id = day.id where stocks.id = 1000;
// select * from stocks natural join day where stocks.id = 503920;
// SELECT * from stocks where stocks.stockid=$1
// SELECT * FROM stocks NATURAL JOIN day NATURAL JOIN weeks NATURAL JOIN months NATURAL JOIN threemonths NATURAL JOIN years NATURAL JOIN fiveyear WHERE stocks.stockid = $1






// var stocks = db.define('stocks', {
//   id: {
//     type: Sequelize.INTEGER,
//     primaryKey: true
//   },
//   averagestock: Sequelize.DECIMAL,
//   changepercent: Sequelize.DECIMAL,
//   noofowners: Sequelize.INTEGER,
//   recommendationpercent: Sequelize.DECIMAL,
//   stockcompany: Sequelize.STRING,
//   stockid: Sequelize.STRING,
// }, {
//   timestamps: false,
//   // underscored: true,
// });

// var days = db.define('days', {
//   priceid: {
//     type: Sequelize.STRING,
//     primaryKey: true
//   },
//   id: Sequelize.INTEGER,
//   stockid: Sequelize.STRING,
//   day: Sequelize.DECIMAL,
//   }, {
//     timestamps: false,
//     // underscored: true,
//   });

// stocks.sync();
// // days.sync();

// module.exports = {
//   stocks
// };

//COPY "" FROM 'wheat_crop_data.csv' DELIMITER ';' CSV HEADER
//copy stocks ("averageStock","changePercent","id","noOfOwners","recommendationPercent","stockCompany","stockId") from '/Users/macbookpro/documents/hr/sdc/chart_module/data0422.csv' DELIMITER ',' CSV HEADER
// copy stocks ("id","stockid","stockcompany","averagestock","changepercent","noofowners","recommendationpercent") from '/Users/macbookpro/documents/hr/sdc/chart_module/database/stocksticker.csv' DELIMITER ',' CSV HEADER
// copy days ("id","priceid","day") from '/Users/macbookpro/documents/hr/sdc/chart_module/database/stocksday.csv' DELIMITER ',' CSV HEADER



// const connection = process.env.DATABASE_URL ? 
//   { connectionString: process.env.DATABASE_URL } : 
//   { host: 'localhost', database: 'charts' };

// puts a UserId column on each Message instance
// also gives us the `.setUser` method available
// after creating a new instance of Message
// Message.belongsTo(User);
// enables bi-directional associations between Users and Messages
// User.hasMany(Message);
