import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, TextField, List, ListItem, Input } from '@mui/material';
import { styled } from '@mui/material/styles';
import CardHistorial from 'ui-component/extended/CardHistorial';

const CardWrapper = styled(Box)(({ theme, top, left }) => ({
  position: 'fixed',
  top: top || '60%',
  left: left || '55%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'white',
  padding: theme.spacing(2),
  overflow: 'hidden',
  boxShadow: theme.shadows[3],
  zIndex: 1000,
  color: 'black',
  p: 3,
  width: 600,
  height: 450,
  '@media (max-width: 600px)': {
    width: 300,
    height: 700,
    

  },
}));

const EditPatientCard = ({ patient, onCancel, onSave, top, left }) => {
  const [editedPatient, setEditedPatient] = useState({ ...patient });
  const [showInput, setShowInput] = useState(false);

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

  const handleAnalizarClick = () => {
    setShowInput(true);
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    // Actualiza el paciente editado con el nuevo valor del input
    setEditedPatient((prevPatient) => ({
      ...prevPatient,
      nombre: value,
    }));
  };


  const [historial] = useState([
    { id: 'GA32', fecha: '24/24/24' },
    { id: 'GA65', fecha: '24/20/24' },
    { id: 'GA56', fecha: '24/2/24' }
  ]);

  const [cardsHisto] = useState(3);

  return (
    <CardWrapper top={top} left={left} onClick={(e) => e.stopPropagation()}>
      <Box>

        <List sx={{ py: 2, }}>
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
          <ListItem disableGutters sx={{ gap: "50px" }}>
            <TextField
              name="altura"
              label="Altura"
              value={editedPatient.altura}
              onChange={handleChange}
            />

          </ListItem>
          {/* Agrega otros campos de texto para editar los datos del paciente */}
        </List>
        
        <CardHistorial historial={historial} cardsHisto={cardsHisto} />

        <Box sx={{ position: 'absolute', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '120px', bottom: '20px', '@media (max-width: 600px)': { gap: '20px' } }}>
          <Button variant="contained" onClick={handleSave}>Guardar cambios</Button>
          <Button variant="contained" onClick={handleAnalizarClick}>Analizar</Button>
          <Button variant="contained" onClick={onCancel}>Cancelar</Button>
        </Box>
        {/* Muestra el Input si showInput es true */}
        {showInput && (

          <Input
            placeholder="Ingrese aquí"
            value={'Tu ID es: '+editedPatient.nombre} // Asigna el valor del input al nombre del paciente editado
            onChange={handleInputChange}
          />
        )}
      </Box>
    </CardWrapper>
  );
};

EditPatientCard.propTypes = {
  patient: PropTypes.object.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  top: PropTypes.string,
  left: PropTypes.string,
};

export default EditPatientCard;
