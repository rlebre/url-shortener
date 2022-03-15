import { Schema, model } from 'mongoose';
import { UserModel } from '../interfaces/UserModel';

const schema = new Schema<UserModel>({
    name: {
        type: String
    },

    email: {
        type: String,
        required: true,
    },

    active: {
        type: Boolean
    }
})

export default model<UserModel>('User', schema);