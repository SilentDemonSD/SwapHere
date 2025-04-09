const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  googleId: String,
  name: String,
  email: String,
  photo: String,
  skills: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Skill' }],
});

module.exports = mongoose.model('User', UserSchema);
