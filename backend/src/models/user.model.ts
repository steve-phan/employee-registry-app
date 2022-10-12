import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ROLE = {
  EMPLOYEE: "EMPLOYEE",
  MANAGER: "MANAGER",
} as const;

const userSchema = new Schema({
  userName: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  lastName: { type: String, required: true },
  firstName: { type: String, required: true },
  address: String,
  role: [{ type: String, default: ROLE.EMPLOYEE }],
  createdDate: { type: Date, default: Date.now },
});

export default mongoose.model("User", userSchema);
