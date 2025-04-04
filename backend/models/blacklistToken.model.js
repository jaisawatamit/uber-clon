const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const blacklistTokenSchema = new Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 86400 // 24 hours expiration
    }
})

const BlacklistModel = mongoose.model('blacklistToken', blacklistTokenSchema);

module.exports = BlacklistModel;