import * as functions from 'firebase-functions';
import express from 'express';

import routes from './routes';

const app = express();

app.use(routes);

exports.app = functions.https.onRequest(app);
