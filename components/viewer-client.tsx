
'use client'

import React, { useState } from 'react'

// import components
import { ViewerCanvas } from './ViewerCanvas'

type Props = {
	projectId: string
	glbFileUrl: string
	projectTitle: string
}

export default function ViewerClient({ projectId, glbFileUrl, projectTitle }: Props) {
	const [tab, setTab] = useState<'preview' | 'editor'>('preview')

	return (
		<div className="h-screen flex flex-col">
			<div className="flex items-center space-x-4 p-4 bg-gray-200 justify-between">
				<h1 className='font-bold text-3xl'>{projectTitle}</h1>
				<div>
					<button
						className={`px-4 py-2 rounded ${tab === 'preview' ? 'bg-blue-500 text-white' : 'bg-white'}`}
						onClick={() => setTab('preview')}
					>
						Previews
					</button>
					<button
						className={`px-4 py-2 rounded ${tab === 'editor' ? 'bg-blue-500 text-white' : 'bg-white'}`}
						onClick={() => setTab('editor')}
					>
						Editor
					</button>
				</div>
			</div>

			<div className="flex-1">
				<ViewerCanvas
					glbUrl={glbFileUrl}
					projectId={projectId}
					isEditorMode={tab === 'editor'}
					editorMode={tab}
				/>
			</div>
		</div>
	)
}
