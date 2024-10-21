import React from 'react';
import { CylinderHole } from "../../../pipe/threejs/CylinderHole";
import BarPlot from './BarPlot';
import PressurePlot from './PressurePlot';
const Measurements = () => {


    return (

            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
            <PressurePlot/>

            <div className=''>
            <CylinderHole coil={1/100} width={"800px"}/>
            </div>



            {/* <BarPlot data_list={data_list} /> */}

            </div>
    );
};

export default Measurements;
