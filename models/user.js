import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  fullname: {
    type: String,
    required: true,
  },
  avatarUrl: {
    type: String,
    default: "https://mui.com/static/images/avatar/2.jpg",
  },
  passwordHash: {
    type: String,
    required: true,
  },
});

export default mongoose.model("User", UserSchema);