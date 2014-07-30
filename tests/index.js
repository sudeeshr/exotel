var assert = require('assert');
var exotel = require('../')({
    id   : process.env.EXOTEL_ID,
    token: process.env.EXOTEL_TOKEN
});

var id;

describe('exotel', function () {
    describe('#sendSMS()', function () {
        it('should send SMS', function (done) {
            exotel.sendSMS(process.env.MOBILE, 'test', function (err, res) {
                if (err) {
                    throw err;
                }
                assert.ok(res);
                done();
            });
        });

        it('should send SMS with status callback', function (done) {
            exotel.sendSMS(process.env.MOBILE, 'test', 'http://test.url', function (err, res) {
                if (err) {
                    throw err;
                }
                assert.ok(res);
                id = res.Sid;
                done();
            });
        });

        it('should check sms status', function (done) {
            exotel.checkSMS(id, function (err, res) {
                if (err) {
                    throw err;
                }
                assert.ok(res);
                done();
            });
        });
    });
});
