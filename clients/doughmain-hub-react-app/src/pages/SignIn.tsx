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
import LOGGER from '../lib/logger'

const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault()
  const data = new FormData(event.currentTarget)
  LOGGER.info({
    email: data.get('email'),
    password: data.get('password')
  })
}

export default function SignIn() {
  return (
    <Card raised={true} sx={{ width: '20%', margin: 'auto', padding: '2%' }}>
      <Avatar sx={{ margin: 'auto' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography variant="h4" align="center">
        Sign in
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
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
