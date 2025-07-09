// Routes for CRUD operations on workflows

const express = require('express');
const Workflow = require('../models/Workflow');

const router = express.Router();

// List workflows for current user
router.get('/', async (req, res) => {
  try {
    const workflows = await Workflow.find({ ownerId: req.user.sub });
    res.json(workflows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch workflows' });
  }
});

// Create a new workflow
router.post('/', async (req, res) => {
  try {
    const workflow = await Workflow.create({
      ...req.body,
      ownerId: req.user.sub,
    });
    res.status(201).json(workflow);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Failed to create workflow' });
  }
});

// Get single workflow
router.get('/:id', async (req, res) => {
  try {
    const workflow = await Workflow.findOne({
      _id: req.params.id,
      ownerId: req.user.sub,
    });
    if (!workflow) return res.status(404).json({ error: 'Not found' });
    res.json(workflow);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Invalid workflow id' });
  }
});

// Update workflow
router.put('/:id', async (req, res) => {
  try {
    const workflow = await Workflow.findOneAndUpdate(
      { _id: req.params.id, ownerId: req.user.sub },
      req.body,
      { new: true }
    );
    if (!workflow) return res.status(404).json({ error: 'Not found' });
    res.json(workflow);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Failed to update workflow' });
  }
});

// Delete workflow
router.delete('/:id', async (req, res) => {
  try {
    const result = await Workflow.deleteOne({
      _id: req.params.id,
      ownerId: req.user.sub,
    });
    if (result.deletedCount === 0)
      return res.status(404).json({ error: 'Not found' });
    res.status(204).end();
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Failed to delete workflow' });
  }
});

module.exports = router;
