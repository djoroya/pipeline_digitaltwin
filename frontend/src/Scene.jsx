import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

function RotatingBox(props) {
  const mesh = useRef();

  // Rotación animada
  useFrame(() => {
    mesh.current.rotation.x += 0.01;
    mesh.current.rotation.y += 0.01;
  });

  const geometry_cilindro = new THREE.CylinderGeometry( 5, 5, 20, 32 );

  return (
    <>
    <mesh {...props} ref={mesh}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={'orange'} />
    </mesh>
    <mesh {...props} ref={mesh} geometry={geometry_cilindro}>
      <meshStandardMaterial color={'orange'} />
    </mesh>

    </>
    

  );
}

const Scene = () => {
  return (
    <Canvas style={{height: '400px' , width: '600px'}}>
      {/* Luz para la escena */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />

      {/* Caja rotatoria */}
      <RotatingBox position={[-1.2, 0, 0]} />
      <RotatingBox position={[1.2, 0, 0]} />
    </Canvas>
  );
};

export default Scene;
