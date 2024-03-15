import PropTypes from 'prop-types';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, List, ListItem, Typography } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import TotalIncomeCard from 'ui-component/cards/Skeleton/TotalIncomeCard';

// Estilos personalizados para la tarjeta
const CardWrapper = styled(MainCard)(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  backgroundColor: '#F4F9FE',
  '&:after': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: `linear-gradient(210.04deg, ${theme.palette.warning.dark} 50.94%, rgba(144, 202, 249, 0) 83.49%)`,
    borderRadius: '50%',
    top: -30,
    right: -180
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: `linear-gradient(40.9deg, ${theme.palette.warning.dark} -14.02%, rgba(144, 202, 249, 0) 70.50%)`,
    borderRadius: '50%',
    top: -160,
    right: -130
  },
  p: 3,
  width: 300, // Ancho fijo para todas las tarjetas
  height: 300, // Alto fijo para todas las tarjetas
}));

// Función para dividir el arreglo en grupos de dos
const chunkArray = (arr, size) => {
  return arr.reduce((acc, _, i) => {
    if (i % size === 0) {
      acc.push(arr.slice(i, i + size));
    }
    return acc;
  }, []);
};

// ==============================|| DASHBOARD - TOTAL INCOME LIGHT CARD ||============================== //

const TotalIncomeLightCard = ({ isLoading }) => {
  // Estado para almacenar la lista de pacientes
  const [patients] = useState([
    {  
      nombre: 'Gerson Daniel', apellido: 'Garcia Dominguez', edad: 20, altura: 1.75,},
    { nombre: 'Juan', apellido: 'Perez', edad: 25, altura: 1.8 },
    { nombre: 'María', apellido: 'Gonzalez', edad: 30, altura: 1.65 },
    { nombre: 'Carlos', apellido: 'Martinez', edad: 35, altura: 1.7 },
    { nombre: 'Laura', apellido: 'Lopez', edad: 40, altura: 1.6 },
    { nombre: 'Pedro', apellido: 'Sanchez', edad: 45, altura: 1.85 },
    { nombre: 'Carlos', apellido: 'Ramirez', edad: 50, altura: 1.75 },
    { nombre: 'Laura', apellido: 'Hernandez', edad: 55, altura: 1.68 },
    { nombre: 'Pedro', apellido: 'Gutierrez', edad: 60, altura: 1.9 },
  ]);

  // Dividir el arreglo de pacientes en grupos de tres
  const patientGroups = chunkArray(patients, 3);

  return (
    <>
      {isLoading ? (
        <TotalIncomeCard /> // Renderiza un componente de carga si isLoading es true
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px', flexWrap: 'wrap', justifyContent:'center' }}>
          {/* Mapear los grupos de pacientes */}
          {patientGroups.map((group, index) => (
            <Box key={index} sx={{ display: 'flex', justifyContent:'center', gap: '100px'}}>
              {/* Mapear cada paciente en el grupo */}
              {group.map((patient, patientIndex) => (
                <CardWrapper key={patientIndex} border={false} content={false}>
                  <Box sx={{ p: 3 }}>
                  <List sx={{ py: 5 }}>
                      <ListItem key={patientIndex} alignItems="center" disableGutters>
                        <Typography variant="body1">
                          <strong>Nombre:</strong> {patient.nombre}
                        </Typography>
                      </ListItem>
                      <ListItem key={patientIndex} alignItems="center" disableGutters>
                        <Typography variant="body1">
                          <strong>Apellidos:</strong> {patient.apellido}
                        </Typography>
                      </ListItem>
                      <ListItem key={patientIndex} alignItems="center" disableGutters>
                        <Typography variant="body1">
                          <strong>Edad:</strong> {patient.edad}
                        </Typography>
                      </ListItem>
                      <ListItem key={patientIndex} alignItems="center" disableGutters>
                        <Typography variant="body1">
                          <strong>Altura:</strong> {patient.altura}
                        </Typography>
                      </ListItem>
                    </List>
                  </Box>
                </CardWrapper>
              ))}
            </Box>
          ))}
        </Box>
      )}
    </>
  );
};

TotalIncomeLightCard.propTypes = {
  isLoading: PropTypes.bool // Propiedad isLoading con tipo booleano
};

export default TotalIncomeLightCard; // Exporta el componente TotalIncomeLightCard
