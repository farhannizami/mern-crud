const Note = require('../models/NoteModel');
const mongoose = require('mongoose');


// get all notes
const getNotes = async (req, res) => {
    const user_id = req.user._id;
    const notes = await Note.find({ user_id }).sort({ createdAt: -1 }); // sort decending order
    res.status(200).json(notes);
}


// create new note
const createNote = async (req, res) => {
    const { title, msgbody } = req.body

    let emptyfield = [];

    if (!title) {
        emptyfield.push('title');
    }
    if (!msgbody) {
        emptyfield.push('body');
    }

    if (emptyfield.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields', emptyfield });
    }

    try {

        const user_id = req.user._id;
        const note = await Note.create({ title, msgbody, user_id });
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


// delete a note
const deleteNoteById = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Invalid ID or No such workout' });
    }
    const note = await Note.findOneAndDelete({ _id: id });
    if (!note) {
        return res.status(400).json({ error: "No such note" });
    }
    res.status(200).json(note);
}


// update note
const updateNoteById = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Invalid ID or No such workout' });
    }
    const note = await Note.findOneAndUpdate({ _id: id }, { ...req.body });
    if (!note) {
        return res.status(400).json({ error: "No such note" });
    }
    res.status(200).json(note);
}


module.exports = {
    createNote,
    getNotes,
    getNoteById,
    deleteNoteById,
    updateNoteById,
}