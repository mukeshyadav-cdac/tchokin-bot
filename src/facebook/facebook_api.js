import request from 'request';
import config from '../config.json';

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
      cb(body);
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
      cb();
    } else if (response.body.error) {
      cb();
    } else {
      cb();
    }
  });
}

export { getProfileDetail, sendTextMessage, sendQuickReplyMessage};
