// const db  = require('./index.js');
// const StockChart = require('./StockChart.js');
const generateData = require('./generateData.js');
const file = require("fs").createWriteStream("./test12.dat");

const stockData = [];

(async() => {
console.time('generate');
for (let i = 0; i < 1e7; i++) {
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

