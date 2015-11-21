define([
        '../lib/zepto.js',
        '../lib/underscore',
        '../lib/deferred',
        '../util/base',
        '../util/modal',
        '../util/session_cache'
    ],
    function(
        $,
        _,
        Deferred,
        BASE,
        Modal,
        cache
    ) {
      $(document).ready(function() {

        var showStatusBlock = function(status) {
            $(".order-status-block").addClass("m-hide");
            $(".order-status-block." + status).removeClass("m-hide");
          };

          var getState = function (data) {
            if (data.order.iState === '6' || data.order.iState === '11') {
              return 'success';
            } else if (data.order.iState === '21' || data.order.iState === '23') {
              return 'failed';
            } else {
              return 'handling';
            }
          };

          var renderOrderDetail = function (data) {
            $(".order-movie-name").html(data.order.sMovie);
            $(".order-cinema-name").html(data.order.sCinema);
            $(".order-show-date").html(data.order.sShowDate);
            $(".order-show-time").html(data.order.sShowTime);
            $(".order-show-type").html(''); // FIXME!!!
            $(".order-seat-desc").html(data.order.sSeatDesc);
            $(".return-home").attr('href',
                                      '/' + publicsignalshort + '/cinema/' + data.order.iCinemaID);
            $(".return-my-order").attr('href',
                                      '/' + publicsignalshort + '/order');
          };

          var renderSuccess = function (data) {
            showStatusBlock("success");
            renderOrderDetail(data);
          };

          var renderHandling = function (data) {
            showStatusBlock("handling");
            renderOrderDetail(data);
          };

          var renderFailed = function (data) {
            showStatusBlock("failed");
            renderOrderDetail(data);
          };

        $.get('/' + publicsignalshort + '/order_detail/' + order_id, function(resp) {
            var data = resp.data;
            var state = getState(data);
            if (state === 'success') {
              renderSuccess(data);
            } else if (state === 'handling') {
              renderHandling(data);
            } else {
              renderFailed(data);
            }

        }); //END of jquery documet.ready
    });
    })
/* jshint ignore:start */
