import mongoose from "mongoose";
import validator from "validator";
import md from "md5";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate: [validator.isEmail, "Invalid email"],
  },
  phone: {
    type: Number,
    required: true,
    minlength: 10,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Hash password before saving
userSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    this.password = md(this.password);
  }
  next();
});

// comparing password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await md.compare(enteredPassword, this.password);
};

// create jwt token for authorization
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

export default mongoose.model("User", userSchema);
