import "dotenv/config";
import app from './app.js'
import connectDB from "./db/index.js"

const port = process.env.PORT;

connectDB()
.then(()=>{
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
})
.catch((error) => {
  console.error("Mongodb connection error ", error)
  process.exit(1)
})

