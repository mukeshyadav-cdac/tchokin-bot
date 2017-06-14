import config from '../config.json';
import request from 'request';
import { respondToUser } from '../service/respond_to_user.js';
import * as salary from '../intents/salary.js';

let content = require('../contents/'+config.app.bot+'.json');


let checkSalaryTrans = (data) => {
  setTimeout(() => {
    respondToUser({userId: data.userId, responseText: content.saleryPreOne, responseType: 'TEXT'});
    setTimeout(() => {
      respondToUser({userId: data.userId, responseText: content.saleryPreTwo, responseType: 'TEXT'});
      setTimeout(() => {
        salary.getSalary({userId: data.userId, category: 'salary'}, (data) => {
          respondToUser(data)
        });
      }, 4000);
    }, 4000);
  }, 4000);
}

let message = (req, res) => {
  console.log(req.body);
  respondToUser(req.body)
  if (req.body.done) {
    checkSalaryTrans(req.body)
  }
  res.send(200);
}




export { message };
