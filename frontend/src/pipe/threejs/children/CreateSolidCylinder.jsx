import React,{useRef}  from 'react'
import { useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

import * as THREE from 'three'

  
 export  const CreateSolidCylinder = ({radius,lenght=5, position=[0,0,0],color="rgb(250,250,250)"}) => {

    const texture = useTexture("/imgs/water.png")
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
 
    const material = new THREE.MeshBasicMaterial({ color: color , 
      side: THREE.DoubleSide,
      transparent: true, 
      opacity: 0.35, 
      map: texture })


    const geo = new THREE.CylinderGeometry(radius, radius, lenght, 30, 1)
    const mesh = new THREE.Mesh(geo, material)
    mesh.position.set(...position)
    mesh.rotation.x = Math.PI/2

    const meshRef = useRef()
    useFrame((state, delta) => {
      // Desplazar la textura en el eje U (horizontal)
      // use modulo to repeat the texture
      material.map.offset.y = (material.map.offset.y - 0.0025)

  // id = "spiras" html element <p id="spiras">{JSON.stringify(spiras)}</p>


      

    })
    return <primitive object={mesh} ref={meshRef} />
  }