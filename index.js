const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');

// load environment variables
dotenv.config({ path: './config/config.env' });
const PORT = process.env.PORT || 3000;

// connect to mongoDB
connectDB();

// get router files
const ContactRouter = require('./routers/contactRouter');
const errorHandler = require('./middlewares/errorHandler');

//create app
const app = express();

//enable cors
app.use(cors());

//body parser json
app.use(express.json());

// body parser url encoded data
app.use(bodyParser.urlencoded({ extended: false }));

// development logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// laod routers
app.use('/api/v1/contacts', ContactRouter);

// error handling
app.use(errorHandler);

// post listening
const port = process.env.PORT || 5000;
app.listen(port, (error) => {
  if (error) {
    console.log(error);
  }
  console.log(`Server listening on ${port}`);
});
