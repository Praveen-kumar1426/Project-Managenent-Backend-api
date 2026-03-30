import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
const app = express()

// cors configuration
app.use(cors({
    origin: process.env.CORS_ORIGIN?.split(",") || "http://localhost:5173",
    credentials:true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]
}))

app.use(express.json())
app.use(cookieParser())


// import the routes

import healthCheckRouter from './routes/healthcheck.routes.js'
import authRouter from "./routes/auth.routes.js"
import projectRouter from "./routes/project.routes.js"



app.use("/api/v1/healtcheck", healthCheckRouter)
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/project", projectRouter);


app.get('/',(req,res)=>{
    res.send('welcome to basecamp')
})
export default app