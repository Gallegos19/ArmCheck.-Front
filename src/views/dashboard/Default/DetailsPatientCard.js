import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box,Button, TextField, List, ListItem} from '@mui/material';
import { styled } from '@mui/material/styles'; // Agrega esta línea para importar styled


const CardWrapper = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '60%',
  left: '55%',
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
  height: 500,
}));

const EditPatientCard = ({ patient, onCancel, onSave }) => {
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
    <CardWrapper onClick={(e) => e.stopPropagation()} >
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
        
          {/* Agrega más campos de texto para otros datos del paciente (apellido, edad, altura, etc.) */}
        </List>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="contained" onClick={handleSave}>Guardar cambios</Button>
          <Button variant="contained" onClick={onCancel}>Cancelar</Button>
          <Button variant="contained" onClick={onCancel}>Analizar</Button>
          <Button variant="contained" onClick={onCancel}>Sensar</Button>
        </Box>
      </Box>
    </CardWrapper>
  );
};

EditPatientCard.propTypes = {
  patient: PropTypes.object.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default EditPatientCard;
