

import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import PlotData from './pipe/plotly/PlotData';

import Nav from './Nav';
// css 
import './App.css'; 
const App = () => {


    return (
      <>
            <Nav /> 
            <div className='mt-5 text-center'>
             <PlotData/>
            </div>


      </>
    );
  }


export default App
