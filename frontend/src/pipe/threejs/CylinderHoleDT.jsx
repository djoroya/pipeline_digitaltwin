import React, { useRef,useEffect }  from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

//import { CreateCylinder as CreateCylinderColor} from './children/CreateCylinder'
import { CreateCylinderColor } from './children/CreateCylinderColor'
import { CreateCylinder } from './children/CreateCylinder'



import { CreateSolidCylinder } from './children/CreateSolidCylinder'
import { Torus } from './children/Torus'

export function CylinderHoleOnly() {


                                                


  const zlong = 15.625

  const radiusfactor  = 4
  return (
    <>
      {/* <CameraRotator /> */}
      <color attach="background" args={['white']} />
       
      <OrbitControls />
      
       <CreateCylinder radius={radiusfactor*0.65}  lenght={1.1*zlong} position={[0,0,0]} color="rgb(210,210,210)" />
        <CreateCylinderColor radius={radiusfactor*0.85}  position={[0,0,0]}  lenght={zlong} th={0.05}/>
        
        {/* <CreateSolidCylinder radius={radiusfactor*0.65} position={[0,0,0]} lenght={1.25*zlong} color="rgb(210,210,210)"/> */}
      
       <ambientLight intensity={1.0} />
        <Torus radius={radiusfactor*0.9} tube={0.2} color="gray" z = {0.5*zlong} />
        <Torus radius={radiusfactor*0.9} tube={0.2} color="gray" z = {-0.5*zlong} />
    </>
  )
}

export function CylinderHoleDT({ coil,height="350px", width="200px"}) {


  const angle = 0
  const rcam = -20.5
  const xcam = rcam*Math.cos(angle)
  const ycam = rcam*Math.sin(angle)
  return (
    <Canvas camera={{ position: [xcam, ycam, -6], fov: 30, near: 0.5, far: 200 }}
    style={{ height:height, width: width}}>
      <CylinderHoleOnly coil={coil} />
    </Canvas>
  )
}