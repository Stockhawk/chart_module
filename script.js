import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
  vus: 250,
  duration: "2m"
};

var randomTicker = function() {
  var tickers = ['A','B'];
  // var ticker = 'A';
  var random = Math.floor(Math.random() * 2);
  var ticker = tickers[random]
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  for (var i = 0; i < 4; i++) {
    ticker += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return ticker;
};
var ticker = randomTicker();

export default function() {
  let res = http.get(`http://localhost:4000/api/stocks/${ticker}`);
  check(res, {
    "status was 200": (r) => r.status == 200,
    "transaction time OK": (r) => r.timings.duration < 200
  });
};