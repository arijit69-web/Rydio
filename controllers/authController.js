const authService = require('../services/authService');

const register = async (req, res) => {
  try {
    const { user, token } = await authService.register(req.body);
    res.status(201).send({ data: { user, token }, success: true, error: null, message: "User Registered Successfully" });

  } catch (error) {
    res.status(500).send(error.message);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await authService.login({ email, password });
    res.status(201).send({ data: { user, token }, success: true, error: null, message: "User Logged in Successfully" });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = { register, login };
