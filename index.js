module.exports = function (opts) {
    var request = require('request');
    var parseString = require('xml2js').parseString;
    var apibase = 'https://' + opts.id + ':' + opts.token +
            '@twilix.exotel.in/v1/Accounts/' + opts.id;

    var exotel = {};

    exotel.sendSMS = function (to, msg, priority, statusCb, cb) {
        if (arguments.length === 3) {
            cb = arguments[2];
            priority = 'normal';
            statusCb = '';
        }
        
        if (arguments.length === 4) {
            cb = arguments[3];
            statusCb = '';
        }

        var data = {
            'From': '9999999999', // value doesn't matter
            'To': to,
            'Body': msg,
            'Priority': priority,
            'StatusCallback': statusCb
        };

        var url = apibase + '/Sms/send';

        request.post(url, {form: data}, function (err, res, body) {
            if (err) {
                return cb(err);
            }

            parseString(body, {
                explicitArray: false
            }, function (err, parsed) {
                if (err) {
                    return cb(err);
                }

                if (res.statusCode !== 200) {
                    var ex = parsed.TwilioResponse.RestException;
                    if(ex){ // this is undefined most of the time, 
                        // which causes exception 'Status of undefined'
                        return cb(new Error(ex.Status + ': ' + ex.Message));
                    }
                }

                cb(null, parsed.TwilioResponse.SMSMessage);
            });
        });
    };

    exotel.checkSMS = function (id, cb) {
        var url = apibase + '/Sms/Messages/' + id;

        request.get(url, function (err, res, body) {
            if (err) {
                return cb(err);
            }

            parseString(body, {
                explicitArray: false
            }, function (err, parsed) {
                if (err) {
                    return cb(err);
                }

                if (res.statusCode !== 200) {
                    var ex = parsed.TwilioResponse.RestException;
                    if(ex){ // this is undefined most of the time, 
                        // which causes exception 'Status of undefined'
                        return cb(new Error(ex.Status + ': ' + ex.Message));
                    }
                }

                cb(null, parsed.TwilioResponse.SMSMessage);
            });
        });
    };

    return exotel;
};
