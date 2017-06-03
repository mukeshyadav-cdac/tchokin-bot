function RespondToUser(response) {
  console.log("======response.responseType======",response);

  FBAPI.EVENTS.SenderAction(response.userId, 'typing_off');

  switch(response.responseType) {

    case 'TEXT_MESSAGE':
      FBAPI.EVENTS.SendTextMessage(response.userId, response.responseText, function(cb) {
        return;
      });
      break;

    case 'DOUBLE_TEXT_MESSAGE':
      var textArray1 = response.responseText.split('++');
      for(var i=0;i<textArray1.length;i++) {
        setTimeout(function(){
          FBAPI.EVENTS.SendTextMessage(response.userId, textArray1[i], function(cb) {
            return;
          });
        }, 1500);
      }
      break;

    case 'QUICK_REPLY':
      textArray  = [];
      textSpliter(response.responseText, function(array){
        var i  = 0;
        (function init(){
          if(i < array.length - 1) {
            FBAPI.EVENTS.SendTextMessage(response.userId, array[i], function(cb) {
              console.log('========================dasdasdadasdsadasd=====================');
              i = i + 1;
              init();
            });
          } else {
            FBAPI.EVENTS.SenderAction(response.userId, 'typing_on');
            setTimeout(function(){
              FBAPI.EVENTS.SenderAction(response.userId, 'typing_off');
              FBAPI.EVENTS.SendQuickReplyMessage(response.userId, array[i], response.quickReplyButtons, function(quickReplyResponse) {
                console.log('============sadsadsadsadsadsadsad============dasdasdadasdsadasd=====================');
                return;
              });
            }, 1500);
          }
        })();
      });
      break;

    case 'GENERIC_TEMPLATE':
      FBAPI.EVENTS.SendGenericTemplate(response.userId, response.responseAttachment, function(genericTemplateResponse) {
        return;
      });
      break;

    case 'TEXT_WITH_QUICK_REPLY':
      FBAPI.EVENTS.SendTextMessage(response.userId, response.responseText, function(cb) {
        textArray  = [];
        textSpliter(response.quickReplyButtons.text, function(array){
          console.log("dsadasdsadsadsad", array,"===array.lemthn======",array.length);
          var i  = 0;
          (function init(){
            if(i < array.length - 1) {
              FBAPI.EVENTS.SendTextMessage(response.userId, array[i], function(cb) {
                i  = i + 1;
                init();
              });
            } else {
              FBAPI.EVENTS.SenderAction(response.userId, 'typing_on');
              setTimeout(function(){
                FBAPI.EVENTS.SenderAction(response.userId, 'typing_off');
                FBAPI.EVENTS.SendQuickReplyMessage(response.userId, array[i], response.quickReplyButtons.template, function(quickReplyResponse) {
                  return;
                });
              }, 1500);
            }
          })();
        });
      });
      break;

    case 'TEXT_AND_IMAGE_WITH_QUICK_REPLY':
      var data = {
        type: 'image',
        url: response.responseImage
      };
      textArray  = [];
      textSpliter(response.responseText, function(array){
        var i  = 0;
        (function init(){
          if(i < array.length) {
            FBAPI.EVENTS.SendTextMessage(response.userId, array[i], function(cb) {
              i = i + 1;
              init();
            });
          } else {
            FBAPI.EVENTS.SenderAction(response.userId, 'typing_on');
            setTimeout(function(){
              FBAPI.EVENTS.SenderAction(response.userId, 'typing_off');
              FBAPI.EVENTS.SendMediaMessage(response.userId, data, function(cb) {
                FBAPI.EVENTS.SenderAction(response.userId, 'typing_on');
                setTimeout(function(){
                  FBAPI.EVENTS.SenderAction(response.userId, 'typing_off');
                  FBAPI.EVENTS.SendQuickReplyMessage(response.userId, response.quickReplyButtons.text, response.quickReplyButtons.template, function(quickReplyResponse) {
                    return;
                  });
                }, 1500);
              });
            }, 1500);
          }
        })();
      });

      break;

    case 'TEXT_TEMPLATE_AND_QUICK_REPLY':
      textArray  = [];
      textSpliter(response.responseText, function(array){
        var i  = 0;
        (function init(){
          if(i < array.length) {
            FBAPI.EVENTS.SendTextMessage(response.userId, array[i], function(cb) {
              i = i + 1;
              init();
            });
          } else {
            FBAPI.EVENTS.SenderAction(response.userId, 'typing_on');
            setTimeout(function(){
              FBAPI.EVENTS.SenderAction(response.userId, 'typing_off');
              FBAPI.EVENTS.SendGenericTemplate(response.userId, response.responseAttachment, function(genericTemplateResponse) {
                FBAPI.EVENTS.SenderAction(response.userId, 'typing_on');
                setTimeout(function(){
                  FBAPI.EVENTS.SenderAction(response.userId, 'typing_off');
                  FBAPI.EVENTS.SendQuickReplyMessage(response.userId, response.quickReplyButtons.text, response.quickReplyButtons.template, function(quickReplyResponse) {
                    return;
                  });
                }, 1500);
              });
            }, 1500);
          }
        })();
      });
      break;

    case 'DOUBLE_TEXT_TEMPLATE_AND_QUICK_REPLY':
      var i  = 0;
      (function init(){
        console.log("===========response.responseText[i]response.responseText[i]============",response.responseText[i]);
        if(i < response.responseText.length) {
          FBAPI.EVENTS.SendTextMessage(response.userId, response.responseText[i], function(cb) {
            console.log ("======================asd===================--====");
            i = i + 1;
            init();
          });
        } else {
          FBAPI.EVENTS.SenderAction(response.userId, 'typing_on');
          setTimeout(function(){
            FBAPI.EVENTS.SenderAction(response.userId, 'typing_off');
            FBAPI.EVENTS.SendGenericTemplate(response.userId, response.responseAttachment, function(genericTemplateResponse) {
              FBAPI.EVENTS.SenderAction(response.userId, 'typing_on');
              setTimeout(function(){
                FBAPI.EVENTS.SenderAction(response.userId, 'typing_off');
                FBAPI.EVENTS.SendQuickReplyMessage(response.userId, response.quickReplyButtons.text, response.quickReplyButtons.template, function(quickReplyResponse) {
                  return;
                });
              }, 1500);
            });
          }, 1500);
        }
      })();
      break;

    case 'TEXT_TEMPLATE_QUICK_REPLY_WITH_IMAGE':
      var data = {
        type: 'image',
        url: response.responseImage
      };
      FBAPI.EVENTS.SendMediaMessage(response.userId, data, function(cb) {
        textArray  = [];
        textSpliter(response.responseText, function(array){
          var i  = 0;
          (function init(){
            if(i < array.length) {
              FBAPI.EVENTS.SendTextMessage(response.userId, array[i], function(cb) {
                i = i + 1;
                init();
              });
            } else {
              FBAPI.EVENTS.SenderAction(response.userId, 'typing_on');
              setTimeout(function(){
                FBAPI.EVENTS.SenderAction(response.userId, 'typing_off');
                FBAPI.EVENTS.SendGenericTemplate(response.userId, response.responseAttachment, function(genericTemplateResponse) {
                  FBAPI.EVENTS.SenderAction(response.userId, 'typing_on');
                  setTimeout(function(){
                    FBAPI.EVENTS.SenderAction(response.userId, 'typing_off');
                    FBAPI.EVENTS.SendQuickReplyMessage(response.userId, response.quickReplyButtons.text, response.quickReplyButtons.template, function(quickReplyResponse) {
                      return;
                    });
                  }, 1500);
                });
              }, 1500);
            }
          })();
        });
      });
      break;

    case 'TEMPLATE_AND_QUICK_REPLY':
      FBAPI.EVENTS.SendGenericTemplate(response.userId, response.responseAttachment, function(genericTemplateResponse) {
        FBAPI.EVENTS.SenderAction(response.userId, 'typing_on');
        setTimeout(function(){
          FBAPI.EVENTS.SenderAction(response.userId, 'typing_off');
          FBAPI.EVENTS.SendQuickReplyMessage(response.userId, response.quickReplyButtons.text, response.quickReplyButtons.template, function(quickReplyResponse) {
            return;
          });
        }, 1500);
      });
      break;

    case 'TEXT_GENERIC_TEMPLATE_WITH_IMAGE':
      var data = {
        type: 'image',
        url: response.responseImage
      };
      FBAPI.EVENTS.SendMediaMessage(response.userId, data, function(cb) {
        textArray  = [];
        textSpliter(response.responseText, function(array){
          var i  = 0;
          (function init(){
            if(i < array.length) {
              setTimeout(function(){
                FBAPI.EVENTS.SendTextMessage(response.userId, array[i], function(cb) {
                  i = i + 1;
                  init();
                });
              }, 1500);
            } else {
              setTimeout(function(){
                FBAPI.EVENTS.SendGenericTemplate(response.userId, response.responseAttachment, function(genericTemplateResponse) {
                  return;
                });
              }, 1500);
            }
          })();
        });
      });
      break;

    case 'TEXT_WITH_GENERIC_TEMPLATE':
      textArray  = [];
      textSpliter(response.responseText, function(array){
        var i  = 0;
        (function init(){
          if(i < array.length) {
            FBAPI.EVENTS.SendTextMessage(response.userId, array[i], function(cb) {
              i = i + 1;
              init();
            });
          } else {
            FBAPI.EVENTS.SenderAction(response.userId, 'typing_on');
            setTimeout(function(){
              FBAPI.EVENTS.SenderAction(response.userId, 'typing_off');
              FBAPI.EVENTS.SendGenericTemplate(response.userId, response.responseAttachment, function(genericTemplateResponse) {
                return;
              });
            }, 1500);
          }
        })();
      });
      break;

    case 'AUDIO_WITH_TEXT_MESSAGE':
      var data = {
        type: 'audio',
        url: response.responseAudio
      };
      FBAPI.EVENTS.SendMediaMessage(response.userId, data, function(cb) {
        textArray  = [];
        textSpliter(response.responseText, function(array){
          var i  = 0;
          (function init(){
            if(i < array.length) {
              FBAPI.EVENTS.SendTextMessage(response.userId, array[i], function(cb) {
                i = i + 1;
                init();
              });
            } else {
              return;
            }
          })();
        });
      });
      break;

    case 'VIDEO_WITH_TEXT_MESSAGE':
      var data = {
        type: 'video',
        url: response.responseVideo
      };
      FBAPI.EVENTS.SendMediaMessage(response.userId, data, function(cb) {
        textArray  = [];
        textSpliter(response.responseText, function(array){
          var i  = 0;
          (function init(){
            if(i < array.length) {
              FBAPI.EVENTS.SendTextMessage(response.userId, array[i], function(cb) {
                i = i + 1;
                init();
              });
            } else {
              return;
            }
          })();
        });
      });
      break;

    case 'IMAGE_WITH_TEXT_MESSAGE':
      var data = {
        type: 'image',
        url: response.responseImage
      };
      FBAPI.EVENTS.SendMediaMessage(response.userId, data, function(cb) {
        textArray  = [];
        textSpliter(response.responseText, function(array){
          var i  = 0;
          (function init(){
            if(i < array.length) {
              FBAPI.EVENTS.SendTextMessage(response.userId, array[i], function(cb) {
                i = i + 1;
                init();
              });
            } else {
              return;
            }
          })();
        });
      });
      break;

    case 'AUDIO_WITH_QUICK_REPLY':
      var data = {
        type: 'audio',
        url: response.responseAudio
      };
      FBAPI.EVENTS.SendMediaMessage(response.userId, data, function(cb) {
        FBAPI.EVENTS.SendQuickReplyMessage(response.userId, response.responseText, response.quickReplyButtons, function(quickReplyResponse) {
          return;
        });
      });
      break;

    case 'VIDEO_WITH_QUICK_REPLY':
      var data = {
        type: 'video',
        url: response.responseVideo
      };
      FBAPI.EVENTS.SendMediaMessage(response.userId, data, function(cb) {
        FBAPI.EVENTS.SendQuickReplyMessage(response.userId, response.responseText, response.quickReplyButtons, function(quickReplyResponse) {
          return;
        });
      });
      break;

    case 'IMAGE_WITH_QUICK_REPLY':
      var data = {
        type: 'image',
        url: response.responseImage
      };
      FBAPI.EVENTS.SendMediaMessage(response.userId, data, function(cb) {
        FBAPI.EVENTS.SendQuickReplyMessage(response.userId, response.responseText, response.quickReplyButtons, function(quickReplyResponse) {
          return;
        });
      });
      break;

    case 'LIST_BUTTONS':
      FBAPI.EVENTS.SendTextMessage(response.userId, response.responseText, function(cb) {
        FBAPI.EVENTS.SenderAction(response.userId, 'typing_on');
        setTimeout(function(){
          FBAPI.EVENTS.SenderAction(response.userId, 'typing_off');
          FBAPI.EVENTS.SendListTemplate(response.userId, response.responseAttachment.template, function(cb) {
            return;
          });
        }, 1500);
      });

      break;

    case 'FALLBACK':
      FBAPI.EVENTS.SendTextMessage(response.userId, response.responseText, function(cb) {
        return;
      });
      break;


  }
}
