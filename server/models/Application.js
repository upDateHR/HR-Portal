const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
    candidate: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    candidateName: { type: String },
    candidateEmail: { type: String },
    message: { type: String, default: '' },
    status: { type: String, default: 'submitted' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Application', applicationSchema);
