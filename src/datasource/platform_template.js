let createButtonWebViewTemplate = (inputData, templateData, genericTemplateCb) => {
  let template =  {
    "title": templateData.title,
    "subtitle": templateData.subtitle,
    "buttons": [
      {
        "type": "postback",
        "title": templateData.buttonTitle,
        "payload": templateData.payload
      },
      {
        "type": "web_url",
        "url": templateData.url,
        "title": templateData.webTitle,
        "webview_height_ratio": "tall"
      }
    ]
  }
  genericTemplateCb(genericTemplateArray);
}

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

let quickReplyButtonsYesOrNotYet = (inputData, quickReplyCb) => {
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
    ]
  }
  quickReplyCb(quickReplyButtons);
}

let quickReplyButtonsIHaveThemHandy = (inputData, quickReplyCb) => {
  let quickReplyButtons = {
    "template": [
      {
        "content_type": "text",
        "title": "I Have Them Handy",
        "payload": "i_have_them_handy"
      }
    ]
  }
  quickReplyCb(quickReplyButtons);
}

let createWebViewTemplate = (inputData, viewList, genericTemplateCb) => {
  let genericTemplateArray = [];
  viewList.forEach((value) => {
    genericTemplateArray.push({
      "type":"web_url",
      "url": value.url,
      "title": value.title,
      "webview_height_ratio": "tall"
    });
  });
  genericTemplateCb(genericTemplateArray);
}

export {
  createGenericTemplate,
  quickReplyButtonsYesOrNotYet,
  quickReplyButtonsIHaveThemHandy,
  createWebViewTemplate,
  createButtonWebViewTemplate
};
