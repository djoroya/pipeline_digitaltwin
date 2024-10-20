import React, { useRef,useEffect }  from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls,useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { HelixCurve} from './Curve'
// import { HollowCylinderGeometryZ as  HollowCylinderGeometry} from './HollowCylinderGeometryZ'
import { HollowCylinderGeometry} from './HollowCylinderGeometry'

import { EXRLoader } from 'three/examples/jsm/loaders/EXRLoader.js';

  



export function CylinderHoleOnly({coil}) {


  
  const textures = useTexture({
    map: "/imgs/cracked_concrete_wall_diff_4k.jpg",
    displacementMap: "/imgs/cracked_concrete_wall_disp_4k.png",
    roughnessMap: "/imgs/cracked_concrete_wall_diff_4k.jpg",
  })


  // water cilinder 

  const CreateCylinder = ({radius,lenght=15.625,
                            thetal=2*Math.PI,
                            theta0=-Math.PI,
                            position=[0,0,0],th=0.1,color="rgb(250,250,250)"}) => {
    const material = new THREE.MeshLambertMaterial({ 
              side: THREE.DoubleSide, transparent: true, 
              opacity: 0.8, 
              color: color,
              map: textures.map,
              flatShading: true,
              roughness: 0.5,
              roughnessMap: textures.roughnessMap,
              reflectivity: 0.5 })
    
    const geo_inner = new THREE.CylinderGeometry(radius, radius, lenght, 30, 1, true, theta0, thetal)
    const geo_outer = new THREE.CylinderGeometry(radius+th, radius+th, lenght, 30, 1, true, theta0, thetal)
    
    // add thickness to the cylinder
    // 
    
    const mesh_inner = new THREE.Mesh(geo_inner, material)
    const mesh_outer = new THREE.Mesh(geo_outer, material)
    
    // create disk to close the cylinder
    const disk_1 = new THREE.RingGeometry(radius, radius+th, 30, 1,  theta0,thetal)
    const diskMesh_1 = new THREE.Mesh(disk_1, material)

    diskMesh_1.position.z = lenght/2 + position[2]

    const disk_2 = new THREE.RingGeometry(radius, radius+th, 30, 1,theta0,thetal)
    const diskMesh_2 = new THREE.Mesh(disk_2, material)

    diskMesh_2.position.z = -lenght/2 + position[2]
    
    mesh_inner.position.set(...position)
    mesh_outer.position.set(...position)

    // rotate the cylinder
    mesh_inner.rotation.x = Math.PI/2
    mesh_outer.rotation.x = Math.PI/2
    return <>
    <primitive object={mesh_inner} />
    <primitive object={mesh_outer} />
    <primitive object={diskMesh_1} />
    <primitive object={diskMesh_2} />

    </>
  }


  const CreateSolidCylinder = ({radius,lenght=5, position=[0,0,0],color="rgb(250,250,250)"}) => {

    const texture = useTexture("/imgs/water.png")
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    // texture.repeat.set(5, 5);  // Ajusta estos valores según necesites para escalar la textura
 
    const material = new THREE.MeshBasicMaterial({ color: color , side: THREE.DoubleSide,
       transparent: true, opacity: 0.7, map: texture, roughness: 0.5, reflectivity: 0.5 })


    const geo = new THREE.CylinderGeometry(radius, radius, lenght, 30, 1)
    const mesh = new THREE.Mesh(geo, material)
    mesh.position.set(...position)
    mesh.rotation.x = Math.PI/2

    const meshRef = useRef()
    useFrame((state, delta) => {
      // Desplazar la textura en el eje U (horizontal)
      // use modulo to repeat the texture
      material.map.offset.y = (material.map.offset.y + 0.0025)

  // id = "spiras" html element <p id="spiras">{JSON.stringify(spiras)}</p>


      

    })
    return <primitive object={mesh} ref={meshRef} />
  }

                                                
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
        const arrow = new THREE.ArrowHelper(direction, new THREE.Vector3(x, y, z), lenght, color, 0.1, 0.075);
  
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

  const radiusfactor  = 2
  return (
    <>
      {/* <CameraRotator /> */}
      <color attach="background" args={['white']} />
       
      <OrbitControls />
      
        <CreateCylinder radius={radiusfactor*0.65}  lenght={zlong} position={[0,0,0]} color="rgb(210,210,210)" />
        <CreateCylinder radius={radiusfactor*0.85}  position={[0  , 0 ,-0.9*(1/3)*zlong]} lenght={(1/3)*zlong} th={0.05}></CreateCylinder>
        <CreateCylinder radius={radiusfactor*0.85}  position={[0  , 0 , 0.9*(1/3)*zlong]} lenght={(1/3)*zlong} th={0.05}></CreateCylinder>
        <CreateCylinder radius={radiusfactor*0.85} thetal={0.7*2*Math.PI}  position={[0,0,0]}  lenght={0.8*(1/3)*zlong} th={0.05}></CreateCylinder>
        <CreateSolidCylinder radius={radiusfactor*0.65} position={[0,0,0]} lenght={1.05*zlong} color="rgb(210,210,210)"></CreateSolidCylinder>
      
      <HelixCurve radius={radiusfactor*0.8} cycles={cycles} h={zlong} linewidth={0.02} />


      <ArrowCircle radius={radiusfactor*0.45} numArrows={15} z ={0.5*zlong} color="red" lenght={0.175}/>
      <ArrowCircle radius={radiusfactor*0.8} numArrows={15}  z ={0.5*zlong} color="blue" sign={-1} lenght={0.175}/>

      <ArrowCircle radius={radiusfactor*0.45} numArrows={15} z ={-0.5*zlong} color="red" lenght={0.175}/>
      <ArrowCircle radius={radiusfactor*0.8} numArrows={15}  z ={-0.5*zlong} color="blue" sign={-1} lenght={0.175}/>

       <ambientLight intensity={1.0} />
        <Circle radius={0.65} numPoints={30} z={2.7} />
        <Circle radius={0.65} numPoints={30} z={-2.7} />
    </>
  )
}

export function CylinderHole({ coil,height="400px", width="1200px"}) {

  return (
    <Canvas camera={{ position: [5.5, 1.5, 2.6], fov: 25, near: 0.1, far: 1000 }} 
    style={{ height:height, width: width}}>
      <CylinderHoleOnly coil={coil} />
    </Canvas>
  )
}