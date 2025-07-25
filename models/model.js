
import mongoose from 'mongoose'
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  filePath:{
  type:String,
  require:true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('User', userSchema);
