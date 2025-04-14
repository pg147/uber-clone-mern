import mongoose from 'mongoose';

export default async function connectDB() {
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Database connected!`)
    } catch (error) {
        console.error(error.message);
    }
}
