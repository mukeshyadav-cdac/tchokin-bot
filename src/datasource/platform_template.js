
let getLocationQuickReply = (inputData, quickReplyCb) => {
  let quickReplyButtons = {
    "template": [
      {
        "content_type": "LOCATION",
        "title": "👋 Location",
        "payload": "location"
      },
      {
        "content_type": "text",
        "title": "👋 Not Now",
        "payload": "explore"
      }
    ],
    "text": "my namee is mukes"
  }

  quickReplyCb(quickReplyButtons);
}

export { getLocationQuickReply };
