import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, TextField, List, ListItem, Input, Alert } from '@mui/material';
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
  height: 550,
  '@media (max-width: 600px)': {
    width: 300,
    height: 700
  }
}));

const EditPatientCard = ({ patient, onCancel, onSave, top, left }) => {
  const [editedPatient, setEditedPatient] = useState({ ...patient });
  const [showInput, setShowInput] = useState(false);
  const [historial, setHistorial] = useState([]);
  const [idUnico, setIdUnico] = useState('');
  const [deviceConnected, setDeviceConnected] = useState(true);

  useEffect(() => {
    setEditedPatient({ ...patient });
    fetchPatientHistory(patient.id_persona);
  }, [patient]);

  const fetchPatientHistory = async (patientId) => {
    try {
      const response = await fetch(`http://52.200.243.141:3001/api/paciente/${patientId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error('Error al obtener el historial del paciente');
      }
      const data = await response.json();
      setHistorial(data);
    } catch (error) {
      console.error('Error al obtener el historial del paciente:', error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedPatient((prevPatient) => ({
      ...prevPatient,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`http://52.200.243.141:3001/api/paciente/${editedPatient.id_persona}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editedPatient)
      });
      if (response.ok) {
        onSave(editedPatient);
        window.location.reload();
      } else {
        throw new Error('Error al guardar los cambios');
      }
    } catch (error) {
      console.error('Error al guardar los cambios:', error.message);
    }
  };

  const handleIdUnicoChange = (e) => {
    const { value } = e.target;
    setIdUnico(value);
  };

  const handleconsulta = async () => {
    try {
      const response = await fetch('http://52.200.243.141:3001/api/consulta', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id_unico: idUnico,
          id_paciente: patient.id_persona
        })
      });
      if (response.ok) {
        const data = await response.json();
        alert("AGREGADO")
        console.log('Respuesta del servidor:', data);
      } else {
        throw new Error('La solicitud no fue exitosa');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error.message);
    }
  };

  const handleID_unicoClick = () => {
    const connected = localStorage.getItem('connected');
    if (connected) {
      setShowInput(true);
    } else {
      setDeviceConnected(false);
      setShowInput(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const numericValue = !isNaN(value) ? parseFloat(value) : value;
    setEditedPatient((prevPatient) => ({
      ...prevPatient,
      [name]: numericValue
    }));
  };

  const [cardsHisto] = useState(3);

  return (
    <CardWrapper top={top} left={left} onClick={(e) => e.stopPropagation()}>
      <Box>
        {!deviceConnected && <Alert severity="error">Por favor, conecte el dispositivo antes de agregar un análisis.</Alert>}
        <List sx={{ py: 2 }}>
          <ListItem disableGutters>
            <TextField name="nombres" label="Nombre" value={editedPatient.nombres} onChange={handleChange} />
          </ListItem>
          <ListItem disableGutters>
            <TextField name="apellidos" label="Apellidos" value={editedPatient.apellidos} onChange={handleChange} />
          </ListItem>
          <ListItem disableGutters>
            <TextField name="edad" label="Edad" value={editedPatient.edad} onChange={handleInputChange} />
          </ListItem>
          <ListItem disableGutters>
            <TextField name="altura" label="Altura" value={editedPatient.altura} onChange={handleInputChange} />
          </ListItem>
          <ListItem disableGutters>
            <TextField name="peso" label="Peso" value={editedPatient.peso} onChange={handleInputChange} />
          </ListItem>
          <ListItem disableGutters>
            <TextField name="genero" label="Genero" value={editedPatient.genero} onChange={handleChange} />
          </ListItem>
        </List>
        <CardHistorial historial={historial} cardsHisto={cardsHisto} />
        <Box
          sx={{
            position: 'absolute',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '50px',
            bottom: '20px',
            '@media (max-width: 600px)': { gap: '20px' }
          }}
        >
          <Button variant="contained" onClick={handleSave}>
            Guardar cambios
          </Button>

          <Button variant="contained" onClick={handleID_unicoClick}>
            ID Unico
          </Button>

          <Button type="submit" variant="contained" onClick={handleconsulta}>
            Analizar
          </Button>

          <Button variant="contained" onClick={onCancel}>
            Cancelar
          </Button>
        </Box>

        {showInput && (
          <Input
            placeholder="Ingrese ID Unico aquí"
            type="text"
            value={idUnico}
            name="id_unico"
            label="ID Unico"
            onChange={handleIdUnicoChange}
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
  left: PropTypes.string
};

export default EditPatientCard;
