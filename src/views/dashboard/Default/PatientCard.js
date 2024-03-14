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
  maxWidth: '800px' // Cambia el valor de maxWidth según tu preferencia
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
    { nombre: 'Gerson' },
    { nombre: 'Juan' },
    { nombre: 'María' },
    { nombre: 'Carlos' },
    { nombre: 'Laura' },
    { nombre: 'Pedro' },
    { nombre: 'Carlos' },
    { nombre: 'Laura' },
    { nombre: 'Pedro' },
  ]);

  // Dividir el arreglo de pacientes en grupos de tres
  const patientGroups = chunkArray(patients, 3);

  return (
    <>
      {isLoading ? (
        <TotalIncomeCard /> // Renderiza un componente de carga si isLoading es true
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px', flexWrap: 'wrap' }}>
          {/* Mapear los grupos de pacientes */}
          {patientGroups.map((group, index) => (
            <Box key={index} sx={{ display: 'flex', justifyContent:'center', gap: '100px'}}>
              {/* Mapear cada paciente en el grupo */}
              {group.map((patient, patientIndex) => (
                <CardWrapper key={patientIndex} border={false} content={false}>
                  <Box sx={{ p: 10 }}>
                    <List sx={{ py: 0 }}>
                      <ListItem key={patientIndex} alignItems="center" disableGutters sx={{ py: 0 , width:'100px', justifyContent:"center"}}>
                        <Typography variant="body1">{patient.nombre}</Typography>
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
