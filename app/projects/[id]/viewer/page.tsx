
// import lib
import { prisma } from '@/lib/prisma'

// import components
import ViewerClient from '../../../../components/viewer-client'

export default async function ViewerPage({ params }: { params: Promise<{ id: string }> }) {

    const { id: paramsId } = await params

    const project = await prisma.project.findUnique({
        where: { id: paramsId },
        include: { annotations: true },
    })

    if (!project) return <div>Project not found</div>

    return (
        <ViewerClient
            projectId={project.id}
            glbFileUrl={project.glbFileUrl!}
            projectTitle={project.name!}
        />
    )
}
