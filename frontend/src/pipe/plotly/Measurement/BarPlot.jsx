import React from 'react';
import Plot from 'react-plotly.js';

const BarPlot = ({ data_list }) => {


    // graph bar plot 
    const spiras = data_list[data_list.length-1].spiras;
    const spiras_adj = spiras.map((x) => x);
    const arange = data_list[data_list.length-1].arange;



    const databar = {
        x: arange,
        y: spiras_adj,
        type: 'bar',
        name: 'Broken coils',
        marker: { color: 'blue' },
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


    const zlong = 15.625/2

    const zlim = [-zlong, zlong]
    return (

            <Plot
                data={[databar]}
                layout={ {...layout, 
                    yaxis: { title: 'Broken Coils', range: [0, 1.0],domain: [0.0, 0.2]},
                    xaxis: { title: 'z[m]',range: zlim},
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

export default BarPlot;
