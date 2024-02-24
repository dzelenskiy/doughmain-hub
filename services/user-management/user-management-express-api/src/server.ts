import express from 'express'
import logger from './config/winston'
import corsConfig from './config/cors'
import userRoute from './routes/userRoutes'

const app = express()
app.use(corsConfig)
app.use(express.json())
app.use('/user-management-express-api/v1/users', userRoute)

const port = process.env.PORT || 9004
app.listen(port, () => {
  logger.info(`user-management-express-api listening on port ${port}`)
})
