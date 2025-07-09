// Mongoose schema for storing third-party credentials

const mongoose = require('mongoose');

const CredentialSchema = new mongoose.Schema(
  {
    name: String,
    ownerId: String,
    type: String,
    data: String, // encrypted credential data
  },
  { timestamps: true }
);

module.exports = mongoose.model('Credential', CredentialSchema);
