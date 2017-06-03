import config from '../config.json';
import * as facebookMessage from '../facebook/facebook_messages.js';
import request from 'request';

let getValidateToken = (req, res) => {
  if(req.query['hub.verify_token'] === config.facebook.verification_token) {
    return res.status(200).send(req.query['hub.challenge']);
  } else {
    res.status(500).send({"status": "error", "responseMessage": "Wrong verification token."});
  }
}

let getFBMessage = (req, res) => {
  let data = req.body;
  if (data.object === 'page') {
    data.entry.forEach( (entry) => {
      let pageID = entry.id;
      entry.messaging.forEach( (event)  => {
        if(event.postback) {
          facebookMessage.receivedPostbackMessage(event);
        } else {
          console.log("Webhook received unknown event: ", event);
        }
      });
    });
    res.sendStatus(200);
  }
};

let setGreetingText = (req, res) => {
  let fbData = {
    "greeting":[
      {
      "locale":"default",
      "text":"Hello!"
    }, {
      "locale":"en_US",
      "text":"Hi {{user_full_name}}, welcome to the tchokin bot."
    }
  ]
  }

  request({
    url: config.facebook.facebook_url+'/me/messenger_profile',
    qs: {access_token: config.facebook.page_token},
    method: 'POST',
    json: fbData
  },function(error, response, body) {
    console.log('======SetGreetingText======',body);
    res.status(200).send(body);
  });
}

let setGetStartedButton = (req, res) => {

  let fbData = {
    "get_started": {
      "payload": "GET_STARTED_PAYLOAD"
    }
  }

  request({
    url: config.facebook.facebook_url+'/me/messenger_profile  ',
    qs: {access_token: config.facebook.page_token},
    method: 'POST',
    json: fbData
  },function(error, response, body) {
    console.log('======SetGetStartedButton======',body);
    res.status(200).send(body);
  });
}

export { getValidateToken, getFBMessage, setGreetingText, setGetStartedButton };
