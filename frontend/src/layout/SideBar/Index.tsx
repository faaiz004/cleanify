import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DeleteIcon from '@mui/icons-material/Delete';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import NotificationsIcon from '@mui/icons-material/Notifications';
import GroupIcon from '@mui/icons-material/Group';
import BuildIcon from '@mui/icons-material/Build';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';
import SupportIcon from '@mui/icons-material/Support';
import LogoutIcon from '@mui/icons-material/Logout';
import CleanifyLogo from '../../assets/CleanifyLogo.jpeg';
import { Img } from 'react-image';
import { dividerStyle } from './Styles.tsx';
import { clearUser } from '../../redux/userSlice';
import { useDispatch} from 'react-redux';
import ControlledOpenSelect from '../../components/Select/Index';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@mui/material';
import { getLocation } from '../../services/Location/Index';
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


export interface LocationObj {
  center: string;
  id: string;
  name: string;
  radius: Number;
}

const drawerWidth = 300;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function SideBar() {
  const theme = useTheme();
  const navigate = useNavigate();


  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();

  const handleClick = (text:string) => {
    if(text == "Logout"){
      dispatch(clearUser());
    } 
    else if (text == "Bins"){
      navigate('/containeroverview');
    }
  }


   // Query for fetching locations
   const { data: allLocation = [], isLoading, error } = useQuery({
    queryKey: ['locations'],
    queryFn: () => getLocation(),
    staleTime: Infinity, // Prevents refetching
   });


  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar sx = {{backgroundColor: '#6B9AB6', height: '80px', display: 'flex', gap: '30px'}}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx ={{cursor: 'pointer'}}>
            Overview
          </Typography>
          <Typography variant="h6" noWrap component="div" sx ={{cursor: 'pointer'}}>
            Bins
          </Typography>
          <Typography variant="h6" noWrap component="div" sx ={{cursor: 'pointer', flexGrow:1}}>
            Vehicles
            </Typography>
          {
            // Add the ControlledOpenSelect component here
            isLoading ? (
              <>
                <Skeleton variant="rectangular" width={150} height={30} />
              </>
            ) : (
              error ? (
                <Typography variant="h6" noWrap component="div" sx ={{cursor: 'pointer'}}>
                  Something went wrong
                </Typography>
              ) : (
                (
                  <ControlledOpenSelect options = {allLocation} />
                )
              )
            )
          }
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#DAEEF5',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>

        {/* Add Cleanify Logo */}
        <Img
          src={CleanifyLogo}
          alt="Cleanify Logo"
          style={{ width: '80%', height: 'auto', padding: '10px', marginLeft: 'auto', marginRight: 'auto' }}
        />

        <Box sx = {dividerStyle } />

        <List>
          {[
            { text: 'Dashboard', icon: <DashboardIcon /> },
            { text: 'Bins', icon: <DeleteIcon /> },
            { text: 'Fleet Management', icon: <DirectionsCarIcon /> },
            { text: 'Notifications', icon: <NotificationsIcon /> },
            { text: 'User Management', icon: <GroupIcon /> },
            { text: 'Operation Management', icon: <BuildIcon /> },
            { text: 'Analytics', icon: <BarChartIcon /> },
          ].map((item, index) => (
            <ListItem key={index} disablePadding sx={{ marginLeft: '5px' }}>
              <ListItemButton onClick={() => handleClick(item.text)} >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Box sx = {dividerStyle } />

        <List>
          {[
            { text: 'Settings', icon: <SettingsIcon /> },
            { text: 'Support', icon: <SupportIcon /> },
            { text: 'Logout', icon: <LogoutIcon /> },
          ].map((item, index) => (
            <ListItem key={index} disablePadding sx={{ marginLeft: '5px' }}>
              <ListItemButton onClick={() => handleClick(item.text)}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main open={open} sx ={{
        backgroundColor: '#f5f5f5',
      }}>
        <DrawerHeader />
        {/* Add your main content here */}
        <Outlet />
      </Main>
    </Box>
  );
}