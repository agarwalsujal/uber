import mongoose from 'mongoose';

const blackListTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true
  },
  blacklistedAt: {
    type: Date,
    default: Date.now,
    expires: 86400 // Token will be automatically deleted after 1 day (in seconds)
  }
});

export default mongoose.model('BlackListToken', blackListTokenSchema);