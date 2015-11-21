app.get(['/','/index.html'],function(req, res){
    res.render('test/index', {
        data: {
            content: 'Hello world!'
        }
    });
});