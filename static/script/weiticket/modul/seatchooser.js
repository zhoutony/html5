/************
 调用方法：
 初使化
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
        isZoom: false,
        //选错提示语
        pointOutTxts: ['右侧座位不能为空', '左侧座位不能为空', '不能间隔选座（×）', '请不要留下单独座位（√）',
                        '为避免留空，已为您关联取消了右侧座位（√）',
                        '为避免留空，已为您关联取消了左侧座位（√）'],
        //回调返回已选拼装字符串 01:2:10|01:2:11
        callback: function(s_seats){
            selected_seats = s_seats;
        }
    });

 点击座位调用
 SeatChooser.onTapSeat(e);
 **************/

define([
        '../../lib/zepto.js',
        '../../lib/underscore',
        '../../util/dialogs.js'
    ],
    function ($,
              _,
              Dialogs) {
        var delayTime = 2e3;
        var SeatChooser = {};
        SeatChooser.mySeatCount = 0;
        // 初始化座位选择器
        SeatChooser.initSeatChooser = function (config) {
            this.$root = config.root;
            this.render = config.render;
            //座位图容器
            this.seatContainer = config.seatContainer ? config.seatContainer : null;
            //最多选座个数
            this.limitCount = config.limitCount ? config.limitCount : 4;
            //坐位3种状态
            //this.selectSeatDetailClassName  = config.selectSeatDetailClassName ? config.selectSeatDetailClassName : 'seat';
            this.selectSeatClassName = config.selectSeatClassName ? config.selectSeatClassName : 'checked';
            this.availableSeatClassName = config.unSelectSeatClassName ? config.unSelectSeatClassName : 'available';
            this.selectedClassName = config.selectedClassName ? config.selectedClassName : 'locked';
            this.selectedNullClassName = config.selectedNullClassName ? config.selectedNullClassName : 'seat_null';
            //“选好了”提交按扭及两种状态
            this.submitBtn = config.submitBtn ? config.submitBtn : null;
            this.submitBtnClassName = config.submitBtnClassName ? config.submitBtnClassName : 'orangered';
            this.disableSubmitBtnClassName = config.disableSubmitBtnClassName ? config.disableSubmitBtnClassName : 'disabled';
            //已选显示区容器及插入模板
            this.selectedContainer = config.selectedContainer ? config.selectedContainer : null;
            this.selectedTemplaste = config.selectedTemplaste ? config.selectedTemplaste : '<li class="seat-label">{0}</li>';
            //选错提示语
            this.pointOutTxts = config.pointOutTxts ? config.pointOutTxts : ['右侧不能留空', '左侧不能留空', '座位中间不能留空', '请不要留下单独空座',
                '我们为您关联取消了右侧座位以避免留空',
                '我们为您关联取消了左侧座位以避免留空'];
            //选中是否缩放
            this.isZoom = config.isZoom ? config.isZoom : false;
            //回调返回已选拼装字符串 01:2:10|01:2:11
            this.callback = config.callback ? config.callback : null;
            this.price = $('.seatinfo').data('price');
            this.oldmySeatCount = 0;
        }; //END of _initSeatChooser

        /**
         * [点击选坐相关逻辑]
         * @param  {event} evnet [事件]
         * @return {boolen}       [所选座位是否符合规则，后续需不需要暂时在已选座位区]
         */
        SeatChooser.onTapSeat = function (evnet) {
            var $seatDom = $(evnet.currentTarget); // 当前点击的座位
            var s_selectname = this.selectSeatClassName;
            var a_selectname = this.availableSeatClassName;

            if ($seatDom.hasClass(s_selectname) || $seatDom.hasClass(a_selectname)) {
                var vm = _.roomVM; // 挂在全局下的数据
                var that = this;
                var $checkout_btn = that.submitBtn;//$('.checkout-btn');

                var isCorrectSeat; // 是否符合规则，是否需要写入选坐区域
                // 如果座位状态是被选中的
                if ($seatDom.hasClass(s_selectname)) {
                    
                    isCorrectSeat = seatPolicy('deselect', $seatDom); // 检查取消选择后是否和规则
                    $seatDom.removeClass(s_selectname);
                    $seatDom.addClass(a_selectname);
                    $seatDom.find('i').addClass('m-hide');
                    if (!isCorrectSeat) {
                        return isCorrectSeat;
                    }
                    afertSelectSeat();
                    $seatDom.data('checked', 0);
                    //vm.mySeatCount--;
                    if (this.mySeatCount == 0) {
                        _.defer(function () {
                            $checkout_btn.removeClass(that.submitBtnClassName).addClass(that.disableSubmitBtnClassName);
                            // if(that.isZoom){
                            //     that.render.zoomOut();
                            // }
                        });
                    }
                    SeatChooser.oldmySeatCount = this.mySeatCount;
                } else {
                    
                    // $seatDom.find('.num').removeClass('m-hide');

                    if ($checkout_btn.hasClass(that.disableSubmitBtnClassName))
                        $checkout_btn.removeClass(that.disableSubmitBtnClassName);

                    if (!$checkout_btn.hasClass(that.submitBtnClassName))
                        $checkout_btn.addClass(that.submitBtnClassName);

                    if (this.mySeatCount == this.limitCount) {
                        _showModalTip('您一次最多只能购买' + this.limitCount + '张票', $seatDom, 0);
                        isCorrectSeat = false;
                        return;
                    } else {
                        isCorrectSeat = seatPolicy('select', $seatDom);
                        
                        if (!isCorrectSeat) {
                            return isCorrectSeat;
                        }else{
                            $seatDom.removeClass(this.availableSeatClassName);
                            $seatDom.addClass(this.selectSeatClassName);
                            $seatDom.find('i').removeClass('m-hide');
                        }
                    }
                    afertSelectSeat();
                    $seatDom.data('checked', 1);
                    //vm.mySeatCount++;
                    _.defer(function () {
                        if (that.isZoom && SeatChooser.oldmySeatCount == 0) {
                            that.render.zoomIn($seatDom);
                        }
                        SeatChooser.oldmySeatCount = this.mySeatCount;
                    });
                }
                return isCorrectSeat;
            }

        }; //END of _onTapSeat


        // 选座策略
        function seatPolicy(event, $seat) {
            //选择座位规则
            var elem = $seat,
                left_1 = elem.prev(),   //左1
                right_1 = elem.next(),   //右1
                left_2 = left_1.prev(), //左2
                right_2 = right_1.next(),//右2
                left_3 = left_2.prev(), //左3
                right_3 = right_2.next();//右3

            // var left_1_status  = left_1.attr('available'),
            //     right_1_status = right_1.attr('available');

            //坐位三种状态
            var seat_selected = SeatChooser.selectSeatClassName,
                seat_ture = SeatChooser.availableSeatClassName,
                seat_false = SeatChooser.selectedClassName,
                seat_null = SeatChooser.selectedNullClassName;

            //选错提示语
            var pointOutTxts = SeatChooser.pointOutTxts;

            //取消座位
            if ('deselect' === event) {
                if ((left_1.length === 0 || !left_1.hasClass(seat_ture)) && (right_1.length === 0 || !right_1.hasClass(seat_ture))) {
                    //两边不为可选
                    if (left_1.hasClass(seat_selected) && right_1.hasClass(seat_selected)) {
                        //左边已选,右边已选
                        if (right_2.hasClass(seat_ture)) {
                            //右边+2为可选
                            if (right_3.length === 0 || !right_3.hasClass(seat_ture)) {
                                //右边+3有人或者为边缘
                                if (right_1.length != 0 && right_1.hasClass(seat_selected)) {
                                    //右+1为被（自己）选中状态，所带的这些属性都为真，连带取消
                                    _showModalTip(pointOutTxts[4], right_1, 0, delayTime);
                                    return false;
                                }
                            } else if (left_2.length != 0 && left_2.hasClass(seat_selected)) {
                                //左+2为被（自己）选中状态
                                if (right_1.length != 0 && right_1.hasClass(seat_selected)) {
                                    //右+1为被（自己）选中状态，所带的这些属性都为真，连带取消
                                    _showModalTip(pointOutTxts[4], right_1, 0, delayTime);
                                    return false;
                                }
                            } else {
                                if (left_2.hasClass(seat_false)) {
                                    //左2为不可选
                                    if (right_1.length != 0 && right_1.hasClass(seat_selected)) {
                                        //右+1为被（自己）选中状态，所带的这些属性都为真，连带取消
                                        _showModalTip(pointOutTxts[4], right_1, 0, delayTime);
                                        return false;
                                    }
                                } else if (right_2.hasClass(seat_false)) {
                                    //右2为不可选
                                    if (left_1.length != 0 && left_1.hasClass(seat_selected)) {
                                        //左+1为被（自己）选中状态，所带的这些属性都为真，连带取消
                                        _showModalTip(pointOutTxts[5], left_1, 0, delayTime);
                                        return false;
                                    }
                                } else if (left_1.length != 0 && left_1.hasClass(seat_selected)) {
                                    //左+1为被（自己）选中状态，所带的这些属性都为真，连带取消
                                    _showModalTip(pointOutTxts[5], left_1, 0, delayTime);
                                    return false;
                                }
                            }
                        } else {
                            //右边+2为不可选
                            if (right_2.hasClass(seat_selected)) {
                                //右边+2选中时
                                if (left_1.length != 0 && left_1.hasClass(seat_selected)) {
                                    //左+1为被（自己）选中状态，所带的这些属性都为真，连带取消
                                    _showModalTip(pointOutTxts[5], left_1, 0, delayTime);
                                    return false;
                                }
                            } else if (left_2.length != 0 && left_2.hasClass(seat_selected)) {
                                //左边+2选中时
                                if (right_1.length != 0 && right_1.hasClass(seat_selected)) {
                                    //右+1为被（自己）选中状态，所带的这些属性都为真，连带取消
                                    _showModalTip(pointOutTxts[4], right_1, 0, delayTime);
                                    return false;
                                }
                            } else {
                                //右边+2选中时
                                if (left_1.length != 0 && left_1.hasClass(seat_selected)) {
                                    //左+1为被（自己）选中状态，所带的这些属性都为真，连带取消
                                    _showModalTip(pointOutTxts[5], left_1, 0, delayTime);
                                    return false;
                                }
                            }
                        }
                    } else if (left_1.hasClass(seat_selected) && (right_1.length === 0 || (!right_1.hasClass(seat_ture) || !right_1.hasClass(seat_selected)))) {
                        //左边已选,右边不可选或者为边缘
                        if (left_2.hasClass(seat_false)) {
                            return true;
                        }
                        if (left_1.length != 0 && left_1.hasClass(seat_selected)) {
                            //左+1为被（自己）选中状态，所带的这些属性都为真，连带取消
                            _showModalTip(pointOutTxts[5], left_1, 0, delayTime);
                            return false;
                        }
                    } else if (right_1.hasClass(seat_selected) && (left_1.length === 0 || (!left_1.hasClass(seat_ture) || !left_1.hasClass(seat_selected)))) {
                        //右边已选,左边不可选或者为边缘
                        if (right_2.hasClass(seat_false)) {
                            return true;
                        }
                        if (right_1.length != 0 && right_1.hasClass(seat_selected)) {
                            //左+1为被（自己）选中状态，所带的这些属性都为真，连带取消
                            _showModalTip(pointOutTxts[4], right_1, 0, delayTime);
                            return false;
                        }
                    }
                }
                //取消自己
                //elem.className = this.seat_ture;
                //this.deleteSelectSeatNameArray(tempRow, tempColumn);
            } else {
                //选座
                // 9.16修改连选座位时，左1或右1可选座并且左2或右2为锁座并且在排的中间时不可选
                if ((left_1.hasClass(seat_selected) && right_2.length === 0) || (right_1.hasClass(seat_selected) && left_2.length === 0)) {
                    return true;
                } else if (left_1.length === 0 || right_1.length === 0) {
                    //左+1或右+1为边缘
                    if (left_1.length === 0) {
                        //左+1为边缘
                        if (right_1.hasClass(seat_ture) && right_2.length != 0 && right_2.hasClass(seat_selected)) {
                            //右+1为可选，右+2为（自已）已选，右+1连带选上
                            _showModalTip(pointOutTxts[1], elem, 0);
                            return false;
                        }
                    } else {
                        //右+1为边缘
                        if (left_1.hasClass(seat_ture) && left_2.length != 0 && left_2.hasClass(seat_selected)) {
                            //左+1为可选，左+2为（自已）已选，左+1连带选上
                            _showModalTip(pointOutTxts[0], elem, 0);
                            return false;
                        }
                    }
                } else if (!left_1.hasClass(seat_ture) || !right_1.hasClass(seat_ture)) {
                    //左+1或右+1为不可选（样式为‘seat_ture’）
                    if (!left_1.hasClass(seat_ture)) {
                        //左+1不为不可选
                        if (left_1.hasClass(seat_selected) && (right_2.length === 0 || (right_2.length != 0 && right_2.hasClass(seat_false))) && right_1.hasClass(seat_ture)) {
                            //左+1为已选座位并且（右+2是）
                            // 9.17 修改连选座位时，修改连选3个座位后，在中间只有两个座位时第4个座位不能选
                            // 10.12 修改中间座位只剩4个座位时可以从左或从右依次连选1、2、3和4个位；当中间座位只剩3个座位时，可以从左或从右依次连选1、2和3个位
                            if (left_2.length != 0 && left_3.length != 0 && right_1.hasClass(seat_ture)) {
                                // 10.15 当在中间只剩3个座且左1为已卖，左2为可选，修改了从左往右选座到第2个座时选不了
                                if (left_2.hasClass(seat_false)) {
                                    if (!(left_2.hasClass(seat_false) && right_2.hasClass(seat_false))) {
                                        _showModalTip(pointOutTxts[0], elem, 0);
                                        return false;
                                    } else {
                                        return true;
                                    }
                                } else if (left_2.hasClass(seat_ture)) {
                                    _showModalTip(pointOutTxts[0], elem, 0);
                                    return false;
                                }
                                // 10.15 当在中间只剩4个座且左1为已卖，左2为可选，修改了从左往右选座到第3个座时选不了
                                if (left_3.hasClass(seat_false)) {
                                    if (!(left_3.hasClass(seat_false) && right_2.hasClass(seat_false))) {
                                        _showModalTip(pointOutTxts[0], elem, 0);
                                        return false;
                                    } else {
                                        return true;
                                    }
                                } else if (left_3.hasClass(seat_ture)) {
                                    _showModalTip(pointOutTxts[0], elem, 0);
                                    return false;
                                }
                            }
                        } else {
                            if (right_1.hasClass(seat_ture) && right_2.hasClass(seat_selected)) {
                                //右+1为set_ture,右+2为selected,左+1为selected
                                _showModalTip(pointOutTxts[0], elem, 0);
                                return false;
                            }
                        }
                    } else {
                        //右+1不为不可选
                        if (right_1.hasClass(seat_selected) && (left_2.length === 0 || (left_2.length != 0 && left_2.hasClass(seat_false) )) && left_1.hasClass(seat_ture)) {
                            // 9.17 修改连选座位时，修改连选3个座位后，在中间只有两个座位时第4个座位不能选
                            // 10.12 修改中间座位只剩4个座位时可以从左或从右依次连选1、2、3和4个位；当中间座位只剩3个座位时，可以从左或从右依次连选1、2和3个位
                            if (right_3.length != 0 && left_1.hasClass(seat_ture)) {
                                // 10.15 当在中间只剩3个座且右1为已卖，右2为可选，修改了从右往左选座到第2个座时选不了
                                if (right_2.hasClass(seat_false)) {
                                    if (!(right_2.hasClass(seat_false) && left_2.hasClass(seat_false))) {
                                        _showModalTip(pointOutTxts[0], elem, 0);
                                        return false;
                                    } else {
                                        return true;
                                    }
                                } else if (right_2.hasClass(seat_ture)) {
                                    _showModalTip(pointOutTxts[0], elem, 0);
                                    return false;
                                }
                                // 10.15 当在中间只剩4个座且右1为已卖，右2为可选，修改了从右往左选座到第3个座时选不了
                                if (right_3.hasClass(seat_false)) {
                                    if (!(right_3.hasClass(seat_false) && left_2.hasClass(seat_false))) {
                                        _showModalTip(pointOutTxts[0], elem, 0);
                                        return false;
                                    } else {
                                        return true;
                                    }
                                } else if (right_3.hasClass(seat_ture)) {
                                    _showModalTip(pointOutTxts[0], elem, 0);
                                    return false;
                                }
                            }
                        } else {

                            if (left_1.hasClass(seat_ture) && left_2.length != 0 && left_2.hasClass(seat_selected)) {
                                //左+1为set_ture,左+2为selected,右+1为selected
                                _showModalTip(pointOutTxts[0], elem, 0);
                                return false;
                            }
                        }
                    }
                } else if (left_1.hasClass(seat_ture) && right_1.hasClass(seat_ture)) {
                    //左+1和右+1都可选
                    if (left_2.length != 0 && left_2.hasClass(seat_ture) && right_2.hasClass(seat_ture)) {
                        //this.setSelectSeat(elem, tempRow, tempColumn, 0);
                        //return;
                    } else if (left_2.length != 0 && left_2.hasClass(seat_selected) && right_2.hasClass(seat_selected)) {
                        //$alert("请不要留下单独空座");
                        _showModalTip(pointOutTxts[0], elem, 0);
                        return false;
                    } else if (left_2.length === 0 || !left_2.hasClass(seat_ture)) {
                        //左+2为边缘或不是可选状态

                        if (right_2.hasClass(seat_selected)) {
                            _showModalTip(pointOutTxts[0], elem, 0);
                            return false;
                        } else {
                            _showModalTip(pointOutTxts[1], elem, 0);
                            return false;
                        }

                    } else if (right_2.length === 0 || !right_2.hasClass(seat_ture)) {
                        //右+2为边缘或不是可选状态

                        if (left_2.length != 0 && left_2.hasClass(seat_selected)) {
                            _showModalTip(pointOutTxts[1], elem, 0);
                            return false;
                        } else {
                            _showModalTip(pointOutTxts[0], elem, 0);
                            return false;
                        }

                    } else {
                        _showModalTip(pointOutTxts[3], elem, 0);
                        //$alert("请不要留下单独空座");
                        return false;
                    }
                }

            }
            return true;
        }

        // 错误提示框
        function _showModalTip(body, seat, _type, delay) {
            SeatChooser.tip && SeatChooser.tip();
            SeatChooser.tip = Dialogs.tip('<i></i>'+body);
            var d_classname = SeatChooser.availableSeatClassName;
            var c_classname = SeatChooser.selectSeatClassName;
            setTimeout(function () {
                if (_type == 0) {
                    seat.addClass(d_classname);
                    seat.removeClass(c_classname);
                    afertSelectSeat();
                    seat.find('i').addClass('m-hide');
                }//else if (_type == 1) {
                    // seat.find('i').removeClass('m-hide');
                //     seat.addClass(c_classname);
                //     seat.removeClass(d_classname);
                // }
            //     afertSelectSeat();
            }, delay);
        }

        function afertSelectSeat() {
            var seatContainer = SeatChooser.seatContainer;
            // var locking_seats_dom = $(SeatChooser.selectedContainer);
            // var selectedTemplaste = SeatChooser.selectedTemplaste;
            if (seatContainer) {
                // var d_classname = SeatChooser.selectSeatDetailClassName;
                var c_classname = SeatChooser.selectSeatClassName;
                // var locking_seat_tmlp = SeatChooser.selectedTemplaste;
                var locking_seats_t = "";
                selected_seats = [];

                var $selected_seats = seatContainer.find(".seat." + c_classname),
                    selected_seats_num = $selected_seats.length;
                SeatChooser.mySeatCount = selected_seats_num;
                // locking_seats_dom.html('');

                if(selected_seats_num > 0){
                    // $(selectedTemplaste).html('<b>¥53</b>').appendTo(locking_seats_dom);
                    $('#_price').removeClass('m-hide')
                    $('#_price').find('b').html( '¥' + (SeatChooser.price * selected_seats_num));
                }else{
                    $('#_price').addClass('m-hide');
                    SeatChooser.submitBtn.removeClass(SeatChooser.submitBtnClassName).addClass(SeatChooser.disableSubmitBtnClassName);
                }
                $selected_seats.each(function (index, item) {
                    var seatname = $(item).data('seatname');
                    var seatid = $(item).data('seatid');
                    if (seatid) {
                        
                        selected_seats.push(seatid +'#'+seatname);
                        // $(selectedTemplaste).html(seatname).appendTo(locking_seats_dom);
                    }
                });
                SeatChooser.callback && SeatChooser.callback(selected_seats);
            }
        }


        // String.format = function() {
        //     if (arguments.length == 0)
        //         return null;
        //     var str = arguments[0];
        //     for (var i = 1; i < arguments.length; i++) {
        //      var re = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
        //      str = str.replace(re, arguments[i]);
        //     }
        //     return str;
        // } 

        module.exports = SeatChooser;

    }); //END of seatchooser.js