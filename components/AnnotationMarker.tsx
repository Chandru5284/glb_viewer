
'use client'

import { Html } from '@react-three/drei'

export default function AnnotationMarker({
	position,
	onClick,
}: {
	position: [number, number, number]
	onClick?: () => void
}) {
	return (
		<mesh position={position} onClick={(e) => {
			e.stopPropagation()
			onClick?.()
		}}>
			<sphereGeometry args={[0.05, 16, 16]} />
			<meshStandardMaterial color="red" />
			<Html distanceFactor={10}>
				<div style={{ background: 'white', padding: '4px', borderRadius: '4px' }}>
					📍
				</div>
			</Html>
		</mesh>
	)
}
