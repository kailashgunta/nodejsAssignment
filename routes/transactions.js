const express = require('express');
const Transaction = require('../models/transactionModel');
const Category = require('../models/categoryModel');

const router = express.Router();

// POST /transactions - Add new transaction
router.post('/transactions', async (req, res) => {
  try {
    const { type, category, amount, date, description } = req.body;

    const categoryData = await Category.findOne({ where: { name: category } });
    if (!categoryData) return res.status(400).json({ error: 'Invalid category' });

    const transaction = await Transaction.create({
      type,
      amount,
      date,
      description,
      CategoryId: categoryData.id
    });

    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /transactions - Retrieve all transactions
router.get('/transactions', async (req, res) => {
  try {
    const transactions = await Transaction.findAll({ include: Category });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /transactions/:id - Retrieve a transaction by ID
router.get('/transactions/:id', async (req, res) => {
  try {
    const transaction = await Transaction.findByPk(req.params.id, { include: Category });
    if (!transaction) return res.status(404).json({ error: 'Transaction not found' });

    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT /transactions/:id - Update a transaction by ID
router.put('/transactions/:id', async (req, res) => {
  try {
    const { type, category, amount, date, description } = req.body;

    const transaction = await Transaction.findByPk(req.params.id);
    if (!transaction) return res.status(404).json({ error: 'Transaction not found' });

    const categoryData = await Category.findOne({ where: { name: category } });
    if (!categoryData) return res.status(400).json({ error: 'Invalid category' });

    transaction.update({
      type,
      amount,
      date,
      description,
      CategoryId: categoryData.id
    });

    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE /transactions/:id - Delete a transaction by ID
router.delete('/transactions/:id', async (req, res) => {
  try {
    const transaction = await Transaction.findByPk(req.params.id);
    if (!transaction) return res.status(404).json({ error: 'Transaction not found' });

    await transaction.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /summary - Summary of transactions
router.get('/summary', async (req, res) => {
  try {
    const income = await Transaction.sum('amount', { where: { type: 'income' } });
    const expense = await Transaction.sum('amount', { where: { type: 'expense' } });

    res.status(200).json({
      totalIncome: income || 0,
      totalExpenses: expense || 0,
      balance: (income || 0) - (expense || 0)
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
