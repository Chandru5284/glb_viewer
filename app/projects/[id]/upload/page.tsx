'use client'

import React, { useState, use } from 'react'
// import { useRouter } from 'next/navigation'

// import components
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function UploadGLBPage({ params }: { params: Promise<{ id: string }> }) {
    const { id: paramsId } = use(params);

    // const router = useRouter()
    const projectId = paramsId

    const [file, setFile] = useState<File | null>(null)
    const [selectedFile, setSelectedFile] = useState<string>("");

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            setFile(e.target.files[0])
            setSelectedFile(e.target.files[0].name);
        }
    }

    // console.log(projectId)

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!file) return alert('Please select a .glb file')

        const formData = new FormData()
        formData.append('file', file)

        const res = await fetch(`/api/projects/${projectId}/upload`, {
            method: 'POST',
            body: formData,
        })

        // console.log(res)

        if (res.ok) {
            // router.push(`/projects/${projectId}/viewer`)
            alert('Upload success')
        } else {
            alert('Upload failed')
        }
    }

    console.log({
        CLOUDINARY_CLOUD_NAME: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
        CLOUDINARY_API_KEY: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
        CLOUDINARY_API_SECRET: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
    })

    //   env("CLOUDINARY_CLOUD_NAME")

    return (
        <div className='w-[100%] h-screen flex items-center justify-center'>
            <Card className="p-6 w-96">
                <h1 className="text-xl font-bold mb-4 text-center">Upload .glb Model</h1>

                <form onSubmit={handleUpload} className=" space-y-4">
                    <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                            </svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">only .glb supported</p>
                            {selectedFile && (
                                <p className="mt-2 text-sm text-green-600 dark:text-green-400">
                                    Selected file: {selectedFile}
                                </p>
                            )}
                        </div>
                        <input
                            type="file"
                            accept=".glb"
                            onChange={handleFileChange}
                            className="hidden" />
                    </label>
                    <Button className='w-full'>Submit</Button>
                </form>

            </Card>
        </div>
    )
}
