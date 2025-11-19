import mongoose from "mongoose";
const enrollmentSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    startDate: {
        type: Date,
        default: Date.now
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    progress_percent: {
        type: Number, 
        default: 0, 
        min: 0,
        max: 100
    },
    grade: {
        type: String, 
        uppercase: true,
        trim: true,
        default: null
    },
    attendanceRecords: [attendanceRecordSchema]

}, { timestamps: true });

enrollmentSchema.index({ student: 1, course: 1 }, { unique: true });

const Enrollment = mongoose.model('Enrollment', enrollmentSchema);
export default Enrollment;