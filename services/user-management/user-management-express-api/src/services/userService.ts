import User from '../models/user'
import logger from '../config/winston'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth'
import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: process.env.USER_MANAGEMENT_EXPRESS_API_KEY,
  authDomain: process.env.USER_MANAGEMENT_EXPRESS_API_AUTH_DOMAIN,
  projectId: process.env.USER_MANAGEMENT_EXPRESS_API_PROJECT_ID,
  storageBucket: process.env.USER_MANAGEMENT_EXPRESS_API_STORAGE_BUCKET,
  messagingSenderId:
    process.env.USER_MANAGEMENT_EXPRESS_API_MESSAGING_SENDER_ID,
  appId: process.env.USER_MANAGEMENT_EXPRESS_API_APP_ID,
  measurementId: process.env.USER_MANAGEMENT_EXPRESS_API_MEASUREMENT_ID
}

initializeApp(firebaseConfig)
const auth = getAuth()

export const signUp = (user: User) => {
  logger.info(`Signing up user: ${user.email}`)
  createUserWithEmailAndPassword(auth, user.email, user.password!).catch(
    (error) => {
      let errorMessage = 'Error during user sign up.'
      if (error instanceof Error) errorMessage = error.message
      logger.error(errorMessage)
    }
  )
}

export const signIn = (user: User) => {
  logger.info(`Singing in user: ${user.email}`)
  signInWithEmailAndPassword(auth, user.email, user.password!).catch(
    (error) => {
      let errorMessage = 'Error during user sign in.'
      if (error instanceof Error) errorMessage = error.message
      logger.error(errorMessage)
    }
  )
}
