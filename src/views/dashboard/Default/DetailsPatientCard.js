import React, { useState, useEffect } from 'react';
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
  height: 500,
  '@media (max-width: 600px)': {
    width: 300,
    height: 700,
  },
}));

const EditPatientCard = ({ patient, onCancel, onSave, top, left }) => {
  const [editedPatient, setEditedPatient] = useState({ ...patient });
  const [showInput, setShowInput] = useState(false);

  useEffect(() => {
    // Actualizar el estado interno si cambia la prop 'patient'
    setEditedPatient({ ...patient });
  }, [patient]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedPatient((prevPatient) => ({
      ...prevPatient,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    console.log('Guardando cambios...');
    try {
      const response = await fetch(`http://localhost:3001/api/paciente/${editedPatient.id_persona}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedPatient),
      });
      if (response.ok) {
        // Realiza la redirección o cualquier acción adicional después de guardar los cambios
        onSave(editedPatient); // Actualiza el estado del componente padre
        window.location.reload(); // Recarga la página después de guardar los cambios
      } else {
        throw new Error('Error al guardar los cambios');
      }
    } catch (error) {
      console.error('Error al guardar los cambios:', error.message);
    }
  };

  const handleAnalizarClick = () => {
    setShowInput(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Convertir el valor a número si el campo es numérico
    const numericValue = !isNaN(value) ? parseFloat(value) : value;
    setEditedPatient((prevPatient) => ({
      ...prevPatient,
      [name]: numericValue,
    }));
  };

  const [historial] = useState([
    { id: 'GA32', fecha: '24/24/24' },
    { id: 'GA65', fecha: '24/20/24' },
    { id: 'GA56', fecha: '24/2/24' },
  ]);

  const [cardsHisto] = useState(3);

  return (
    <CardWrapper top={top} left={left} onClick={(e) => e.stopPropagation()}>
      <Box>
        <List sx={{ py: 2 }}>
          <ListItem disableGutters>
            <TextField
              name="nombres"
              label="Nombre"
              value={editedPatient.nombres}
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
              onChange={handleInputChange}
            />
          </ListItem>
          <ListItem disableGutters>
            <TextField
              name="altura"
              label="Altura"
              value={editedPatient.altura}
              onChange={handleInputChange}
            />
          </ListItem>
          <ListItem disableGutters>
            <TextField
              name="peso"
              label="Peso"
              value={editedPatient.peso}
              onChange={handleInputChange}
            />
          </ListItem>
          <ListItem disableGutters>
            <TextField
              name="genero"
              label="Genero"
              value={editedPatient.genero}
              onChange={handleChange}
            />
          </ListItem>
        </List>
        <CardHistorial historial={historial} cardsHisto={cardsHisto} />
        <Box
          sx={{
            position: 'absolute',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '120px',
            bottom: '20px',
            '@media (max-width: 600px)': { gap: '20px' },
          }}
        >
          <Button variant="contained" onClick={handleSave}>
            Guardar cambios
          </Button>
          <Button variant="contained" onClick={handleAnalizarClick}>
            Analizar
          </Button>
          <Button variant="contained" onClick={onCancel}>
            Cancelar
          </Button>
        </Box>
        {showInput && (
          <Input
            placeholder="Ingrese aquí"
            value={'Tu ID es: ' + editedPatient.nombres}
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
