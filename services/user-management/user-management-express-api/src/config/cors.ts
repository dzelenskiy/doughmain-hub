import cors from 'cors'

const allowedOrigins = ['http://localhost:5173']

const corsOptions: cors.CorsOptions = {
  origin: allowedOrigins
}

export default cors(corsOptions)
