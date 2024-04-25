const express = require('express');

const router = express.Router();
const { createNote, getNotes, getNoteById, deleteNoteById, updateNoteById } = require('../controllers/NoteControllers');

//get all notes
router.get('/', getNotes);

//get one
router.get('/:id', getNoteById);


//post one
router.post('/', createNote);

router.delete('/:id', deleteNoteById);


router.patch('/:id', updateNoteById);

module.exports = router;