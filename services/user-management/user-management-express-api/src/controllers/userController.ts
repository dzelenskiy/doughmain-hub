import logger from '../config/winston'
import { Request, RequestHandler, Response } from 'express'
import { signUp, signIn } from '../services/userService'

export const signUpUser: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    await signUp(req.body)
    res.status(201).json({ message: 'Signed up succefully!' })
  } catch (error) {
    let errorMessage = 'unknown error'
    if (error instanceof Error) errorMessage = error.message
    logger.error('An error occurred during signup:', errorMessage)
    res.status(500).json({ message: 'An error occurred during signup' })
  }
}

export const signInUser: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    await signIn(req.body)
    res.status(200).json({ message: 'Signed in succefully!' })
  } catch (error) {
    let errorMessage = 'unknown error'
    if (error instanceof Error) errorMessage = error.message
    logger.error('An error occurred during signin:', errorMessage)
    res.status(401).json({ message: 'Sign in unsuccessful' })
  }
}
