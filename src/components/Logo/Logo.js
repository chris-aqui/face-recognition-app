import React from 'react';
import Tilt from 'react-tilt'
import './Logo.css';
import brain from './brain-100 (1).png';

const Logo = () => {
  return (
    <div>
    <Tilt className="Tilt br shadow-2" options={{ max : 35 }} style={{ height: 150, width: 150 }} >
        <div className="Tilt-inner pa3">
        <img src={brain} alt='brain logo' style={{paddingTop:'5px' }} />
        </div>
    </Tilt>
    </div>
  )
}

export default Logo;