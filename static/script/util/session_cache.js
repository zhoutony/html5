define([
  '../lib/zepto',
  '../lib/underscore',
  '../lib/deferred'
], function(
  $, _, Deferred
) {

  // 参数增加公众号缩写publicsignalshort是因为站点内的所有路由均加了公众号
  //keyfn 获取seseion的值
  //urifn 获取路由地址
  //datafn 返回数据
  var initialize = function(keyfn, urifn, datafn) {
    return function(id, publicsignalshort) {
      var key = keyfn(id);
      var defer = new _.Deferred();
      var item = sessionStorage.getItem(key);
      if (item) {
        defer.resolve(JSON.parse(item));
        return defer.promise();
      } else {
        $.get(urifn(id, publicsignalshort), function(data) {
          item = datafn(data);
          sessionStorage.setItem(key, JSON.stringify(item));
          defer.resolve(item);
        });
      }
      return defer.promise();
    };
  };

  var movieCache = initialize(function(id) {
    return 'movie-' + id;
  }, function(id, publicsignalshort) {
    return '/' + publicsignalshort + '/movie_info/' + id + '/';
  }, function(data) {
    return data.data.movie;
  });

  var publicSignalCache = initialize(function(id) {
    return 'publicsignal-' + id;
  }, function(id) {
    return '/' + id + '/public_signal_info/';
  }, function(data) {
    return data;
  });

  var cinemaCache = initialize(function(id) {
    return 'cinema-' + id;
  }, function(id, publicsignalshort) {
    return '/' + publicsignalshort + '/cinema_info_html/' + id + '/';
  }, function(data) {
    if (data && data.data) {
      return data.data.cinema;
    }
  });

  //基本排期信息
  var scheduleInfoCache = initialize(function(mpid) {
    return 'movieScheduleInfo-' + mpid;
  }, function(id, publicsignalshort) {
    return '/' + publicsignalshort + '/movieScheduleInfo/' + id;
  }, function(data) {
    return data.data;
  });

  return {
    cinema: cinemaCache,
    movie: movieCache,
    publicSignal: publicSignalCache,
    scheduleInfo: scheduleInfoCache
  };
});