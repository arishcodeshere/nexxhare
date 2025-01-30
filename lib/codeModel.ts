import mongoose, { Schema, Document } from 'mongoose';

interface Code extends Document {
  key: string;
  code: string;
}

const CodeSchema = new Schema<Code>({
  key: { type: String, required: true, unique: true },
  code: { type: String, required: true }
});

const CodeModel = mongoose.models.Code || mongoose.model<Code>('Code', CodeSchema);

export { CodeModel as Code };