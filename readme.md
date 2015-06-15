# Exotel API helper for node
[![NPM version](https://badge.fury.io/js/exotel.svg)](http://badge.fury.io/js/exotel)

Currently supports:
* Sending SMS
* Checking SMS status

More features are coming in. Contributions welcome.

## Installation

```bash
npm install exotel
```

## Usage

```js
var exotel = require('exotel')({
    id   : // exotel id,
    token: // exotel token
});

exotel.sendSMS('9999999999', 'Hi', function (err, res) {
    // ...
});
```

## Documentation

###sendSMS(mobile, msg, [priority], [statusCallback], callback)
Sends an SMS

####Arguments
* `mobile` _(String)_: 10-digit mobile number
* `msg` _(String)_: Message body
* `priority` _(String)_: Message priority. Defaults to 'normal'
* `[statusCallback]` _(String)_: An optional URL to call when the message reaches a terminal state (delivered or failed)
* `callback` _(Function)_: Called as `callback(err, result)` - where `result` is a JSON version of the Exotel xml response:
```js
{
    Sid        : '<sms_id>',
    DateUpdated: '2014-07-30 09:44:56',
    DateCreated: '2014-07-30 09:44:56',
    DateSent   : '1970-01-01 05:30:00',
    AccountSid : '<account_id>',
    To         : '<recipient_mobile>',
    From       : '/<account_id>',
    Body       : 'Hi!',
    BodyIndex  : '',
    Status     : '<status>', // "queued", "sending", "sent" .. etc.
    Direction  : 'outbound-api',
    Price      : '',
    ApiVersion : '',
    Uri        : '/v1/Accounts/<account_id>/Sms/Messages/<sms_id>'
}
```

###checkSMS(sid, callback)
Check SMS status

####Arguments
* `sid` _(String)_: Sid in `sendSMS` result
* `callback` _(Function)_: Called as `callback(err, result)` - where `result` is the same SMS data as above

### Testing
Install dev dependencies and run:
```bash
EXOTEL_ID=<id> EXOTEL_TOKEN=<token> MOBILE=<recipient> npm test
```

### License
[MIT](LICENSE)
