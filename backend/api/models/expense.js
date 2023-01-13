import mongoose from "mongoose";
// this model is crested for personl expense
const date = Date.parse(new Date().toLocaleDateString());
const ExpenseSchema = new mongoose.Schema(
    {
      date: {
        type: Date,
        default: date,
        required: [true, "Date is required"],
      },
      sub_category: {
        required : true,
        type: String,
      },
      category :{
        required : true,
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
      reference:{
        type: String,
        default: "Added expense"
      },
      recurring_expense:{
        type: Boolean,
        default: false
      },
      /* Association with User Schema */
  
      user_id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref : "User",
        required: true,
      }
    },
    {
      timestamps: true,
    }
  );

  export const expense = mongoose.model("expense", ExpenseSchema);


export default {expense};