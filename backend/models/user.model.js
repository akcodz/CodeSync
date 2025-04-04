import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// User Schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

// Static method to hash password
userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
};

// Instance method to compare password
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// Instance method to create JWT token
userSchema.methods.createToken =  function () {
    return  jwt.sign({ email: this.email, _id: this._id }, process.env.JWT_SECRET, { expiresIn: '6h' });
};

// Create User model
const User = mongoose.model("User", userSchema);

export default User;
