// material-ui
import { Typography, Checkbox, FormControlLabel, FormGroup, TextField, Button, Grid, Box } from '@mui/material';
import { useState } from 'react';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import EventIcon from '@mui/icons-material/Event';
import LockIcon from '@mui/icons-material/Lock';
// project imports
import MainCard from 'ui-component/cards/MainCard';

// ==============================|| SAMPLE PAGE ||============================== //

const Suscription = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  return (
    <>
      <br />
      <br />
      <MainCard title="Membresia Platinum">
        <Typography variant="body2">Con esta membresia podrás tener consultas ilimitadas con tus pacientes.</Typography>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={isChecked} onChange={handleCheckboxChange} />}
            label="¿Deseas comprar la suscripción?"
          />
        </FormGroup>
        {isChecked && (
          <>
            <Box mt={2}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    id="outlined-basic"
                    label="Número de tarjeta"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    InputProps={{
                      startAdornment: <CreditCardIcon />
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    id="outlined-basic"
                    label="Fecha de vencimiento"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    InputProps={{
                      startAdornment: <EventIcon />
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    id="outlined-basic"
                    label="Código de seguridad"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    InputProps={{
                      startAdornment: <LockIcon />
                    }}
                  />
                </Grid>
              </Grid>
            </Box>
            <Box mt={2}>
              <Button variant="contained" color="primary" fullWidth>
                Pagar
              </Button>
            </Box>
          </>
        )}
      </MainCard>
    </>
  );
};

export default Suscription;
