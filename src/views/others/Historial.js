import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { VictoryChart, VictoryLine, VictoryAxis } from 'victory';

const CardWrapper = styled(Box)(({ top, left }) => ({
  position: 'fixed',
  top: top || '60%',
  left: left || '55%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#f9f9f9',
  borderRadius: '10px',
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
  padding: '20px',
  overflow: 'hidden',
  zIndex: 1000,
  color: '#333',
  width: 'calc(100% - 40px)', // Se ajusta el ancho para ocupar todo el espacio disponible
  height: 'calc(100% - 40px)' // Se ajusta la altura para ocupar todo el espacio disponible
}));

const ChartWrapper = styled(Box)({
  width: '100%',
  height: '100%',
  position: 'relative'
});

const HistorialPaciente = ({ top, left }) => {
  const [idUnico, setIdUnico] = useState(null);
  const [dataId, setDataId] = useState('');
  const [chartData, setChartData] = useState([]);
  const [xDomain, setXDomain] = useState([0, 1]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDrawnPoints((prevPoints) => {
        if (prevPoints < chartData.length) {
          return prevPoints + 1;
        } else {
          clearInterval(intervalId);
          return prevPoints;
        }
      });
    }, 100);

    return () => clearInterval(intervalId);
  }, [chartData]);

  useEffect(() => {
    const dataIdFromLocalStorage = localStorage.getItem('id_unico');
    if (dataIdFromLocalStorage) {
      setDataId(dataIdFromLocalStorage);
    }
  }, []);

  useEffect(() => {
    if (dataId) {
      setIdUnico(dataId);
    }
  }, [dataId]);

  const handleAnalisis = async (idUnico) => {
    try {
      const response = await fetch(`http://52.200.243.141:3001/api/analisis/${idUnico}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error('Error al obtener el historial del paciente');
      }
      const data = await response.json();
      const formattedData = typeof data.arreglo_datos === 'string' ? JSON.parse(data.arreglo_datos) : data.arreglo_datos;

      setChartData(formattedData);
      // Ajustar los dominios de los ejes X e Y
      const xValues = Array.from({ length: formattedData.length }, (_, i) => i);
      const minX = Math.min(...xValues);
      const maxX = Math.max(...xValues);
      setXDomain([minX, maxX]);
    } catch (error) {
      console.error('Error al obtener el historial del paciente:', error.message);
    }
  };

  useEffect(() => {
    if (idUnico) {
      handleAnalisis(idUnico);
    }
  }, [idUnico]);

  // Función para formatear los ticks del eje Y
  const formatYTick = (tick) => `${tick / 1000}k`;

  return (
    <CardWrapper top={top} left={left} onClick={(e) => e.stopPropagation()}>
      <ChartWrapper>
        {chartData.length > 0 && (
          <VictoryChart padding={{ top: 50, bottom: 50, left: 50, right: 50 }} domain={{ x: xDomain }}>
            <defs>
              <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#ff0000" />
              </linearGradient>
            </defs>
            <VictoryAxis
              style={{
                axis: { stroke: '#ccc' },
                tickLabels: { fontSize: 10, fill: '#666' } // Reducir el tamaño de los ticks
              }}
            />
            <VictoryAxis
              dependentAxis
              style={{
                axis: { stroke: '#ccc' },
                tickLabels: { fontSize: 10, fill: '#666' } // Reducir el tamaño de los ticks
              }}
              tickFormat={formatYTick} // Aplicar la función de formato para los ticks del eje Y
            />
            <VictoryLine
              data={chartData.map((value, index) => ({ x: index, y: value }))}
              interpolation="natural"
              style={{
                data: { stroke: 'url(#gradient)', strokeWidth: 2 }
              }}
              animate={{ duration: 20000 }}
              animationWhitelist={['data']}
            />
          </VictoryChart>
        )}
      </ChartWrapper>
    </CardWrapper>
  );
};

export default HistorialPaciente;
