import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  address: {
    required: [true, "An address is required"],
    type: {
      city: {
        default: "Tel Aviv",
        required: [true, "A city is required"],
        trim: true,
        type: String
      },
      country: {
        default: "Israel",
        required: [true, "A country is required"],
        trim: true,
        type: String
      },
      street1: {
        required: [true, "A street1 is required"],
        trim: true,
        type: String
      },
      street2: {
        trim: true,
        type: String
      },
      zipcode: {
        required: [true, "A zipcode is required"],
        trim: true,
        type: String
      }
    }
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
    required: [true, "A first name is required"],
    type: String
  },
  id: {
    required: true,
    type: Schema.ObjectId
  },
  lastActive: {
    default: Date.now,
    required: true,
    type: Date
  },
  lastName: {
    minlength: 1,
    required: [true, "A last name is required"],
    type: String
  },
  password: {
    minlength: 8,
    required: [true, "A password is required"],
    select: false,
    trim: true,
    type: String
  },
  passwordChangedAt: Date,
  passwordConfirm: {
    required: [true, "Please confirm your password"],
    type: String
  },
  passwordResetExpires: Date,
  passwordResetToken: String,

  tokenBalance: { default: 0, required: true, type: Number },
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
