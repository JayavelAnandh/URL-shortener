import express from "express"
import { dataBaseConnection } from "./db.js"
import dotenv from "dotenv"
import { urlRoutes } from "./routes/urlshortener.js"
import bodyParser from "body-parser"
import { signupRouter } from "./routes/signupUser.js"
import { loginRouter } from "./routes/loginUser.js"
import { isAuthorized } from "./controllers/auth.js"

const app = express()

dotenv.config()
dataBaseConnection()

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/",(req,res)=>{
    res.send("Hi,Welcome")
})

app.use("/urlRoutes",isAuthorized,urlRoutes)
app.use("/signup",signupRouter)
app.use("/login",loginRouter)


app.listen(process.env.PORT)