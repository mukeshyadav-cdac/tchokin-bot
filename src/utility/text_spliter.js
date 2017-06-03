let textArray  = [];

let init = (str, cb) => {
  if(str.length > 640) {
    let subString = str.substring(0, str.indexOf(' ', 600));
    textArray.push(subString);
    str = str.substring(str.indexOf(' ', 600) + 1);
    init(str, cb);
  } else {
    textArray.push(str);
    cb(textArray);
  }
}

let textSpliter = (string , cb) => {
  let str = string;
  textArray = [];
  init(str, cb);
}

export { textSpliter };
