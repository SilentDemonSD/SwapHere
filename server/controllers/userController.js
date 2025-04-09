const User = require('../models/User');

exports.getMe = async (req, res) => {
  const user = await User.findById(req.user.id).populate('skills');
  res.json(user);
};
