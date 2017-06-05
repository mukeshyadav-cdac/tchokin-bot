let createGenericTemplate = (inputData, startList, genericTemplateCb) => {
  let genericTemplateArray = [];
  for(let i=0; i < startList.length; i++) {
    genericTemplateArray.push({
      "title": startList[i].title,
      "subtitle": startList[i].overview,
      "buttons": [
        {
          "type": "postback",
          "title": startList[i].buttonTitle,
          "payload": startList[i].payload
        }
      ]
    });
  }
  genericTemplateCb(genericTemplateArray);
}

let quickReplyButtonYesNotYet = (inputData, quickReplyCb) => {
  let quickReplyButtons = {
    "template": [
      {
        "content_type": "text",
        "title": "Yes",
        "payload": "yes"
      },
      {
        "content_type": "text",
        "title": "Not yet",
        "payload": "not_yet"
      }
    ],
    "text": "👇"
  }
  quickReplyCb(quickReplyButtons);
}

let quickReplyButtonsIHaveThemHandyOrNot = (inputData, quickReplyCb) => {
  let quickReplyButtons = {
    "template": [
      {
        "content_type": "text",
        "title": "I Have Them Handy",
        "payload": "i_have_them_handy"
      },
      {
        "content_type": "text",
        "title": "No",
        "payload": "not_handy"
      }
    ],
    "text": "👇"
  }
  quickReplyCb(quickReplyButtons);
}

export { createGenericTemplate, quickReplyButtonYesNotYet, quickReplyButtonsIHaveThemHandyOrNot };
