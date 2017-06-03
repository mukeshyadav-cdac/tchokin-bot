import config from '../config.json';
import * as facebookApi from './facebook_api.js';
import { userInteraction } from '../service/user_interaction.js';
import { respondToUser } from '../service/respond_to_user.js';

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
      payload: 'sign_up',
      isSetIntent: true
    }

    userInteraction(inputData, function(response) {
      respondToUser(response);
    });
  });
}


let receivedPostbackMessage = ( event ) => {
  switch(event.postback.payload) {
    case 'GET_STARTED_PAYLOAD':
      getStartedButtonCallback(event);
      break;
    default:
      let inputData = {
        text: null,
        userId: event.sender.id,
        platform: config.app.platform,
        bot: config.app.bot,
        payload: event.postback.payload,
        isSetIntent: true
      }
      userInteraction(inputData, function(outputData) {
        respondToUser(outputData);
      });
  }
}

export { receivedPostbackMessage };
