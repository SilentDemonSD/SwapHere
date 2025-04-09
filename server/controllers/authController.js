const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.googleAuth = async (req, res) => {
  const { googleId, name, email, photo } = req.body;
  let user = await User.findOne({ googleId });
  if (!user) {
    user = new User({ googleId, name, email, photo });
    await user.save();
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token, user });
};
