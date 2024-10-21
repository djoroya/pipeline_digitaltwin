import {useFrame, useThree } from '@react-three/fiber'


export function CameraRotator() {
  // Obtiene la cámara y el gl (renderer) del contexto de Three.js
  const { camera, gl } = useThree();

  // useRef se usa para mantener una referencia al objeto que queremos modificar en el bucle de animación.
  // En este caso, queremos modificar la cámara, pero como ya la tenemos desde useThree, no necesitamos crear una ref aquí.

  // useFrame se ejecuta en cada cuadro (frame) del bucle de animación
  useFrame((state, delta) => {
    // Puedes ajustar la velocidad de rotación modificando el valor 0.5.
    camera.position.x = Math.sin(0.25*state.clock.elapsedTime) * 4;
    camera.position.z = Math.cos(0.25*state.clock.elapsedTime) * 4;
    camera.lookAt(0, 0, 0); // Asegura que la cámara siempre mire hacia el origen (0, 0, 0)
  });

  return null; // Este componente no renderiza nada por sí mismo.
}
