const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
dotenv.config();
const routes = require('./routes.js');

const MONGO_URI = process.env.MONGO_URI;
const app = express();
const port = 3003;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', routes);

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log("Connected to MongoDB");
}

app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
});
