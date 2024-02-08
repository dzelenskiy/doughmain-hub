import logger from '../config/winston'
import { Request, RequestHandler, Response } from 'express'
import { signUp } from '../services/userService'

export const signUpUser: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    res.status(201).json(await signUp(req.body))
  } catch (error) {
    let errorMessage = 'unknown error'
    if (error instanceof Error) errorMessage = error.message
    logger.error('An error occurred during signup:', errorMessage)
    res.status(500).json('An error occurred during signup.')
  }
}
