import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const body = await req.json()
  const { name, description, canvasWidth, canvasHeight } = body

  const project = await prisma.project.create({
    data: { name, description, canvasWidth, canvasHeight },
  })

  return NextResponse.json({ id: project.id })
}
