import cron from 'node-cron';
import {
  Notification
} from '../models/notification.js';
import {
  expense
} from '../models/expense.js';
import {
  User
} from '../models/User.js';
import sendEmail from './sendEmail.js';
import moment from 'moment';
import {
  tracking
} from '../models/tracking.js';

// use to send notification
const notification = () => {

  // job run on daily 12.00 am to send notification
  cron.schedule('0 0 0 * * *', () => {
    console.log('running a task daily');
    noti();
  });


  // job runs on every 1st day of month to send monthly expense
  cron.schedule('0 0 1 * *', () => {
    console.log('running a task daily');
    monthly_notification();
  });
}

const noti = async () => {
  const due_date = new Date();
  const filter = {
    date: due_date
  }
  let date = moment(due_date).utc().format('YYYY-MM-DD')
  let datearr = JSON.stringify(date).split('-');

  const exp = await Notification.find();

  for (var i = 0; i < exp.length; i++) {
    let id = exp[i].expenseId;
    let d = moment(exp[i].date).utc().format('YYYY-MM-DD')
    let darr = JSON.stringify(date).split('-');

    if (datearr[2] === darr[2]) {
      let expe = await expense.find({
        _id: id
      });

      let ex = expe[0];

      let use = await User.find({
        _id: ex.user_id
      });

      let email = use[0].email;
      let message = `You have a regular payment of ${ex.amount} for ${ex.description} on ${date}. Pay it on time.`
      await sendEmail(email, "Payment Notification", message);
    }

  }
}

const monthly_notification = async () => {
  let users = await User.find();
  for (var i = 0; i < users.length; i++) {
    let use = users[i]
    let transact = await tracking.find({
      user_id: use._id
    });
    let email = use.email;
    let total_spending = transact.total_expense_Indvidual + transact.total_group_expense;
    let message = `Hi ${use.firstName} , 
    Your total spending of previous month is ${total_spending}. Your budget is ${use.monthly_budget}. YOu have spent personally ${transact.total_expense_Indvidual}
    Your  group expense is ${transact.total_group_expense}`;
    await sendEmail(email, "Monthly Wrapp up", message);
  }
}

export default notification;