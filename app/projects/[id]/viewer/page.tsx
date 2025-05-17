
import { prisma } from '@/lib/prisma'
import ViewerClient from '../../../../components/viewer-client'
import { ViewerCanvas } from '../../../../components/ViewerCanvas'
// import { ViewerCanvas } from './3DViewer'

export default async function ViewerPage({ params }: { params: Promise<{ id: string }> }) {
    // const { id: paramsId } = use(params);

    const { id: paramsId } = await params


    const project = await prisma.project.findUnique({
        where: { id: paramsId },
        include: { annotations: true },
    })

    console.log(project)


    if (!project) return <div>Project not found</div>

    return (
        // <ViewerClient project={project} />
        // <div className="h-screen">
        //     <ViewerCanvas
        //         glbUrl={project.glbFileUrl!}
        //         projectId={project.id}
        //         isEditorMode={true} // or false based on tab
        //     />
        // </div>
        <ViewerClient
            projectId={project.id}
            glbFileUrl={project.glbFileUrl!}
            projectTitle={project.name!}
        />
    )

    // return <div>HI</div>
}
