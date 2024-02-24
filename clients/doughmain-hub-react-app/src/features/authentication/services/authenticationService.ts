import { createAxiosInstance } from '../../../lib/axios'
import User from '../models/User'
import LOGGER from '../../../lib/logger'

const userManagementExpressApiV1Users =
  'http://localhost:9004/user-management-express-api/v1/users'

const axios = createAxiosInstance()

export async function signUpUser(user: User) {
  LOGGER.debug('authenticationService signUpUser called with user: ', user)
  await axios
    .post(userManagementExpressApiV1Users + '/signup', user)
    .then(function (response) {
      if (response.status != 201) {
        LOGGER.error(
          `authenticationService signUpUser returned status: ${response.status}`
        )
        return Promise.reject(
          `Received unexpected status ${response.status} during registration.`
        )
      }
    })
}

export async function signInUser(user: User) {
  LOGGER.debug('authenticationService signInUser called with user: ', user)
  await axios
    .post(userManagementExpressApiV1Users + '/signin', user)
    .then(function (response) {
      if (response.status != 200) {
        LOGGER.error(
          `authenticationService signInUser returned status: ${response.status}`
        )
        return Promise.reject(
          `Received unexpected status ${response.status} during signin.`
        )
      }
    })
}
