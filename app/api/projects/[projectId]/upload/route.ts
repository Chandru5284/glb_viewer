export const runtime = 'nodejs'

import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'
import streamifier from 'streamifier'


cloudinary.config({
	cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!,
	api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!,
	api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET!,
})

export async function POST(
	req: NextRequest,
	context: any
) {
	// const projectId = params.projectId
	const { projectId } = await context.params

	console.log(projectId)

	const formData = await req.formData()
	const file = formData.get('file') as File

	// return NextResponse.json({ success: true, projectId,  file})


	if (!file || !file.name.endsWith('.glb')) {
		return NextResponse.json({ error: 'Invalid file' }, { status: 400 })
	}

	const bytes = await file.arrayBuffer()
	const buffer = Buffer.from(bytes)

	try {
		// Upload to Cloudinary as raw file (for .glb)
		const uploadResult: any = await new Promise((resolve, reject) => {
			const uploadStream = cloudinary.uploader.upload_stream(
				{
					resource_type: 'raw',
					folder: 'glb_models', // optional: sets folder in Cloudinary
					public_id: `${projectId}-${file.name.replace('.glb', '')}`,
				},
				(error, result) => {
					if (error) return reject(error)
					resolve(result)
				}
			)

			streamifier.createReadStream(buffer).pipe(uploadStream)
		})

		const glbFileUrl = uploadResult.secure_url

		// Save the Cloudinary URL in DB
		await prisma.project.update({
			where: { id: projectId },
			data: { glbFileUrl },
		})

		return NextResponse.json({ success: true, glbFileUrl })
	} catch (error) {
		console.error('Cloudinary Upload Error:', error)
		return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
	}
}

