// import '@babel/polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import router from './routes';

const dotenv = require('dotenv');

dotenv.config();

// express app
const app = express();

// Set up CORS options to accept requests from any origin with any headers and methods
const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: '*',
};

app.use(cors(corsOptions));

// body parse configuration
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(bodyParser.json());
app.use(morgan('dev'));

app.use('/api', router);

// Error handling to catch 404
app.all('*', (_req, res) => {
  res.status(404).json({
    error: 'address Not found',
  });
});

// Starting server
const server = app.listen(process.env.PORT || 4000, () => {
  console.log(`Server running on ${server.address().port}`);
});

export default app;
