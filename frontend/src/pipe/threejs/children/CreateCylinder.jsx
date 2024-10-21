  import React  from 'react'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'

  
  export const CreateCylinder = ({radius,lenght=15.625,
                            thetal=2*Math.PI,
                            theta0=-Math.PI,
                            position=[0,0,0],th=0.1,color="rgb(250,250,250)"}) => {


    const textures = useTexture({
    map: "/imgs/cracked_concrete_wall_diff_4k.jpg",
    displacementMap: "/imgs/cracked_concrete_wall_disp_4k.png",
  })

    const material = new THREE.MeshLambertMaterial({ 
              side: THREE.DoubleSide, transparent: true, 
              opacity: 0.95, 
              color: color,
              map: textures.map,
              flatShading: true,
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
