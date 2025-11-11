// db.ts - CONEXIÓN MEJORADA
import mongoose from 'mongoose';

export default async function db() {
    if(mongoose.connection.readyState >= 1){
        return;
    }
    
    try {
        await mongoose.connect(process.env.DATABASE as string, {
            serverSelectionTimeoutMS: 10000, // 10 segundos máximo
            socketTimeoutMS: 45000, // 45 segundos para operaciones
            maxPoolSize: 10,
            retryWrites: true,
            retryReads: true
        });
        console.log('✅ Database Connected');
        
        // Manejar eventos de conexión
        mongoose.connection.on('error', (error) => {
            console.error('❌ MongoDB connection error:', error);
        });
        
        mongoose.connection.on('disconnected', () => {
            console.log('🔌 MongoDB disconnected');
        });
        
    } catch(error) {
        console.error('❌ Database connection error:', error);
        throw error; // Propagar el error para manejo superior
    }
}