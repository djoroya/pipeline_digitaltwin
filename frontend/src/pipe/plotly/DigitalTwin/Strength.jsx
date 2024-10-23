import React,{useState,useEffect} from 'react';
import Plot from 'react-plotly.js';

export const Strength = () => {


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
    const intervalId = setInterval(fetchData,500);

    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(intervalId);
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  // ******************************************************************************




    const posix = data_list.map(data => new Date(data.posix * 1000).toISOString()); // Convertir timestamps a formato ISO

    const sigma_max = data_list.map(data => data.sigma_max);
    const sigma_memoria = data_list.map(data => data.sigma_max_memo);
    

    const forecast = data_list[data_list.length-1].forecast;
    const time_forecast = data_list[data_list.length-1].time_forecast;
    const time_forecast_iso = time_forecast.map(data => new Date(data * 1000).toISOString()); // Convertir timestamps a formato ISO
    const conf_int = data_list[data_list.length-1].conf_int;

    const conf_sup = conf_int.map(data => data[1]);
    const conf_inf = conf_int.map(data => data[0]);

    const time_forecast_iso_add_first = [posix[posix.length-1], ...time_forecast_iso];

    const forecast_add_first = [sigma_memoria[sigma_memoria.length-1], ...forecast];
    const conf_sup_add_first = [sigma_memoria[sigma_memoria.length-1], ...conf_sup];
    const conf_inf_add_first = [sigma_memoria[sigma_memoria.length-1], ...conf_inf];

    

    const data_forecast_sup = {
        x: time_forecast_iso_add_first,
        y: conf_sup_add_first,
        "type": "scatter",
        "mode":  "lines",
        line: {
            "color": "rgb(55, 128, 191)",
            "width": 1
        },
        "name": null,
        showlegend: false

    }

    const data_forecast_inf = {
        x: time_forecast_iso_add_first,
        y: conf_inf_add_first,
        "type": "scatter",
        "mode":  "lines",
        line: {
            "color": "rgb(55, 128, 191)",
            "width": 1
        },
        "name": "Forecast",
        showlegend: false
    }

    const fill_between = {
        x: time_forecast_iso_add_first,
        y: conf_sup_add_first,
        fill: 'tonexty',
        fillcolor: 'rgba(55, 128, 191, 0.3)',
        line: {
            color: 'transparent'
        },
        name: 'Confidence Interval'
    }

    const data_forecast = {
        x: time_forecast_iso_add_first,
        y: forecast_add_first,
        "type": "scatter",
        "mode":  "lines+markers",
        line: {
            "color": "rgb(55, 128, 191)",
            "width": 2
        },
        "name": "Forecast"
        
    };



    const datasigmamemo = {
        x: posix,
        y: sigma_memoria,
        type: 'scatter',
        mode: 'lines+markers',
        name: 'Max Stress Memory',
        marker: { color: 'blue' }

    };

    const sigma_35_time = {
        x : [posix[0], time_forecast_iso_add_first[time_forecast_iso_add_first.length-1]],
        y : [3.5, 3.5],
        "type": "scatter",
        "mode": "lines + text",
        "name": "Concrete Strength",
        line: {
            "color": "rgb(255, 0, 0)",
            "width": 2
        }
        ,

    };


    const xlim_1 = [posix[0], 
                            time_forecast_iso_add_first[time_forecast_iso_add_first.length-1]]


    return (

            <Plot
            data={[
                datasigmamemo,
                data_forecast,
                sigma_35_time,
                data_forecast_sup,
                data_forecast_inf,
                fill_between
            ]}
            layout={{
              title: {
                text: 'Concrete Strength Forecast',
                font: {
                  size: 16,
                },
                x: 0.5,
                xanchor: 'center',
                y: 0.9,
                yanchor: 'top'
              },
              xaxis: { title: 'Datetime',range: xlim_1},
              yaxis: { title: {
                            text: 'Strength Forecast (MPa)',
                            font: {size: 15}
                              },
                        range: [-60, 20],
                        fixedrange: true,
                        autorange: false,

                          },
                          width: 690,
                          height: 320,
                margin: { t: 50, b: 50, l: 50, r: 20 },
                legend: {
                        x: 0.2,   // Posición horizontal (0.0 a 1.0)
                        y:0.75,   // Posición vertical (0.0 a 1.0)
                        xanchor: 'center',  // Centra la leyenda horizontalmente
                        yanchor: 'top',     // Alinea la leyenda en la parte superior,
                        font: {
                            size: 12,
                            color: 'black'
                        }
                        }
            }}
        />

    );
};

export default Strength;
