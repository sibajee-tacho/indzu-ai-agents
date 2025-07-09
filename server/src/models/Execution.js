// Mongoose schema for logging workflow executions

const mongoose = require('mongoose');

const ExecutionSchema = new mongoose.Schema(
  {
    workflowId: String,
    ownerId: String,
    status: String,
    startedAt: Date,
    finishedAt: Date,
    output: Object,
    error: Object,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Execution', ExecutionSchema);
