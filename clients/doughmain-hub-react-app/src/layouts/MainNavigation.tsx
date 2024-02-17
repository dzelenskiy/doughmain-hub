import * as React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from '../pages/Home'
import SignIn from '../features/authentication/pages/SignIn'
import SignUp from '../features/authentication/pages/SignUp'
import ResetPassword from '../features/authentication/pages/ResetPassword'
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import HomeIcon from '@mui/icons-material/Home'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'

export default function MainNavigation() {
  const [isDrawerOpen, setDrawerOpen] = React.useState(false)

  const toggleDrawer =
    (isDrawerOpen: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        (event as React.KeyboardEvent).key !== 'Escape'
      ) {
        return
      }
      setDrawerOpen(isDrawerOpen)
    }

  return (
    <BrowserRouter>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h2" sx={{ display: 'inline', ml: 'auto' }}>
            Doughmain Hub
          </Typography>
          <Button
            color="inherit"
            variant="outlined"
            component={Link}
            to="signin"
            sx={{ ml: 'auto' }}
          >
            Sign in
          </Button>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={isDrawerOpen}
        variant="temporary"
        onClick={toggleDrawer(false)}
        onClose={toggleDrawer(false)}
        ModalProps={{
          keepMounted: false
        }}
        PaperProps={{
          sx: { minWidth: '15%' }
        }}
      >
        <List>
          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <ChevronLeftIcon />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton component={Link} to="/">
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText>Home</ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  )
}
