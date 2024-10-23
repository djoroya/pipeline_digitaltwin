import React,{useRef} from 'react';
import Measurements from './Measurement/Measurements';
import DigitalTwin from './DigitalTwin/DigitalTwin';
import Card from '@mui/material/Card';
// Card Header
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
// css 
import './PlotData.css';

const PlotData = () => {


    return (
        <>
        <div className='row' style={{ justifyContent: 'center',paddingTop:'0px',paddingLeft:'0px',paddingRight:'0px'}}>
        
            <div className='col-5 vh-100'>
                <Card variant="outlined" style={{ height: '79.5vh' }} className='rounded shadow'>
                    <CardHeader title="Measurements" style={{ backgroundColor: 'rgb(24, 99, 220)', color: 'white' }} />
                    <CardContent >
                    <Measurements />
                    </CardContent>
                </Card>
            </div>

            <div className='col-5' >
                <Card variant="outlined" style={{ height: '79.5vh' }} className='rounded shadow' >
                    <CardHeader title="Stress & Forecasting" 
                                style={{ backgroundColor: 'rgb(24, 99, 220)', 
                                         color: 'white' }} />
                    <div className='pt-5' style={{paddingLeft:'40px'}}>
                      <DigitalTwin />
                    </div>
                </Card>
            </div>

        </div>


        </>

    );
};

export default PlotData;
