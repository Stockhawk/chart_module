const generateData = require('./generateData.js');
const fileticker = require("fs").createWriteStream("./stocksticker.csv");
const fileday = require("fs").createWriteStream("./stocksday.csv");
const fileweek = require("fs").createWriteStream("./stocksweek.csv");
const filemonth = require("fs").createWriteStream("./stocksmonth.csv");
const filethreemonth = require("fs").createWriteStream("./stocksthreemonth.csv");
const fileyear = require("fs").createWriteStream("./stocksyear.csv");
const filefiveyear = require("fs").createWriteStream("./stocksfiveyear.csv");
const filetags = require("fs").createWriteStream("./stockstags.csv");

//fileday
(async() => {
console.time('generate');
for (let i = 0; i < 1250000; i++) {
if (i === 0){
  fileticker.write('id,stockid,stockcompany,averagestock,changepercent,noofowners,recommendationpercent\n');
  fileday.write('id,priceid,day\n');
  fileweek.write('id,priceid,week\n');
  filemonth.write('id,priceid,month\n');
  filethreemonth.write('id,priceid,threemonth\n');
  fileyear.write('id,priceid,year\n');
  filefiveyear.write('id,priceid,fiveyear\n');
}
let previousValue = null;
var stock = generateData.generateData(i, previousValue);
if(!fileticker.write(`${stock.id},${stock.stockId},${stock.stockCompany},${stock.averageStock},${stock.changePercent},${stock.noOfOwners},${stock.recommendationPercent}\n`)) {
await new Promise(resolve => fileticker.once('drain', resolve));
}
for (var j = 0; j < 107; j++){
var stock = generateData.generateData(i,j, previousValue);
previousValue = stock.day;
// if(!file.write(`${stock.id},${stock.stockId},${stock.relatedTags},${stock.day},${stock.week},${stock.month},${stock.threeMonth},${stock.year},${stock.fiveYear}\n`)) {
  if(!fileday.write(`${stock.id},${stock.priceId},${stock.day}\n`)) {
    await new Promise(resolve => fileday.once('drain', resolve));
  }
  if(!fileweek.write(`${stock.id},${stock.priceId},${stock.week}\n`)) {
    await new Promise(resolve => fileweek.once('drain', resolve));
  }
  if(!filemonth.write(`${stock.id},${stock.priceId},${stock.month}\n`)) {
    await new Promise(resolve => filemonth.once('drain', resolve));
  }
  if(!filethreemonth.write(`${stock.id},${stock.priceId},${stock.threeMonth}\n`)) {
    await new Promise(resolve => filethreemonth.once('drain', resolve));
  }
  if(!fileyear.write(`${stock.id},${stock.priceId},${stock.year}\n`)) {
    await new Promise(resolve => fileyear.once('drain', resolve));
  }
  if(!filefiveyear.write(`${stock.id},${stock.priceId},${stock.fiveYear}\n`)) {
    await new Promise(resolve => filefiveyear.once('drain', resolve));
  }
}
}
})();

(async() => {
  console.time('generate');
  for (let i = 0; i < 1250000; i++) {
  if (i === 0){
    filetags.write('id,relatedtags\n');
  }
  let previousValue = null;
  let random = Math.floor(Math.random()*5+1);
  for (var j = 0; j < random; j++){
  var stock = generateData.generateDataTag(i);
  previousValue = stock.day;
  // if(!file.write(`${stock.id},${stock.stockId},${stock.relatedTags},${stock.day},${stock.week},${stock.month},${stock.threeMonth},${stock.year},${stock.fiveYear}\n`)) {
    if(!filetags.write(`${stock.id},${stock.relatedTags}\n`)) {
    await new Promise(resolve => filetags.once('drain', resolve));
    }
  }
  }
  })();

console.timeEnd('generate');
