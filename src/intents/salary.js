import * as platformTemplate from '../datasource/platform_template.js';
import request from 'request';
import config from '../config.json';

let intent = (inputData, templateData, cb) => {
  let content = require('../contents/'+inputData.bot+'.json');
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
};

let getSalary = (data, callback) => {
  let postData = {
    userId: data.userId,
    category: data.category
  }
  let url = config.bank_url + '/api/v1/getCategoryRecord';
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
    let inputData = {
      bot: config.app.bot,
      userId:  data.userId
    }
    let templateData = {
      title: body.amount + ' ' + body.paymentlabel,
      subtitle: body.date + '/' + body.month,
      buttonTitle: 'Confirm',
      payload: 'rent',
      url: config.bank_url + '/salary?userId=' + data.userId,
      webTitle: 'Not my salary'
    }
    intent(inputData, templateData, callback);
  })
};

export { intent, getSalary };
