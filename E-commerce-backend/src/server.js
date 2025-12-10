require('dotenv').config();
const app = require(".");
const connectDb = require("./config/db");
const cors = require('cors'); 


app.use(cors({
  origin: ['https://e-commerce-frontend-pi-ochre.vercel.app/','http://localhost:5173/'],
  
  credentials: true
}));

const PORT = process.env.PORT || 9000;

app.listen(PORT, async () => {
  await connectDb();
  console.log(`Server is running on port ${PORT}`);
});
