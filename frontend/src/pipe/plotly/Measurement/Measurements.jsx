import React from 'react';
import { CylinderHole } from "../../../pipe/threejs/CylinderHole";
import BarPlot from './BarPlot';
import PressurePlot from './PressurePlot';
const Measurements = () => {


    return (

            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
            <PressurePlot/>

            <div style={{paddingLeft: '20px'}}>
            <p className='pt-5' style={{textAlign: 'center', fontSize: '1.25rem'}}>Broken Coils</p>
            <CylinderHole coil={1/100} width={"700px"} height={"300px"} />



            </div>


            {/* <BarPlot data_list={data_list} /> */}

            </div>
    );
};

export default Measurements;
