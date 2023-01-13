import {expense} from './../models/expense.js';
import {
    group_expense
} from '../models/group_expense.js';
import models from '../models/index.js';
import {User} from '../models/User.js';
import {tracking} from '../models/tracking.js'
import sendEmail from './../utils/sendEmail.js';
import moment from "moment";
import {Notification} from '../models/notification.js'
import mongoose from "mongoose";
import e from 'cors';

// used to save expense of person both group and indviual
export const save = async (req, res) => {
    console.log("in save")
    console.log(req.body)
    let track ;
    let newexp = 0;
    if (req.body.type === 'Group') {
    }
else{
    const result = await tracking.exists({ user_id: req.params.id});
    if (result){
        console.log("in Personal")
         track =  await tracking.findOne({user_id: req.params.id})
    }
    else{
        newexp =1
    }
}
    

    if (req.body.type === 'Group') {
        console.log("in group");
        let user_id = req.body.users;
        console.log(user_id);
        const shared = (req.body.amount)/user_id.length;
        let exps = {
            sub_category: req.body.sub_category,
            amount: req.body.amount,
            shared_amount: shared,
            description: req.body.description,
            user_id: user_id,
            flat_id: req.params.id,
            reference: req.body.reference,
            category:req.body.category,
            paidby:req.body.paidby
        }
        for(var i= 0;i<user_id.length;i++) {
            const result = await tracking.exists({ user_id: user_id[i]});
            console.log(result)
            if (result){
                console.log("in");
                const filter = {_id: result._id}
                let update_amt = await tracking.findOne(filter).exec();
                update_amt.total_group_expense+=(req.body.amount)/user_id.length;
                const tra = await tracking.findOneAndUpdate({user_id: user_id[i]},{total_group_expense:update_amt.total_group_expense},{
                    new: true
                })
                check_budget(user_id[i],tra)
                
            }
            else{
                const new_track = {
                    user_id: user_id[i],
                    total_group_expense:req.body.amount
                }
                const track = new tracking(new_track);
                await track.save()
                check_budget(user_id[i],track)
            }
            }
        const exp = new group_expense(exps);
        exp.flat_id = req.params.id;
       await exp.save();

        res.status(201).send({ message: "Group expense created successfully" });
        return res;
    } 
    else {
        let mess;
        let exps = {
            sub_category: req.body.sub_category,
            amount: req.body.amount,
            description: req.body.description,
            user_id: req.params.id,
            category: req.body.category,
            reference: req.body.reference,
            recurring_expense:req.body.recurring_expense
        }
        console.log(exps);
        const exp = new expense(exps);
       const espense = await exp.save();
        console.log("Expense saved");

        if(req.body.recurring_expense){
            const notification = {
                date : req.body.date,
                expenseId: espense._id
            }
            const noti = new Notification(notification);
            await noti.save();
        }

        if (req.body.category === 'Income'){
            mess =  "Personal Income created successfully" ;
            if(newexp===1){
                const new_track = {
                    user_id: req.params.id,
                    total_income:req.body.amount
                }
                const track = new tracking(new_track);
                await track.save();
            }
            else{
                console.log("in else")
                const filter = {_id: track._id}
               
                let update_amt = await tracking.findOne(filter).exec();
                update_amt.total_income+=req.body.amount
               await tracking.findOneAndUpdate(filter,{total_income:update_amt.total_income}).exec()
            }
            
        }
        else{
            mess =  "Personal Expense created successfully" ;
           
            let tra =null
            if(newexp===1){
                const new_track = {
                    user_id: req.params.id,
                    total_expense_Indvidual:req.body.amount
                }
                console.log("in track")
                tra = new tracking(new_track);
                await tra.save()
            }
            else{
                console.log("in else of track saving")
                console.log(track);
                const filter = {_id: track._id}
                console.log(filter);
                let update_amt = await tracking.findOne(filter).exec();
                update_amt.total_expense_Indvidual+=req.body.amount
                 tra = await tracking.findOneAndUpdate(filter,{total_expense_Indvidual:update_amt.total_expense_Indvidual}).exec()
                
            }
            check_budget(req.params.id,tra);
            
        }
        res.status(201).send({ message: mess });
        return res;
    }

}

