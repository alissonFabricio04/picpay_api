import express, { Router } from "express"
import cors from "cors"

export const routes = Router()

const app = express()

app.use(cors({
  origin: "http:localhost:3000"
})) // see

app.use(express.json())
app.use(routes)

app.listen(3000, () => {
  console.log(`Server is running!`)
})