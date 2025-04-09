const mongoose = require('mongoose');

const SwapSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  skillOffered: { type: mongoose.Schema.Types.ObjectId, ref: 'Skill' },
  skillRequested: { type: mongoose.Schema.Types.ObjectId, ref: 'Skill' },
  status: { type: String, default: 'pending' },
});

module.exports = mongoose.model('Swap', SwapSchema);
