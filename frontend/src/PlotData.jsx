import React from 'react';
import Plot from 'react-plotly.js';

const PlotData = ({ data_list }) => {
    const ps = data_list.map(data => data.p);
    const posix = data_list.map(data => new Date(data.posix * 1000).toISOString()); // Convertir timestamps a formato ISO

    const sigma_max = data_list.map(data => data.sigma_max);
    
    // graph bar plot 
    const spiras = data_list[data_list.length-1].spiras;
    const spiras_adj = spiras.map((x) => x);
    const sigma = data_list[data_list.length-1].sigma;
    const arange = data_list[data_list.length-1].arange;
    const z_span = data_list[data_list.length-1].z_span;

    const forecast = data_list[data_list.length-1].forecast;
    const time_forecast = data_list[data_list.length-1].time_forecast;
    const time_forecast_iso = time_forecast.map(data => new Date(data * 1000).toISOString()); // Convertir timestamps a formato ISO
    const conf_int = data_list[data_list.length-1].conf_int;

    const conf_sup = conf_int.map(data => data[1]);
    const conf_inf = conf_int.map(data => data[0]);

    const time_forecast_iso_add_first = [posix[posix.length-1], ...time_forecast_iso];

    const forecast_add_first = [sigma_max[sigma_max.length-1], ...forecast];
    const conf_sup_add_first = [sigma_max[sigma_max.length-1], ...conf_sup];
    const conf_inf_add_first = [sigma_max[sigma_max.length-1], ...conf_inf];

    



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
        yaxis: 'y2',
        xaxis: 'x2',
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
        yaxis: 'y2',
        xaxis: 'x2',
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
        name: 'Confidence Interval',
        yaxis: 'y2',
        xaxis: 'x2'
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
        "name": "Forecast",
        yaxis: 'y2',
        xaxis: 'x2'
        
    };

    const datasigmamax = {
        x: posix,
        y: sigma_max,
        type: 'scatter',
        mode: 'lines+markers',
        name: 'Max Stress',
        marker: { color: 'green' },
        yaxis: 'y2',
        xaxis: 'x2'
    };


    const databar = {
        x: arange,
        y: spiras_adj,
        type: 'bar',
        name: 'Broken coils',
        marker: { color: 'blue' },
        xaxis: 'x2',
        yaxis: 'y2'
    };

    const data = {
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

    const sigma_35_time = {
        x : [posix[0], time_forecast_iso_add_first[time_forecast_iso_add_first.length-1]],
        y : [3.5, 3.5],
        "type": "scatter",
        "mode": "lines",
        "name": "Concrete Strength",
        "line": {
            "color": "rgb(0, 0, 0)",
            "width": 2
        },
        xaxis: 'x2',
        yaxis: 'y2'

    };

    const layout = {
                width: 680,
                height: 480,
                title: 'Stress Profile',
                margin: { t: 40, b: 50, l: 50, r: 50 },
                plot_bgcolor: "rgb(245, 245, 245)",
                paper_bgcolor: "rgb(255, 255, 245)",
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
        <div className='mt-5' style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
            <Plot
            data={[
                data,
                data_forecast,
                datasigmamax,sigma_35_time,
                data_forecast_sup,
                data_forecast_inf,
                fill_between
            ]}
            layout={{...layout, 
                xaxis: {showticklabels: false ,range: xlim_1},
                xaxis2: { title: 'Datetime',range: xlim_1},
                yaxis: { title: 'Water Pressure [MPa]',range: [-0, 1.5],domain:[0.55,1]},
                yaxis2: { title: 'Concrete Stress [MPa]',domain:[0,0.45],range: [-70.25, 10]},
                grid: {rows: 2, columns: 1, pattern: 'independent'},  // Definir una cuadrícula de 2 filas, 1 columna
                title: 'Water Pressure [MPa]',
                legend: {
                        x: 0.45,   // Posición horizontal (0.0 a 1.0)
                        y:0.55,   // Posición vertical (0.0 a 1.0)
                        xanchor: 'center',  // Centra la leyenda horizontalmente
                        yanchor: 'top',     // Alinea la leyenda en la parte superior,
                        orientation: 'h'
                        }
            }}
        />

        <Plot
            data={[databar, 
                sigma_35,
                     sigma_data]}
            layout={ {...layout, 
                grid: {rows: 2, columns: 1, pattern: 'independent'},  // Definir una cuadrícula de 2 filas, 1 columna
                xaxis: {  range: [-10, 10]},
                yaxis: { title: 'Concrete Stress [MPa]',range: [-70.25, 20.5],domain: [0.3, 1.0]},
                yaxis2: { title: 'Broken Coils', range: [0, 1.0],domain: [0.0, 0.2]},
                xaxis2: { title: 'z[m]',range: [-10, 10]},
                title: 'Stress Profile',
                legend: {
                        x: 0.85,   // Posición horizontal (0.0 a 1.0)
                        y:0.85,   // Posición vertical (0.0 a 1.0)
                        xanchor: 'center',  // Centra la leyenda horizontalmente
                        yanchor: 'top',     // Alinea la leyenda en la parte superior
                        }
            }}
        />


        </div>


    );
};

export default PlotData;
