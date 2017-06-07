import * as platformTemplate from '../datasource/platform_template.js';

let intent = (inputData, object, cb) => {
  let content = require('../contents/'+inputData.bot+'.json');
  let iHaveThemHandy = content.i_have_them_handy_one + '++' + content.i_have_them_handy_two + "++" + content.i_have_them_handy_three;

  let viewList = [
    {
      "title": "Connect",
      "url": "https://9bd16f6a.ngrok.io"
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
