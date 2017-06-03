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

export { createGenericTemplate };
