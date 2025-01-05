import { Schema, model, Document } from 'mongoose';

export interface ITask extends Document {
    userId: Schema.Types.ObjectId;
    title: string;
    description?: string;
    dueDate?: Date;
    status: 'pending' | 'completed';
}

const TaskSchema = new Schema<ITask>({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String },
    dueDate: { type: Date },
    status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
});

export default model<ITask>('Task', TaskSchema);
