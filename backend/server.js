import dns from "dns";

dns.setServers([
    "8.8.8.8",
    "1.1.1.1"
]);


import app from './src/app.js';
import connectDB from './src/db/db.js';
import "dotenv/config";


connectDB();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 


