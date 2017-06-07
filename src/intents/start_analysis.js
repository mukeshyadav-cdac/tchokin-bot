import * as platformTemplate from '../datasource/platform_template.js';

let intent = (inputData, object, cb) => {
  let content = require('../contents/'+inputData.bot+'.json');

  let startAnalyisText = content.start_analysis_one + '++' + content.start_analysis_two;

  platformTemplate.quickReplyButtonsYesOrNotYet(inputData, function(quickReplyButtonsTemplate) {
    let outputData = {
      userId: inputData.userId,
      responseType: 'TWO_TEXT_WITH_QUICK_REPLY',
      responseText: startAnalyisText,
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
