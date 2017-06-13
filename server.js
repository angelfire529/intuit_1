var express = require('express');
var app = express();
var path = require('path');

module.exports = {

    startExpress: function () {
        app.set('port', 8100);

        app.use(require('connect-livereload')());

        app.use(express.static(path.join(__dirname, 'public')));

        var server = app.listen(app.get('port'), function () {
            var port = server.address().port;
            console.log('listening on port:  ' + port);
        });
    }
    
};
