import * as facebookApi from '../facebook/facebook_api.js';
import { textSpliter } from '../utility/text_spliter.js';
import User from '../models/user.js';



let respondToUser = (response) => {
  switch(response.responseType) {

    case 'THREE_TEXT_WITH_GENERIC_TEMPLATE':
      User.findOne({userId: response.userId}, (err, user) => {
        if (err) {
          console.log(err);
        } else {
          let textMessage = response.responseText;
          let textMessageArray = textMessage.split("++");
          console.log(textMessageArray.length);
          facebookApi.sendTextMessage(response.userId, textMessageArray[0].replace('{user_name}', user.first_name), () => {
            facebookApi.senderAction(response.userId, 'typing_on');
            setTimeout(() =>{
              facebookApi.senderAction(response.userId, 'typing_off');
              facebookApi.sendTextMessage(response.userId, textMessageArray[1], () => {
                facebookApi.senderAction(response.userId, 'typing_on');
                setTimeout(() => {
                  facebookApi.senderAction(response.userId, 'typing_off');
                  facebookApi.sendTextMessage(response.userId, textMessageArray[2], () => {
                    facebookApi.senderAction(response.userId, 'typing_on');
                    setTimeout(() =>{
                      facebookApi.sendGenericTemplate(response.userId, response.responseAttachment, function(genericTemplateResponse) {
                        facebookApi.senderAction(response.userId, 'typing_off');
                        return;
                      });
                    }, 2000);
                  })
                }, 2000)
              })
            }, 2000)
          });
        }
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
