import * as facebookApi from '../facebook/facebook_api.js';
import { textSpliter } from '../utility/text_spliter.js';



let respondToUser = (response) => {
  switch(response.responseType) {
    case 'TEXT_WITH_QUICK_REPLY':
      facebookApi.sendTextMessage(response.userId, response.responseText, function(cb) {
        textArray  = [];
        textSpliter(response.quickReplyButtons.text, function(array){
          let i  = 0;
          (function init(){
            if(i < array.length - 1) {
              facebookApi.sendTextMessage(response.userId, array[i], function(cb) {
                i  = i + 1;
                init();
              });
            } else {
              setTimeout(function(){
                facebookApi.sendQuickReplyMessage(response.userId, array[i], response.quickReplyButtons.template, function(quickReplyResponse) {
                  return;
                });
              }, 1500);
            }
          })();
        });
      });
      break;

    case 'FALLBACK':
      facebookApi.sendTextMessage(response.userId, response.responseText, function(cb) {
        return;
      });
      break;
  }
}

export { respondToUser };
