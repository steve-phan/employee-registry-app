import mongoose from "mongoose";
const Schema = mongoose.Schema;

export const ROLE = {
  VERKÄUFER: "VERKÄUFER",
  EINKÄUFER: "EINKÄUFER",
  CHEF: "CHEF",
} as const;

export type TROLE = keyof typeof ROLE;

export interface IEmployee {
  name: string;
  email: string;
  address: string;
  role: TROLE[];
}

const userSchema = new Schema({
  userName: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  lastName: { type: String, required: true },
  firstName: { type: String, required: true },
  address: String,
  role: [{ type: String, default: ROLE.VERKÄUFER }],
  createdDate: { type: Date, default: Date.now },
});

export default mongoose.model("User", userSchema);
