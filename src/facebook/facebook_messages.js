import config from '../config.json';
import * as facebookApi from './facebook_api.js';
import { userInteraction } from '../service/user_interaction.js';
import { respondToUser } from '../service/respond_to_user.js';

let defineResponse = (event, payload) => {
  return {
    text: null,
    userId: event.sender.id,
    platform: config.app.platform,
    bot: config.app.bot,
    payload: payload,
    isSetIntent: true
  }
}

let getStartedButtonCallback =  (event) => {
  facebookApi.getProfileDetail(event.sender.id, (facebookUserDetail) => {
    let inputData = {
      text: null,
      userId: event.sender.id,
      displayName: facebookUserDetail.first_name + ' ' + facebookUserDetail.last_name,
      profilePic: facebookUserDetail.profile_pic,
      gender: facebookUserDetail.gender,
      locale: facebookUserDetail.locale,
      timezone: parseInt(facebookUserDetail.timezone),
      platform: config.app.platform,
      bot: config.app.bot,
      payload: 'get_started',
      isSetIntent: true
    }

    userInteraction(inputData, function(outputData) {
      respondToUser(outputData);
    });
  });
}


let receivedPostbackMessage = (event) => {
  switch(event.postback.payload) {
    case 'GET_STARTED_PAYLOAD':
      getStartedButtonCallback(event);
      break;
    default:
      let inputData = defineResponse(event, event.postback.payload);
      userInteraction(inputData, (outputData) => {
        respondToUser(outputData);
      });
  }
}

let receivedQuickReplyMessage = (event) => {
  console.log(event.message.quick_reply.payload);
  switch(event.message.quick_reply.payload) {
    case 'not_yet':
      let inputData = defineResponse(event, event.message.quick_reply.payload)
      userInteraction(inputData, (outputData) => {
        respondToUser(outputData);
      });
      break;
    default:
  }
}

export { receivedPostbackMessage, receivedQuickReplyMessage };
