var dateFormat = function(date) {

    //获取年月日
    var dateString = date.toString();
    var y = dateString.substring(0, 4);
    var m = dateString.substring(4, 6);
    var d = dateString.substring(6);

    //将日期格式化
    var year = parseInt(y)
    var month = parseInt(m);
    var day = parseInt(d);

    var dispalyDate = year + '年' + month + '月' + day + '日';//2015年3月17日
    
    //对今天、明天、后天做特殊处理

    var partDate = month + '月' + day + '日'; //3月17日

    //考虑到iOS的兼容性，对日期格式做特殊处理
    var monthForiOS = {
        '1': 'Jan',
        '2': 'Feb',
        '3': 'Mar',
        '4': 'Apr',
        '5': 'May',
        '6': 'Jun',
        '7': 'Jul',
        '8': 'Aug',
        '9': 'Sep',
        '10': 'Oct',
        '11': 'Nov',
        '12': 'Dec'
    };

    var dateForiOS = monthForiOS[month] + ' ' + day + ' ' + year; //'Mar 17 2015'
    
    //获取当前时间
    var now = new Date();
    var todayYear = now.getFullYear();
    var todayMonth = parseInt(now.getMonth() + 1);
    var todayDay = parseInt(now.getDate());

    var todayForiOS = monthForiOS[todayMonth] + ' ' + todayDay + ' ' + todayYear; //'Apr 23 2015'


    var oneDay = 24 * 60 * 60 * 1000;
    var twoDays = 2 * oneDay;


    //判断是否是今天
    if ( dateForiOS === todayForiOS){
        dispalyDate = '今天' + partDate;
    }

    //判断是否是明天
    if ( Date.parse(dateForiOS) - Date.parse(todayForiOS) === oneDay) {
        dispalyDate = '明天' + partDate;
    }

    //判断是否是后天
    if ( Date.parse(dateForiOS) - Date.parse(todayForiOS) === twoDays){
        dispalyDate = '后天' + partDate;
    }

    return dispalyDate;
    
};





//返回今天的日期格式化字符串
function getTodayStr (data, _format){
    var _date = new Date(data);

    if (_format){
        if(_format == "y-m-d"){
            var _str =
                (_date.getFullYear()) + "年" +
                (_date.getMonth()+1) + "月" +
                (_date.getDate()) +"日"

            return _str;
        }else if(_format == "m-d"){
            var _str =
                (_date.getMonth()+1) + "月" +
                (_date.getDate()) +"日"

            return _str;
        }
    }

}

function getTodayTime (_date){
    var _date = new Date(_date),
        _y = _date.getFullYear(),
        _h = _date.getHours(),
        _h = _h < 10 ? "0" + _h : _h,
        _m = _date.getMinutes(),    //  好坑，从0开始
        _m = _m < 10 ? "0" + _m : _m,
        _s = _h + ":" + _m;
    return _s;
}


var movieNewsDate = function (date){
    if(!date) return '';
    //获取年月日
    var _date = new Date(date),
        y = _date.getFullYear(),
        m = _date.getMonth(),
        d = _date.getDate(),
        h = _date.getHours(),
        mm = _date.getMinutes(),
        today = new Date(),
        _y = today.getFullYear(),
        _m = today.getMonth(),
        _d = today.getDate(),
        _h = today.getHours(),
        _mm = today.getMinutes();
    
    if(_y > y){
        return getTodayStr(date, 'y-m-d');
    }else if(_y == y){
        if(_m == m && _d == d){
            var _time;
            if(h == _h){
                _time = (_mm - mm == 0) ? 1 : _mm - mm;
                return _time + '分钟前';
            }else{
                _time = _h - h;
                return _time + '小时前';
            }
        }else{
            return getTodayStr(date, 'm-d') + ' ' + getTodayTime(date);
        }
    }

}

exports.dateFormat = dateFormat;
exports.movieNewsDate = movieNewsDate;


