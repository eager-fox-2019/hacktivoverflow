const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true)
const {Schema} = mongoose;

const jobSchema = new Schema({
    title: {
        type: String,
        required: true
    }
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job