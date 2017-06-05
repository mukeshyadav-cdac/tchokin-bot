import * as platformTemplate from '../datasource/platform_template.js';
let  startList = [
    {
      "title": "Spending Analysis",
      "overview": "Start here to setup your Weekly Allownace and Monthly Savings targets.",
      "buttonTitle": "Start Analysis",
      "payload": "start_analysis"
    },
    {
      "title": "How does it work?",
      "overview": "More detail on how we setup your Weekly Allownace and Monthly Savings",
      "buttonTitle": "Tell me more",
      "payload": "tell_me_more"
    },
    {
      "title": "What can I expect?",
      "overview": "one week in the life of a Tchokin.in user with coach Tchok.",
      "buttonTitle": "Show me examples",
      "payload": "show_me_examples"
    }
  ]

let intent = (inputData, object, cb) => {
  let content = require('../contents/'+inputData.bot+'.json');

  let welcomeResponseText = content.get_started_one + '++' + content.get_started_two + '++' + content.get_started_three;

  platformTemplate.createGenericTemplate(inputData, startList, function(genericTemplate) {
    let outputData = {
      userId: inputData.userId,
      responseType: 'THREE_TEXT_WITH_GENERIC_TEMPLATE',
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
