import express from 'express';
import bodyParser from 'body-parser';
import request from 'request';
import mongoose from 'mongoose';
import logger from 'morgan';
import config from './config.json';
import routes from './routes';

mongoose.Promise = global.Promise;
mongoose.connect(config.MONGODB_URI);

//mongoose.set('debug', true);


const app = express();

app.set('port', (config.PORT || 5000))

app.use(logger('dev'));

app.use(bodyParser.urlencoded({extended: false}))

app.use(bodyParser.json());

app.use('/', routes);

mongoose.connection
  .once('open', () => {
    app.listen(app.get('port'), ()  =>  {
      console.log('running on port', app.get('port'))
    });
    console.log('Connected to MongoLab instance.')
  })
  .on('error', error => console.log('Error connecting to MongoLab:', error))


