const Skill = require('../models/Skill');

exports.getSkills = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const skills = await Skill.find()
    .skip((page - 1) * limit)
    .limit(parseInt(limit))
    .populate('user', 'name');
  res.json(skills);
};

exports.addSkill = async (req, res) => {
  const { title, description, category } = req.body;
  const skill = new Skill({ user: req.user.id, title, description, category });
  await skill.save();
  res.json(skill);
};
