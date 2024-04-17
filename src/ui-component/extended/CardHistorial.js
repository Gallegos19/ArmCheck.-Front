import React from 'react';
import { Box,Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

const CardHis = styled(Button)(({ theme, top, left }) => ({
    position: 'fixed',
    top: top || '5%',
    left: left || '65%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'whit',
    flexDirection: 'column',
    padding: theme.spacing(2),
    overflow: 'hidden',
    boxShadow: theme.shadows[3],
    zIndex: 1000,
    color: 'black',
    p: 3,
    width: 300,
    height: 100,
    '@media (max-width: 600px)': {
        width: 200,
        height: 80,
        left: left || '35%',
    },
}));


const CardHistorial = ({ historial, cardsHisto }) => {
    const chunkArray = (arr, size) => {
        return arr.reduce((acc, _, i) => {
            if (i % size === 0) {
                acc.push(arr.slice(i, i + size));
            }
            return acc;
        }, []);
    };

    const patientHistory = chunkArray(historial, cardsHisto);

    return (
        <>
            {patientHistory.map((group, index) => (
                <Box key={index} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {group.map((historia, historiaIndex) => (
                        <CardHis key={historia.id} component={Link} to="/pages/historial/historial" sx={{ top: `${20 + historiaIndex * 25}%`, '@media (max-width: 600px)': { top: `${50 + historiaIndex * 15}%` } }}>
                            <Typography variant="h6">ID: {historia.id}</Typography>
                            <Typography variant="body1">Fecha: {historia.fecha}</Typography>
                        </CardHis>
                    ))}
                </Box>
            ))}
        </>
    );
};

export default CardHistorial;
