import mongoose from "mongoose";
// this schema is used to track indvidual's expense
const Trackingschema = new mongoose.Schema(
    {

        total_expense_Indvidual: {
            default :0,
            type : Number,
        },
        total_group_expense: {
            default :0,
            type : Number,
        },

        total_income:{
            default :0,
            type: Number
        },
        user_id: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "User",
            required: true
          }

    });

 export const tracking = mongoose.model("tracking", Trackingschema);


export default {tracking};