//used to search the personal expense based on parameter fields
export const personal_expence_search = async (req,res) =>{
    const filter = {user_id: req.params.id}
    //console.log(req.params)
   
    let ans =[]
    console.log(req.query);

    const {frequency} = req.query.frequency;
    const {selectedRange} = req.query.selectedRange;
    const   category  = req.query.type;
    const   sub_category  = req.query.category;

    console.log(req.query.frequency)
    console.log(req.query.selectedRange)
    console.log(req.query.type)
    console.log(req.query.category)
    let ct = req.query.selectedRange.split(',')
    let date1;
    let date2;

    console.log(ct);
    if(ct.length > 1){
        date1 =  ct[0].split('T');
        date2= ct[1].split('T');
    date1 = new Date(date1[0]);
    date2 = new Date(date2[0])
    console.log(new Date(date2[0]));
    }
    
    let expenses = await expense.find(    {
        //   conditional property to check if the frequency is equal to custom
      ...(req.query.frequency !== "custom"
        ? {
            date: {
              $gt: moment().subtract(Number(req.query.frequency), "d").toDate(),
            },
          }
        : {
            date: {
              $gte: date1,
              $lte: date2,
            },
          }),
      user_id: req.params.id,
    //   conditional property
      ...(req.query.type!=='all' && {category}),
      ...(req.query.category!=='all' && {sub_category})
    });
console.log(expenses);



    for (var i=0;i<expenses.length;i++){
        
        let user =  JSON.parse(JSON.stringify(expenses[i]));
        let date = moment(user.date).utc().format('YYYY-MM-DD')
        user.type = user.category
        user.category = await user.sub_category;
        user.date = date;
        //console.log(user.category)
        ans.push(user);
    }

    console.log(ans);

    
   

    return ans;
}

//used to search the group expense based on parameter fields
export const group_expense_search = async (req,res) =>{
    const filter = {user_id: req.params.id}

    console.log("in group",filter);

    let ans =[]
    console.log(req.query);

    const {frequency} = req.query.frequency;
    const {selectedRange} = req.query.selectedRange;
    const   paidby  = req.query.paidby;
    const   sub_category  = req.query.category;

    console.log(req.query.frequency)
    console.log(req.query.selectedRange)
    console.log(req.query.paidby)
    console.log(req.query.category)
    let ct = req.query.selectedRange.split(',')
    let date1;
    let date2;

    if(ct.length > 1){
        date1 =  ct[0].split('T');
        date2= ct[1].split('T');
    date1 = new Date(date1[0]);
    date2 = new Date(date2[0]);
    console.log(new Date(date2[0]));
    }


    let expenses = await group_expense.find(    {
        //   conditional property to check if the frequency is equal to custom
      ...(req.query.frequency !== "custom"
        ? {
            date: {
              $gt: moment().subtract(Number(req.query.frequency), "d").toDate(),
            },
          }
        : {
            date: {
              $gte: date1,
              $lte: date2,
            },
          }),
      user_id: req.params.id,
    //   conditional property
      ...(req.query.category!=='all' && {sub_category})
    });
    console.log("111");
    console.log(req.query.paidby);
    let name;

    if(req.query.paidby!== 'all'){

    
    }








    for (var i=0;i<expenses.length;i++){
        console.log("Inside loop")
        let usersn =[];
        let user =  JSON.parse(JSON.stringify(expenses[i]));
        let ind_exp = expenses[i].user_id;
        for (var j=0;j<ind_exp.length;j++){
            usersn.push(await map_name_with_id(ind_exp[j]));
        }
        user.mates = usersn
        let date = moment(user.date).utc().format('YYYY-MM-DD')
        user.paidby = await map_name_with_id(user.paidby);
        console.log( typeof user.paidby )
        user.type = 'expence'
        user.date = date;
        user.category = user.sub_category;
        let sh = ((user.amount)/ user.mates.length).toFixed(2);
        user.share = sh;
    
        ans.push(user)
    }
if(req.query.paidby !=='all'){
    name =  await map_name_with_id_param(req.query.paidby);
   let cs = ans.filter(an => an.paidby === name);
    console.log("191",cs);

    return cs;
}
else{
    return ans;
}
}
//update group expense
export const group_expense_update = async (req,res) =>{
    const filter = {_id: req.params.id}
    console.log(req.body);
    let group = await group_expense.findOne(filter);
    let exist_user = group.user_id;

    for(var i= 0;i<exist_user.length;i++) {
        var tra = await tracking.findOne({user_id: exist_user[i]});
        tra.total_group_expense -= (group.amount)/(group.user_id.length);
        await tracking.findOneAndUpdate({user_id: exist_user[i]},{total_group_expense:tra.total_group_expense});
    }
    let users = req.body.users;
        let user_id = []

        for (var i =0;i< users.length;i++){
            console.log(users[i])
            let user = await User.findOne({firstName: users[i]}).exec();
            console.log(user);
            user_id.push(user._id);
        }
        const shared =(req.body.amount)/user_id.length;
        let exps = {
            sub_category: req.body.sub_category,
            amount: req.body.amount,
            shared_amount : shared.toFixed(2),
            description: req.body.description,
            user_id: user_id,
            flat_id: req.body.flat_id,
            reference: req.body.reference,
            category:req.body.category
        }

        for(var i= 0;i<user_id.length;i++) {
            var tra = await tracking.findOne({user_id: user_id[i]});
            tra.total_group_expense += req.body.amount/(user_id.length);
            await tracking.findOneAndUpdate({user_id: user_id[i]},{total_group_expense:tra.total_group_expense})
            }
        
           

        const group__exp = await group_expense.findOneAndUpdate(filter,exps,{
            new: true
        }).exec();
    
        return group__exp;
}

