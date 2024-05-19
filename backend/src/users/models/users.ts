import mongoose from 'mongoose';

const  {Schema} = mongoose;


const userSchema = new Schema({
    id: { 
        type: Schema.ObjectId, 
        required: true 
    },
    username: {
         type: String, 
         trim: true,
         required: [true, 'An username is required'], 
         unique: true 
        },
    name: {
         type: String,
         trim: true,
          required: [true, 'A name is required']
         },
    bio: {
         type: String,
         trim: true,
         },
         avatar: {
            type: String,
            required: [true, 'A tour must have an image'],
          },
    lastActive: { 
        type: Date,
         required: true
     },
    password: { 
        type: String, 
        trim: true,
        required: [true, 'A password is required'] 
    },
    toyListings: { type: Array, required: true },
    tokenBalance: { type: Number, default: 0, required: true }
});

const User = mongoose.model('User', userSchema);

export default User;
