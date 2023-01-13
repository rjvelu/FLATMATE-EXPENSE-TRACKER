import * as expenseService from './../services/expense-service.js';

// this function is used to set error fetch from db 
const setError = (err, response) => {
    response.status(500);
    response.json(err);
}

// this function is used to set response fetch from db 
const setResponse = (obj,response) => {
    response.status(200);
    response.json(obj);
}

// this controller used to add expens
export const post = async (req, res) => {
	try {
        console.log("in controller")
        const user = await expenseService.save(req,res);
        //setResponse(user,res)
	} catch (error) {
		setError(error,res)
	}
}
// this controller used to get personal expense
export const personal_expense = async (req,res) => {
    try {
        const expense = await expenseService.personal_expence_search(req,res);
        setResponse(expense,res);
    } catch (error) {
        setError(error,res)
    }
}

// this controller used to get group expense
export const group_expenses = async (req,res) =>{
    try {
        const expense = await expenseService.group_expense_search(req,res);
        setResponse(expense,res);
    } catch (error) {
        setError(error,res)
    }
}
// this controller used to update personal expense
export const personal_expense_put= async (req,res) => {
    try {
        const expense = await expenseService.personsl_expense_update(req,res);
        setResponse(expense,res);
    } catch (error) {
        setError(error,res)
    }
}
// this controller used to update group expense
export const group_expense_put= async (req,res) => {
    try {
        const expense = await expenseService.group_expense_update(req,res);
        setResponse(expense,res);
    } catch (error) {
        setError(error,res)
    }
}

// this controller used to deleted personal expense
export const personal_expense_remove = async (req,res) => {
    try {
        const expense = await expenseService.personal_expense_delete(req,res);
        setResponse(expense,res);
    } catch (error) {
        setError(error,res)
    }
}
// this controller used to delete group expense
export const group_expense_remove = async (req,res) => {
    try {
        const expense = await expenseService.group_expense_delete(req,res);
        setResponse(expense,res);
    } catch (error) {
        setError(error,res)
    }
}