//update personal expense
export const personsl_expense_update = async (req,res) =>{
    const filter = {_id: req.params.id}

    let exp = await expense.findOne(filter);

    let exps = {
        sub_category: req.body.sub_category,
        amount: req.body.amount,
        description: req.body.description,
        user_id: req.body.user_id,
        type: req.body.type,
        category : req.body.category
    }

    if (exp.category === 'income'){

        const filter = {user_id: exp.user_id}
                console.log(filter);
                let update_amt = await tracking.findOne(filter).exec();
                update_amt.total_income-=exp.amount
                update_amt.total_income+=req.body.amount
                await tracking.findOneAndUpdate(filter,{total_income:update_amt.total_income}).exec()
               
    }
    else{

        const filter = {user_id: exp.user_id}
                console.log(filter);
                let update_amt = await tracking.findOne(filter).exec();
                update_amt.total_expense_Indvidual-=exp.amount
                update_amt.total_expense_Indvidual+=req.body.amount
                const t = await tracking.findOneAndUpdate(filter,{total_expense_Indvidual:update_amt.total_expense_Indvidual}).exec()
                check_budget(exp.user_id,t);

    }
    
    const group__exp = expense.findOneAndUpdate(filter,exps,{
        new: true
    }).exec();
    return group__exp;
   


}
// delete group expense
export const group_expense_delete = async (req,res) =>{
    const filter = {_id: req.params.id}

    let group = await group_expense.findOne(filter);
    let exist_user = group.user_id;

    for(var i= 0;i<exist_user.length;i++) {
        var tra = await tracking.findOne({user_id: exist_user[i]});
        tra.total_group_expense -= group.amount;
        await tracking.findOneAndUpdate({user_id: exist_user[i]},{total_group_expense:tra.total_group_expense})
    }
    const expen = group_expense.findOneAndDelete(filter).exec();

    return expen;
}
// delete personal expense
export const personal_expense_delete = async (req,res) =>{

    const filter = {_id: req.params.id};

    let exp = await expense.findOne(filter);

    if (exp.category === 'income'){

        const filter = {user_id: exp.user_id}
                console.log(filter);
                let update_amt = await tracking.findOne(filter).exec();
                update_amt.total_income-=exp.amount
                update_amt.total_income+=req.body.amount
                await tracking.findOneAndUpdate(filter,{total_income:update_amt.total_income}).exec()
    }
    else{

        const filter = {user_id: exp.user_id}
                console.log(filter);
                let update_amt = await tracking.findOne(filter).exec();
                update_amt.total_expense_Indvidual-=exp.amount
                update_amt.total_expense_Indvidual+=req.body.amount
                await tracking.findOneAndUpdate(filter,{total_expense_Indvidual:update_amt.total_expense_Indvidual}).exec()
    }
    const expen = expense.findOneAndDelete(filter).exec();

    return expen;

}
// check budget less than 80%
const  check_budget = async (user_id,track) => {
    console.log("Inside budget notification")

    const user = await  User.findOne({_id:user_id}).exec();
    console.log(user);
    console.log(user.monthly_budget);
    if ((track.total_expense_Indvidual+ track.total_group_expense) > (0.8 * user.monthly_budget)){
       
        await sendEmail(user.email, "Budget Alert", "You have crossed your 80% of the budget. Spend wsiely");
    }

}

//map with id
const map_name_with_id = async(user_id)=>{
    const user = await  User.findOne({_id:user_id}).exec();
    
    return user.firstName;
    

}
// map id with firstname
const map_name_with_id_param = async(user_id)=>{
    console.log(user_id)
    let id = new mongoose.Types.ObjectId(user_id)
    console.log(id);
    const user = await  User.findById(id);
    console.log(user)

    return user.firstName;
    

}