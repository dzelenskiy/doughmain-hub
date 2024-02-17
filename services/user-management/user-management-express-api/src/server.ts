import express from 'express'
import userRoute from './routes/userRoutes'
import logger from './config/winston'
import { initializeApp, applicationDefault } from 'firebase-admin/app'
import corsConfig from './config/cors'

const app = express()
app.use(corsConfig)
app.use(express.json())
app.use('/user-management-express-api/v1/users', userRoute)

const port = process.env.PORT || 9004
app.listen(port, () => {
  logger.info(`user-management-express-api listening on port ${port}`)
})

// email auth for signup: https://www.youtube.com/watch?v=F6LEKdQPSiM
// TODO: Add try-catch and logging
initializeApp({
  credential: applicationDefault()
})
