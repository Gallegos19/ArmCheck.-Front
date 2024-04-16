import React, { useEffect } from 'react';
import { useTheme, styled } from '@mui/material/styles';
import {
  Avatar,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Typography
} from '@mui/material';
import { IconMailbox } from '@tabler/icons';

// styles
const ListItemWrapper = styled('div')(({ theme }) => ({
  cursor: 'pointer',
  padding: 16,
  '&:hover': {
    background: theme.palette.primary.light
  },
  '& .MuiListItem-root': {
    padding: 0
  }
}));

// Sample notification data 
const notifications = [
  {
    id: 1,
    icon: <IconMailbox stroke={1.5} size="1.3rem" />,
    primaryText: 'Paciente Creado.',
    secondaryText: 'All done! Now check your inbox as you\'re in for a sweet treat!',
    
  },
  {
    id: 2,
    icon: <IconMailbox stroke={1.5} size="1.3rem" />,
    primaryText: 'Check Your Mail.',
    secondaryText: 'All done! Now check your inbox as you\'re in for a sweet treat!',
    
  },
  {
    id: 3,
    icon: <IconMailbox stroke={1.5} size="1.3rem" />,
    primaryText: 'Check Your Mail.',
    secondaryText: 'All done! Now check your inbox as you\'re in for a sweet treat!',
    
  }
  // Add more notifications here if needed
];

const NotificationList = () => {
  const theme = useTheme();

  useEffect(() => {
    // Guardar las notificaciones en el almacenamiento local
    localStorage.setItem('notifications', JSON.stringify(notifications.length));
  }, []); // Se ejecuta solo una vez al montar el componente

  return (
    <List
      sx={{
        width: '100%',
        maxWidth: 330,
        py: 0,
        borderRadius: '10px',
        [theme.breakpoints.down('md')]: {
          maxWidth: 300
        },
        '& .MuiListItemSecondaryAction-root': {
          top: 22
        },
        '& .MuiDivider-root': {
          my: 0
        },
        '& .list-container': {
          pl: 7
        }
      }}
    >
      {notifications.map(notification => (
        <React.Fragment key={notification.id}>
          <ListItemWrapper>
            <ListItem alignItems="center">
              <ListItemAvatar>
                <Avatar
                  sx={{
                    color: theme.palette.primary.dark,
                    backgroundColor: theme.palette.primary.light,
                    border: 'none',
                    borderColor: theme.palette.primary.main
                  }}
                >
                  {notification.icon}
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={<Typography variant="subtitle1">{notification.primaryText}</Typography>} />
              <ListItemSecondaryAction>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Typography variant="caption" display="block" gutterBottom>
                      2 min ago
                    </Typography>
                  </Grid>
                </Grid>
              </ListItemSecondaryAction>
            </ListItem>
            <Grid container direction="column" className="list-container">
              <Grid item xs={12} sx={{ pb: 2 }}>
                <Typography variant="subtitle2">{notification.secondaryText}</Typography>
              </Grid>
              {/* <Grid item xs={12}>
                <Grid container>
                  <Grid item>
                    <Button variant="contained" disableElevation endIcon={<IconBrandTelegram stroke={1.5} size="1.3rem" />}>
                      {notification.buttonText}
                    </Button>
                  </Grid>
                </Grid>
              </Grid> */}
            </Grid>
          </ListItemWrapper>
          <Divider />
        </React.Fragment>
      ))}
    </List>
  );
};

export default NotificationList;
