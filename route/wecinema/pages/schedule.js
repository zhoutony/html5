// /*
//  * Created by LemonHall on 2015/4/
//  */
// var util = require('util');
// var model = require(process.cwd() + "/libs/model.js");
// var chk_login = require(process.cwd() + "/libs/check_login_middle.js");

// var dataProcess = require(process.cwd() + "/route/wecinema/util/data.js");
// var returnErrorPage = model.returnErrorPage;

// var os = require('os');
// var pid = process.pid;
// var hostname = os.hostname();
// var my_name = hostname + ':' + pid;


// var pageDate = {};


// app.get(['/:publicsignalshort/schedule/:cinema_id/:movie_id'], chk_login.isLoggedIn, function (req, res) {
//     //渲染准备用数据
//     var render_data = {};
//     //调用的接口列表
//     var my_api_addr = "/movie/MovieSchedule";
//     //从参数当中获取公众号的id
//     var publicsignalshort = req.params["publicsignalshort"];
//     //从参数当中获取影院的id
//     var cinema_id = req.params["cinema_id"];
//     //从参数当中获取影片的id
//     var movie_id = req.params["movie_id"];
//     var options = {
//         uri: my_api_addr,
//         args: {
//             cinemano: cinema_id,
//             movieno: movie_id,
//             publicsignalshort: publicsignalshort
//         }
//     };
//     render_data.data = {};
//     render_data.data = {
//         title: '',
//         cinema_id: cinema_id,
//         movie_id: movie_id,
//         publicsignalshort: publicsignalshort,
//         viewColor: req.cookies['view_color_' + publicsignalshort],
//         reversion: global.reversion,
//         staticBase: global.staticBase
//     }


//     model.getDataFromPhp(options, function (err, data) {
//         if (!err && data && data.sche) {
//             render_data.onemoive_sche = data;
//             render_data.allDaySches = dataProcess.getAllDaySches(data.sche);

//         } else {
//             render_data.err = err;
//         }
//         res.render("wecinema/schedule", render_data);
//     });
// });


// //拼装某一部影片的html的接口
// app.get(['/:publicsignalshort/one_movie_schedule/:cinema_id/:movie_id'], function (req, res) {
//     //渲染准备用数据
//     var render_data = {};

//     var my_api_addr = "/movie/MovieSchedule";
//     //从参数当中获取公众号的id
//     var publicsignalshort = req.params["publicsignalshort"];
//     //从参数当中获取影院的id
//     var cinema_id = req.params["cinema_id"];
//     //从参数当中获取影片的id
//     var movie_id = req.params["movie_id"];

//     var options = {
//         uri: my_api_addr,
//         args: {
//             cinemano: cinema_id,
//             movieno: movie_id,
//             publicsignalshort: publicsignalshort
//         }
//     };
//     render_data.data = {};
//     render_data.data.title = "";
//     render_data.data.cinema_id = cinema_id;
//     render_data.data.movie_id = movie_id;
//     render_data.data.publicsignalshort = publicsignalshort;

//     model.getDataFromPhp(options, function (err, data) {
//         // console.log(data);
//         if (!err && data && data.sche) {
//             render_data.onemoive_sche = data;
//             render_data.allDaySches = dataProcess.getAllDaySches(data.sche);
//         } else {
//             render_data.err = err;
//         }
//         res.render("wecinema/one_schedule", render_data);
//     });
// });


// //异步加载渲染好的电影详情页
// app.get(['/:publicsignalshort/movie_info_html/:movie_id/'], function (req, res) {
//     //渲染准备用数据
//     var render_data = {};
//     //调用的接口列表
//     var my_api_addr = "/movie/info";
//     //从参数当中获取影片的id
//     var movie_id = req.params["movie_id"];

//     var options = {
//         uri: my_api_addr,
//         args: {
//             movieno: movie_id
//         }
//     };
//     render_data.data = {
//         movie: {}
//     };
//     model.getDataFromPhp(options, function (err, data) {
//         console.log(err)
//         console.log(data)
//         if (!err) {
//             render_data.data.movie = data;
//             var tags = data.tags.split('/');
//             render_data.data.movie.tags = tags;
//             res.render("wecinema/movie_detail_info", render_data);
//         } else {
//             returnErrorPage(err, res);
//         }
//     });

// }); // END of get /wx=========================================================


// //异步加载电影详情JSON
// app.get(['/:publicsignalshort/movie_info/:movie_id/'], function (req, res) {
//     //渲染准备用数据
//     var render_data = {};
//     //调用的接口列表
//     var my_api_addr = "/movie/info";
//     //从参数当中获取影片的id
//     var movie_id = req.params["movie_id"];

//     var options = {
//         uri: my_api_addr,
//         args: {
//             movieno: movie_id
//         }
//     };
//     render_data.data = {};

//     model.getDataFromPhp(options, function (err, data) {
//         if (!err) {
//             render_data.data.movie = data;
//             res.send(render_data);
//         } else {
//             res.send(err);
//         }
//     });

// }); // END of get /wx=========================================================


// app.get(['/:publicsignalshort/movie_list_html/:cinema_id/'], function (req, res) {
//     //渲染准备用数据
//     var render_data = {};
//     var movieList_api_addr = "/movie/list";
//     //从参数当中获取影院的id
//     var cinema_id = req.params["cinema_id"];
//     //从参数当中获取公众号的id
//     var publicsignalshort = req.params["publicsignalshort"];

//     var movieList_options = {
//         uri: movieList_api_addr,
//         args: {
//             cinemano: cinema_id,
//             publicsignalshort: publicsignalshort
//         }
//     };

//     render_data.data = {};
//     model.getDataFromPhp(movieList_options, function (err, data) {
//         if (!err) {
//             render_data.data.movies = data;
//             res.render("wecinema/movie_list_info", render_data);
//         } else {
//             res.send("");
//         }
//     });

// }); // END of get /wx=========================================================