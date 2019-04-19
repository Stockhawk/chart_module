// const db  = require('./index.js');
// const StockChart = require('./StockChart.js');
const generateData = require('./generateData.js');
const file = require("fs").createWriteStream("./test7.dat");

const stockData = [];

(async() => {
console.time('generate');
for (let i = 0; i < 100; i++) {
//   stockData.push(generateData.generateData(i));
// }
if (i === 0){
  file.write('[ ');
}
if(!file.write(JSON.stringify(generateData.generateData(i)))) {
  // Will pause every 16384 iterations until `drain` is emitted
  await new Promise(resolve => file.once('drain', resolve));
}
if (i < 9999999){
  file.write(', ')
} else {
  file.write(' ]');
}
}

})();
console.timeEnd('generate');

// for (let i = 0; i < 10000000; i++) {
//     stockData.push(generateData.generateData(i));
//   }

//   console.log(stockData.length);

// console.log(stockData);

// var fs = require('fs');
// var readableStream = fs.createReadStream('file.txt');
// var data = '';

// readableStream.setEncoding('utf8');

// readableStream.on('data', function(chunk) {
//     data+=chunk;
// });

// readableStream.on('end', function() {
//     console.log(data);
// });

// var fs = require('fs');
// var writeStream = fs.createWriteStream('test.txt', { flags : 'w' });
// var readStream = new MyReadStream();

// readStream.pipe(writeStream);
// writeStream.on('close', function () {
//     console.log('All done!');
// });



// const insertStockData = function() {
//   StockChart.init()
//   .then(() => {
//     StockChart.create(stockData)
//       .then(() => db.close())
//       .catch((e) => {
//         console.log('\n \n \n THERE WAS AN ERROR IN THE DATABASE: \n \n \n', e.message);
//       })
//       .then(() => db.close());
//   })
  
  
// };

// insertStockData();
