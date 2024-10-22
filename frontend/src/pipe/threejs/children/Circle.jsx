import React, { useRef,useEffect }  from 'react'
import * as THREE from 'three'


export const Circle = ({ radius = 5, numPoints = 12, z = 0 }) => {
    
    // use points 
    const points = [];
    for (let i = 0; i < numPoints; i++) {
      const angle = (i / numPoints) * Math.PI * 2;
      points.push(new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle) * radius, z));
    }

    // close the circle
    points.push(points[0]);

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    // type --
    const material = new THREE.LineBasicMaterial({ color: 'gray', linewidth: 2, linecap: 'round', linejoin: 'round' });
    const line = new THREE.Line(geometry, material);
    return <primitive object={line} />;
  }
