import React from 'react';
import Strength from './Strength';
import StressProfile from './StressProfile';
import { CylinderHoleDT } from "../../../pipe/threejs/CylinderHoleDT";

export const DigitalTwin = () => {


    return (
            <div style={{display: 'flex', flexDirection: 'column'}}>

            {/* <CylinderHoleDT coil={1/100} width={"800px"}/> */}
            <StressProfile/>

            <Strength/>

            </div>
    );
};

export default DigitalTwin;
