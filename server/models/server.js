import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

// Define the User schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving user (for signup)
userSchema.pre('save', async function (next) {
  if (this.isModified('password') || this.isNew) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// Method to validate password (for login)
userSchema.methods.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Create the User model
const User = mongoose.model('User', userSchema);

export default User;
