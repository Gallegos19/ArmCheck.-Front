import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
  useMediaQuery
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import useScriptRef from 'hooks/useScriptRef';
import Google from 'assets/images/icons/social-google.svg';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { strengthColor, strengthIndicator } from 'utils/password-strength';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// ===========================|| FIREBASE - REGISTER ||=========================== //

const FirebaseRegister = ({ ...others }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const scriptedRef = useScriptRef();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const customization = useSelector((state) => state.customization);
  const [showPassword, setShowPassword] = useState(false);
  const [checked, setChecked] = useState(true);

  const [strength, setStrength] = useState(0);
  const [level, setLevel] = useState();
  const [bandera, setBandera] = useState(false);

  const googleHandler = async () => {
    console.error('Register');
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setStrength(temp);
    setLevel(strengthColor(temp));
  };

  const handleRegister = async (values) => {
    console.log(values);
    // Verificar si todos los campos obligatorios están llenos
    if (!values.email || !values.password || !values.fname || !values.lname || !values.lespecialidad) {
      setBandera(true);
      console.error('Todos los campos son obligatorios');
      return;
    }

    // Verificar si el checkbox de acuerdo con los términos y condiciones está marcado
    if (!checked) {
      setBandera(true);
      console.error('Debe aceptar los términos y condiciones');
      return;
    }
    const user = {
      correo: values.email,
      contrasena: values.password,
      nombre: values.fname,
      apellido: values.lname,
      especialidad: values.lespecialidad
    };

    try {
      const response = await fetch('http://localhost:3001/api/auth/register', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        console.log('Error al crear usuario' + response.message);
        return;
      }

      // Leer y almacenar el token de la respuesta
      navigate('/pages/login/login3');
      setBandera(false);
    } catch {
      console.log('Error al iniciar sesión:');
    }
  };

  useEffect(() => {
    changePassword('123456');
  }, []);

  return (
    <>
      <Grid container direction="column" justifyContent="center" spacing={1}>
        <Grid item xs={12}>
          <AnimateButton>
            <Button
              variant="outlined"
              fullWidth
              onClick={googleHandler}
              size="large"
              sx={{
                color: 'grey.700',
                backgroundColor: theme.palette.grey[50],
                borderColor: theme.palette.grey[100]
              }}
            >
              <Box sx={{ mr: { xs: 1, sm: 2, width: 20 } }}>
                <img src={Google} alt="google" width={16} height={16} style={{ marginRight: matchDownSM ? 8 : 16 }} />
              </Box>
              Registrarse con Google
            </Button>
          </AnimateButton>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ alignItems: 'center', display: 'flex' }}>
            <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
            <Button
              variant="outlined"
              sx={{
                cursor: 'unset',
                m: 2,
                py: 0.5,
                px: 7,
                borderColor: `${theme.palette.grey[100]} !important`,
                color: `${theme.palette.grey[900]}!important`,
                fontWeight: 500,
                borderRadius: `${customization.borderRadius}px`
              }}
              disableRipple
              disabled
            >
              O
            </Button>
            <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
          </Box>
        </Grid>
        <Grid item xs={12} container alignItems="center" justifyContent="center">
          <Box sx={{ mb: 1 }}>
            <Typography variant="subtitle1">Regístrese con dirección de correo electrónico</Typography>
          </Box>
        </Grid>
      </Grid>

      <Formik
        initialValues={{
          email: '',
          password: '',
          fname: '', // Agregado: estado para el campo de nombre
          lname: '', // Agregado: estado para el campo de apellido
          submit: null,
          lespecialidad: ''
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('El correo debe ser valido').max(255).required('Correo requerido'),
          password: Yup.string().max(255).required('Contraseña requerida'),
          fname: Yup.string().max(255).required('Nombre requerido'), // Agregado: validación para el campo de nombre
          lname: Yup.string().max(255).required('Apellido requerido'), // Agregado: validación para el campo de apellido
          lespecialidad: Yup.string().max(255).required('Especialidad requerido') // Agregado: validación para el campo de especialidad
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          handleRegister(values);
          try {
            if (scriptedRef.current) {
              setStatus({ success: true });
              setSubmitting(false);
            }
          } catch (err) {
            console.error(err);
            if (scriptedRef.current) {
              setStatus({ success: false });
              setErrors({ submit: err.message });
              setSubmitting(false);
            }
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit} {...others}>
            <Grid container spacing={matchDownSM ? 0 : 1}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Nombres"
                  margin="normal"
                  name="fname"
                  type="text"
                  value={values.fname} // Actualiza el valor del campo de nombre
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={Boolean(touched.fname && errors.fname)} // Agregado: manejo de errores para el campo de nombre
                  helperText={touched.fname && errors.fname} // Agregado: mensaje de error para el campo de nombre
                  sx={{ ...theme.typography.customInput }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Apellidos"
                  margin="normal"
                  name="lname"
                  type="text"
                  value={values.lname} // Actualiza el valor del campo de apellido
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={Boolean(touched.lname && errors.lname)} // Agregado: manejo de errores para el campo de apellido
                  helperText={touched.lname && errors.lname} // Agregado: mensaje de error para el campo de apellido
                  sx={{ ...theme.typography.customInput }}
                />
              </Grid>
            </Grid>
            <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-email-register">Correo</InputLabel>
              <OutlinedInput
                id="outlined-adornment-email-register"
                type="email"
                value={values.email}
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                inputProps={{}}
              />
              {touched.email && errors.email && (
                <FormHelperText error id="standard-weight-helper-text--register">
                  {errors.email}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-password-register">Contraseña</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password-register"
                type={showPassword ? 'text' : 'password'}
                value={values.password}
                name="password"
                label="Password"
                onBlur={handleBlur}
                onChange={(e) => {
                  handleChange(e);
                  changePassword(e.target.value);
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="large"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                inputProps={{}}
              />
              {touched.password && errors.password && (
                <FormHelperText error id="standard-weight-helper-text-password-register">
                  {errors.password}
                </FormHelperText>
              )}
            </FormControl>

            {strength !== 0 && (
              <FormControl fullWidth>
                <Box sx={{ mb: 2 }}>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item>
                      <Box style={{ backgroundColor: level?.color }} sx={{ width: 85, height: 8, borderRadius: '7px' }} />
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1" fontSize="0.75rem">
                        {level?.label}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </FormControl>
            )}

            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                label="Especialidad"
                margin="normal"
                name="lespecialidad"
                type="text"
                value={values.lespecialidad} // Actualiza el valor del campo de apellido
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(touched.lespecialidad && errors.lespecialidad)} // Agregado: manejo de errores para el campo de apellido
                helperText={touched.lespecialidad && errors.lespecialidad} // Agregado: mensaje de error para el campo de apellido
                sx={{ ...theme.typography.customInput }}
              />
            </Grid>
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <FormControlLabel
                  control={
                    <Checkbox checked={checked} onChange={(event) => setChecked(event.target.checked)} name="checked" color="primary" />
                  }
                  label={
                    <Typography variant="subtitle1">
                      De acuerdo con los&nbsp;
                      <Typography variant="subtitle1" component={Link} to="#">
                        Terminos y Condiciones.
                      </Typography>
                    </Typography>
                  }
                />
              </Grid>
            </Grid>
            {errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}
            {bandera && <FormHelperText error>Todos los campos son requeridos</FormHelperText>}
            <Box sx={{ mt: 2 }}>
              <AnimateButton>
                <Button
                  disableElevation
                  disabled={isSubmitting}
                  onClick={handleRegister}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  color="secondary"
                >
                  Registrarse
                </Button>
              </AnimateButton>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default FirebaseRegister;
