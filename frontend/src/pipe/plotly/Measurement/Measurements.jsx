import React from 'react';
import { CylinderHole } from "../../../pipe/threejs/CylinderHole";
import BarPlot from './BarPlot';
import PressurePlot from './PressurePlot';
const Measurements = () => {


    return (

            <div style={{display: 'flex', 
                         flexDirection: 'column', 
                         paddingLeft : '50px',
                         justifyContent: 'center'}}>
            <PressurePlot/>

            <div style={{paddingLeft: '20px', position: 'relative'}}>
            <p className='pt-5' style={{textAlign: 'center', fontSize: '1.25rem'}}></p>
            <CylinderHole coil={1/100} width={"700px"} height={"300px"} />

            {/* legend red dot - broken coil */}
            {/* legend blue dot - heal coil */}

            <div style={{display: 'flex', 
                         flexDirection: 'row', 
                         justifyContent: 'center', 
                         position: 'absolute', 
                         top: '60px', 
                         left: '2%'}}>
                <div style={{display: 'flex', 
                             flexDirection: 'row', 
                             justifyContent: 'center', 
                             alignItems: 'center', 
                             paddingRight: '20px'}}>
                    <div style={{width: '15px', 
                                 height: '15px', 
                                 backgroundColor: 'red', 
                                 borderRadius: '50%', 
                                 marginRight: '5px'}}></div>
                    <p className='m-0'>Broken coils</p>
                </div>
                <div style={{display: 'flex', 
                             flexDirection: 'row', 
                             justifyContent: 'center', 
                             alignItems: 'center'}}>
                    <div style={{width: '15px', 
                                 height: '15px', 
                                 backgroundColor: 'blue', 
                                 borderRadius: '50%', 
                                 marginRight: '5px'}}></div>
                    <p className='m-0'> Undamaged coils</p>
                </div>

            </div>  


            </div>


            {/* <BarPlot data_list={data_list} /> */}

            </div>
    );
};

export default Measurements;
