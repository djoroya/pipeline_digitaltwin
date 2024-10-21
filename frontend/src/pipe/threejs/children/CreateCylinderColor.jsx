import React, { useRef,useEffect } from 'react';
import * as THREE from 'three'

  function mapValueToColor(value) {

    // value in [-1,1]
    const  min = -1
    const max = 1
  const ratio = (value - min) / (max - min);
  const r = Math.max(0, 255 * (1.5 - Math.abs(ratio - 0.75) * 4))/255
  const g = Math.max(0, 255 * (1.5 - Math.abs(ratio - 0.5) * 4))/255
  const b = Math.max(0, 255 * (1.5 - Math.abs(ratio - 0.25) * 4))/255

  const color = new THREE.Color( r, g, b );
    const transparent =1;

    return ({ r: color.r, g: color.g, b: color.b, a: transparent });
    
}

  
  const gauss = (x, mu, sigma) => {
    return Math.exp(-Math.pow(x - mu, 2) / (2 * Math.pow(sigma, 2)));
  };

  export const CreateCylinderColor = ({radius,lenght=15.625,
                            thetal=2*Math.PI,
                            theta0=-Math.PI,
                            position=[0,0,0],th=0.1}) => {


    const geometryRef = useRef(); // Referencia a la geometría para actualizar sus atributos
    const htmlRef = useRef([]); // Valor por defecto

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


      useEffect(() => {
    const interval = setInterval(() => {
      const geometry = geometryRef.current;
      const html = document.getElementById('z_peeks');
      
      if (!html || !geometry) return;

      // Obtenemos los valores de z_peeks del DOM
      const z_peeks = htmlRef.current.innerText.replace('[', '').replace(']', '').split(',').map(Number);

      let minValue = -1;
      let maxValue = 1;
      const colorsx = [];

      // Recorremos la geometría para actualizar los colores
      for (let i = 0; i < geometry.attributes.position.count; i++) {
        const z = geometry.attributes.position.getZ(i);
        const value = z_peeks.map((z_peak) => gauss(z, z_peak, 0.15)).reduce((a, b) => a + b, 0) - 1 ;
        // const value = 0.5 + 0.5*Math.tanh(1000000*z);

        const color = mapValueToColor(Math.min(Math.max(minValue, value),maxValue)); // Usa la función de mapeo JET
        colorsx.push(color.r, color.g, color.b);
      }

      geometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(colorsx), 3));
      geometry.attributes.color.needsUpdate = true;
    }, 1000); // Actualiza cada 1 segundo

    // Cleanup para detener el intervalo si el componente se desmonta
    return () => clearInterval(interval);
  }, []); 


    const material = new THREE.MeshLambertMaterial({ 
              side: THREE.DoubleSide, transparent: false, 
              vertexColors: true })

    const material_w = new THREE.MeshLambertMaterial({
      color: 'rgb(205,205,205)',
      transparent: true,
      opacity: 0.2,
              side: THREE.DoubleSide, wireframe: true})
    const geo_outer = new THREE.CylinderGeometry(radius+th, radius+th, lenght, 18, 100, true, theta0, thetal)

    // geo rotate [Math.PI/2,0,0]
    geo_outer.rotateX(Math.PI/2)
    // set position
    geo_outer.translate(position[0],position[1],position[2])
    return <>

    <mesh material={material}>
      <primitive attach="geometry" object={geo_outer}  ref={geometryRef} />
    </mesh>
 
 
    <mesh material={material_w}>
      <primitive attach="geometry" object={geo_outer} />
    </mesh>
    </>
  }
