const express = require('express');
const { createNote, getNotes, getNoteById, deleteNoteById, updateNoteById } = require('../controllers/NoteControllers');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

router.use(requireAuth);

//get all notes
router.get('/', getNotes);

//get one
router.get('/:id', getNoteById);


//post one
router.post('/', createNote);

router.delete('/:id', deleteNoteById);


router.patch('/:id', updateNoteById);

module.exports = router;