var config = require(process.cwd() + '/config/gulp');
var webpack = require('webpack');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('main.js');

var minifyPlugin = new webpack.optimize.MinChunkSizePlugin({
    compress: {
        warnings: false
    }
});

var uglifyJsPlugin = new webpack.optimize.UglifyJsPlugin({
    compress: {
        warnings: false
    }
})

module.exports = {
    entry: {
        cinema_list: config.src.js + '/weiticket/cinema_list.js',
        index: config.src.js + '/weiticket/index.js',
        login: config.src.js + '/weiticket/util/login.js',
        choose_cinema: config.src.js + '/weiticket/choose_cinema.js',
        schedule: config.src.js + '/weiticket/schedule.js',
        onlineseat: config.src.js + '/weiticket/onlineseat.js',
        mine: config.src.js + '/weiticket/mine.js',
        payment: config.src.js + '/weiticket/payment.js',
        result: config.src.js + '/weiticket/result.js',
        mycards: config.src.js + '/weiticket/mycards.js',
        bindingcard: config.src.js + '/weiticket/bindingcard.js',
        checkbincard: config.src.js + '/weiticket/checkbincard.js',
        setcookie: config.src.js + '/weiticket/setcookie.js',
        myecoupons: config.src.js + '/weiticket/myecoupons.js',
        event: config.src.js + '/weiticket/event.js',
        filmlist: config.src.js + '/weiticket/filmlist.js',
        ticket: config.src.js + '/weiticket/ticket.js',
        login: config.src.js + '/weiticket/login.js',
        movienews: config.src.js + '/weiticket/movienews.js',
        medialist: config.src.js + '/weiticket/medialist.js',
        orderwait: config.src.js + '/weiticket/orderwait.js',
        orderResult: config.src.js + '/weiticket/orderResult.js'
    },
    output: {
        path: config.dist.js + '/weiticket',
        filename: '[name].js'
    },
    plugins: [commonsPlugin, uglifyJsPlugin]
};
