/*
*  ciys.js 选择城市组件
*
*
*/


var $ = require('../lib/zepto.js');
var widgets = require('../util/widgets.js');

var Citys = {
    render: function (argument) {
        this.getCitys();
    },

    getCitys: function(){
        
        $.get('/get/citys', function(city_data){
            if(!city_data.err && city_data.data){
                console.log(city_data.data);
            }
            
        })
        
    }

    // buildHtml: function(movies, movie_no){
    //     if(!movies){
    //         return;
    //     }
    //     var _html = '<div><ul class="blurs-img">',
    //         _backgroundHtml = '',
    //         _imgHtml = '',
    //         _arrowHtml ='<div class="switch-left"></div><div class="switch-right"></div>',
    //         _movies = [],
    //         _movies = this.buildArr(movies),
    //         _len = _movies.movie.length;
    //     for(var i = 0; i < _len; i++){
    //         _backgroundHtml += String.format('<li><img src="{0}" class="blurs"></li>', _movies.movie[i].movie_poster);
    //         if(i === 1){
    //             _imgHtml += String.format('<li class="active"><img src="{0}"></li>', _movies.movie[i].movie_poster);
    //         }else{
    //             _imgHtml += String.format('<li class="small"><img src="{0}"></li>', _movies.movie[i].movie_poster);
    //         }
    //     }
    //     _html = String.format('<div><ul class="blurs-img">{0}</ul><div class="movie-list-inner"><ul style="transform: translate(-1.5rem, 0)" class="movie-list">{1}</ul></div>{2}</div>',
    //                             _backgroundHtml,
    //                             _imgHtml,
    //                             _arrowHtml
    //                             );
    //     return _html;
    // }
}

module.exports = Citys;

