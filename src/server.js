import express from 'express';
import bodyParser from 'body-parser';
import request from 'request';
import logger from 'morgan';
import config from './config.json';
import routes from './routes';
const app = express();

app.set('port', (config.PORT || 5000))

app.use(logger('dev'));

app.use(bodyParser.urlencoded({extended: false}))

app.use(bodyParser.json());

app.use('/', routes);

app.listen(app.get('port'), ()  =>  {
  console.log('running on port', app.get('port'))
});
