

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

  const title = "Pipeline Digital Twin";
  const Logo = "https://amsimulation.com/wp-content/uploads/2024/10/advanced_material_simulation.png";
  const Nav = () => {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">
          <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
            <h3>{title}</h3>
            <div className='ml-3'>
                <img src={Logo} width="30" height="30" className="d-inline-block align-top" alt="" />
            </div>
          </div>

        </a>
      </nav>
    );
  }


    return (
      <>
      <Nav /> 
            <div className='mt-5 container text-center'>

            <FetchData />

              <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>


              </div>
              <CylinderHole coil={1/200}></CylinderHole>


            </div>


      </>
    );
  }


export default App
