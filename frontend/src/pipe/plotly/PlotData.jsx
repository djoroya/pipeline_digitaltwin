import React,{useRef} from 'react';
import Measurements from './Measurement/Measurements';
import DigitalTwin from './DigitalTwin/DigitalTwin';
import Card from '@mui/material/Card';
// Card Header
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
// css 
import './PlotData.css';
import Xarrow from "react-xarrows";

const boxStyle = {
    border: "grey solid 2px",
    borderRadius: "10px",
    padding: "5px",
};

const PlotData = () => {

    const box1Ref = useRef(null);
    const box2Ref = useRef(null);
    const box3Ref = useRef(null);

    return (
        <>
        <div className='row' style={{ justifyContent: 'center',paddingTop:'0px',paddingLeft:'0px',paddingRight:'0px'}}>
        
            <div className='col-5 vh-100' ref={box1Ref}>
                <Card variant="outlined" style={{ height: '79.5vh' }} className='rounded shadow'>
                    <CardHeader title="Measurements" style={{ backgroundColor: 'rgb(24, 99, 220)', color: 'white' }} />
                    <CardContent >
                    <Measurements />
                    </CardContent>
                </Card>
            </div>

            {/* <div  ref={box3Ref}  className='col-1' style={{  paddingTop: '433px', justifyContent: 'center', display: 'flex' }}>

                <div
                    style={{ backgroundColor: 'rgb(24, 99, 220)', 
                                border : '2px solid black',
                                 height   : '100px', 
                                 width: '100px', 
                                 borderRadius: '60%', 
                                 paddingTop: '20px' }}>

                    <img src="https://amsimulation.com/wp-content/uploads/2024/10/advanced_material_simulation.png" alt=""  
                    style={{width: '60px', height: '50px'}}/>
                </div>           
             </div> */}

            <div className='col-5' id='to' ref={box2Ref}>
                <Card variant="outlined" style={{ height: '79.5vh' }} className='rounded shadow' >
                    <CardHeader title="Stress & Forecasting" style={{ backgroundColor: 'rgb(24, 99, 220)', color: 'white' }} />
                    <DigitalTwin />
                </Card>
            </div>

        </div>

        {/* <Xarrow start={box1Ref} end={box3Ref} color='black' strokeWidth={2} curveness={0.0} />
        <Xarrow start={box3Ref} end={box2Ref} color='black' strokeWidth={2} curveness={0.0} /> */}

        </>

    );
};

export default PlotData;
