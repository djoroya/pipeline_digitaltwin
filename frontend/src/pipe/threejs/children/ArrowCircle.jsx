
import React, { useRef,useEffect }  from 'react'
import * as THREE from 'three'

export const  ArrowCircle = ({ radius = 5, numArrows = 12,z=0,color,sign=1,lenght=0.5 }) => {
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
