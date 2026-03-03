import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
    clerkUserId: string;
    email: string;
    createdAt: Date;
}

const UserSchema: Schema = new Schema({
    clerkUserId: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
