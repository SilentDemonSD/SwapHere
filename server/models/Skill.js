const mongoose = require('mongoose');

const SkillSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: String,
  description: String,
  category: String,
});

module.exports = mongoose.model('Skill', SkillSchema);
