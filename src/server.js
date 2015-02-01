import express from 'express'
import bodyParser from 'body-parser'
import {playerRouter} from './controllers/playerController.js'

const app = express();

app.use(bodyParser.json());

var port = process.env.PORT || 8080;

app.use('/api/:version', playerRouter);

app.listen(port);
console.log(`Started : ${port}`);