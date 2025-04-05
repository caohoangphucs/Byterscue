var http = require('http');
var https = require('https');
const ACCESS_TOKEN = "WRw30wF2w7NW_rOWCVvmyn3tf48Ho-zy";

const sendSMS = function(phones, content, type, sender) {
    var url = 'api.speedsms.vn';
    var params = JSON.stringify({
        to: phones,
        content: content,
        sms_type: type,
        sender: sender
    });

    var buf = new Buffer(ACCESS_TOKEN + ':x');
    var auth = "Basic " + buf.toString('base64');
    const options = {
        hostname: url,
        port: 443,
        path: '/index.php/sms/send',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': auth
        }
    };

    const req = https.request(options, function(res) {
        res.setEncoding('utf8');
        var body = '';
        res.on('data', function(d) {
            body += d;
        });
        res.on('end', function() {
            var json = JSON.parse(body);
            if (json.status == 'success') {
                console.log("send sms success");
            }
            else {
                console.log("send sms failed " + body);
            }
        });
    });

    req.on('error', function(e) {
        console.log("send sms failed: " + e);
    });

    req.write(params);
    req.end();
}

// Gửi tin nhắn tới số điện thoại 84326330267 với nội dung "hello"
sendSMS('84326330267', 'hello', 2, 'default');
