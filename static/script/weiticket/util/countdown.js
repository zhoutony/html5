var $ = require('../../lib/zepto.js');
var $countdown = $("#payment-countdown");
var epoch = $countdown.data('epoch');
var getEpoch = function () {
  return strToEpoch($countdown.html());
}
var callback;
var padZero = function (number) {
  if (number < 10) {
    return '0' + number;
  } else {
    return '' + number;
  }
}
var epochToStr = function (epoch) {
  minute = padZero(parseInt(epoch / 60));
  second = padZero(parseInt(epoch % 60));
  return minute + '分' + second + '秒';
}
var strToEpoch = function (str) {
  match = str.match(/(\d+)分(\d+)秒/);
  minute = parseInt(match[1]);
  second = parseInt(match[2]);
  return minute * 60 + second
}
var countDown = function() {
  epoch = getEpoch();
  if (epoch <= 0) {
    return 0;
  } else {
    return epoch - 1;
  }
}
var countDownUI = function() {
  epoch = countDown();
  if (epoch === 0) {
    stop();
    callback && callback();
  }
  epochstr = epochToStr(epoch);
  $countdown.html(epochstr);
}

var intervalID;
var start = function(_callback) {
  callback = _callback;
  intervalID = setInterval(countDownUI, 1000);
}
var stop = function() {
  clearInterval(intervalID);
}
exports.countDownUI = countDownUI;
exports.start = start;
