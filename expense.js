const mongoose = require('mongoose');


const expenseSchema = new mongoose.Schema({
    itemName: { type: String, required: true },
    category: { type: String },
    quantity: { type: Number, required: true },
    amount: { type: Number, required: true },
    totalAmount: { type: Number }
});


const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;