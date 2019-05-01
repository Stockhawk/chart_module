const readline = require('readline');
const { insertDays }= require('./models.js')

const cluster = require('cluster');
const numCPUs = require('os').cpus().length;


process.stdin.setEncoding('utf8');

const rl = readline.createInterface({
  input: process.stdin
})

let count = 0;
let writtenCount = 0;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);
  

  cluster.setupMaster({
    schedulingPolicy: cluster.SCHED_NONE
  });
  // Fork workers.
  for (let i = 0; i < 4; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {

  let lines = [];
  
  rl.on('line', (line) => {
    if (count === 0){
      count++;
      return;
    }
    count++;
    if (lines.length === 1000){
      let buffer = lines;
      lines = [];
      insertDays(buffer, (err) => {
        if (err){
          console.log('error writing to db', line)
        } else {
        writtenCount += 1000;
        }
      }, count);
    }
    if (count % 1000000 === 0) {
      console.log('Read Count: ',count);
      console.log('Written Count: ', writtenCount);
      console.log('uptime:', process.uptime());
    }
    line = line.split(',');
    lines.push(`(${line[0]},'${line[1]}',${line[2]})`);
  })
  

  console.log(`Worker ${process.pid} started`);
}

// process.stdin.setEncoding('utf8');

// let count = 0;
// let writtenCount = 0;

// const rl = readline.createInterface({
//   input: process.stdin
// })



// rl.on('line', (line) => {
//   if (count === 0){
//     count++;
//     return;
//   }
//   count++;
//   if (lines.length === 1000){
//     insertDays(lines, (err) => {
//       if (err){
//         console.log('error writing to db', err)
//       } else {
//       writtenCount += 1000;
//       }
//     });
//     lines = [];
//   }
//   if (count % 1000000 === 0) {
//     console.log('Read Count: ',count);
//     console.log('Written Count: ', writtenCount);
//     console.log('uptime:', process.uptime());
//   }
//   line = line.split(',');
//   lines.push(`(${line[0]},'${line[1]}',${line[2]})`);
// })

// var lines = [];




// process.stdin.on('data', (csv) => {

//   console.log(csv);
//   console.log('<');
//   count++;

//   if ( count === 3 ){
//   process.exit(0);
//   }
// })

// console.log(data);