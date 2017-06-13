import config from '../config.json';
import request from 'request';
import { respondToUser } from '../service/respond_to_user.js';

let message = (req, res) => {
  console.log(req.body);
  console.log('.......................................')
  respondToUser(req.body)
  res.send(200);
}



export { message };
