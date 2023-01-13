
import flatRouter from './flat-router.js'

import authrouter from './auth-router.js'

import resetrouter from './resetpassword-router.js';

import userRouter from './user-router.js';

import expenseRouter from './expense-router.js';

// exporting all routes
export default(app) => {
    app.use('/flat',flatRouter);
    app.use('/auth',authrouter);
    app.use('/reset',resetrouter);
    app.use('/user',userRouter);
    app.use('/expense',expenseRouter);
}