import mongoose from "mongoose";

const date = Date.parse(new Date().toLocaleDateString());
// this model is created to add group expense
const groupExpenseSchema = new mongoose.Schema(
    {
      date: {
        type: Date,
        default: date,
        required: [true, "Date is required"],
      },
      sub_category :{
        required : true,
        type : String
      },
      category : {
        type : String
      },
      amount: {
        type: Number,
        required: [true, " amt is required"],
      },
      currency: {
        type: String,
        default: "USD",
      },
      description: {
        type: String,
      },
      shared_amount: {
        type: Number,
        default: 0
      },
      recurring_expense:{
        type: Boolean,
        default: false
      },
      reference:{
        type: String,
        default:"refrence not added"
      },
      paidby: {
        type: mongoose.SchemaTypes.ObjectId,
      },
      /* Association with User Schema */
      
      flat_id : {
        type: mongoose.SchemaTypes.ObjectId,
        required: true

      },
      user_id: [{
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        immutable: true,
      }]
    },
    {
      timestamps: true,
    }
  );

  export const group_expense = mongoose.model("groupExpense", groupExpenseSchema);


export default {group_expense};