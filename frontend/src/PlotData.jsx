import React from 'react';
import Plot from 'react-plotly.js';

const PlotData = ({ data_list }) => {
    const ps = data_list.map(data => data.p);
    const posix = data_list.map(data => new Date(data.posix * 1000).toISOString()); // Convertir timestamps a formato ISO


    
    console.log(data_list[data_list.length-1]);

    // graph bar plot 
    const spiras = data_list[data_list.length-1].spiras;
    const spiras_adj = spiras.map((x) => 100*x);
    const sigma = data_list[data_list.length-1].sigma;
    const arange = data_list[data_list.length-1].arange;
    const z_span = data_list[data_list.length-1].z_span;
    const databar = {
        x: arange,
        y: spiras_adj,
        type: 'bar',
        marker: { color: 'blue' },
    };

    const data = {
        tspan: posix,
        pspan: ps
    };

    const sigma_data = {
        x: z_span,
        y: sigma,
        "type": "scatter",
        "mode": "lines",
        "name": "Stress Profile",
        "line": {
            "color": "rgb(219, 64, 82)",
            "width": 5
        }
    };



    return (
        <>
            <Plot
            data={[
                {
                    x: data.tspan,
                    y: data.pspan,
                    type: 'scatter',
                    mode: 'lines+markers',
                    marker: { color: 'red' },
                },
            ]}
            layout={{
                width: 720,
                height: 440,
                title: 'A Fancy Plot',
                xaxis: { title: 'Tiempo', type: 'date' },
                yaxis: { title: 'Presión',range: [-0.25, 10.5]},
            }}
        />

        <Plot
            data={[databar, sigma_data]}
            layout={{
                width: 720,
                height: 440,
                title: 'A Fancy Plot',
                xaxis: { title: 'Spiras' },
                yaxis: { title: 'Presión',range: [-100.25, 100.5]},
            }}
        />

        </>


    );
};

export default PlotData;
