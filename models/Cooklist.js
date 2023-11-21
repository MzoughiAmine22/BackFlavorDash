
const mongoose = require('mongoose');

const cooklistSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    recipes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe'
    }]
});

const Cooklist = mongoose.model('Cooklist', cooklistSchema);

module.exports = Cooklist;
