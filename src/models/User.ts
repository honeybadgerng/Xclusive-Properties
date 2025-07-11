import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
  email: string;
  password: string;
  role: "admin" | "agent" | "customer";
  name: string;
  phone?: string;
  profileImage?: string;
  companyName?: string; // for agents
  whatsapp?: string;
  subscription?: {
    plan: string;
    expiresAt: Date;
  };
  comparePassword: (password: string) => Promise<boolean>;
}

const UserSchema: Schema<IUser> = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "agent", "customer"],
      default: "customer",
    },
    name: { type: String, required: true },
    phone: String,
    whatsapp: { type: String },
    profileImage: String,
    companyName: String, // optional for agents
    subscription: {
      plan: { type: String },
      expiresAt: { type: Date },
    },
  },
  { timestamps: true }
);

// Password hashing
UserSchema.pre("save", async function (next) {
  const user = this as IUser;
  if (!user.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  next();
});

UserSchema.methods.comparePassword = async function (password: string) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
export default User;
