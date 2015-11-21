    // var call_unsale = function(){
    //         var unsale_option                   = {};
    //             unsale_option.schedulePricingId = mp_id;
    //         $.post('/hall/unsales',unsale_option,function(data){
    //             console.log(data);
    //             // 01:4:05,06,07@01:5:03,04@01:6:01,06@01:7:07
    //             var seat = data;
    //             var _seat = {};
    //             var tempSeatData = seat.split('@');
    //             // ["01:4:05,06,07", "01:5:03,04", "01:6:01,06", "01:7:07"]
    //             // console.log(tempSeatData);
    //             for (var i = 0; i < tempSeatData.length; i++) {
    //                 // console.log(tempSeatData[i]);
    //                 // ==>result==>01:4:05,06,07
    //                 var _dataArr = tempSeatData[i].split(':');
    //                 // console.log(_dataArr);
    //                 // ===>result==>["01", "4", "05,06,07"]
    //                 //              ["01", "5", "03,04"]
    //                 //              ["01", "6", "01,06"]
    //                 //              ["01", "7", "07"]
    //                 var n = _dataArr[0];
    //                 // console.log(n)
    //                 // ===>result==> 01
    //                 var no_seat = _dataArr[1].split(',');
    //                 // console.log(_dataArr[1]);
    //                 // result >> 4
    //                 //           5
    //                 //           6
    //                 //           7
    //                 if (!_seat[n]) {
    //                     _seat[n] = {};
    //                 }
    //                 _.each(no_seat, function(index) {
    //                     _seat[n][index] = true;
    //                 });
    //             }
    //             console.log(_seat);
    //         });//END of post....
    // }//END of call_unsale.................................
var _            = require("underscore");
var result       = "01:4:05,06,07@01:5:03,04@01:6:01,06@01:7:07";
var _seat        = {};
var tempSeatData = result.split('@');
// console.log(tempSeatData);
// ["01:4:05,06,07", "01:5:03,04", "01:6:01,06", "01:7:07"]
_.each(tempSeatData,function(index,item){
    console.log(index);
});

