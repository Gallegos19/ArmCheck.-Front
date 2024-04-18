import { useState, useEffect } from 'react';
import { Typography, Checkbox, FormControlLabel, FormGroup, TextField, Button, Grid, Box } from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import EventIcon from '@mui/icons-material/Event';
import LockIcon from '@mui/icons-material/Lock';
import MainCard from 'ui-component/cards/MainCard';

const Suscription = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [paymentError, setPaymentError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [membershipActive, setMembershipActive] = useState(false); 

  useEffect(() => {
    const isMembershipActive = localStorage.getItem('membershipActive');
    if (isMembershipActive === 'true') {
      setMembershipActive(true);
    }
  }, []);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
    setPaymentSuccess(false);
  };

  const handlePay = async () => {
    try {
      const cardNumber = document.getElementById('cardNumber').value;
      const expiryDate = document.getElementById('expiryDate').value;
      const securityCode = document.getElementById('securityCode').value;

      if (!cardNumber || !expiryDate || !securityCode) {
        throw new Error('Por favor, complete todos los campos.');
      }

      const cardNumberPattern =
        /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|6(?:011|5[0-9]{2})[0-9]{12})$/;

      if (!cardNumberPattern.test(cardNumber)) {
        throw new Error('Por favor, ingrese un número de tarjeta válido.');
      }

      if (securityCode.length !== 3) {
        throw new Error('Por favor, ingrese un CVV válido.');
      }

      const data = JSON.parse(localStorage.getItem('data'));

      if (!data || !data.id_especialista) {
        throw new Error('No se encontró el ID del especialista en los datos del localStorage.');
      }

      const id_especialista = data.id_especialista;

      const payData = {
        id_especialista: id_especialista,
        numero_tarjeta: parseInt(cardNumber),
        cvv: parseInt(securityCode),
        fecha_vencimiento: expiryDate
      };

      const response = await fetch('http://localhost:3003/api/pagos/', {
        method: 'POST',
        body: JSON.stringify(payData),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('data').token}`
        }
      });

      if (!response.ok) {
        throw new Error('Error al procesar el pago.');
      }

      const responseData = await response.json();
      setPaymentSuccess(true);
      setMembershipActive(true);
      console.log('Pago exitoso:', responseData);
      localStorage.setItem('membershipActive', 'true');
      
    } catch (error) {
      setPaymentError(error.message);
      console.error('Error durante el pago:', error);
    }
  };

  return (
    <>
      <br />
      <br />
      <MainCard title="Membresia Platinum">
        {paymentSuccess || membershipActive ? (
          <Typography variant="body2">¡Tu membresía de pagos está activa!</Typography>
        ) : (
          <>
            <Typography variant="body2">Con esta membresía podrás tener consultas ilimitadas con tus pacientes.</Typography>
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
                        id="cardNumber"
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
                        id="expiryDate"
                        label="Fecha de vencimiento"
                        type="date"
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
                        id="securityCode"
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
                  <Button variant="contained" color="primary" fullWidth onClick={handlePay}>
                    Pagar
                  </Button>
                  {paymentError && (
                    <Typography variant="body2" color="error" align="center">
                      {paymentError}
                    </Typography>
                  )}
                </Box>
              </>
            )}
          </>
        )}
      </MainCard>
    </>
  );
};

export default Suscription;
