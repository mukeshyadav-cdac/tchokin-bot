import * as platformTemplate from '../datasource/platform_template.js';
import request from 'request';
import config from '../config.json';

let intent = (inputData, object, cb) => {
  let content = require('../contents/'+inputData.bot+'.json');
  let url = config.bank_url + '/api/v1/getCategoryRecord';
  let postData = {
    userId: inputData.userId,
    category: 'R_trans'
  }
  console.log('mukesh')
  request({
    url: url,
    method: 'POST',
    json: postData,
    headers: {
      'Content-Type': 'application/json'
    }
  }, function (err, res, body) {
    if (err) {
      console.error('error posting json: ', err)
    }

    let templateData = {
      title: body.amount + ' ' + body.paymentlabel,
      subtitle: body.date + '/' + body.month,
      buttonTitle: 'Confirm',
      payload: 'rent_confirm',
      url: config.bank_url + '/rent?userId=' + inputData.userId,
      webTitle: 'Not my rent payment'
    }

    platformTemplate.createButtonWebViewTemplate(inputData, templateData, function(quickReplyButtonsTemplate) {
      let outputData = {
        userId: inputData.userId,
        responseType: 'BUTTON_WEBVIEW',
        responseText: null,
        responseImage: null,
        responseAudio: null,
        responseVideo: null,
        responseAttachment: quickReplyButtonsTemplate,
        quickReplyButtons: null
      }
      cb(outputData);
    });
  });
};

let getRent = (data, callback) => {
  let aiObject = {
    intent: 'rent'
  }
  let inputData = {
    bot: config.app.bot,
    userId:  data.userId
  }
  intent(inputData, aiObject, callback);
}

export { intent, getRent };
