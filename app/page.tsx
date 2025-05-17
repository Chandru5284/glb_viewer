'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

// import components
import { ProjectCreateForm } from '@/components/ProjectCreateForm'

export default function NewProjectPage() {
	const router = useRouter()

	const [form, setForm] = useState({
		name: '',
		description: '',
		canvasWidth: 800,
		canvasHeight: 600,
	})

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target
		setForm({ ...form, [name]: name.includes('canvas') ? parseInt(value) : value })
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		const res = await fetch('/api/projects', {
			method: 'POST',
			body: JSON.stringify(form),
			headers: { 'Content-Type': 'application/json' },
		})

		const data = await res.json()

		if (res.ok) {
			router.push(`/projects/${data.id}/upload`)
		} else {
			alert('Error creating project')
		}
	}

	return (

		<>

			<div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
				<div className="w-full max-w-sm md:max-w-5xl">
					<ProjectCreateForm form={form} handleSubmit={handleSubmit} handleChange={handleChange} />
				</div>
			</div>
		</>
	)
}
