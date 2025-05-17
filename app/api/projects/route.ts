// import { prisma } from "@/lib/prisma";
// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   const body = await req.json();

//   const project = await prisma.project.create({
//     data: {
//       name: body.name,
//       description: body.description,
//       canvasWidth: body.canvasWidth,
//       canvasHeight: body.canvasHeight,
//       glbFileUrl: body.glbFileUrlsss,
//     },
//   });

//   return NextResponse.json(project);
// }


// app/api/projects/route.ts
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
