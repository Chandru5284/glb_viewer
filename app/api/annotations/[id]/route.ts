
import { prisma } from '@/lib/prisma'
import { NextResponse, NextRequest } from 'next/server'

export async function GET(
  req: Request,
  context: any
) {
  const { projectId } = context.params

  const annotations = await prisma.annotation.findMany({
    where: { projectId },
  })

  return NextResponse.json(annotations)
}

export async function POST(
  req: NextRequest,
  context: any
) {
  const { projectId } = context.params
  const body = await req.json()

  const { title, description, position } = body

  try {
    const annotation = await prisma.annotation.create({
      data: {
        title,
        description,
        positionX: position.x,
        positionY: position.y,
        positionZ: position.z,
        projectId,
      },
    })

    return NextResponse.json(annotation)
  } catch (error) {
    console.error(error)
    return new NextResponse('Error saving annotation', { status: 500 })
  }
}

export async function PUT(
  req: NextRequest,
  context: any
) {
  const { annotationId } = context.params
  const body = await req.json()

  const { title, description, position } = body

  try {
    const updated = await prisma.annotation.update({
      where: { id: annotationId },
      data: {
        title,
        description,
        positionX: position.x,
        positionY: position.y,
        positionZ: position.z,
      },
    })

    return NextResponse.json(updated)
  } catch (error) {
    console.error(error)
    return new NextResponse('Failed to update annotation', { status: 500 })
  }
}