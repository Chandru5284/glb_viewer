'use client'

import { Suspense, useEffect, useState } from 'react'
import AnnotationMarker from './AnnotationMarker'
import AnnotationForm from './AnnotationForm'
import { Canvas, useThree } from '@react-three/fiber'
import { Center, OrbitControls, useGLTF } from '@react-three/drei'
import * as THREE from 'three'

type Annotation = {
    id: string
    title: string
    description: string
    positionX: number
    positionY: number
    positionZ: number
}

export function ViewerCanvas({
    glbUrl,
    projectId,
    isEditorMode,
    editorMode
}: {
    glbUrl: string
    projectId: string
    isEditorMode: boolean
    editorMode: string
}) {
    const [annotations, setAnnotations] = useState<Annotation[]>([])
    const [clickPoint, setClickPoint] = useState<THREE.Vector3 | null>(null)

    useEffect(() => {
        const loadAnnotations = async () => {
            const res = await fetch(`/api/annotations/cmas7hm860001yq0v1xulji43`)
            const data = await res.json()
            setAnnotations(data)
        }
        loadAnnotations()
    }, [projectId])

    console.log(projectId, annotations)

    const refreshAnnotations = async () => {
        const res = await fetch(`/api/annotations/cmas7hm860001yq0v1xulji43`)
        const data = await res.json()
        setAnnotations(data)
    }

    return (
        <>
            <CanvasWrapperss
                glbUrl={glbUrl}
                annotations={annotations}
                setClickPoint={setClickPoint}
                isEditorMode={isEditorMode}
                editorMode={editorMode}
            />
            {clickPoint && (
                <AnnotationForm
                    position={clickPoint}
                    projectId={projectId}
                    onDone={() => {
                        setClickPoint(null)
                        refreshAnnotations()
                    }}
                />
            )}
        </>
    )
}

function CanvasWrapperss({
    glbUrl,
    annotations,
    setClickPoint,
    isEditorMode,
    editorMode
}: {
    glbUrl: string
    annotations: Annotation[]
    setClickPoint: (p: THREE.Vector3) => void
    isEditorMode: boolean
    editorMode: string
}) {
    const [focusTarget, setFocusTarget] = useState<[number, number, number] | null>(null)

    return (
        <Canvas shadows camera={{ position: [0, 2, 5], fov: 80 }}>
            <ambientLight intensity={0.5} />
            <directionalLight
                castShadow
                position={[5, 10, 5]}
                intensity={1.2}
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
            />

            <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]}>
                <planeGeometry args={[20, 20]} />
                <meshStandardMaterial color="white" />
            </mesh>

            <Suspense fallback={null}>
                {editorMode === "editor" ? (
                    <PreviewModel url={glbUrl} />
                )
                    :
                    <Model url={glbUrl} />
                }
            </Suspense>

            {annotations.map((a) => (
                <AnnotationMarker
                    key={a.id}
                    position={[a.positionX, a.positionY, a.positionZ]}
                    onClick={() => setFocusTarget([a.positionX, a.positionY, a.positionZ])}
                />
            ))}

            <CameraFocus target={focusTarget} onDone={() => setFocusTarget(null)} />
            <ClickInEditor isEditorMode={isEditorMode} setClickPoint={setClickPoint} />
            <OrbitControls />
        </Canvas>
    )
}


function CameraFocus({
    target,
    onDone,
}: {
    target: [number, number, number] | null
    onDone: () => void
}) {
    const { camera } = useThree()
    const [originalPos, setOriginalPos] = useState<THREE.Vector3 | null>(null)

    useEffect(() => {
        if (target) {
            if (!originalPos) setOriginalPos(camera.position.clone())

            const targetVec = new THREE.Vector3(...target)
            const newPos = targetVec.clone().add(new THREE.Vector3(0, 1, 2))
            camera.position.copy(newPos)
            camera.lookAt(targetVec)

            const timer = setTimeout(() => {
                if (originalPos) {
                    camera.position.copy(originalPos)
                    camera.lookAt(0, 0, 0)
                }
                setOriginalPos(null)
                onDone()
            }, 5000)

            return () => clearTimeout(timer)
        }
    }, [target])

    return null
}


function ClickInEditor({
    isEditorMode,
    setClickPoint,
}: {
    isEditorMode: boolean
    setClickPoint: (p: THREE.Vector3) => void
}) {
    const { camera, scene } = useThree()

    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            if (!isEditorMode) return

            const mouse = new THREE.Vector2(
                (event.clientX / window.innerWidth) * 2 - 1,
                -(event.clientY / window.innerHeight) * 2 + 1
            )

            const raycaster = new THREE.Raycaster()
            raycaster.setFromCamera(mouse, camera)
            const intersects = raycaster.intersectObjects(scene.children, true)
            if (intersects.length > 0) {
                setClickPoint(intersects[0].point)
            }
        }

        window.addEventListener('click', handleClick)
        return () => window.removeEventListener('click', handleClick)
    }, [camera, scene, isEditorMode])

    return null
}


import { useControls } from 'leva'

function Model({ url }: { url: string }) {
    const { scene } = useGLTF(url)

    return (
        <Center>
            <primitive object={scene} castShadow
                position={[1, 0, 0]}  // move: x=1
                rotation={[0, Math.PI / 2, 0]} // rotate: 90° on Y axis
                scale={[0.6, 0.6, 0.6]}
            />
        </Center>
    )
}

function PreviewModel({ url }: { url: string }) {
    const { scene } = useGLTF(url)

    const { position, rotation, scale } = useControls({
        position: {
            value: [0, 0, 0],
            step: 0.1,
            label: 'Position (x, y, z)'
        },
        rotation: {
            value: [0, 0, 0],
            step: 0.1,
            label: 'Rotation (radians)'
        },
        scale: {
            value: [1, 1, 1],
            step: 0.1,
            label: 'Scale'
        }
    })

    return (
        <Center>
            <primitive object={scene} castShadow
                position={position}
                rotation={rotation}
                scale={scale} />
        </Center>
    )
}
