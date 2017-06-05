import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  first_name: String,
  last_name: String,
  profile_pic: String,
  gender: String,
  locale: String,
  timezone: String,
  userId: String
});


const User = mongoose.model('user', userSchema);

export default User;
