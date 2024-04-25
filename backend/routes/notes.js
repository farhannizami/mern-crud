const express = require('express');

const router = express.Router();
const { createNote, getNotes, getNoteById, } = require('../controllers/NoteControllers');

//get all notes
router.get('/', getNotes);

//get one
router.get('/:id', getNoteById);


//post one
router.post('/', createNote);

router.delete('/:id', (req, res) => {
    res.json({
        msg: 'delete one'
    });
})


router.patch('/:id', (req, res) => {
    res.json({
        msg: 'update one'
    });
})

module.exports = router;