const express = require('express');
const colors = require('colors')
const {errorHandler} = require('./middleware/errorMiddleware')
const dotenv = require('dotenv').config();
const connectDB = require('./config/db')
const port = process.env.PORT || 5000;

connectDB()

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/meals', require('./routes/mealRoutes'))
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/plans', require('./routes/planRoutes'))

app.use(errorHandler)



app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });