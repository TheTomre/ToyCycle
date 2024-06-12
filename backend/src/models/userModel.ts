import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  auth0Id: {
    required: [true, "An auth0Id is required"],
    type: String,
    unique: [true, "id is not unique"]
  },

  city: {
    trim: true,
    type: String
  },
  country: {
    trim: true,
    type: String
  },
  street1: {
    trim: true,
    type: String
  },
  street2: {
    trim: true,
    type: String
  },
  zipcode: {
    trim: true,
    type: String
  },
  avatar: {
    type: String
  },
  bio: {
    trim: true,
    type: String
  },
  email: {
    lowercase: true,
    required: [true, "Please provide your email"],
    type: String,
    unique: true
  },
  firstName: {
    type: String
  },
  lastActive: {
    default: new Date().toISOString(),
    type: String
  },
  lastName: {
    minlength: 1,
    type: String
  },
  tokenBalance: {
    default: 0,
    type: Number
  },
  toyListings: {
    type: Array,
    default: []
  }
});

const User = mongoose.model("User", userSchema);

export default User;
