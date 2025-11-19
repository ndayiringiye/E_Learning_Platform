import mongoose from "mongoose";

const attendanceRecordSchema = new mongoose.Schema({
    lessonId: { 
        type: mongoose.Schema.Types.ObjectId,
    },
    dateMarked: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['present', 'absent', 'late'],
        default: 'present'
    }
});
const Attendance = mongoose.model("Attendance", mongoose.attendanceRecordSchema);
export default Attendance;