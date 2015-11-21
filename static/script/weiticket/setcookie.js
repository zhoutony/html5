var $ = require('../lib/zepto.js');
var cookie = require("../util/cookie.js");

$(document).ready(function () {
    if (targetUrl != "") {

        var endTime = new Date();
        endTime.setMonth(endTime.getMonth() + 7);

        cookie.setItem("openId", openId, "", "/");
        cookie.setItem("open_id", 'j:{"public_short":"' + publicsignalshort + '","openid":"' + openId + '"}', "", "/");
        cookie.setItem("publicsignalshort", publicsignalshort, endTime, "/");

        if (targetUrl === 'my') {
            location.href = "/" + publicsignalshort + "/order";
        } else {
            location.href = "/" + publicsignalshort + "/choose_cinema";
        }
        return;
    }
    else(
        $("#content").show()
    )

    $("#setBtn").on("click", function () {
        setCookie();
    });

    function setCookie() {
        document.cookie = $('#c_cookie').val();
        window.location = $('#c_url').val();
    }
});