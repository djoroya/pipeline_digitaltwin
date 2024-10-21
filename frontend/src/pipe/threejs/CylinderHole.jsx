import React, { useRef,useEffect }  from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { HelixCurve} from './children/HelixCurve'
import { CreateCylinder } from './children/CreateCylinder'
import { CreateSolidCylinder } from './children/CreateSolidCylinder'
import { Torus } from './children/Torus'

export function CylinderHoleOnly() {


  const coil = 1/150               
  const cycles = 1/coil 

  const  ArrowCircle = ({ radius = 5, numArrows = 12,z=0,color,sign=1,lenght=0.5 }) => {
    const groupRef = useRef();
  
    useEffect(() => {
      const group = groupRef.current;
      const angleStep = (Math.PI * 2) / numArrows; // Dividir el círculo en partes iguales
  
      for (let i = 0; i < numArrows; i++) {
        const angle = i * angleStep; // Ángulo para cada flecha
        const x = Math.cos(angle) * radius; // Coordenada X en el borde del círculo
        const y = Math.sin(angle) * radius; // Coordenada Y en el borde del círculo
  
        // Crear un vector que apunte hacia afuera (misma dirección que el punto en el círculo)
        const direction = new THREE.Vector3(sign*x, sign*y, 0).normalize(); 
  
        // Crear la flecha usando ArrowHelper
        const arrow = new THREE.ArrowHelper(direction, new THREE.Vector3(x, y, z), lenght, color, 0.1, 0.15);
  
        // Añadir la flecha al grupo
        group.add(arrow);
      }
    }, [radius, numArrows]);
  
    return <group ref={groupRef} />;
  }

  // create a circle 1d

  const Circle = ({ radius = 5, numPoints = 12, z = 0 }) => {
    
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



  const zlong = 15.625

  const radiusfactor  = 4
  return (
    <>
      {/* <CameraRotator /> */}
      <color attach="background" args={['white']} />
       
      <OrbitControls />
      
       <CreateCylinder radius={radiusfactor*0.65}  lenght={1.1*zlong} position={[0,0,0]} color="rgb(210,210,210)" />


        <CreateCylinder radius={radiusfactor*0.85}  theta0={Math.PI + 1.5} thetal={0.9*2*Math.PI}  position={[0,0,0]}  lenght={zlong} th={0.05}></CreateCylinder> 
        
        
        <CreateSolidCylinder radius={radiusfactor*0.65} position={[0,0,0]} lenght={1.25*zlong} color="rgb(210,210,210)"></CreateSolidCylinder>
      
      <HelixCurve radius={radiusfactor*0.8} cycles={cycles} h={zlong} linewidth={0.02} />


      <ArrowCircle radius={radiusfactor*0.45} numArrows={15} z ={0.58*zlong} color="red" lenght={0.5}/>
      <ArrowCircle radius={radiusfactor*0.8} numArrows={15}  z ={0.58*zlong} color="blue" sign={-1} lenght={0.5}/>

      <ArrowCircle radius={radiusfactor*0.45} numArrows={15} z ={-0.58*zlong} color="red" lenght={0.5}/>
      <ArrowCircle radius={radiusfactor*0.8} numArrows={15}  z ={-0.58*zlong} color="blue" sign={-1} lenght={0.5}/>

       <ambientLight intensity={1.0} />
        <Circle radius={0.65} numPoints={30} z={2.7} />
        <Circle radius={0.65} numPoints={30} z={-2.7} />
        <Torus radius={radiusfactor*0.9} tube={0.2} color="gray" z = {0.5*zlong} />
        <Torus radius={radiusfactor*0.9} tube={0.2} color="gray" z = {-0.5*zlong} />
    </>
  )
}

export function CylinderHole({ coil,height="400px", width="600px"}) {


  const angle = 0
  const rcam = -20.5
  const xcam = rcam*Math.cos(angle)
  const ycam = rcam*Math.sin(angle)
  return (
    <Canvas camera={{ position: [xcam, ycam, -5], fov: 35, near: 0.5, far: 200 }}
    style={{ height:height, width: width}}>
      <CylinderHoleOnly coil={coil} />
    </Canvas>
  )
}