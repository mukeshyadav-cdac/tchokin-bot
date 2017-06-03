import * as facebookApi from '../facebook/facebook_api.js';
import { textSpliter } from '../utility/text_spliter.js';



let respondToUser = (response) => {
  switch(response.responseType) {

    case 'TEXT_WITH_GENERIC_TEMPLATE':
      textSpliter(response.responseText, function(array) {
        let i  = 0;
        (function init(){
          if(i < array.length) {
            facebookApi.sendTextMessage(response.userId, array[i], function(cb) {
              i = i + 1;
              init();
            });
          } else {
            setTimeout(function(){
              facebookApi.sendGenericTemplate(response.userId, response.responseAttachment, function(genericTemplateResponse) {
                return;
              });
            }, 1500);
          }
        })();
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
