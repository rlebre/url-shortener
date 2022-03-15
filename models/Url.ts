import { Schema, model } from 'mongoose';
import { UrlModel } from '../interfaces/UrlModel';

const schema = new Schema<UrlModel>({
    shortUrl: {
        type: String
    },
    fullUrl: {
        type: String
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    confirmed: {
        type: Boolean,
        default: false,
        required: true
    },
    confirmationHash: {
        type: String
    },
    createdAt: {
        type: Date
    },
    confirmedAt: {
        type: Date
    },
})

export default model<UrlModel>('Url', schema);