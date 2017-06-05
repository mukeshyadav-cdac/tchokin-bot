import request from 'request';
import config from '../config.json';
import User from '../models/user.js';

let getProfileDetail = (userId, cb) => {
  request({
    url: config.facebook.facebook_url+'/'+userId,
    qs: { access_token: config.facebook.page_token, fields: 'first_name,last_name,profile_pic,gender,locale,timezone'},
    method: 'GET',
    json: true
  }, (error, response, body) => {
    if (error) {
        console.log('Error sending message: ', error);
        cb();
    } else if (response.body.error) {
      console.log('Error: GetProfileDetail=====', response.body.error);
      cb();
    } else {
      console.log("===Success===GetProfileDetail===",body);
      User.findOne({userId: userId}, (err, user) => {
        if (err) {
          console.log(err)
          cb();
        } else if (user) {
          cb(body)
        } else {
          let user = new User(Object.assign({}, body, {userId: userId}));
          user.save((err, user) => {
            cb(body);
          });
        }
      });
    }
  });
}

let sendTextMessage =  (userId, text, cb) => {

  let fbData = {
    recipient: {id: userId},
    message: {
      text: text
    }
  }

  request({
    url: config.facebook.facebook_url+'/me/messages',
    qs: { access_token: config.facebook.page_token },
    method: 'POST',
    json: fbData
  }, (error, response, body) => {
    if (error) {
      console.log('Error sending message: ', error);
      cb();
    } else if (response.body.error) {
      console.log('Error: SendTextMessage===', response.body.error);
      cb();
    } else {
      cb();
    }
  });
}

let sendQuickReplyMessage = (userId, text, quickReplyButtons, cb) => {
  let fbData = {
    recipient: {id: userId},
    message: {
      "text": text,
      "quick_replies": quickReplyButtons
    }
  }

  request({
    url: config.facebook.facebook_url+'/me/messages',
    qs: { access_token: config.facebook.page_token },
    method: 'POST',
    json: fbData
  }, (error, response, body) => {
    if (error) {
      console.log(error)
      cb();
    } else if (response.body.error) {
      console.log(response.body.error)
      cb();
    } else {
      cb();
    }
  });
}

let sendGenericTemplate = (userId, elements, cb) => {
  let fbData = {
    recipient: {id: userId},
    message: {
      "attachment": {
        "type": "template",
        "payload": {
          "template_type": "generic",
          "elements": elements
        }
      }
    }
  }

  request({
    url: config.facebook.facebook_url+'/me/messages',
    qs: { access_token: config.facebook.page_token },
    method: 'POST',
    json: fbData
  }, function(error, response, body) {
    if (error) {
      console.log('Error sending message: ', error);
      cb();
    } else if (response.body.error) {
      console.log('Error: SendGenericTemplate===', response.body.error);
      cb();
    } else {
      console.log("===Success==SendGenericTemplate=");
      cb();
    }
  });
}

let senderAction = (userId, action) => {

  let fbData = {
    recipient: {id: userId},
    sender_action: action
  }

  request({
    url: config.facebook.facebook_url+'/me/messages',
    qs: {access_token: config.facebook.page_token},
    method: 'POST',
    json: fbData
  }, (error, response, body) => {
    if (error) {
      console.log('Error sending message: ', error);
    } else if (response.body.error) {
      console.log('Error: SenderAction===', response.body.error);
    } else {
      console.log("===Success==SenderAction=");
    }
  });
}

export { getProfileDetail, senderAction, sendTextMessage, sendQuickReplyMessage, sendGenericTemplate};
