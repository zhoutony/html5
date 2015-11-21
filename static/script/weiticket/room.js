define([
        '../lib/underscore',
        '../lib/deferred',
        '../util/base',
        '../util/fontwatcher',
        './modul/seatrender',
        './modul/seatchooser',
        '../util/modal',
        './util/wechatpay',
        '../util/session_cache',
        '../util/widgets'
    ],
    function (_,
              Deferred,
              BASE,
              FontWatcher,
              SeatRender,
              SeatChooser,
              Modal,
              wechatPay,
              cache,
              widgets) {

        $(document).ready(function () {
            cache.publicSignal(publicsignalshort).then(function (publicSignal) {
                window.document.title = publicSignal.publicSignalName;
            });

            document.title = sessionStorage.getItem("publicSignalName");

            //影院信息
            $(".cinema-name").html(sessionStorage.getItem("cinemaName"));

            //银幕方向
            $(".head-seat").html(widgets.strShort(hall_name, 4) + "银幕方向");


            //基本排期信息
            $.get('/' + publicsignalshort + '/movieScheduleInfo/' + mp_id, function (movieScheduleInfo) {
                if (!movieScheduleInfo.err && movieScheduleInfo.data) {
                    //var movieName = widgets.strShort(movieScheduleInfo.data.name, 11);
                    $(".movie-name").html(movieScheduleInfo.data.name);
                    $(".movie-type").html(movieScheduleInfo.data.type);
                    $(".movie-language").html(movieScheduleInfo.data.lagu);
                    $(".movie-date").html(movieScheduleInfo.data.displayDate);
                    $(".movie-time").html(movieScheduleInfo.data.time);
                }
            });

            var needLogin = true;
            var selected_seats = "";
            var pageDeferred = new _.Deferred();
            var roomVM = _.roomVM = {
                mySeatCount: 0
            };
            var $checkout_btn = $('.checkout-btn');


            // cache.cinema(cinema_id).then(function(cinema) {
            //     $(".cinema-name").html(cinema.name);
            // });
            // cache.cinema(cinema_id).then(function(cinema) {
            //     $(".cinema-address").html(cinema.addr);
            // });

            // fake login
            var Login = {
                ensure: function () {
                    var dfd = new _.Deferred();

                    dfd.resolve();

                    return dfd.promise();
                }
            };

            var pagePromise = needLogin ? Login.ensure() : pageDeferred.resolve();

            pagePromise.then(function () {

                //监控字体是否加载
                FontWatcher.watch('ico-webfont', 'abcABC').then(function () {

                    var $root = $('#roomPage');
                    var $room = $root.find('.room');
                    var $table = $room.find('.table');
                    var $seats = $root.find('.locking-seats');

                    var _fw_width = $table.width();
                    var _fw_height = $table.height();
                    var _fw_ctnWidth = $root.width();

                    $room.css({
                        //height: document.documentElement.clientHeight - $('.lockee').height() - $('.bonus-tips').height() - $('.choose-sec').height() - $table.find('.head-seat-wrap').height() - $('.legend-box').height() * 3 - 11,
                        height: document.documentElement.clientHeight - 300,
                        visibility: 'visible',
                        paddingLeft: 12
                    });
                    $table.width(($($table.find('.row')[0]).find('.seat').length + 1) * 48).height($table.find('.row').length * 38);

                    $table.find('.middleLine').css({
                        left: ($($table.find('.row')[0]).find('.seat').length / 2 + 1) * 48 - 10 //- 24 - 9 + 24
                    });


                    //渲染座位
                    SeatRender.init({
                        root: $root
                    });

                    var call_sales = function () {

                        var unsale_option = {}; // 不可售接口参数

                        unsale_option.schedulePricingId = mp_id; // 排期id
                        unsale_option.publicSignalShort = publicsignalshort; //
                        unsale_option.user_id = user_id; // openid
                        unsale_option.cinemaNo = cinema_id;

                        var loadingModal = new Modal();
                        loadingModal.show({
                            body: '座位加载中...',
                            type: 'tip'
                        });
                        roomVM.loadingModal = loadingModal;

                        $.post('/' + publicsignalshort + '/hall/saleable', unsale_option, function (render_data) {
                            var data = render_data.data;
                            //var data = "01:1:01-1,02-1,03-1,04-1,05-1,06-1,07-1,08-1,09-1|01:2:01-1,02-1,03-1,04-1,05-1,06-1,07-1,08-1,09-1|01:3:01-1,02-1,03-1,04-1,05-1,06-1,07-1,08-1,09-1|01:4:01-1,02-1,03-1,04-1,05-1,06-1,07-1,08-1,09-1|01:5:01-1,02-1,03-1,04-1,05-1,06-1,07-1,08-1,09-1|01:6:01-1,02-1,03-1,04-1,05-1,06-1,07-1,08-1,09-1|01:7:01-1,02-1,03-1,04-1,05-1,06-1,07-1,08-1";
                            //var data = "01:4:5-0,6-1,7-0|01:5:3-0,4-1|01:6:1-0,6-1";
                            //var data = "区:排:列-类型,列-类型,列-类型|区:排:列-类型,列-类型,列-类型";
                            // 没有返回数据
                            if (!data && typeof data != 'string') {
                                loadingModal.hide();

                                // 渲染错误弹层
                                var errorModal = new Modal();
                                errorModal.show({
                                    body: '当前购票用户过多，请稍后再试。',
                                    type: 'alert',
                                    foot: {
                                        btn: '<a href="#" class="btn btn-cancel green">我知道了</a>',
                                        method: function (modal) {
                                            window.history.back();
                                        }
                                    }
                                });

                                return;
                            }
                            // 没有可售坐位
                            if (!data.length) {
                                loadingModal.hide();
                                return;
                            }
                            // 删除session临时订单
                            window.sessionStorage.removeItem('sTempOrder');
                            // 渲染可售座位
                            //var result       = "01:4:5-0,6-1,7-0|01:5:3-0,4-1|01:6:1-0,6-1";
                            var tempSeatData = data.split('|');
                            // ["01:4:5-0,6-1,7-0", "01:5:3-0,4-1", "01:6:1-0,6-1"]
                            _.each(tempSeatData, function (item) {
                                // 01:4:5-0,6-1,7-0
                                // 01:5:3-0,4-1
                                // 01:6:1-0,6-1
                                var _dataArr = item.split(':');
                                var row = _dataArr[1],
                                    oneRow;
                                _.each(server_seats, function (item) {
                                    if (item.desc == row) {
                                        oneRow = item;
                                    }
                                });
                                var server_seats_one_row = oneRow.detail;

                                var cols = _dataArr[2].split(',');
                                _.each(cols, function (col) {
                                    //col 6-0
                                    var isCanSale = col.split('-')[1]; //是否是黄金座位(自有库存) 0-是 1-不是
                                    if(isCanSale == 1) {
                                        var colNum = col.split('-')[0];
                                        var col_seat = server_seats_one_row[0];
                                        var dom_col = $(".table .row").find("[row=" + row + "][col=" + colNum + "]");
                                        dom_col.attr("available", "true");
                                        dom_col.removeClass("locked").addClass("available");

                                        //col_seat.n = parseInt(col_seat.n);
                                        col_seat.status = "available";
                                        col_seat.available = true;
                                    }

                                    //var colList = col.split('|');
                                    //if( colList.length ){
                                    //    _.each( colList, function( colitem ){
                                    //        var indexNum = colitem - 1;
                                    //        if(indexNum < 0){
                                    //            indexNum = 0;
                                    //        }
                                    //        var col_seat = server_seats_one_row[indexNum];
                                    //        var dom_col = $(".table .row").find("[row="+row+"][col="+ parseInt(colitem)+"]");
                                    //        dom_col.attr("available","true");
                                    //        dom_col.removeClass("locked").addClass("available");
                                    //
                                    //        col_seat.status = "available";
                                    //        col_seat.available = true;
                                    //    })
                                    //}
                                });
                            });
                            loadingModal.hide();
                        });//END of post....

                    }//END of call_sales.................................

                    _.when(
                        call_sales() // 获取可售坐位
                    ).then(function () {

                            SeatChooser.initSeatChooser({
                                root: $root,
                                render: SeatRender,
                                //座位图容器
                                seatContainer: $(".table"),
                                //最多选座个数
                                limitCount: 4,
                                //坐位3种状态
                                selectSeatClassName: 'checked',
                                availableSeatClassName: 'available',
                                selectedClassName: 'locked',
                                //已选显示区容器及插入模板
                                selectedContainer: $(".locking-seats"),
                                selectedTemplaste: '<li class="seat-label">{0}</li>',
                                //“选好了”提交按扭及两种状态
                                submitBtn: $('.checkout-btn'),
                                submitBtnClassName: 'orangered',
                                disableSubmitBtnClassName: 'disabled',
                                //选中时是否缩放
                                isZoom: true,
                                //选错提示语
                                pointOutTxts: ['右侧座位不能为空', '左侧座位不能为空', '不能间隔选座（×）', '请不要留下单独座位（√）',
                                    '为避免留空，已为您关联取消了右侧座位（√）',
                                    '为避免留空，已为您关联取消了左侧座位（√）'],
                                //回调返回已选拼装字符串 01:2:10|01:2:11
                                callback: function (s_seats) {
                                    selected_seats = s_seats;
                                }

                            });
                            //处理座位点击
                            $table.on('tap', '.seat', function (e) {
                                if ($(e.currentTarget).hasClass('checked') || $(e.currentTarget).hasClass('available')) {
                                    //view.onTapSeat(e);
                                    SeatChooser.onTapSeat(e);
                                }
                            });//处理座位点击===============================================

                            $seats.on('tap', function (e) {
                                var seatTitle = $(e.target).closest("li").html();
                                var seatDom = $table.find("[title=" + seatTitle + "]");

                                if (seatDom)  seatDom.trigger("tap");
                            });

                            loadingModal.hide();
                        });//END of call unsale .then.................................


                    $checkout_btn.on("tap", function (e) {
                        var $btn = $(e.currentTarget);
                        // 默认进入页面按钮不可点
                        if ($btn.hasClass('disabled')) {
                            return;
                        }
                        var _modal = new Modal;
                        _modal.show({
                            'body': '锁定座位中...',
                            'type': 'tip'
                        })
                        var lock_option = {};
                        lock_option.schedulePricingId = mp_id;
                        //lock_option.ticket            = tick_id;
                        lock_option.seatlable = selected_seats;
                        lock_option.publicSignalShort = publicsignalshort;
                        lock_option.user_id = user_id;
                        lock_option.salePlatform = "售卖平台";

                        $.post('/' + publicsignalshort + '/seat/lock', lock_option, function (data) {
                            if (typeof data != 'object' || _.isEmpty(data)) {
                                _modal.$modal.html(data);
                                setTimeout(function () {
                                    _modal.hide()
                                }, 1000)
                                return;
                            }
                            var sTempOrderID = "";
                            if (data.sTempOrderID) {
                                sTempOrderID = data.sTempOrderID;
                                var payUrl = '/' + publicsignalshort + "/payment" +
                                    "/?mpid=" + mp_id +
                                    "&sTempOrderID=" + sTempOrderID +
                                    "&movieno=" + movieno;
                                location.href = payUrl;
                            }
                            window.sessionStorage.setItem('sTempOrder', JSON.stringify(data));
                        });
                    });//END OF checkout-btn(选好了，支付按钮)

                });

            }); //END of pagePromise
        }); //END of domready
    }); //END of define