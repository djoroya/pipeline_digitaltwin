import React, { useRef,useEffect } from 'react';
import * as THREE from 'three'

function mapValueToColor(value) {
    const red_1 =  0/255
    const green_1 = 30/255
    const blue_1 =240/255

    // // gray
    // const red_2 = 145/255
    // const green_2 = 134/255
    // const blue_2 = 125/255

    const red_2 = 255/255
    const green_2 = 0/255
    const blue_2 = 0/255

    const color = new THREE.Color( value < 0.5 ? red_1 : red_2, 
                                   value < 0.5 ? green_1 : green_2, 
                                   value < 0.5 ? blue_1 : blue_2 );
    const transparent =1;

    return ({ r: color.r, g: color.g, b: color.b, a: transparent })
    
}

  
export const HelixCurve = ({ radius, cycles, h, linewidth }) => {
  const gauss = (x, mu, sigma) => {
    return Math.exp(-Math.pow(x - mu, 2) / (2 * Math.pow(sigma, 2)));
  };

  // Ref para almacenar z_peeks
  const htmlRef = useRef([]); // Valor por defecto
  const geometryRef = useRef(); // Referencia a la geometría para actualizar sus atributos

  // useEffect para verificar la existencia de z_peeks en el DOM
  useEffect(() => {
    const interval = setInterval(() => {
      const html = document.getElementById('z_peeks');
      if (html) {
        htmlRef.current = html; // Actualiza el valor en el ref
        clearInterval(interval); // Detenemos el intervalo al encontrar el elemento
      }
    }, 100); // Verificamos cada 100ms

    // Cleanup para detener el intervalo si el componente se desmonta
    return () => clearInterval(interval);
  }, []); // Solo se ejecuta una vez cuando el componente se monta

  // useFrame para actualizar la geometría y colores en cada frame
  useEffect(() => {
    const interval = setInterval(() => {
      const geometry = geometryRef.current;
      const html = document.getElementById('z_peeks');
      
      if (!html || !geometry) return;

      // Obtenemos los valores de z_peeks del DOM
      const z_peeks = htmlRef.current.innerText.replace('[', '').replace(']', '').split(',').map(Number);

      if (z_peeks.length === 0) return;

      let minValue = -1;
      let maxValue = 1;
      const colorsx = [];

      // Recorremos la geometría para actualizar los colores
      for (let i = 0; i < geometry.attributes.position.count; i++) {
        const z = geometry.attributes.position.getZ(i);
        const value = z_peeks.map((z_peak) => gauss(z, z_peak, 0.03)).reduce((a, b) => a + b, 0);

        minValue = Math.min(minValue, value);
        maxValue = Math.max(maxValue, value);

        const color = mapValueToColor(value); // Usa la función de mapeo JET
        colorsx.push(color.r, color.g, color.b);
      }

      geometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(colorsx), 3));
      geometry.attributes.color.needsUpdate = true;
    }, 1000); // Actualiza cada 1 segundo

    // Cleanup para detener el intervalo si el componente se desmonta
    return () => clearInterval(interval);
  }, []); 

  // Creación de la curva helicoidal
  const helixCurve = new THREE.Curve();
  helixCurve.getPoint = (t) => {
    const theta = cycles * 2 * Math.PI * t;
    const x = radius * Math.cos(theta);
    const y = radius * Math.sin(theta);
    const z = (t - 0.5) * h; // Ajusta la altura de la hélice
    return new THREE.Vector3(x, y, z);
  };

  // Geometría y material
  const geometry = new THREE.TubeGeometry(helixCurve, 7000, linewidth, 16, false);
  const materialLambert = new THREE.MeshLambertMaterial({
    side: THREE.DoubleSide,
    vertexColors: true
  });

  return (
    <group>
      {/* Extruir la curva para crear una superficie */}
      <mesh position={[0, 0, 0]} material={materialLambert}>
        <primitive attach="geometry" object={geometry}  ref={geometryRef} />
        </mesh>
    </group>
  );
};
