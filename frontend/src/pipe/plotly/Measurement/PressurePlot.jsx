import React,{useState,useEffect} from 'react';
import Plot from 'react-plotly.js';


const PressurePlot = () => {

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

      if (result.error) {
        return data_list
      }
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
    const intervalId = setInterval(fetchData, 1000);

    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(intervalId);
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  // ******************************************************************************


    const ps = data_list.map(data => data.p);
    const posix = data_list.map(data => new Date(data.posix * 1000).toISOString()); // Convertir timestamps a formato ISO

    const time_forecast = data_list[data_list.length-1].time_forecast;
    const time_forecast_iso = time_forecast.map(data => new Date(data * 1000).toISOString()); // Convertir timestamps a formato ISO

    const time_forecast_iso_add_first = [posix[posix.length-1], ...time_forecast_iso];

    const z_peeks = data_list[data_list.length-1].z_peeks;

    const title = "# Broken Coils: " + z_peeks.length; 

    const data_plot = {
        x: posix,
        y: ps,
        "type": "scatter",
        "mode":  "lines+markers",
        line: {
            "color": "rgb(255, 0, 191)",
            "width": 2
        },
        "name": "Water Pressure"
        
    };


    const layout = {
                width: 750,
                height: 280,
                title: 'Stress Profile',
                margin: { t: 40, b: 50, l: 100, r: 60 },
                plot_bgcolor: "white",
                paper_bgcolor: "white",
                legend: {
                        x: 0.85,   // Posición horizontal (0.0 a 1.0)
                        y:0.85,   // Posición vertical (0.0 a 1.0)
                        xanchor: 'center',  // Centra la leyenda horizontalmente
                        yanchor: 'top',     // Alinea la leyenda en la parte superior
                        }
            }

            const xlim_1 = [posix[0], 
                            time_forecast_iso_add_first[time_forecast_iso_add_first.length-1]]


    return (

   <>
      <Plot
                data={[
                    data_plot            ]}
                layout={{...layout, 
                    xaxis: {showticklabels: true ,range: xlim_1, title: 'Datetime'},
                    yaxis: { title: 'Water Pressure [MPa]',range: [0.1, 0.7]},
                    title: 'Water Pressure [MPa] | ' + title,
                    legend: {
                            x: 0.45,   // Posición horizontal (0.0 a 1.0)
                            y:0.55,   // Posición vertical (0.0 a 1.0)
                            xanchor: 'center',  // Centra la leyenda horizontalmente
                            yanchor: 'top',     // Alinea la leyenda en la parte superior,
                            orientation: 'h'
                            }
                }}
            />
          <p id="z_peeks" style={{display: 'none'}}>
                {JSON.stringify(z_peeks)}</p>
   </>




    );
};

export default PressurePlot;
