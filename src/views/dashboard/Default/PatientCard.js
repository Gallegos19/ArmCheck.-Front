import React, { useState, useEffect } from 'react'; // Importación de useEffect
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
  width: '100%',
  maxWidth: 300,
  height: 300,
}));

const TotalIncomeLightCard = ({ isLoading }) => {
  const [showEditCard, setShowEditCard] = useState(false);  // Estado para controlar la visibilidad de la tarjeta de edición
  const [patientsData, setPatientsData] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);// Estado para almacenar el paciente seleccionado para editar
  const [cardsPerRow, setCardsPerRow] = useState(3);
  
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/paciente', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error('Error al obtener los datos de los pacientes');
      }
      const data = await response.json();
      console.log('Respuesta del servidor:', data);
      // Actualiza el estado con los datos recibidos
      setPatientsData(data);
    } catch (error) {
      console.error('Error al obtener los datos de los pacientes:', error.message);
    }
  };
  


  
  
  // const [patients] = useState([
  //   { nombre: 'Gerson Daniel', apellidos: 'Garcia Dominguez', edad: 20, altura: 1.75, peso:30, genero:'hombre' },
  //   { nombre: 'Juan', apellidos: 'Perez', edad: 25, altura: 1.8, peso:30, genero:'hombre'},
  //   { nombre: 'María', apellidos: 'Gonzalez', edad: 30, altura: 1.65, peso:30, genero:'hombre' },
  //   { nombre: 'Carlos', apellidos: 'Martinez', edad: 35, altura: 1.7, peso:30, genero:'hombre' },
  //   { nombre: 'Laura', apellidos: 'Lopez', edad: 40, altura: 1.6, peso:30, genero:'hombre' },
  //   { nombre: 'Pedro', apellidos: 'Sanchez', edad: 45, altura: 1.85, peso:30, genero:'hombre' },
  //   { nombre: 'Carlos', apellidos: 'Ramirez', edad: 50, altura: 1.75, peso:30, genero:'hombre' },
  //   { nombre: 'Laura', apellidos: 'Hernandez', edad: 55, altura: 1.68, peso:30, genero:'hombre' },
  //   { nombre: 'Pedro', apellidos: 'Gutierrez', edad: 60, altura: 1.9, peso:30, genero:'hombre' },
  // ]);

 

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

  // Para seccionar las cards dependiendo del dispositivo ---------------------------------------------------------
  
  useEffect(() => {
    const updateCardsPerRow = () => {
      // Calcula el número de tarjetas por fila en función del ancho de la ventana
      if (window.innerWidth < 768) {
        setCardsPerRow(1); // Dispositivos móviles
      } else if (window.innerWidth >= 768 && window.innerWidth < 1024) {
        setCardsPerRow(2); // iPads
      } else {
        setCardsPerRow(3); // PCs y dispositivos más grandes
      }
    };

    // Actualiza el número de tarjetas por fila al cargar la página y al cambiar el tamaño de la ventana
    updateCardsPerRow();
    window.addEventListener('resize', updateCardsPerRow);
    return () => window.removeEventListener('resize', updateCardsPerRow);
  }, []);

  //----------------------------------------------------------------------------------------------------------------------

  // Para las secciones 
  const chunkArray = (arr, size) => {
    return arr.reduce((acc, _, i) => {
      if (i % size === 0) {
        acc.push(arr.slice(i, i + size));
      }
      return acc;
    }, []);
  };

  // Llama a fetchData para obtener los datos de los pacientes al cargar el componente
  useEffect(() => {
    fetchData(); // Asegúrate de pasar los valores correctos si es necesario
  }, []);

  // Remueve la llamada a handPaciente y usa directamente patientsData
  const patientGroups = chunkArray(patientsData, cardsPerRow);

//----------------------------------------------------------------------------------------------------------------
  return (
    <>
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
            <Box key={index} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: '50px' }}>   
              {group.map((patient, patientIndex) => (
                <CardButton key={patientIndex} onClick={() => handleCardClick(patient)}>
                  <Box sx={{ p: 1 }}>
                    <List sx={{ py: 2 }}>
                      <ListItem key={patientIndex} disableGutters>
                        <Typography variant="body1">
                          <strong>Nombre:</strong> {patient.nombres}
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
                      <ListItem key={patientIndex} disableGutters>
                        <Typography variant="body1">
                          <strong>Peso:</strong> {patient.peso}
                        </Typography>
                      </ListItem>
                      <ListItem key={patientIndex} disableGutters>
                        <Typography variant="body1">
                          <strong>Genero:</strong> {patient.genero}
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
