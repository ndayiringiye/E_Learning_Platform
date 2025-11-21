import mongoose from 'mongoose';
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true,
        min: [18, "Student age must be at least 18"],
        max: [35, "Student age must be at most 35"]
    },
    role: {
        type: String,
        enum: ['student', 'admin'],
        default: 'student',
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const User = mongoose.model("User", userSchema);
export default User;
