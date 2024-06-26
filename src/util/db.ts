import mongoose from 'mongoose';

let isConnected: boolean = false;

const connectToDatabase = async (): Promise<void> => {
  if (isConnected) {
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI as string, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });

    isConnected = db.connections[0].readyState === 1;
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

export default connectToDatabase;
