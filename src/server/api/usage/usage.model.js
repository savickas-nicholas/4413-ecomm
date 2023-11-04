
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UsageSchema = new Schema({
    date: Date,
    userId: String,
    timeSpent: Number,
    pageViewed: String
})

export default mongoose.model('Usage', UsageSchema);