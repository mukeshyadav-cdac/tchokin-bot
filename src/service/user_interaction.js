import fs from 'fs';

let checkFileExists = (inputData, aiObject, fileCb) => {
  const intent = require('../intents/'+aiObject.intent).intent;
  if ( intent ) {
    intent(inputData, aiObject, function(outputData) {
      fileCb(outputData);
    });
  } else {
    const intent = require('../intents/fallback').intent;
    intent(inputData, aiObject, function(outputData) {
      fileCb(outputData);
    });
  }
}

let userInteraction = (inputData, cb) => {
  if(!inputData.platform || !inputData.userId || !inputData.bot) {
    cb({"status": "error", "message": "Objects platform, userId and bot are required."});
  } else {
    if(inputData.isSetIntent) {

      let object = {
        intent: inputData.payload
      }

      let type = inputData.payload.substring(0,6);

      switch(type) {
        case 'cb_sd_':
          // var category = req.body.payload.split('cb_sd_');
          // object = {
          //   intent: category[1]
          // }
          // var INTENT = require('../lib/intents/story_description');
          // INTENT.intent(req.body, object, function(response) {
          //   res.status(200).send(response);
          // });
          break;
        default:
          checkFileExists(inputData, object, (outputData) => {
            cb(outputData);
          });
      }
    } else {
      //code for bot
    }
  }
}


export { userInteraction };
