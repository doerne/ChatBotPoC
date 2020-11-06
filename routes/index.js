var express = require('express');
var router = express.Router();
var ChatBot = require('./webexTeams/ChatBot');
var chatbot = new ChatBot();
var log4js = require('log4js');
const log4js_extend = require("log4js-extend");

log4js_extend(log4js, {
  path: __dirname,
  format: "\t [@name at @file:@line:@column]"
});

var logger = log4js.getLogger();
logger.level = 'debug';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/message', function (req, res, next){
  var body = req.body;
  var apikey = req.headers["x-api-key"];
  logger.info("body:\t"+body.body);
  if (apikey === 'doerne'){
    chatbot.postSendMessage(res, req.body);
  }else{
    res.status(400).send('You failed - Ha Ha!');
  }
});

router.get('/message', function (req,res,next){
  var message = req.query;
  chatbot.getSendMessage(res, message);
});



module.exports = router;
