const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');


dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));



const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
