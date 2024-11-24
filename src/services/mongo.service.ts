import dotenv from 'dotenv';
const { MongoClient, ServerApiVersion } = require('mongodb');
dotenv.config();

const MONGO_URL = process.env.MONGO_URL || ''
const client = new MongoClient(MONGO_URL, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
let db: any;
let lastConnectionTime: number | null = null;
const CONNECTION_TIMEOUT = 60 * 60 * 1000;

class MongoService {
    async connectToDatabase() {
      const currentTime = Date.now();
  
      if (db && lastConnectionTime && (currentTime - lastConnectionTime < CONNECTION_TIMEOUT)) {
          console.log('Using existing database connection');
          return db;
      }
    
      try {
          await client.connect();
          db = client.db("se121");
          lastConnectionTime = currentTime;
          console.log('Connected to database');
      } catch (error) {
          console.error('Could not connect to database', error);
          throw error;
      }
    
      return db;
    };
    async disconnectDatabase() {
      if (client) {
        await client.close();
        console.log('Disconnected from MongoDB');
       }

    }

    async getCollection(collectionName: string) {
      await this.connectToDatabase();
      return db.collection(collectionName);
    }
}
const mongoService = new MongoService();
export default mongoService;