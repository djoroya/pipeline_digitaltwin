import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { TextureLoader } from 'three';
import * as THREE from 'three';

function WaterPipe() {
  const pipeRef = useRef();
  const textureLoader = new TextureLoader();

  // Crear una textura para el agua

  // Animar el flujo del agua
  useFrame((state, delta) => {
    pipeRef.current.rotation.z += delta * 0.25; // Hace que el tubo gire
  });

  return (
    <mesh ref={pipeRef} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
      <cylinderGeometry args={[1.5, 1.5, 5, 32]} /> {/* Diámetro y longitud del tubo */}
      <meshStandardMaterial  transparent={false} opacity={0.6} />
    </mesh>
  );
}

function PipeScene() {
  return (
    <Canvas style={{ height: '400px', width: '600px' }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <WaterPipe />
    </Canvas>
  );
}

export default PipeScene;
