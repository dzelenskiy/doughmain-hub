import User from '../models/user'
import logger from '../config/winston'
import Admin from 'firebase-admin'
import { UserRecord } from 'firebase-admin/auth'

const firebaseAdmin = Admin

export const signUp = (user: User): Promise<UserRecord> => {
  logger.info(`registering user: ${user.email}`)
  return firebaseAdmin.auth().createUser(user)
}
