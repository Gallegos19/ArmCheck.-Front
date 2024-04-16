import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { Box, Button, List, ListItem, Typography } from '@mui/material';
import TotalIncomeCard from 'ui-component/cards/Skeleton/TotalIncomeCard';
import EditPatientCard from './DetailsPatientCard';

const CardButton = styled(Button)(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  justifyContent: 'left',
  backgroundColor: '#F4F9FE',
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
  width: 300,
  height: 300,
}));

const TotalIncomeLightCard = ({ isLoading }) => {
  const  [patients] = useState([
    { nombre: 'Gerson Daniel', apellidos: 'Garcia Dominguez', edad: 20, altura: 1.75 },
    { nombre: 'Juan', apellidos: 'Perez', edad: 25, altura: 1.8 },
    { nombre: 'María', apellidos: 'Gonzalez', edad: 30, altura: 1.65 },
    { nombre: 'Carlos', apellidos: 'Martinez', edad: 35, altura: 1.7 },
    { nombre: 'Laura', apellidos: 'Lopez', edad: 40, altura: 1.6 },
    { nombre: 'Pedro', apellidos: 'Sanchez', edad: 45, altura: 1.85 },
    { nombre: 'Carlos', apellidos: 'Ramirez', edad: 50, altura: 1.75 },
    { nombre: 'Laura', apellidos: 'Hernandez', edad: 55, altura: 1.68 },
    { nombre: 'Pedro', apellidos: 'Gutierrez', edad: 60, altura: 1.9 },
  ]);

  const chunkArray = (arr, size) => {
    return arr.reduce((acc, _, i) => {
      if (i % size === 0) {
        acc.push(arr.slice(i, i + size));
      }
      return acc;
    }, []);
  };

  const [showEditCard, setShowEditCard] = useState(false); // Estado para controlar la visibilidad de la tarjeta de edición
  const [selectedPatient, setSelectedPatient] = useState(null); // Estado para almacenar el paciente seleccionado para editar

  const handleCardClick = (patient) => {
    setSelectedPatient(patient);
    setShowEditCard(true);
  };

  const handleCancelEdit = () => {
    setShowEditCard(false);
    setSelectedPatient(null);
  };

  const handleSaveChanges = (updatedPatientData) => {
    // Aquí puedes implementar la lógica para guardar los cambios en los datos del paciente
    console.log('Datos actualizados:', updatedPatientData);
    setShowEditCard(false);
    setSelectedPatient(null);
  };

  const patientGroups = chunkArray(patients, 3);

  return (
    <>
      {/* Renderiza la tarjeta de edición si showEditCard es true */}
      {showEditCard && selectedPatient && (
        <EditPatientCard 
          patient={selectedPatient}
          onCancel={handleCancelEdit}
          onSave={handleSaveChanges}
        />
      )}

      {/* Renderiza las tarjetas de pacientes */}
      {isLoading ? (
        <TotalIncomeCard />
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {patientGroups.map((group, index) => (
            <Box key={index} sx={{ display: 'flex', justifyContent: 'center', gap: '100px' }}>
              {group.map((patient, patientIndex) => (
                <CardButton key={patientIndex} onClick={() => handleCardClick(patient)}>
                  <Box sx={{ p: 1 }}>
                    <List sx={{ py: 2 }}>
                      <ListItem key={patientIndex} disableGutters>
                        <Typography variant="body1">
                          <strong>Nombre:</strong> {patient.nombre}
                        </Typography>
                      </ListItem>
                      <ListItem key={patientIndex} disableGutters>
                        <Typography variant="body1">
                          <strong>Apellidos:</strong> {patient.apellidos}
                        </Typography>
                      </ListItem>
                      <ListItem key={patientIndex} disableGutters>
                        <Typography variant="body1">
                          <strong>Edad:</strong> {patient.edad}
                        </Typography>
                      </ListItem>
                      <ListItem key={patientIndex} disableGutters>
                        <Typography variant="body1">
                          <strong>Altura:</strong> {patient.altura}
                        </Typography>
                      </ListItem>
                    </List>
                  </Box>
                </CardButton>
              ))}
            </Box>
          ))}
        </Box>
      )}
    </>
  );
};

TotalIncomeLightCard.propTypes = {
  isLoading: PropTypes.bool,
};

export default TotalIncomeLightCard;