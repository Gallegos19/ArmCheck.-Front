import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import io from 'socket.io-client';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import {
  Avatar,
  Button,
  Card,
  CardContent,
  Grid,
  Input,
  LinearProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  linearProgressClasses
} from '@mui/material';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 30,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: '#fff'
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.primary.main
  }
}));

const CardStyle = styled(Card)(({ theme }) => ({
  background: theme.palette.primary.light,
  marginBottom: '22px',
  overflow: 'hidden',
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    width: '157px',
    height: '157px',
    background: theme.palette.primary[200],
    borderRadius: '50%',
    top: '-105px',
    right: '-96px'
  }
}));

function LinearProgressWithLabel({ value, ...others }) {
  const theme = useTheme();

  return (
    <Grid container direction="column" spacing={1} sx={{ mt: 1.5 }}>
      <Grid item>
        <Grid container justifyContent="space-between">
          <Grid item>
            <Typography variant="h6" sx={{ color: theme.palette.primary[800] }}>
              Progress
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6" color="inherit">{`${Math.round(value)}%`}</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <BorderLinearProgress variant="determinate" value={value} {...others} />
      </Grid>
    </Grid>
  );
}

LinearProgressWithLabel.propTypes = {
  value: PropTypes.number
};

const MenuCard = () => {
  const theme = useTheme();
  const [inputValue, setInputValue] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const isConnected = localStorage.getItem('connected') === 'true';
    setConnected(isConnected);
  }, []);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };                     

  const handleSubmit = () => {
    if (inputValue.trim() !== '') {
      const socket = io('http://34.238.54.29:3001');
      setIsValid(true);
      socket.on('connect', () => {
        console.log('Connected to socket.io server');
        setConnected(true);
        localStorage.setItem('connected', 'true');
        socket.emit('joinRoom', inputValue);
      });
      socket.on('disconnect', () => {
        console.log('Disconnected from socket.io server');
        setConnected(false);
        localStorage.setItem('connected', 'false');
        socket.disconnect();
      });
      socket.on('error', (error) => {
        console.error('Socket.io error:', error);
        setConnected(false);
      });
    } else {
      console.error('Invalid input');
    }
  };

  return (
    <>
      <CardStyle style={{ marginBottom: '5%' }}>
        <CardContent sx={{ p: 2 }}>
          <List sx={{ p: 0, m: 0 }}>
            <ListItem alignItems="flex-start" disableGutters sx={{ p: 0 }}>
              <ListItemAvatar sx={{ mt: 0 }}>
                <Avatar
                  variant="rounded"
                  sx={{
                    ...theme.typography.commonAvatar,
                    ...theme.typography.largeAvatar,
                    color: theme.palette.primary.main,
                    border: 'none',
                    borderColor: theme.palette.primary.main,
                    background: '#fff',
                    marginRight: '12px'
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-router"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="#00abfb"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M3 13m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v4a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" />
                    <path d="M17 17l0 .01" />
                    <path d="M13 17l0 .01" />
                    <path d="M15 13l0 -2" />
                    <path d="M11.75 8.75a4 4 0 0 1 6.5 0" />
                    <path d="M8.5 6.5a8 8 0 0 1 13 0" />
                  </svg>
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                sx={{ mt: 1.5 }}
                primary={
                  <Typography variant="subtitle1" sx={{ color: theme.palette.primary[800] }}>
                    {connected ? 'Conectado' : 'Desconectado'}
                  </Typography>
                }
              />
            </ListItem>
          </List>
          {connected ? <LinearProgressWithLabel value={100} /> : <LinearProgressWithLabel value={0} />}
        </CardContent>
      </CardStyle>
      <br />
      {!connected && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
          <Input placeholder="Ingrese código de sala" value={inputValue} onChange={handleInputChange} style={{ textAlign: 'center' }} />
          <Button onClick={handleSubmit}>Enviar</Button>
          {!isValid && (
            <Typography variant="caption" color="error">
              Ingrese un código válido
            </Typography>
          )}
        </div>
      )}
    </>
  );
};

export default MenuCard;
