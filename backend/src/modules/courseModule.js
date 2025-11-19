import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
    title: { type: String, required: true },
    videoUrl: String,
    durationMinutes: Number,
});

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    lessons: [lessonSchema], 
    isPublished: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const Course = mongoose.model('Course', courseSchema);
export default Course;