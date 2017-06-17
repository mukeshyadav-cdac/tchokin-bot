import config from '../config.json';
import request from 'request';
import { respondToUser } from '../service/respond_to_user.js';
import * as salary from '../intents/salary.js';
import * as rent from '../intents/rent.js';

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
      }, 2500);
    }, 2500);
  }, 2500);
}

let checkRentTrans = (data) => {
  setTimeout(() => {
    respondToUser({userId: data.userId, responseText: content.rentPreOne, responseType: 'TEXT'});
    setTimeout(() => {
      rent.getRent({userId: data.userId, category: 'R_trans'}, (data) => {
        respondToUser(data)
      });
    }, 2500);
  }, 2500);
}

let finish = (data) => {
  setTimeout(() => {
    respondToUser({userId: data.userId, responseText: content.rentPreOne, responseType: 'TEXT'});
  }, 2500);
}

let message = (req, res) => {
  console.log(req.body);
  respondToUser(req.body)
  if (req.body.done) {
    switch(req.body.done) {
      case 'salary':
        checkSalaryTrans(req.body);
        break;
      case 'rent':
        checkRentTrans(req.body);
        break;
    }
  }
  res.send(200);
}




export { message };
