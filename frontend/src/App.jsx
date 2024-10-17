

import PlotData from './PlotData';
import './App.css'
import React from 'react';
import data from './data.json';
import Scene from './Scene';
import 'bootstrap/dist/css/bootstrap.min.css';
import PipeScene from './Pipe';
import { useEffect } from 'react';
import FetchData from './FetchData';
import { CylinderHole } from "./pipe/CylinderHole";
const App = () => {

 
    return (
      <>
            <div className='container mt-5'>
            <FetchData />

              <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>


              </div>
              <CylinderHole coil={1/80}></CylinderHole>


            </div>


      </>
    );
  }


export default App
