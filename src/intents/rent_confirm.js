import * as platformTemplate from '../datasource/platform_template.js';
import request from 'request';
import config from '../config.json';

let intent = (inputData, object, cb) => {
  let content = require('../contents/'+inputData.bot+'.json');
  let url = config.bank_url + '/api/v1/getWeeklyMonthly';

  let rentConfirm = content.rentConfirm;

  let outputData = {
    userId: inputData.userId,
    responseType: 'TEXT',
    responseText: rentConfirm,
  }

  setTimeout(() => {
    request({
      url: url,
      method: 'POST',
      json: {
        userId: inputData.userId
      },
      headers: {
        'Content-Type': 'application/json'
      }
    }, function (err, res, body) {
      if (err) {
        console.error('error posting json: ', err)
      }
    });
  }, 2500);

  cb(outputData);

};

export { intent };


