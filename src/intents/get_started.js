import * as platformTemplate from '../datasource/platform_template.js';
let  startList = [
    {
      "title": "Spending Analysis",
      "overview": "Start here to setup your Weekly Allownace and Monthly Savings targets.",
      "buttonTitle": "Start Analysis",
      "payload": "START_ANALYSIS"
    },
    {
      "title": "Spending Analysis-2",
      "overview": "Start here to setup your Weekly Allownace and Monthly Savings targets.",
      "buttonTitle": "Start Analysis-2",
      "payload": "start_analysis-2"
    },
    {
      "title": "Spending Analysis-3",
      "overview": "Start here to setup your Weekly Allownace and Monthly Savings targets.",
      "buttonTitle": "Start Analysis-3",
      "payload": "start_analysis-3"
    }
  ]

let intent = (inputData, object, cb) => {
  let content = require('../contents/'+inputData.bot+'.json');
  let localStorageData = {
    userId: inputData.userId,
    topic: 'GET_STARTED',
    text: inputData.text,
    platform: inputData.platform,
    bot: inputData.bot,
    postId: null
  };

  let welcomeResponseText = content.get_started_one + ',' + content.get_started_two + ',' + content.get_started_three;

  platformTemplate.createGenericTemplate(inputData, startList, function(genericTemplate) {
    let outputData = {
      userId: inputData.userId,
      responseType: 'TEXT_WITH_GENERIC_TEMPLATE',
      responseText: welcomeResponseText,
      responseImage: null,
      responseAudio: null,
      responseVideo: null,
      responseAttachment: genericTemplate,
      quickReplyButtons: null
    }
    cb(outputData);
  });
};

export { intent };
