import React, { useLayoutEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'


export function HollowCylinderGeometry({ innerRadius = 0.5, 
                                    outerRadius = 1, 
                                    radialSegments = 64, 
                                    d = 0.01,
                                    height = 3, ...props }) {
  const ref = useRef()
  const { arcShape, options } = useMemo(() => {
    const arcShape = new THREE.Shape()
    arcShape.moveTo(outerRadius * 2, outerRadius)
    arcShape.absarc(outerRadius, outerRadius, outerRadius, 0, Math.PI * 2, false)
    const holePath = new THREE.Path()
    holePath.moveTo(outerRadius + innerRadius, outerRadius)
    holePath.absarc(outerRadius, outerRadius, innerRadius, 0, Math.PI * 2, true)
    arcShape.holes.push(holePath)
    const options = {
      depth: height,
      bevelEnabled: false,
      steps: 10,
      curveSegments: radialSegments / 2,
    }

    return { arcShape, options }
  }, [])

  const eG = <extrudeGeometry ref={ref} args={[arcShape, options]} {...props} />

  useLayoutEffect(() => {

    const geometry = ref.current
    geometry.center()
    geometry.rotateX(Math.PI * -0.5)
    geometry.rotateX(Math.PI * -0.5)
    const fq = 1
    var positions = geometry.attributes.position.array;
    positions = positions.map((v, i) => {
      if (i % 3 === 0) {
        // x
        var x = v
        var y = positions[i+1]
        var z = positions[i+2]
        var r = Math.sqrt(x*x + y*y)*(d*Math.cos(fq*z)**2+1)
        var theta = Math.atan2(y, x)

        return r * Math.cos(theta) 
      }
      if (i % 3 === 1) {
        // y
        var x = positions[i-1]
        var y = v
        var z = positions[i+1]
        var r = Math.sqrt(x*x + y*y)*(d*Math.cos(fq*z)**2+1)
        var theta = Math.atan2(y, x)

        return r * Math.sin(theta)
      }
      if (i % 3 === 2) {
        // z
        return v
      }}
    )

    geometry.attributes.position.array = positions
    geometry.attributes.position.needsUpdate = true;


  }, [])

  // animation


  // const geometry = eG.ref.current
  // var positions = geometry.attributes.position.array;

  // positions[0] += 100; // Mueve el primer vértice en la dirección X
  // positions[1] += 100; // Mueve el primer vértice en la dirección Y
  // positions[2] += 100; // Mueve el primer vértice en la dirección Z

  // // desplazamos todos los vértices en la dirección X
  // for (let i = 0; i < positions.length; i += 3) {
  //   positions[i] += 100;
  // }
  // geometry.attributes.position.needsUpdate = true;

  // geometry.computeVertexNormals();

  // console.log("eG",geometry)
  // console.log("positions",positions)

  return eG
}
