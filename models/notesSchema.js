const mongoose = require('mongoose')
const notesSchema = new mongoose.Schema(
{
    content: {
    type: String,
    required: true
}
});
const Note = mongoose.model('Note', notesSchema);

module.exports = Note;

