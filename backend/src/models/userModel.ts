import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  auth0Id: {
    required: [true, "An auth0Id is required"],
    type: String,
    unique: [true, "id is not unique"]
  },

  city: {
    default: "Tel Aviv",
    trim: true,
    type: String
  },
  country: {
    default: "Israel",
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
    minlength: 1,
    type: String
  },
  lastActive: {
    default: new Date().toISOString(),
    required: true,
    type: String
  },
  lastName: {
    minlength: 1,
    type: String
  },
  password: {
    minlength: 8,
    select: false,
    trim: true,
    type: String
  },
  //! TODO: Add password encryption
  // passwordChangedAt: Date,
  // passwordConfirm: {
  //   required: [true, "Please confirm your password"],
  //   type: String
  // },
  // passwordResetExpires: Date,
  // passwordResetToken: String,

  tokenBalance: {
    default: 0,
    required: true,
    type: Number
  },
  toyListings: {
    required: true,
    type: [
      {
        ref: "Toy",
        type: Schema.ObjectId
      }
    ]
  }
});

const User = mongoose.model("User", userSchema);

export default User;
