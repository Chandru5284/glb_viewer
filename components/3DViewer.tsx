"use client"

import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { useState } from 'react'
import { OrbitControls, useGLTF } from '@react-three/drei'
import * as THREE from 'three'
// import { AnnotationForm } from './AnnotationForm';
import AnnotationMarker from './AnnotationMarker';
import AnnotationForm from './AnnotationForm';

export function ViewerCanvas({ glbUrl, projectId }: { glbUrl: string; projectId: string }) {
  const [annotations, setAnnotations] = useState<any[]>([])
  const [clickPosition, setClickPosition] = useState<THREE.Vector3 | null>(null)

  const handleClick = (event: any) => {
    const { camera, scene } = event
    const mouse = new THREE.Vector2()
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

    const raycaster = new THREE.Raycaster()
    raycaster.setFromCamera(mouse, camera)

    const intersects = raycaster.intersectObjects(scene.children, true)

    if (intersects.length > 0) {
      const point = intersects[0].point
      setClickPosition(point)
    }
  }

  return (
    <>
      <Canvas onClick={handleClick}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Model url={glbUrl} />
        <OrbitControls />
        {annotations.map((ann, i) => (
          <AnnotationMarker key={i} position={[ann.x, ann.y, ann.z]} />
        ))}
      </Canvas>

      {clickPosition && (
        <AnnotationForm
          position={clickPosition}
          projectId={projectId}
          onDone={() => setClickPosition(null)}
        />
      )}
    </>
  )
}

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url)
  return <primitive object={scene} />
}
