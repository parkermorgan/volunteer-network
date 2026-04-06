import { Schema, model, Document } from 'mongoose';

// 1. Create an interface representing a document in MongoDB
export interface IProject extends Document {
  title: string;
  description: string;
  requiredSkills: string[];
  location: string;
  status: 'Open' | 'Filled';
}

// 2. Create the Schema corresponding to the document interface
const projectSchema = new Schema<IProject>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  requiredSkills: [{ type: String }],
  location: { type: String, required: true },
  status: { type: String, enum: ['Open', 'Filled'], default: 'Open' }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

// 3. Create and export the Model
export const Project = model<IProject>('Project', projectSchema);