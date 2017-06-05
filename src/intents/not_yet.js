import * as platformTemplate from '../datasource/platform_template.js';

let intent = (inputData, object, cb) => {
  let content = require('../contents/'+inputData.bot+'.json');

  let notYetText = content.not_yet_one + '++' + content.not_yet_two + "++" + content.not_yet_three;

  platformTemplate.quickReplyButtonsIHaveThemHandyOrNot(inputData, function(quickReplyButtonsTemplate) {
    let outputData = {
      userId: inputData.userId,
      responseType: 'THREE_TEXT_WITH_QUICK_REPLY',
      responseText: notYetText,
      responseImage: null,
      responseAudio: null,
      responseVideo: null,
      responseAttachment: null,
      quickReplyButtons: quickReplyButtonsTemplate
    }
    cb(outputData);
  });
};

export { intent };
