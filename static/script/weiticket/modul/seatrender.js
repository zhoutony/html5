define([
        '../../lib/zepto.js',
        '../../lib/underscore',
        '../../lib/iscroll',
        '../../util/transformer'
    ],
    function(
        $,
        _,
        IScroll,
        Transformer
    ) {

        var _sr = {
            init: function(config) {
                var that = this;
                this.roomVM = config.vm;
                this.$root = config.root;
                this.$room = this.$root.find('.room');
                this.$roomTable = this.$room.find('.tnone');
                this.$hIndicator = this.$root.find('.row_num .lines');

                var $room = this.$room;
                var $table = this.$roomTable;
                var $root = this.$root
                var $hIndicator = this.$hIndicator;
                // 隐藏 .seats2info
                var seats2info = $('.seats2info');
                // seats2info.hide();

                //初始化指示条
                this.hIndTransform = new Transformer($hIndicator);

                this.offset = {
                    x: 0,
                    y: 0
                };

                //计算缩放比例
                var tableWidth = $table.width() + 30;
                $('.smallticket').width(tableWidth);
                var min = $root.width() / tableWidth;
                var max = Math.max(1.5, tableWidth / 1000);

                this.minZoom = min;
                this.maxZoom = max;

                this.scroll = new IScroll($room[0], {
                    bounce: 300,
                    momentum: false,
                    zoom: true,
                    scrollbars: true,
                    zoomMin: min,
                    zoomMax: max,
                    startZoom: min,
                    useTransition: true,
                    scrollX: true,
                    scrollY: true,
                    freeScroll: true,
                    scrollbars: false
                });
                setTimeout(function(){
                    seats2info.show();
                }, 200)


                // 指示条逻辑
                if (!this.scroll.indicators) {
                    this.scroll.indicators = [];
                }
                var indicator = {
                    style: that.$hIndicator[0].style,
                    updatePosition: function() {
                        var y = Math.round(that.scroll.y);
                        this.style["webkitTransform"] = "translate(0," + y + "px) translateZ(0) scale(" + that.scroll.scale + ")";
                        this.style["webkitTransformOrigin"] = "top left";
                    },
                    transitionTime: function(time) {
                        this.style.webkitTransitionDuration = time + 'ms';
                    },
                    transitionTimingFunction: function(value) {
                        this.style.webkitTransitionTiming = value;
                    },
                    refresh: function() {
                        this.transitionTime(0);
                        this.updatePosition();
                    },
                    remove: function() {},
                    destroy: function() {}
                };
                this.scroll.indicators.push(indicator);

                //处理完毕数据之后执行缩放动画
                _.defer(function() {
                    var $seats = $table.find('.seat');
                    that.scroll.scrollBy(0, -0.5 * ($table.width() - $table.height()));
                    that.scroll.zoom(that.scroll.scale + .0001); //hack the hIndicator
                    var _x = that.$roomTable.width() / 2;
                    var _y = that.$roomTable.height() / 2;
                    if(that.scroll.scale < .3){
                        setTimeout(function(){
                            that.scroll.zoom(.5, _x, _y+150, 2000);
                        }, 1000)
                    }
                });

            },
            zoomOut: function() {
                var _x = this.$roomTable.width() / 2;
                var _y = this.$roomTable.height() / 2;
                this.scroll.zoom(this.minZoom, _x, _y, 300);
            },
            zoomIn: function(who) {
                var that = this;
                var _pos = who[0].getBoundingClientRect();
                /*if (that.roomVM && that.roomVM.mySeatCount && that.roomVM.mySeatCount == 1) {
                    // var _x = that.$roomTable.width() / 2;
                    // var _y = that.$roomTable.height() / 2;
                    _.defer(function() {
                        //that.scroll.scrollToElement(who, 300, 0, 0);
                        that.scroll.scrollToElement(who, 300);
                        // that.scroll.scrollTo(_x, _y, 300);
                    });
                }*/
                var zoom = (that.minZoom + that.maxZoom) / 2;
                // if(zoom > 1){
                //     zoom = 1;
                // }
                that.scroll.zoom(zoom);
                _.defer(function(){
                    var _offset = who.offset(),
                        roomOffset = that.$room.offset(),
                        roomWidth = that.$room.width() / 2,
                        roomHeight = that.$room.height() / 2,
                        _numLeft, _numTop;
                    if(_offset.left > roomWidth){
                        _numLeft = _offset.left - (_offset.left - roomWidth);
                    }else{
                        _numLeft = _offset.left;
                    }
                    if(_offset.top < roomHeight){
                        _numTop = roomOffset.top + _offset.top;    
                    }else{
                        //-100 选中的座位上移100像素
                        _numTop = -100;
                    }
                    that.scroll.scrollToElement(who[0], 300, true, true);
                });
            }

        }; //END of _sr.prototype
        module.exports = _sr;
    });