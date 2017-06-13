import * as facebookApi from '../facebook/facebook_api.js';
import User from '../models/user.js';



let respondToUser = (response) => {
  switch(response.responseType) {
    case 'TEXT':
      facebookApi.senderAction(response.userId, 'typing_on');
      setTimeout(() => {
        facebookApi.senderAction(response.userId, 'typing_off');
        facebookApi.sendTextMessage(response.userId, response.responseText, () => {
          return;
        });
      }, 3000)
      break;
    case 'BUTTON_WEBVIEW':
      facebookApi.senderAction(response.userId, 'typing_on');
      setTimeout(() => {
        facebookApi.senderAction(response.userId, 'typing_off');
        facebookApi.sendGenericTemplate(response.userId, response.responseAttachment, function() {
          return;
        });
      }, 3000)
      break;
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
                    }, 3000);
                  })
                }, 3000)
              })
            }, 3000)
          });
        }
      });
      break;
    case 'THREE_TEXT_WITH_WEB_VIEW':
      var textMessage = response.responseText;
      var textMessageArray = textMessage.split("++");
      facebookApi.sendTextMessage(response.userId, textMessageArray[0], () => {
        facebookApi.senderAction(response.userId, 'typing_on');
        setTimeout(() => {
          facebookApi.senderAction(response.userId, 'typing_off');
          facebookApi.sendTextMessage(response.userId, textMessageArray[1], () => {
            facebookApi.senderAction(response.userId, 'typing_on');
            setTimeout(() =>{
              facebookApi.sendWebViewTemplate(response.userId, textMessageArray[2], response.responseAttachment, (genericTemplateResponse) => {
                facebookApi.senderAction(response.userId, 'typing_off');
                return;
              });
            }, 3000);
          });
        }, 3000);
      });
      break;
    case 'TWO_TEXT_WITH_QUICK_REPLY':
      var textMessage = response.responseText;
      var textMessageArray = textMessage.split("++");
      facebookApi.sendTextMessage(response.userId, textMessageArray[0], () => {
        facebookApi.senderAction(response.userId, 'typing_on');
        setTimeout(() => {
          facebookApi.senderAction(response.userId, 'typing_off');
          facebookApi.sendQuickReplyMessage(response.userId, textMessageArray[1], response.quickReplyButtons.template, () =>{
            return;
          });
        }, 2000);
      });
      break;
    case 'THREE_TEXT_WITH_QUICK_REPLY':
      var textMessage = response.responseText;
      var textMessageArray = textMessage.split("++");
      facebookApi.sendTextMessage(response.userId, textMessageArray[0], () => {
        facebookApi.senderAction(response.userId, 'typing_on');
        setTimeout(() => {
          facebookApi.senderAction(response.userId, 'typing_off');
          facebookApi.sendTextMessage(response.userId, textMessageArray[1], () => {
            facebookApi.senderAction(response.userId, 'typing_on');
            setTimeout(() => {
              facebookApi.senderAction(response.userId, 'typing_off');
              facebookApi.sendQuickReplyMessage(response.userId, textMessageArray[2], response.quickReplyButtons.template, () =>{
                return;
              });
            }, 3000);
          });
        }, 3000);
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
