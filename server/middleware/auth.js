const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

// server/routes/auth.js
router.post('/google', async (req, res) => {
  const { googleId, name, email, photo } = req.body;
  let user = await User.findOne({ googleId });
  if (!user) {
    user = new User({ googleId, name, email, photo, files: [] });
    await user.save();
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.json({ token, user });
});
