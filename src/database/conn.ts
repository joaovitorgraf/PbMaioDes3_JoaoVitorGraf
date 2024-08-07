import mongoose from 'mongoose';

async function main() {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log('Conectou com o banco');
}

main().catch(err => err);

export default mongoose;
