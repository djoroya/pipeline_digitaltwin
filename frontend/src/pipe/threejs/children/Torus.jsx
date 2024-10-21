import React, { useRef,useEffect }  from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { useTexture } from '@react-three/drei'


export   const Torus = ({ radius = 5, tube = 1, radialSegments = 8, tubularSegments = 24, color = 'red',z=0 }) => {

    const textures = useTexture({
    map: "/imgs/cracked_concrete_wall_diff_4k.jpg",
    displacementMap: "/imgs/cracked_concrete_wall_disp_4k.png",
  })
    const geometry = new THREE.TorusGeometry(radius, tube, radialSegments, tubularSegments);
    const material = new THREE.MeshLambertMaterial({ 
              side: THREE.DoubleSide, transparent: false, 
              map: textures.map,
              flatShading: true,
              reflectivity: 0.5 })

    geometry.translate(0, 0, z);
    return <mesh geometry={geometry} material={material} />;
  };