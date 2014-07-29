var assert = require('assert');
var Exotel = require('../');
var exotel = new Exotel({
    id   : process.env.EXOTEL_ID,
    token: process.env.EXOTEL_TOKEN
});

describe('exotel', function () {
    describe('#sendSMS()', function () {
        it('should send SMS', function (done) {
            exotel.sendSMS('9999999999', '9845940393', 'test', function (err, res) {
                if (err) {
                    throw err;
                }

                console.log(require('util').inspect(res, false, 10));
                assert.ok(res);
                done();
            });
        });
    });
});
