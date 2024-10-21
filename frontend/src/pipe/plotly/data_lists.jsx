import React, { useState } from 'react';

export const data_list = () => {


  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data_list, setData_list] = useState([]);
  const maxItems = 100;  // Definimos el máximo número de elementos en la lista

  // Función para hacer la solicitud a la API
  const fetchData = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/get'); // Cambia la URL por la de tu API
      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }
      const result = await response.json();
      setData(result);
      setLoading(false);

      // Actualizar data_list, asegurándonos que no exceda el tamaño máximo
      setData_list(prevDataList => {
        const newDataList = [...prevDataList, result];
        
        // Si la longitud excede el máximo, eliminar el primero (shift)
        if (newDataList.length > maxItems) {
          newDataList.shift();
        }
        return newDataList;
      });

    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return ({
    data,
    loading,
    error,
    data_list,
    fetchData
  })
};

export default data_list;
