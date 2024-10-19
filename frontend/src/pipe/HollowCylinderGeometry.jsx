import React, { useMemo, useRef } from 'react'
import * as THREE from 'three'


export function HollowCylinderGeometry({ innerRadius = 0.5, 
                                    outerRadius = 1, 
                                    radialSegments = 30, 
                                    d = 0.01,
                                    height = 3, ...props }) {


  const ref = useRef()
  const { geometry } = useMemo(() => {

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
            steps: 20,
            curveSegments: radialSegments / 2,
        }
        const geometry = new THREE.ExtrudeGeometry(arcShape, options)

        // Añadir las coordenadas UV
        const uvs = []

        // Iterar a través de los vértices para mapear UVs
        const vertices = geometry.attributes.position.array
        const vertexCount = vertices.length / 3

        for (let i = 0; i < vertexCount; i++) {
          const x = vertices[i * 3]
          const y = vertices[i * 3 + 1]
          const z = vertices[i * 3 + 2]

          // Para la superficie lateral: mapear UVs en función del ángulo alrededor del eje (u) y la altura (v)
          const u = 0.2*(Math.atan2(y, x) + Math.PI) / (2 * Math.PI) // Mapeo del ángulo a [0, 1]
          const v = 0.05*(z) / height // Mapeo de la altura a [0, 1]

          uvs.push(u, v)
        }

        // Asignar las coordenadas UV a la geometría
        geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2))

        // color vertex

        for (let i = 0; i < vertexCount; i++) {
          const x = vertices[i * 3]
          const y = vertices[i * 3 + 1]
          const z = vertices[i * 3 + 2]

          // Para la superficie lateral: mapear UVs en función del ángulo alrededor del eje (u) y la altura (v)
          const u = 0.26*(Math.atan2(y, x) + Math.PI) / (2 * Math.PI) // Mapeo del ángulo a [0, 1]
          const v = 0.05*(z) / height // Mapeo de la altura a [0, 1]

          uvs.push(u, v)
        }

    return { geometry }
  }, [])

  return geometry ? <primitive ref={ref} object={geometry} {...props} /> : null
}
