const UserModel = require("../models/UserModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register endpoint
const register = async (req, res) => {
  const { name, email, password } = req.body; // Changed username to name for consistency with the user model
  console.log(name, email, password);

  try {
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);

    let userobj = {
      name: name, // Changed username to name for consistency with the user model
      password: encryptedPassword,
      email: email,
    };

    let data = await UserModel.create(userobj);

    if (data) {
      return res.json({
        message: "Data inserted successfully",
      });
    }

    return res.json({
      message: "Data not inserted",
    });
  } catch (error) {
    console.error(error);
    return res.json({
      message: "Some error occurred",
    });
  }
};

//JWT Authorization
function Authorization(userId, userEmail) {
  const payload = { id: userId, email: userEmail };
  const token = jwt.sign({ payload }, "jwtprivatekey");
  return token;
}

// Login endpoint
const loginUser = async (req, res) => {
  try {

    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.json({ error: 'User not found' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.json({ error: 'Invalid password' });
    }
    const JSToken = Authorization(user._id, user.email);
    
    res.setHeader('Authorization', JSToken);
    res.json({ 
      message:'Login Successful!' 
    });
    
  } catch (error) {
    console.error(error);
    return res.json({
      message: 'Some error occurred',
    });
  }
};


// Find user endpoint
const finduser = async (req, res) => {
  const { email } = req.body;

  try {
    const data = await UserModel.find({ email });
    if (data) {
      return res.json({
        message: "Data exists",
      });
    }
    return res.json({
      message: "Data does not exist",
    });
  } catch (error) {
    console.error(error);
    return res.json({
      message: "Error occurred",
    });
  }
};

module.exports = {
  register,
  finduser,
  loginUser
};
