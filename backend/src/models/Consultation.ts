import mongoose, { Schema, Document } from "mongoose";

export interface IConsultation extends Document {
    userId: string; // clerk user id
    originalLanguage: string;
    originalInput: string;
    translatedInput: string;
    aiResponse: {
        condition: string;
        severity: string;
        precautions: string[];
        medicines: string[];
        emergency_advice?: string;
    };
    severity: string;
    createdAt: Date;
}

const ConsultationSchema: Schema = new Schema({
    userId: { type: String, required: true },
    originalLanguage: { type: String, required: true },
    originalInput: { type: String, required: true },
    translatedInput: { type: String, required: true },
    aiResponse: { type: Schema.Types.Mixed, required: true },
    severity: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Consultation || mongoose.model<IConsultation>("Consultation", ConsultationSchema);
