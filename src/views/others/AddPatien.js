import { useState, useEffect } from 'react'; // Importa useEffect
import { useNavigate } from 'react-router';
import * as Yup from 'yup';
import { Formik } from 'formik';
import MainCard from 'ui-component/cards/MainCard';
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  Select,
  FormControl,
  FormHelperText,
  MenuItem,
  InputLabel,
  OutlinedInput,
  Typography,
  useMediaQuery
} from '@mui/material';

import AnimateButton from 'ui-component/extended/AnimateButton';

const AddPatient = ({ ...others }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [idEspecialista, setIdEspecialista] = useState(null); // Define idEspecialista
  const [bandera, setBandera] = useState(false);


  useEffect(() => {
    const dataString = localStorage.getItem('data');
    if (dataString) {
      const data = JSON.parse(dataString);
      const idEspecialista = data.id_especialista;
      setIdEspecialista(idEspecialista); // Usa setIdEspecialista para establecer el valor de idEspecialista
      console.log('ID del especialista establecido correctamente:', idEspecialista);
    }
  }, []);


  const handleSubmit = async (values, { setSubmitting }) => {
    console.log(values);
    try {
      const response = await fetch('http://52.200.243.141:3001/api/paciente', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id_especialista: idEspecialista, // Usa idEspecialista aquí,
          nombres: values.nombres,
          apellidos: values.apellidos,
          edad: values.edad,
          altura: values.altura,
          peso: values.peso,
          genero: values.genero
        })
      });
      if (response.ok) {
        // Verifica si la respuesta es exitosa (código de estado 200-299)
        const data = await response.json();
        console.log('Respuesta del servidor:', data);
        navigate('/dashboard/default');
      } else {
        throw new Error('La solicitud no fue exitosa');
      }
    } catch (error) {
      setBandera(true);
      console.error('Error al iniciar sesión:', error.message);
      console.log('Registrado');
      setBandera(false);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <br />
      <br />
      <MainCard title="Agregar Nuevo Paciente">
        <Typography variant="body2">Ingrese los datos del paciente</Typography>
        <Formik

          initialValues={{
            id_especialista: idEspecialista,
            nombres: '',
            apellidos: '',
            altura: '',
            edad: '',
            peso: '',
            genero: '',
            submit: null
          }}
          validationSchema={Yup.object().shape({
            nombres: Yup.string().max(255).required('Nombre del paciente es requerido'),
            apellidos: Yup.string().max(255).required('Apellido del paciente es requerido'),
            edad: Yup.number().positive('La edad debe ser un valor positivo').max(255).required('Edad del paciente es requerido'),
            altura: Yup.number().positive('La altura debe ser un valor positivo').max(255).required('Altura del paciente es requerido'),
            peso: Yup.number().positive('El peso debe ser un valor positivo').max(255).required('Peso del paciente es requerido'),
            genero: Yup.string().required('Género del paciente es requerido')
          })}
          onSubmit={handleSubmit}
        >
          {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
            <form noValidate onSubmit={handleSubmit} {...others}>
              <div style={{ display: 'flex', flexDirection: 'row', width: '100%', gap: '1%', flexWrap: isSmallScreen ? 'wrap' : 'nowrap' }}>
                <FormControl fullWidth error={Boolean(touched.nombres && errors.nombres)} sx={{ ...theme.typography.customInput }}>
                  <InputLabel htmlFor="outlined-adornment-nombre">Nombres </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-nombre"
                    type="text"
                    value={values.nombres}
                    name="nombres" // Cambio aquí
                    onBlur={handleBlur}
                    onChange={handleChange}
                    label="Nombre "
                    inputProps={{}}
                  />
                  {touched.nombres && errors.nombres && (
                    <FormHelperText error id="standard-weight-helper-text-nombre">
                      {errors.nombres}
                    </FormHelperText>
                  )}
                </FormControl>

                <FormControl fullWidth error={Boolean(touched.apellidos && errors.apellidos)} sx={{ ...theme.typography.customInput }}>
                  <InputLabel htmlFor="outlined-adornment-apellidos">Apellidos </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-apellidos"
                    type="text"
                    value={values.apellidos}
                    name="apellidos" // Cambio aquí
                    onBlur={handleBlur}
                    onChange={handleChange}
                    label="Apellidos "
                    inputProps={{}}
                  />
                  {touched.apellidos && errors.apellidos && (
                    <FormHelperText error id="standard-weight-helper-text-apellidos">
                      {errors.apellidos}
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
