import { Link as RouterLink } from 'react-router-dom'
import {
  Card,
  Typography,
  TextField,
  Avatar,
  Box,
  FormControlLabel,
  Checkbox,
  Grid,
  Button,
  Link
} from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import LOGGER from '../../../lib/logger'
import { useForm } from 'react-hook-form'
import User from '../models/User'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

const schema = yup.object().shape({
  email: yup.string().required('A valid email is required to sign in.'),
  password: yup.string().required('A valid password is required to sign in.')
})

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<User>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const submitForm = (user: User) => {
    LOGGER.debug('SignIn submitForm called with User: ', user)
  }

  return (
    <Card raised={true} sx={{ width: '20%', margin: 'auto', padding: '2%' }}>
      <Box component="form" onSubmit={handleSubmit(submitForm)} sx={{ mt: 1 }}>
        <Avatar sx={{ margin: 'auto' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h4" align="center">
          Sign in
        </Typography>
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
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
        <Grid container>
          <Grid item xs>
            <Link component={RouterLink} to="/resetpassword" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link component={RouterLink} to="/signup" variant="body2">
              {"Don't have an account? Sign up!"}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Card>
  )
}
