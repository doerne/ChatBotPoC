var unirest = require('unirest');
var log4js = require('log4js');
const log4js_extend = require("log4js-extend");

var BASEURL = "https://api.ciscospark.com/v1/messages";

log4js_extend(log4js, {
    path: __dirname,
    format: "\t [@name at @file:@line:@column]"
});


var logger = log4js.getLogger();
logger.level = 'debug';

// var roomId = "Y2lzY29zcGFyazovL3VzL1JPT00vZjViOTA0MjAtNmU5Zi0xMWVhLThhYjEtOTNhNjM4NzZjMzlh"; // doernes Room
var roomId = "Y2lzY29zcGFyazovL3VzL1JPT00vYzczOTljMzAtMjAwYy0xMWViLWE2ZTEtNGQ5YzI1NDc0MWIx"; // LeadNotification
var auth = 'Bearer OGQ3NjA5MGEtZDQ4NC00NzlkLTlhMmItMTcxMDczZDA3NWMzNGI2MzEyOGMtMTBl_PF84_6fb6a033-5d29-44a4-aa90-8d39981f5cef';
var lineBreak = '  \n';

function ChatBot() {}

ChatBot.prototype.test = function test() {
    logger.debug("ARE YOU F***ING KIDDING ME!!!!111");
};



ChatBot.prototype.getSendMessage = function getSendMessage(res, messsage) {
    logger.info("authenticate...");
//    logger.debug("show credentials " + JSON.stringify(credentials));
    logger.info("message:\t"+messsage);
    sendMessage(res, messsage.msg)
};

ChatBot.prototype.postSendMessage = function postSendMessage (res, body){
    logger.info("invoke post sendMessage")
    sendMessage(res, body.msg);
}

function sendMessage (res, message){
    //skips certificate checks
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    unirest.post(BASEURL)
        .headers({
            'Content-Type': 'application/json',
            'Authorization': auth
        })
        .send({
            "roomId": roomId,
            "markdown": message
        })
        .end(function (response) {
            if (response.body) {
                //jiraSession = response.body.sessionName + '=' + response.body.sessionValue;
                logger.info("Status: " + response.statusCode);
                res.send(response.statusCode);
            } else {
                logger.error("failed");
                // res.send(false);
            }
        });
}

module.exports = ChatBot;