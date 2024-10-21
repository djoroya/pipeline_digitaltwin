import React from 'react';
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
        <div className='row' style={{ justifyContent: 'center' }}>
        <div className='col-5 m-5 vh-100'>
            <Card variant="outlined" style={{ height: '79.5vh' }} className='rounded shadow'>
                <CardHeader title="Measurements" style={{ backgroundColor: 'rgb(24, 99, 220)', color: 'white' }} />
                <CardContent>
                <Measurements />
                </CardContent>
            </Card>
        </div>
        <div className='col-5 m-5' >
            <Card variant="outlined" style={{ height: '79.5vh' }} className='rounded shadow'>
                <CardHeader title="Stress & Forecasting" style={{ backgroundColor: 'rgb(24, 99, 220)', color: 'white' }} />
                <DigitalTwin/>
            </Card>
        </div>

        </div>



        </>

    );
};

export default PlotData;
