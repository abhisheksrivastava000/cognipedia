import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './auth/AuthContext';
import { fetchProfile, fetchNumberOfWiki, fetchCurrentPlan, fetchExpirationDate, fetchPayInfo } from './api';
import {
  AppBar, Box, Button, Card, CardContent, CssBaseline, Drawer, Grid, List, ListItem, ListItemButton,
  ListItemIcon, ListItemText, Toolbar, Typography, CircularProgress
} from '@mui/material';
import {
  Dashboard as DashboardIcon, LibraryBooks as LibraryIcon, Description as WikiIcon, AccountCircle as ProfileIcon,
  CreditCard as PayIcon, Event as ExpirationIcon, Subject as PlanIcon, Home as HomeIcon, ExitToApp as LogoutIcon
} from '@mui/icons-material';

const drawerWidth = 240;

const Dashboard: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [numWiki, setNumWiki] = useState<number | null>(null);
  const [plan, setPlan] = useState<string>('');
  const [expiration, setExpiration] = useState<string>('');
  const [pay, setPay] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileData, wikiData, planData, expirationData, payData] = await Promise.all([
          fetchProfile(),
          fetchNumberOfWiki(),
          fetchCurrentPlan(),
          fetchExpirationDate(),
          fetchPayInfo(),
        ]);
        setProfile(profileData);
        setNumWiki(wikiData);
        setPlan(planData);
        setExpiration(expirationData);
        setPay(payData);
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  const drawer = (
    <div>
      <Toolbar>
        <Typography variant="h6" noWrap component="div" sx={{ display: 'flex', alignItems: 'center' }}>
          <HomeIcon sx={{ mr: 2 }} />
          Cognipedia
        </Typography>
      </Toolbar>
      <List>
        {['Dashboard', 'Wiki', 'Library'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index === 0 ? <DashboardIcon /> : index === 1 ? <WikiIcon /> : <LibraryIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const dashboardItems = [
    { title: 'Profile', data: profile ? `${profile.name}` : '', icon: <ProfileIcon fontSize="large" /> },
    { title: 'Number of Wikis', data: numWiki, icon: <LibraryIcon fontSize="large" /> },
    { title: 'Current Plan', data: plan, icon: <PlanIcon fontSize="large" /> },
    { title: 'Expiration Date', data: expiration, icon: <ExpirationIcon fontSize="large" /> },
    { title: 'Payment', data: pay ? `${pay.amount} (${pay.status})` : '', icon: <PayIcon fontSize="large" /> },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" noWrap component="div">
            Dashboard
          </Typography>
          <Button color="inherit" onClick={logout} startIcon={<LogoutIcon />}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        {drawer}
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, background: '#f5f5f5', minHeight: '100vh' }}>
        <Toolbar />
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={3}>
            {dashboardItems.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card sx={{ width: '100%' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      {item.icon}
                      <Typography variant="h5" component="div" sx={{ ml: 2 }}>
                        {item.title}
                      </Typography>
                    </Box>
                    <Typography variant="h4" color="text.secondary">
                      {item.data}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default Dashboard; 