const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Expense = require('./expense');


app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/ExpenseDB')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB', err);
    });


app.get('/expense', async (req, res) => {
    try {

        const expense = await Expense.find();
        res.status(200).json({ message: 'Successfully retrieved data', expense: expense });
      }
      catch(err)
      {
        res.status(500).json({ error: err.message });
      }
});

app.post('/expense', async (req, res) => {

    try
    {
      const { itemName, category, quantity, amount } = req.body;
      const totalAmount = quantity * amount;
      const newExpenses = new Expense({ itemName, category, quantity, amount, totalAmount });
      const expense = await newExpenses.save();
      res.status(201).json(expense);
    }
    catch(err)
    {
      res.status(500).json({ error: err.message });
    }

});


app.put('/expense/:id', async (req, res) => {

  try
  {
    const productId = req.params.id;
    const { itemName, category, quantity, amount } = req.body;
    const totalAmount = quantity * amount;
    const product = await Expense.findByIdAndUpdate(productId, { itemName, category, quantity, amount, totalAmount }, { new: true });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);

  } catch(err)
  {
    res.status(500).json({ error: err.message });
  }
});


app.delete('/expense/:id', async (req, res) => {

  try
  {
    const productId = req.params.id;
    const product = await Expense.findByIdAndDelete(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });

  } catch(err)
  {
    res.status(500).json({ error: err.message });
  }
});

const port = 5000;
app.listen(port, () => console.log(`Listening on port ${port}.`));