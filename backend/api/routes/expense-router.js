import * as expenseController from './../controller/expense-controller.js';

import express from 'express';
// expense transaction routes
const expenseRouter = express.Router();

// routing for crud operations of expenses
expenseRouter.post('/:id',expenseController.post);
expenseRouter.get('/personal/:id',expenseController.personal_expense);
expenseRouter.get('/group/:id',expenseController.group_expenses);
expenseRouter.put('/personal/:id',expenseController.personal_expense_put);
expenseRouter.put('/group/:id',expenseController.group_expense_put);
expenseRouter.delete('/personal/:id',expenseController.personal_expense_remove);
expenseRouter.delete('/group/:id',expenseController.group_expense_remove);

export default expenseRouter;
