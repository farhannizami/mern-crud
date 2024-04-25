const Note = require('../models/NoteModel');
const mongoose = require('mongoose');


// get all notes
const getNotes = async (req, res) => {
    const notes = await Note.find({}).sort({ createdAt: -1 }); // sort decending order
    res.status(200).json(notes);
}


// create new note
const createNote = async (req, res) => {
    const { title, msgbody } = req.body

    try {
        const note = await Note.create({ title, msgbody });
        res.status(200).json(note);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}


// get note by id
const getNoteById = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Invalid ID or No such workout' });
    }

    const note = await Note.findById(id);
    if (!note) {
        return res.status(400).json({ error: "No such note" });
    }
    res.status(200).json(note);
}

module.exports = {
    createNote,
    getNotes,
    getNoteById,
}