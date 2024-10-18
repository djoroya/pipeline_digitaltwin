import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three'

function mapValueToColor(value) {
    const fourValue = 4 * value;
    const red = Math.min(fourValue - 1.5, -fourValue + 4.5);
    const green = Math.min(fourValue - 0.5, -fourValue + 3.5);
    const blue = Math.min(fourValue + 0.5, -fourValue + 2.5);
    return new THREE.Color(
        Math.max(0, Math.min(1, red)),
        Math.max(0, Math.min(1, green)),
        Math.max(0, Math.min(1, blue))
    );
}

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


    //const Geometry = <tubeGeometry attach="geometry" args={[helixCurve, 5000, linewidth, 16, false]} /> 

    const geometry = new THREE.TubeGeometry(helixCurve, 5000, linewidth, 16, false);
    var position = geometry.attributes.position;
    var color = geometry.attributes.color;

    
        function F(x, y, z) {
            return 1*Math.cos(z) ;
        }

        let minValue = -1;
        let maxValue = 1;
        // Calcula los colores
        const colorsx = [];
        for (let i = 0; i < geometry.attributes.position.count; i++) {
            const x = geometry.attributes.position.getX(i);
            const y = geometry.attributes.position.getY(i);
            const z = geometry.attributes.position.getZ(i);

            const value = F(x, y, z);
            if (value < minValue) minValue = value;
            if (value > maxValue) maxValue = value;
            const color = mapValueToColor(value); // Usa la función de mapeo JET

            colorsx.push(color.r, color.g, color.b);          
        }


        // Crea el atributo de color y lo asigna a la geometría
        geometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(colorsx), 3));

        geometry.attributes.color.needsUpdate = true;




    const materialLambert = new THREE.MeshLambertMaterial({  side: THREE.DoubleSide,vertexColors: true})

    return (
      <group>
        {/* Extruir la curva para crear una superficie */}
        <mesh position={[0, 0, 0]} material={materialLambert} geometry={geometry}>
          
          {/* <tubeGeometry attach="geometry" args={[helixCurve, 5000, linewidth, 16, false]} /> */}
        </mesh>
      </group>
    );
  };
  