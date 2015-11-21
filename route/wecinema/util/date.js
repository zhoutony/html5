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
exports.dateFormat = dateFormat;