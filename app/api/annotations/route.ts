import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const data = await req.json()
  const annotation = await prisma.annotation.create({
    data: {
      title: data.title,
      description: data.description,
      positionX: data.positionX,
      positionY: data.positionY,
      positionZ: data.positionZ,
      projectId: data.projectId,
    },
  })
  return NextResponse.json(annotation)
}


