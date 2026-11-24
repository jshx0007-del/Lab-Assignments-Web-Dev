const express = require('express');
const mongoose = require('mongoose');
const Note = require('../models/Note');
const appEvents = require('../events/appEvents');
const { authenticate } = require('../middleware/auth');

const router = express.Router();
router.use(authenticate);

function validId(req, res, next) {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: 'Invalid note id' });
  }
  next();
}

router.post('/', async (req, res, next) => {
  try {
    const { title, content } = req.body || {};
    if (!title || !content) return res.status(400).json({ message: 'title and content are required' });

    const note = await Note.create({ title, content, owner: req.user.id });
    appEvents.emit('note:created', note);
    res.status(201).json(note);
  } catch (err) {
    next(err);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const notes = await Note.find({ owner: req.user.id }).sort({ createdAt: 1 });
    res.json(notes);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', validId, async (req, res, next) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, owner: req.user.id });
    if (!note) return res.status(404).json({ message: 'Note not found' });
    res.json(note);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', validId, async (req, res, next) => {
  try {
    const { title, content } = req.body || {};
    const updates = {};
    if (title !== undefined) updates.title = title;
    if (content !== undefined) updates.content = content;
    if (!Object.keys(updates).length) {
      return res.status(400).json({ message: 'Provide title and/or content to update' });
    }

    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, owner: req.user.id },
      updates,
      { new: true, runValidators: true }
    );
    if (!note) return res.status(404).json({ message: 'Note not found' });

    appEvents.emit('note:updated', note);
    res.json(note);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', validId, async (req, res, next) => {
  try {
    const note = await Note.findOneAndDelete({ _id: req.params.id, owner: req.user.id });
    if (!note) return res.status(404).json({ message: 'Note not found' });

    appEvents.emit('note:deleted', note);
    res.json({ message: 'Note deleted' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
