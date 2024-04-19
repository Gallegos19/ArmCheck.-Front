import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

const CardHis = styled(Box)(({ theme, top, left }) => ({
    position: 'fixed',
    top: top || '5%',
    left: left || '65%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'whit',
    flexDirection: 'column',
    padding: theme.spacing(2),
    overflow: 'hidden',
    textDecoration:'none',
    boxShadow: theme.shadows[3],
    zIndex: 1000,
    color: 'black',
    p: 3,
    width: 300,
    height: 130,

    '@media (max-width: 600px)': {
        width: 200,
        height: 80,
        left: left || '35%',
    },
}));

const CardHistorial =  ({ historial }) => {
    // Convertir el objeto a un array
    const historialArray = Object.values(historial);
    
    
    const handleId = (id) => {
        localStorage.setItem('id_unico',id)
    }
    // Verificar si historial es un array
    if (!Array.isArray(historialArray)) {
        console.error('El historial no es un array');
        return null; // O puedes retornar un mensaje de error u otro componente
    }

    // Limitar a mostrar solo 3 elementos
    const firstThreeItems = historialArray.slice(0, 3);

    return (
        <>
            {firstThreeItems.map((historia, index) => (
                
                <CardHis key={index} onClick={handleId(historia.id_unico)} component={Link} to="/other/Historial" sx={{ top: `${18 + index * 25}%`, '@media (max-width: 600px)': { top: `${50 + index * 15}%` } }}>
                    <Typography variant="h6">ID Consulta: {historia.id_consultas}</Typography>
                    <Typography variant="body1">ID Único: {historia.id_unico}</Typography>
                    <Typography variant="body1">ID Paciente: {historia.id_paciente}</Typography>
                    <Typography variant="body1">Fecha Consulta: {historia.fecha_consulta}</Typography>
                </CardHis>
            ))}
            
        </>
    );
};

export default CardHistorial;
