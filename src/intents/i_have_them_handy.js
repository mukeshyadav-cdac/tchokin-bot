import * as platformTemplate from '../datasource/platform_template.js';
import config from '../config.json'

let intent = (inputData, object, cb) => {
  let content = require('../contents/'+inputData.bot+'.json');
  let iHaveThemHandy = content.i_have_them_handy_one + '++' + content.i_have_them_handy_two + "++" + content.i_have_them_handy_three;

  let viewList = [
    {
      "title": "Connect",
      "url": config.bank_url + "?userId=" +inputData.userId
    }
  ];

  platformTemplate.createWebViewTemplate(inputData, viewList, (webViewTemplate) => {
    let outputData = {
      userId: inputData.userId,
      responseType: 'THREE_TEXT_WITH_WEB_VIEW',
      responseText: iHaveThemHandy,
      responseImage: null,
      responseAudio: null,
      responseVideo: null,
      responseAttachment: webViewTemplate,
      quickReplyButtons: null
    }
    cb(outputData);
  });

}

export { intent };
