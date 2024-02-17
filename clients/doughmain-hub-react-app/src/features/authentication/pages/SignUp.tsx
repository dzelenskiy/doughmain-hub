import {
  Card,
  Typography,
  TextField,
  Avatar,
  Box,
  Button,
  FormHelperText
} from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import LOGGER from '../../../lib/logger'
import { useForm } from 'react-hook-form'
import User from '../models/User'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { signUpUser } from '../services/authenticationService'
import { useState } from 'react'

const schema = yup.object().shape({
  email: yup.string().required('A valid email is required to sign up.'),
  password: yup.string().required('A password is required to sign up.')
})

export default function SignUp() {
  const [signUpStatusMessage, setSignUpStatusMessage] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<User>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const submitForm = async (user: User) => {
    LOGGER.debug('SignUp submitForm called with User: ', user)
    try {
      await signUpUser(user)
    } catch (error) {
      let signUpErrorMessage =
        'There was an unexpected error during sign up, please try again later.'
      LOGGER.debug(signUpErrorMessage)
      if (error instanceof Error) {
        signUpErrorMessage = error.message
      }
      setSignUpStatusMessage(signUpErrorMessage)
    }
  }

  return (
    <Card raised={true} sx={{ width: '20%', margin: 'auto', padding: '2%' }}>
      <Box component="form" onSubmit={handleSubmit(submitForm)} sx={{ mt: 1 }}>
        <Avatar sx={{ margin: 'auto' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h4" align="center">
          Sign up
        </Typography>
        <FormHelperText>{signUpStatusMessage}</FormHelperText>
        <TextField
          margin="normal"
          fullWidth
          id="email"
          label="Email Address"
          autoComplete="email"
          autoFocus
          {...register('email')}
          error={!!errors.email}
          helperText={!!errors.email && errors.email.message}
        />
        <TextField
          margin="normal"
          fullWidth
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          {...register('password')}
          error={!!errors.password}
          helperText={!!errors.password && errors.password.message}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign up
        </Button>
      </Box>
    </Card>
  )
}
