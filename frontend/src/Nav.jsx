import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Box } from '@mui/material';

const Nav = ({ title }) => {
  const Logo = "https://amsimulation.com/wp-content/uploads/2024/10/advanced_material_simulation.png";

  return (
    <AppBar position="static" sx={{ backgroundColor: 'rgb(24, 99, 220)'}}>
      <Toolbar>
        <Typography variant="h3" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
          <Box component="img" src={Logo} alt="Logo" sx={{ marginLeft:  1, width: 60, height: 50 , marginRight: 2}} />
          <div style={{ fontSize: '1.5rem', color: 'white' }}>
            Advanced Material Simulation
          </div>
          
        </Typography>
        <div style={{ fontSize: '1.5rem', color: 'white' }}>
                        Prestressed Concrete Cylinder Pipe
        </div>

      </Toolbar>
    </AppBar>
  );
};

export default Nav;
