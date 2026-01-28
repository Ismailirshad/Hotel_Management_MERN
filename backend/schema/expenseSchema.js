import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
  {
    expenseFor: {
      type: String,
      enum: ["HOTEL", "SUPER_ADMIN"],
      required: true,
    },

    hotel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
      required: function () {
        return this.expenseFor === "HOTEL";
      },
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    date: {
      type: Date,
      default: Date.now,
    },

    category: {
      type: String,
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    note: String,
  },
  { timestamps: true }
);

const Expense = mongoose.model("Expense", expenseSchema);

export default Expense;

