// Mongoose schema for storing workflow definitions

const mongoose = require('mongoose');

const NodeSchema = new mongoose.Schema(
  {
    id: String, // unique identifier within the workflow
    type: String, // node type
    name: String, // optional label
    parameters: Object, // configuration options for the node
    credentials: Object, // credential references used by this node
    position: {
      x: Number,
      y: Number,
    },
  },
  { _id: false }
);

const ConnectionSchema = new mongoose.Schema(
  {
    from: String,
    to: String,
    outputIndex: Number,
    inputIndex: Number,
  },
  { _id: false }
);

const WorkflowSchema = new mongoose.Schema(
  {
    name: String,
    ownerId: String, // ID of the user owning the workflow
    nodes: [NodeSchema],
    connections: [ConnectionSchema],
    active: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Workflow', WorkflowSchema);
