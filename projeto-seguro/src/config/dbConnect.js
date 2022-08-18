import mongoose from 'mongoose'

mongoose.connect('mongodb+srv://flavio:123@cluster0.3l66vbb.mongodb.net/seguro-vida')

let db = mongoose.connection;

export default db;