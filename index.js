var request = require('request');
var parseString = require('xml2js').parseString;

function Exotel(opts) {
    this.id = opts.id;
    this.token = opts.token;
}

Exotel.prototype = {
    sendSMS: function (from, to, msg, cb) {
        var url = 'https://' + this.id + ':' + this.token +
            '@twilix.exotel.in/v1/Accounts/' + this.id + '/Sms/send';

        request.post(url, {form: {
            'From': from,
            'To'  : to,
            'Body': msg
        }}, function (err, res, body) {
            if (err) {
                return cb(err);
            }

            parseString(body, function (err, parsed) {
                var response = parsed.TwilioResponse;

                if (err) {
                    return cb(err);
                }

                if (response.RestException &&
                    response.RestException.length) {
                    var ex = response.RestException[0];
                    return cb(new Error(ex.Status[0] + ': ' + ex.Message[0]));
                }

                cb(null, response);
            });
        });
    }
};

module.exports = Exotel;
