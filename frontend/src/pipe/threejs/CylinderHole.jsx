import React, { useRef,useEffect }  from 'react'
import { Canvas,useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { HelixCurve} from './children/HelixCurve'
import { CreateCylinder } from './children/CreateCylinder'
import { CreateSolidCylinder } from './children/CreateSolidCylinder'
import { Torus } from './children/Torus'
import { Circle } from './children/Circle'
import { ArrowCircle } from './children/ArrowCircle'

export function CylinderHole({ height="400px", width="600px"}) {


  const coil = 1/150               
  const cycles = 1/coil 


  const angle = -0.0*Math.PI
  const rcam = -20.5
  const xcam = rcam*Math.cos(angle)
  const ycam = rcam*Math.sin(angle)
  const zlong = 15.625

  const radiusfactor  = 4.5

 
  const camera = { position: [xcam, ycam, 3], fov: 30, near: 0.5, far: 100 }

  return (
    <Canvas 
            camera={camera}
            style={{height: height, width: width}}>

      <ambientLight intensity={1.25} />

      
      <color attach="background" args={['white']} />

      <OrbitControls />
      <CreateCylinder radius={radiusfactor*0.8}  lenght={1.15*zlong} position={[0,0,0]} color="rgb(210,210,210)" />


      <CreateCylinder radius={radiusfactor*0.85}  theta0={Math.PI + 1.5} thetal={0.9*2*Math.PI}  position={[0,0,0]}  lenght={zlong} th={0.05}></CreateCylinder> 
        
        
      <CreateSolidCylinder radius={radiusfactor*0.8} position={[0,0,0]} lenght={1.25*zlong} color="rgb(210,210,210)"></CreateSolidCylinder>
      
      <HelixCurve radius={radiusfactor*0.85} cycles={cycles} h={zlong} linewidth={0.025} />


      <ArrowCircle radius={radiusfactor*0.45} numArrows={15} z ={0.625*zlong} color="red" lenght={0.5}/>
      <ArrowCircle radius={radiusfactor*0.8} numArrows={15}  z ={0.625*zlong} color="blue" sign={-1} lenght={0.5}/>

      <ArrowCircle radius={radiusfactor*0.45} numArrows={15} z ={-0.625*zlong} color="red" lenght={0.5}/>
      <ArrowCircle radius={radiusfactor*0.8} numArrows={15}  z ={-0.625*zlong} color="blue" sign={-1} lenght={0.5}/>

      <Circle radius={0.65} numPoints={30} z={2.7} />
      <Circle radius={0.65} numPoints={30} z={-2.7} />
      <Torus radius={radiusfactor*0.9} tube={0.2} color="gray" z = {0.5*zlong} />
      <Torus radius={radiusfactor*0.9} tube={0.2} color="gray" z = {-0.5*zlong} />


    </Canvas>
  )
}






