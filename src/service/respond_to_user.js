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
          var textMessage = response.responseText;
          var textMessageArray = textMessage.split("++");
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
                      facebookApi.sendGenericTemplate(response.userId, response.responseAttachment, function() {
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
    case 'TWO_TEXT_WITH_QUICK_REPLY':
      var textMessage = response.responseText;
      var textMessageArray = textMessage.split("++");
      facebookApi.sendTextMessage(response.userId, textMessageArray[0], () => {
        facebookApi.senderAction(response.userId, 'typing_on');
        setTimeout(() => {
          facebookApi.senderAction(response.userId, 'typing_off');
          facebookApi.sendTextMessage(response.userId, textMessageArray[1], () => {
            facebookApi.senderAction(response.userId, 'typing_on');
            setTimeout(() =>{
              facebookApi.sendQuickReplyMessage(response.userId, response.quickReplyButtons.text, response.quickReplyButtons.template, () =>{
                facebookApi.senderAction(response.userId, 'typing_off');
                return;
              });
            }, 2000);
          })
        }, 2000);
      });
      break;
    case 'THREE_TEXT_WITH_QUICK_REPLY':
      var textMessage = response.responseText;
      var textMessageArray = textMessage.split("++");
      facebookApi.sendTextMessage(response.userId, textMessageArray[0], () => {
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
                  facebookApi.sendQuickReplyMessage(response.userId, response.quickReplyButtons.text, response.quickReplyButtons.template, () =>{
                    facebookApi.senderAction(response.userId, 'typing_off');
                    return;
                  });
                }, 2000);
              })
            }, 2000)
          })
        }, 2000)
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
