import mongoose from 'mongoose';

async function main() {
    await mongoose.connect(process.env.MONGODB_URI as string);
}

main().catch(err => err);

export default mongoose;
