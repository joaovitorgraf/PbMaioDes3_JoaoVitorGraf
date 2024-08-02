import mongoose from 'mongoose';
const { Schema } = mongoose;

export interface IEvent extends mongoose.Document {
    description: string;
    dayOfWeek: string;
    userId: string;
}

const eventSchema = new Schema<IEvent>({
    description: {
        type: String,
        required: true,
    },
    dayOfWeek: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
});

const Event = mongoose.model<IEvent>('Event', eventSchema);

export default Event;
