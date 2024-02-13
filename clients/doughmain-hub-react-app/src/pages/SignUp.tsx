import { Card, Typography, TextField, Avatar, Box, Button } from '@mui/material'
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

export default function SignUp() {
  return (
    <Card raised={true} sx={{ width: '20%', margin: 'auto', padding: '2%' }}>
      <Avatar sx={{ margin: 'auto' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography variant="h4" align="center">
        Sign up
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
