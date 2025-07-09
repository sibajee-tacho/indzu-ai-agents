// Routes for listing workflow execution logs

const express = require('express');
const Execution = require('../models/Execution');

const router = express.Router();

// List executions, optionally filtered by workflowId
router.get('/', async (req, res) => {
  try {
    const filter = { ownerId: req.user.sub };
    if (req.query.workflowId) filter.workflowId = req.query.workflowId;
    const list = await Execution.find(filter).sort({ startedAt: -1 }).limit(50);
    res.json(list);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch executions' });
  }
});

// Get single execution detail
router.get('/:id', async (req, res) => {
  try {
    const exec = await Execution.findOne({ _id: req.params.id, ownerId: req.user.sub });
    if (!exec) return res.status(404).json({ error: 'Not found' });
    res.json(exec);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Invalid id' });
  }
});

module.exports = router;
