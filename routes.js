import express from 'express';
const router = express.Router();
import { MongoClient } from 'mongodb';
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

router.post('/search_books', async (req, res) => {
    console.log(req.body.query);
    
      const query = req.body.query; // Replace with your query.
      const url = process.env.MONGO_URI; // Replace with your MongoDB url.
      const client = new MongoClient(MONGO_URI);
      
      try {
          await client.connect();
          
          const db = client.db('bookstore'); // Replace with your database name.
          const collection = db.collection('goodreads'); // Replace with your collection name.
          
          // Query for similar documents.
          try {
            const documents = await collection.aggregate([
              {
              "$search": {
              "index": "default",
              "text": {
                "query": query,
                "path": "title",
              }
              }
            }
              ]);
          
          res.send(documents);
          } catch (error) {
            res.send(error);
          }
          
      } finally {
          await client.close();
      }
  });

export default router;

