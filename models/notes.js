const mongoose = require('mongoose')
const notesSchema = new mongoose.Schema(
{
    date: {
    'type': 'Date'
    // required: True
},
    notes: {
    'type': 'String'
    // required: True
}
});
const Notes = mongoose.model('Notes', notesSchema);

module.exports = Notes;