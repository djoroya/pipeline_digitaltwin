

import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import FetchData from './pipe/plotly/FetchData';
import Nav from './Nav';
// css 
import './App.css'; 
const App = () => {




    return (
      <>
            <Nav /> 
            <div className='mt-5 text-center'>

            <FetchData />
            </div>


      </>
    );
  }


export default App
