import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';

export function HollowCylinderGeometryZ({ innerRadius = 0.5, outerRadius = 1, radialSegments = 64, height = 3, ...props }) {
  const meshRef = useRef();

  // Crear geometría personalizada
  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(outerRadius, 0);
    shape.absarc(0, 0, outerRadius, 0, Math.PI * 2, false);

    const holePath = new THREE.Path();
    holePath.moveTo(innerRadius, 0);
    holePath.absarc(0, 0, innerRadius, 0, Math.PI * 2, true);
    shape.holes.push(holePath);

    const extrudeSettings = {
      steps: 4,
      depth: height,
      bevelEnabled: false,
    };
    console.log("extrudeSettings",extrudeSettings)

    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);

    // Aquí es donde ajustarías los vértices para cambiar el radio a lo largo de la altura

    console.log("Geometry",geometry)

    // for (let i = 0; i < geometry.vertices.length; i++) {
    //   const vertex = geometry.vertices[i];
    //   // Aquí puedes aplicar tu lógica para variar el radio, por ejemplo:
    //     vertex.x *= 1 + (vertex.y / height) ;
    //     vertex.z *= 1 + (vertex.y / height) ;
    //   // Asegúrate de adaptar esta lógica a tus necesidades específicas
    // }


    var positions = geometry.attributes.position.array;
    // positions[0] += 0.1; // Mueve el primer vértice en la dirección X
    // positions[1] += 0.1; // Mueve el primer vértice en la dirección Y
    // positions[2] += 0.1; // Mueve el primer vértice en la dirección Z
    geometry.attributes.position.needsUpdate = true;
    
    return geometry;
  }, [innerRadius, outerRadius, radialSegments, height]);

  // Puedes usar useFrame para animaciones si es necesario

  return (
    <mesh ref={meshRef} geometry={geometry} {...props}>
    </mesh>
  );
}
