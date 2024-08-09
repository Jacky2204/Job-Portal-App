import jwt from "jsonwebtoken";
import md from "md5";

const register = async (req, res) => {
  try {
    const { name, email, phone, password, role } = req.body;
    const user = new User({ name, email, phone, password, role });
    await user.save();
    if (role == "user") {
      res.status(201).json({ message: "User registered successfully" });
    } else {
      res.status(201).json({ message: "Admin registered successfully" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    // Input validation
    if (!email || !password || !role) {
      return res
        .status(400)
        .json({ message: "Email, password and role are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare passwords
    const isValidPassword = await md.compared(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }

    if (user.role !== role){
      return res.status(401).json({ message: "Invalid Role" });
    }

    // create token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "3d",
    });
    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export { register, login };
