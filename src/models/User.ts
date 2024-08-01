import mongoose from '@database/conn';
const { Schema } = mongoose

export interface IUser extends mongoose.Document {
    firstName: string;
    lastName: string;
    birthDate: string;
    city: string;
    country: string;
    email: string;
    password: string;
}

const userSchema = new Schema<IUser> ({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    birthDate: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

const User = mongoose.model<IUser>('User', userSchema)

export default User;
