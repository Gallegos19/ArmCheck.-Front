import React, { useState, useEffect } from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { MdDeleteForever } from 'react-icons/md';
import Alert from '@mui/material/Alert';

const AdminPage = () => {
  const [especialistas, setEspecialistas] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3004/api/especialistas');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setEspecialistas(data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setErrorMessage('Error al obtener la lista de especialistas');
      }
    };

    fetchData();
  }, []);

  const handleDelete = async ({ id, correo }) => {
    try {
      const response = await fetch(`http://localhost:3004/api/especialistas/${correo}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Failed to delete data');
      }
      // Actualizar la lista de especialistas después de eliminar el especialista
      const updatedEspecialistas = especialistas.filter((especialista) => especialista.id_especialista !== id);
      setEspecialistas(updatedEspecialistas);
      setSuccessMessage('Especialista eliminado correctamente');
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000); // Eliminar el mensaje de éxito después de 3 segundos
    } catch (error) {
      console.error('Error deleting data:', error);
      setErrorMessage('Error al eliminar el especialista');
    }
  };

  return (
    <>
      <br />
      <br />
      <MainCard title="Lista de Especialistas registrados">
        {successMessage && <Alert severity="success">{successMessage}</Alert>}
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        {especialistas.length ? (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Nombres</TableCell>
                  <TableCell>Apellidos</TableCell>
                  <TableCell>Correo Electrónico</TableCell>
                  <TableCell>Especialidad</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {especialistas.map((especialista) => (
                  <TableRow key={especialista.id_especialista}>
                    <TableCell>{especialista.id_especialista}</TableCell>
                    <TableCell>{especialista.nombre}</TableCell>
                    <TableCell>{especialista.apellido}</TableCell>
                    <TableCell>{especialista.correo}</TableCell>
                    <TableCell>{especialista.especialidad}</TableCell>
                    <TableCell>
                      <Button
                        onClick={() => handleDelete({ id: especialista.id_especialista, correo: especialista.correo })}
                        variant="outlined"
                        color="error"
                      >
                        <MdDeleteForever size={'25px'} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography variant="body2">No hay especialistas que no sean administradores.</Typography>
        )}
      </MainCard>
    </>
  );
};

export default AdminPage;
