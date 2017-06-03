import * as platformTemplate from '../datasource/platform_template.js';

let intent = (inputData, object, cb) => {
  let content = require('../contents/'+inputData.bot+'.json');
  let localStorageData = {
    userId: inputData.userId,
    topic: 'SIGN_UP',
    text: inputData.text,
    platform: inputData.platform,
    bot: inputData.bot,
    postId: null
  };

  let welcomeResponseText = content.get_started_one + ',' + content.get_started_two;


  platformTemplate.getLocationQuickReply(inputData, function(QRresult) {
    let outputData = {
      userId: inputData.userId,
      responseType: 'TEXT_WITH_QUICK_REPLY',
      responseText: welcomeResponseText,
      responseImage: null,
      responseAudio: null,
      responseVideo: null,
      responseAttachment: null,
      quickReplyButtons: QRresult
    }
    cb(outputData);
  });
};

export { intent };
