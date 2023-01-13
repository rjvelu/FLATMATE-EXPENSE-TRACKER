import cors from 'cors';
import routes from './routes/index.js'
import model from './models/index.js'
import mongoose from 'mongoose';
import express from 'express';
import notification from './utils/sendNotification.js';

// intializing express app
const app = express();



app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
console.log("in app")
// adding the routes
routes(app);
notification();
//connecting db
mongoose.connect('mongodb://localhost:27017/Expense_Tracker').then(()=>{
  console.log('starting on port 5000');
});

export default app;