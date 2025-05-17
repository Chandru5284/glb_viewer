'use client'

import React, { useState } from 'react'

export default function AnnotationForm({
	position,
	projectId,
	onDone,
}: {
	position: { x: number; y: number; z: number }
	projectId: string
	onDone: () => void
}) {
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [loading, setLoading] = useState(false)

	const handleSubmit = async () => {
		setLoading(true)
		await fetch('/api/annotations', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				title,
				description,
				positionX: position.x,
				positionY: position.y,
				positionZ: position.z,
				projectId,
			}),
		})
		setLoading(false)
		onDone()
	}

	return (
		<div className="absolute top-4 right-4 bg-white shadow-md rounded p-4 z-50 w-72">
			<h2 className="font-bold mb-2">Add Annotation</h2>
			<input
				type="text"
				placeholder="Title"
				className="border p-1 w-full mb-2"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
			/>
			<textarea
				placeholder="Description"
				className="border p-1 w-full mb-2"
				value={description}
				onChange={(e) => setDescription(e.target.value)}
			/>
			<button
				className="bg-blue-500 text-white px-4 py-1 rounded"
				disabled={loading}
				onClick={handleSubmit}
			>
				{loading ? 'Saving...' : 'Save'}
			</button>
		</div>
	)
}
