'use client';

import { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton, 
  Drawer, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemIcon,
  Box,
  useMediaQuery,
  useTheme
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import InfoIcon from '@mui/icons-material/Info';
import Link from 'next/link';

const menuItems = [
  { text: '首页', href: '/', icon: <HomeIcon /> },
  { text: '仪表盘', href: '/dashboard', icon: <DashboardIcon /> },
  { text: '个人资料', href: '/profile', icon: <PersonIcon /> },
  { text: '关于', href: '/about', icon: <InfoIcon /> },
];

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const toggleDrawer = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const drawer = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {menuItems.map((item) => (
          <ListItem disablePadding sx={{ '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' } }} key={item.text} component={Link} href={item.href}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar position="static">
      <Toolbar>
        {isMobile && (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Next.js应用
        </Typography>
        {!isMobile && (
          <Box>
            {menuItems.map((item) => (
              <Button 
                color="inherit" 
                key={item.text} 
                component={Link} 
                href={item.href}
                sx={{ ml: 1 }}
              >
                {item.text}
              </Button>
            ))}
          </Box>
        )}
      </Toolbar>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
}