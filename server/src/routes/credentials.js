// Routes for managing credential entries

const express = require('express');
const Credential = require('../models/Credential');
const crypto = require('crypto');

const router = express.Router();

// Key used to encrypt credential data
const ENC_KEY = process.env.CREDENTIAL_KEY || 'defaultkeydefaultkey'; // must be 16/24/32 chars

// Helper to encrypt plain text into base64 using AES-256
function encrypt(text) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENC_KEY), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
}

// Helper to decrypt base64 string
function decrypt(text) {
  const parts = text.split(':');
  const iv = Buffer.from(parts.shift(), 'hex');
  const encryptedText = Buffer.from(parts.join(':'), 'hex');
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENC_KEY), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

// List credentials for current user
router.get('/', async (req, res) => {
  try {
    const creds = await Credential.find({ ownerId: req.user.sub }, '-data'); // exclude data
    res.json(creds);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch credentials' });
  }
});

// Create credential
router.post('/', async (req, res) => {
  try {
    const encrypted = encrypt(JSON.stringify(req.body.data));
    const cred = await Credential.create({
      name: req.body.name,
      type: req.body.type,
      ownerId: req.user.sub,
      data: encrypted,
    });
    res.status(201).json({ id: cred._id, name: cred.name, type: cred.type });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Failed to create credential' });
  }
});

// Get credential metadata
router.get('/:id', async (req, res) => {
  try {
    const cred = await Credential.findOne({ _id: req.params.id, ownerId: req.user.sub }, '-data');
    if (!cred) return res.status(404).json({ error: 'Not found' });
    res.json(cred);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Invalid id' });
  }
});

// Delete credential
router.delete('/:id', async (req, res) => {
  try {
    const result = await Credential.deleteOne({ _id: req.params.id, ownerId: req.user.sub });
    if (result.deletedCount === 0) return res.status(404).json({ error: 'Not found' });
    res.status(204).end();
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Failed to delete credential' });
  }
});

module.exports = router;
