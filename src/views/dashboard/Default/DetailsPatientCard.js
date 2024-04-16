import React, { useState } from 'react';
import PropTypes from 'prop-types';
<<<<<<< HEAD
import { Box, Button, TextField, List, ListItem } from '@mui/material';
import { styled } from '@mui/material/styles';

const CardWrapper = styled(Box)(({ theme, top, left }) => ({
  position: 'fixed',
  top: top || '60%', // Posición vertical centrada por defecto
  left: left || '55%', // Posición horizontal centrada por defecto
=======
import { Box,Button, TextField, List, ListItem} from '@mui/material';
import { styled } from '@mui/material/styles'; // Agrega esta línea para importar styled


const CardWrapper = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '60%',
  left: '55%',
>>>>>>> d41b44e90c3a9a36ba45f1e067a97ab50cf14998
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'white',
  padding: theme.spacing(2),
  overflow: 'hidden',
  boxShadow: theme.shadows[3],
  zIndex: 1000,
  color: 'black',
  '&:after': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: `linear-gradient(210.04deg, ${theme.palette.warning.dark} 50.94%, rgba(144, 202, 249, 0) 83.49%)`,
    borderRadius: '50%',
    top: -30,
    right: -180,
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: `linear-gradient(40.9deg, ${theme.palette.warning.dark} -14.02%, rgba(144, 202, 249, 0) 70.50%)`,
    borderRadius: '50%',
    top: -160,
    right: -130,
  },
  p: 3,
  width: 600,
<<<<<<< HEAD
  height: 400,
  '@media (max-width: 600px)': {
    width: 300,
    height: 400,
  },
}));

const EditPatientCard = ({ patient, onCancel, onSave, top, left }) => {
=======
  height: 500,
}));

const EditPatientCard = ({ patient, onCancel, onSave }) => {
>>>>>>> d41b44e90c3a9a36ba45f1e067a97ab50cf14998
  const [editedPatient, setEditedPatient] = useState({ ...patient });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedPatient((prevPatient) => ({
      ...prevPatient,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave(editedPatient);
  };

  return (
<<<<<<< HEAD
    <CardWrapper top={top} left={left} onClick={(e) => e.stopPropagation()}>
=======
    <CardWrapper onClick={(e) => e.stopPropagation()} >
>>>>>>> d41b44e90c3a9a36ba45f1e067a97ab50cf14998
      <Box >
        <List sx={{ py: 2 }}>
          <ListItem disableGutters>
            <TextField
              name="nombre"
              label="Nombre"
              value={editedPatient.nombre}
              onChange={handleChange}
            />
          </ListItem>
          <ListItem disableGutters>
            <TextField
              name="apellidos"
              label="Apellidos"
              value={editedPatient.apellidos}
              onChange={handleChange}
            />
          </ListItem>
          <ListItem disableGutters>
            <TextField
              name="edad"
              label="Edad"
              value={editedPatient.edad}
              onChange={handleChange}
            />
          </ListItem>
          <ListItem disableGutters>
            <TextField
              name="altura"
              label="Altura"
              value={editedPatient.altura}
              onChange={handleChange}
            />
          </ListItem>
<<<<<<< HEAD
          {/* Agrega más campos de texto para otros datos del paciente (apellido, edad, altura, etc.) */}
        </List>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap:'100px','@media (max-width: 600px)': {gap: '20px'}, }}>
          <Button variant="contained" onClick={handleSave}>Guardar cambios</Button>
          <Button variant="contained" onClick={onCancel}>Analizar</Button>
          <Button variant="contained" onClick={onCancel}>Cancelar</Button>
=======
        
          {/* Agrega más campos de texto para otros datos del paciente (apellido, edad, altura, etc.) */}
        </List>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="contained" onClick={handleSave}>Guardar cambios</Button>
          <Button variant="contained" onClick={onCancel}>Cancelar</Button>
          <Button variant="contained" onClick={onCancel}>Analizar</Button>
          <Button variant="contained" onClick={onCancel}>Sensar</Button>
>>>>>>> d41b44e90c3a9a36ba45f1e067a97ab50cf14998
        </Box>
      </Box>
    </CardWrapper>
  );
};

EditPatientCard.propTypes = {
  patient: PropTypes.object.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
<<<<<<< HEAD
  top: PropTypes.string, // Propiedad opcional para controlar la posición superior
  left: PropTypes.string, // Propiedad opcional para controlar la posición izquierda
=======
>>>>>>> d41b44e90c3a9a36ba45f1e067a97ab50cf14998
};

export default EditPatientCard;
