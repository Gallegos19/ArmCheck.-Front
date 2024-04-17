import { useState } from 'react';
//import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import * as Yup from 'yup';
import { Formik } from 'formik';
// project imports
import MainCard from 'ui-component/cards/MainCard';
// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  //Checkbox,
  //Divider,
  Select,
  FormControl,
  //FormControlLabel,
  FormHelperText,
  //Grid,
  //IconButton,
  //InputAdornment,
  //FormControlLabel,
  //Checkbox,
  MenuItem,
  InputLabel,
  OutlinedInput,
  //Stack,
  Typography,
  useMediaQuery
} from '@mui/material';

// project imports
import useScriptRef from 'hooks/useScriptRef';
import AnimateButton from 'ui-component/extended/AnimateButton';
// assets
//import Visibility from '@mui/icons-material/Visibility';
//import VisibilityOff from '@mui/icons-material/VisibilityOff';

const AddPatient = ({ ...others }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const scriptedRef = useScriptRef();
  const [bandera, setBandera] = useState(false);
  //const [hasChronicDisease, setHasChronicDisease] = useState(false);

  // ==============================|| SAMPLE PAGE ||============================== //
  const handleLogin = (values) => {
    console.log(values);
    // Verificar si todos los campos obligatorios están llenos
    if (!values.nombre || !values.apellido || !values.edad || !values.genero || !values.altura || !values.peso) {
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

    console.log('Registrado');
    setBandera(false);
    navigate('/dashboard/default');
  };
  return (
    <>
      <br />
      <br />
      <MainCard title="Agregar Nuevo Paciente">
        <Typography variant="body2">Ingrese los datos del paciente</Typography>
        <Formik
          initialValues={{
            email: '',
            password: '',
            nombre: '',
            apellido: '',
            edad: '',
            altura: '',
            peso: '',
            genero: '',
            enfermedad: '',
            descripcion: '',
            submit: null
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string().email('El correo debe ser valido').max(255).required('Nombre del paciente es requerido'),
            password: Yup.string().max(255).required('Edad del paciente es requerido'),
            peso: Yup.number().positive('El peso debe ser un valor positivo').max(255).required('Peso del paciente es requerido'),
            edad: Yup.number().positive('La edad debe ser un valor positivo').max(255).required('Edad del paciente es requerido'),
            altura: Yup.number().positive('La altura debe ser un valor positivo').max(255).required('Altura del paciente es requerido'),
            apellido: Yup.string().max(255).required('Apellido del paciente es requerido'),
            nombre: Yup.string().max(255).required('Nombre del paciente es requerido'),
            genero: Yup.string().required('Género del paciente es requerido'),
            enfermedad: Yup.string().max(255).required('Enfermedad del paciente es requerido'),
            descripcion: Yup.string().max(255).required('Enfermedad del paciente es requerido')
          })}
          onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
            handleLogin(values);
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
              <div style={{ display: 'flex', flexDirection: 'row', width: '100%', gap: '1%', flexWrap: isSmallScreen ? 'wrap' : 'nowrap' }}>
                <FormControl fullWidth error={Boolean(touched.nombre && errors.nombre)} sx={{ ...theme.typography.customInput }}>
                  <InputLabel htmlFor="outlined-adornment-nombre">Nombres </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-nombre"
                    type="text"
                    value={values.nombre}
                    name="nombre"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    label="Nombre "
                    inputProps={{}}
                  />
                  {touched.nombre && errors.nombre && (
                    <FormHelperText error id="standard-weight-helper-text-nombre">
                      {errors.nombre}
                    </FormHelperText>
                  )}
                </FormControl>

                <FormControl fullWidth error={Boolean(touched.apellido && errors.apellido)} sx={{ ...theme.typography.customInput }}>
                  <InputLabel htmlFor="outlined-adornment-apellidos">Apellidos </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-apellidos"
                    type="text"
                    value={values.apellido}
                    name="apellido"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    label="Apellidos "
                    inputProps={{}}
                  />
                  {touched.apellido && errors.apellido && (
                    <FormHelperText error id="standard-weight-helper-text-apellidos">
                      {errors.apellido}
                    </FormHelperText>
                  )}
                </FormControl>
              </div>
              <div style={{ display: 'flex', flexDirection: 'row', width: '100%', gap: '1%', flexWrap: isSmallScreen ? 'wrap' : 'nowrap' }}>
                <FormControl fullWidth error={Boolean(touched.altura && errors.altura)} sx={{ ...theme.typography.customInput }}>
                  <InputLabel htmlFor="outlined-adornment-altura">Altura (cm)</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-altura"
                    type="number"
                    value={values.altura}
                    name="altura"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    label="Altura del paciente "
                    inputProps={{}}
                  />
                  {touched.altura && errors.altura && (
                    <FormHelperText error id="standard-weight-helper-text-altura">
                      {errors.altura}
                    </FormHelperText>
                  )}
                </FormControl>

                <FormControl fullWidth error={Boolean(touched.edad && errors.edad)} sx={{ ...theme.typography.customInput }}>
                  <InputLabel htmlFor="outlined-adornment-Edad">Edad</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-Edad"
                    type="number"
                    value={values.edad}
                    name="edad"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    label="edad del paciente"
                    inputProps={{}}
                  />
                  {touched.edad && errors.edad && (
                    <FormHelperText error id="standard-weight-helper-text-Edad">
                      {errors.edad}
                    </FormHelperText>
                  )}
                </FormControl>
              </div>
              <div style={{ display: 'flex', flexDirection: 'row', width: '100%', gap: '1%', flexWrap: isSmallScreen ? 'wrap' : 'nowrap' }}>
                <FormControl fullWidth error={Boolean(touched.peso && errors.peso)} sx={{ ...theme.typography.customInput }}>
                  <InputLabel htmlFor="outlined-adornment-peso">Peso</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-peso"
                    type="number"
                    value={values.peso}
                    name="peso"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    label="Peso del paciente"
                    inputProps={{}}
                  />
                  {touched.peso && errors.peso && (
                    <FormHelperText error id="standard-weight-helper-text-peso">
                      {errors.peso}
                    </FormHelperText>
                  )}
                </FormControl>

                <FormControl fullWidth error={Boolean(touched.genero && errors.genero)} sx={{ ...theme.typography.customInput }}>
                  <InputLabel id="outlined-adornment-genero"> Genero </InputLabel>
                  <Select
                    labelId="outlined-adornment-genero"
                    id="outlined-adornment-genero"
                    value={values.genero}
                    name="genero"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    style={{ fontSize: '12px', marginTop: '2%' }}
                    label="Género"
                  >
                    <MenuItem value="">Seleccione</MenuItem>
                    <MenuItem value="masculino">Masculino</MenuItem>
                    <MenuItem value="femenino">Femenino</MenuItem>
                    <MenuItem value="otro">Otro</MenuItem>
                  </Select>

                  {touched.genero && errors.genero && (
                    <FormHelperText error id="outlined-adornment-genero">
                      {errors.genero}
                    </FormHelperText>
                  )}
                </FormControl>
              </div>

              {errors.submit && (
                <Box sx={{ mt: 3 }}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Box>
              )}
              {bandera && <FormHelperText error>Todos los campos son requeridos</FormHelperText>}
              {/* <FormControlLabel
                control={<Checkbox checked={hasChronicDisease} onChange={(e) => setHasChronicDisease(e.target.checked)} />}
                label="¿El paciente tiene alguna enfermedad crónica?"
              /> */}

              {/* Inputs adicionales condicionalmente renderizados */}
              {/* {hasChronicDisease && (
                <div
                  style={{ display: 'flex', flexDirection: 'row', width: '100%', gap: '1%', flexWrap: isSmallScreen ? 'wrap' : 'nowrap' }}
                >
                  <FormControl fullWidth error={Boolean(touched.enfermedad && errors.enfermedad)} sx={{ ...theme.typography.customInput }}>
                    <InputLabel htmlFor="outlined-adornment-disease" >Nombre de la enfermedad</InputLabel>
                    <OutlinedInput
                    id="outlined-adornment-disease"
                    type="text"
                    value={values.enfermedad}
                    name="enfermedad"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    label="Enfermedad del paciente"
                    inputProps={{}}
                    />
                     {touched.enfermedad && errors.enfermedad && (
                    <FormHelperText error id="outlined-adornment-disease">
                      {errors.enfermedad}
                    </FormHelperText>
                  )}
                  </FormControl>
                  <FormControl fullWidth error={Boolean(touched.descripcion && errors.descripcion)} sx={{ ...theme.typography.customInput }}>
                    <InputLabel htmlFor="outlined-adornment-descripcion" >Descripcion de la enfermedad</InputLabel>
                    <OutlinedInput
                    id="outlined-adornment-descripcion"
                    type="text"
                    value={values.descripcion}
                    name="descripcion"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    label="descripcion del paciente"
                    inputProps={{}}
                    />
                     {touched.descripcion && errors.descripcion && (
                    <FormHelperText error id="outlined-adornment-descripcion">
                      {errors.descripcion}
                    </FormHelperText>
                  )}
                  </FormControl>
                  
                </div>
              )} */}
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Box sx={{ mt: 3 }} width={'40%'}>
                  <AnimateButton>
                    <Button
                      disableElevation
                      disabled={isSubmitting}
                      onClick={handleLogin}
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                      color="secondary"
                    >
                      Agregar Paciente
                    </Button>
                  </AnimateButton>
                </Box>
              </div>
            </form>
          )}
        </Formik>
      </MainCard>
    </>
  );
};

export default AddPatient;
