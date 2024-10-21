import React,{useState,useEffect} from 'react';
import Plot from 'react-plotly.js';

export const StressProfile = () => {


  // ******************************************************************************
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


  useEffect(() => {
    // Hacer la primera solicitud al montar el componente
    fetchData();

    // Configurar un intervalo para solicitar datos cada 2 segundos
    const intervalId = setInterval(fetchData, 2000);

    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(intervalId);
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  // ******************************************************************************


    
    // graph bar plot 
    const sigma = data_list[data_list.length-1].sigma;
    const z_span = data_list[data_list.length-1].z_span;


    const sigma_data = {
        x: z_span,
        y: sigma,
        "type": "scatter",
        "mode": "lines + markers",
        "name": "Stress Profile",
        "line": {
            "color": "rgb(219, 64, 82)",
            "width": 3
        }
    };

    // 3.5 MPa horizontal line

    const sigma_35 = {
        x : z_span,
        y : Array(z_span.length).fill(3.5),
        "type": "scatter",
        "mode": "lines",
        "name": "Concrete Strength",
        "line": {
            "color": "rgb(0, 0, 0)",
            "width": 2
        }
    };



    const layout = {
                width: 750,
                height: 320,
                title: 'Stress Profile',
                margin: { t: 50, b: 50, l: 100, r: 20 },
                legend: {
                        x: 0.85,   // Posición horizontal (0.0 a 1.0)
                        y:0.85,   // Posición vertical (0.0 a 1.0)
                        xanchor: 'center',  // Centra la leyenda horizontalmente
                        yanchor: 'top',     // Alinea la leyenda en la parte superior
                        }
            }



    const zlong = 15.625/2

    const zlim = [-zlong, zlong]
    return (
   
        <Plot
            data={[
                sigma_35,
                     sigma_data]}
            layout={ {...layout, 
                xaxis: {  range: zlim , title: 'z [m]', fixedrange: true, zeroline: true},
                yaxis: { title: 'Concrete Stress [MPa]', fixedrange: true, zeroline: true},
                title: 'Stress Profile',
                legend: {
                        x: 0.85,   // Posición horizontal (0.0 a 1.0)
                        y:0.85,   // Posición vertical (0.0 a 1.0)
                        xanchor: 'center',  // Centra la leyenda horizontalmente
                        yanchor: 'top',     // Alinea la leyenda en la parte superior
                        }
            }}
        />

    );
};

export default StressProfile;
