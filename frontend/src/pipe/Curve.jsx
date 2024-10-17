import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three'


export const Curve = () => {
    const curveRef = useRef();
  
    useFrame(() => {
      // Puedes agregar animaciones o actualizaciones de la curva aquí
    });
  
    const curve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(-1, 0, 0),
      new THREE.Vector3(0, 2, 0),
      new THREE.Vector3(1, 0, 0)
    );
  
    return (
      <>
            <line ref={curveRef}>
        <bufferGeometry attach="geometry" {...new THREE.BufferGeometry().setFromPoints(curve.getPoints(5000))} />
        <lineBasicMaterial attach="material" color="blue" />
      </line>
      <mesh>
        <tubeBufferGeometry attach="geometry" args={[curve, 50, 0.1, 8, false]} />
      </mesh>
</>

    );
  };

// Helix curve

export const Helix = () => {
    const helixRef = useRef();
  
    useFrame(() => {
      // Puedes agregar animaciones o actualizaciones de la curva aquí
    });
  
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, -1, 0),
      new THREE.Vector3(1, 1, 0),
      new THREE.Vector3(0, 1, 1),
      new THREE.Vector3(-1, 1, 0),
      new THREE.Vector3(0, -1, 0),
    ]);
  
    const material = new THREE.LineBasicMaterial({ color: 0x00ff00 , linewidth: 2000});
    return (
      <line ref={helixRef}>
        <bufferGeometry attach="geometry" {...new THREE.BufferGeometry().setFromPoints(curve.getPoints(50))} />
        <lineBasicMaterial attach={material} color="blue" />
      </line>
    );
  }


export const HelixCurveLevel = ({radius,cycles}) => {
    const helixRef = useRef();
  
    useFrame(() => {
      // Puedes agregar animaciones o actualizaciones de la hélice aquí
    });
  
    const helixCurve = new THREE.Curve();
    helixCurve.getPoint = (t) => {
      const theta = cycles * 2 * Math.PI * t;
      const x = radius*Math.cos(theta);
      const y = radius*Math.sin(theta);
      const z = t * 2; // Ajusta la altura de la hélice
      return new THREE.Vector3(x, y, z);
    };
  
    return (
      <line ref={helixRef}>
        <bufferGeometry attach="geometry" {...new THREE.BufferGeometry().setFromPoints(helixCurve.getPoints(100))} />
        <lineBasicMaterial attach="material" color="green" linewidth={1000}/>
      </line>
    );
  };

  export const HelixCurve = ({radius,cycles,h,linewidth}) => {
    const helixRef = useRef();
  
    useFrame(() => {
      // Puedes agregar animaciones o actualizaciones de la hélice aquí
    });
  
    const helixCurve = new THREE.Curve();
    helixCurve.getPoint = (t) => {
      const theta = cycles * 2 * Math.PI * t;
      const x = radius * Math.cos(theta);
      const y = radius * Math.sin(theta);
      const z = t * h -2; // Ajusta la altura de la hélice
      return new THREE.Vector3(x, y, z);
    };
  
    // take the points from the curve and define a function to define the color of the points

    const points = helixCurve.getPoints(1000);
    const colors = points.map((point) => {
      return new THREE.Color("red");
    });

    //const Geometry = <tubeGeometry attach="geometry" args={[helixCurve, 5000, linewidth, 16, false]} /> 

    const Geometry = new THREE.TubeGeometry(helixCurve, 5000, linewidth, 16, false);
    const position_flat = Geometry.getAttribute('position');

    for (let i = 0; i < position_flat.count; i++) {
      position_flat.setXYZ(i, position_flat.getX(i), position_flat.getY(i), position_flat.getZ(i));
    }

    const materialLambert = new THREE.MeshLambertMaterial({  side: THREE.DoubleSide,vertexColors: false})

    return (
      <group>
        {/* Extruir la curva para crear una superficie */}
        <mesh position={[0, 0, 0]} material={materialLambert} geometry={Geometry}>
          
          {/* <tubeGeometry attach="geometry" args={[helixCurve, 5000, linewidth, 16, false]} /> */}
        </mesh>
      </group>
    );
  };
  