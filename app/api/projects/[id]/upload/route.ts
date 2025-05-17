import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import path from 'path'
import { writeFile } from 'fs/promises'
import { mkdir } from 'fs/promises'

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const projectId = params.id

  const formData = await req.formData()
  const file = formData.get('file') as File

  if (!file || !file.name.endsWith('.glb')) {
    return NextResponse.json({ error: 'Invalid file' }, { status: 400 })
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const uploadDir = path.join(process.cwd(), 'public', 'uploads')

  await mkdir(uploadDir, { recursive: true })

  const fileName = `${projectId}-${file.name}`
  const filePath = path.join(uploadDir, fileName)
  await writeFile(filePath, buffer)

  const glbFileUrl = `/uploads/${fileName}`

  await prisma.project.update({
    where: { id: projectId },
    data: { glbFileUrl },
  })

  return NextResponse.json({ success: true })
}
