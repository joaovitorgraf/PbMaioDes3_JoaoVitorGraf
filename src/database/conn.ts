import mongoose from 'mongoose';

async function main() {
    await mongoose.connect('mongodb://localhost:27017/desafio')
    console.log('Conectou com sucesso');

}

main().catch((err) => console.log(err));

export default mongoose;
