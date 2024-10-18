import React  from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { HelixCurve} from './Curve'
// import { HollowCylinderGeometryZ as  HollowCylinderGeometry} from './HollowCylinderGeometryZ'
import { HollowCylinderGeometry} from './HollowCylinderGeometry'


export function CylinderHole({ coil ,height="400px", width="1200px"}) {
  
  const materialLambert    = new THREE.MeshLambertMaterial({ color: "blue" , side: THREE.DoubleSide})
  const materialBasicGreen = new THREE.MeshLambertMaterial({ color: "gray" , side: THREE.DoubleSide, transparent: true, opacity: 0.2})
  const materialBasicRed = new THREE.MeshLambertMaterial({ color: "red" , side: THREE.DoubleSide, transparent: true, opacity: 0.1})

  const cycles = 1/coil 
  const h = 4

  const camera = new THREE.PerspectiveCamera( 75, 1, 0.1, 1000 );

  return (
    <Canvas camera={{ position: [2.5, 1.5, 2.6], fov: 75, near: 0.1, far: 1000 }} 
    style={{ height:height, width: width}}>
      {/* <CameraRotator /> */}
      <color attach="background" args={['white']} />
       
      <OrbitControls />
      
      <mesh material={materialLambert}>
        <HollowCylinderGeometry innerRadius={0.5} outerRadius={0.6} height={h}  d={0.1}/>
        {/* lighting */}
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
      </mesh>

      <mesh material={materialBasicGreen}>
        <HollowCylinderGeometry  height={h} innerRadius={0.615} outerRadius={0.8} d={0.1} />
        {/* lighting */}
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
      </mesh>      

      <mesh material={materialBasicRed}>
        <HollowCylinderGeometry  height={h} innerRadius={0.81} outerRadius={0.85} d={0.1} />
        {/* lighting */}
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
      </mesh>      

      <mesh material={materialBasicGreen}>
        <HollowCylinderGeometry  height={h} innerRadius={0.86} outerRadius={0.9} d={0.1} />
        {/* lighting */}
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
      </mesh>      

      <HelixCurve radius={0.75} cycles={cycles} h={4} linewidth={0.008} />

    </Canvas>
  )
}
