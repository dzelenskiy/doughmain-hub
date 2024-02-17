import { createAxiosInstance } from '../../../lib/axios'
import User from '../models/User'
import LOGGER from '../../../lib/logger'

const url = 'http://localhost:9004/user-management-express-api/v1/users/signup'

const axios = createAxiosInstance()

export async function signUpUser(user: User) {
  LOGGER.debug('authenticationService registerUser called with user: ', user)
  await axios.post(url, user).then(function (response) {
    if (response.status != 201) {
      LOGGER.error(
        `authenticationService registerUser returned status: ${response.status}`
      )
      return Promise.reject(
        `Received unexpected status ${response.status} during registration.`
      )
    }
  })
}
