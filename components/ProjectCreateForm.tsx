
// // import lib
import { cn } from "@/lib/utils"

// import components
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "./ui/textarea"

export function ProjectCreateForm({
    handleSubmit,
    handleChange,
    form
}: any) {
    return (
        <div className={cn("flex flex-col gap-6")}>
            <Card className="overflow-hidden p-0">
                <CardContent className="grid p-0 md:grid-cols-2">

                    <form onSubmit={handleSubmit} className="space-y-6 p-6 md:p-8">
                        <div className="flex flex-col items-center text-center">
                            <h1 className="text-2xl font-bold">Create New Project</h1>
                            <p className="text-balance text-muted-foreground">
                            Create a New Project and view your 3d model.
                            </p>
                        </div>
                        <Label htmlFor="name">Name</Label>
                        <Input
                            name="name"
                            placeholder="Project Name"
                            value={form.name}
                            onChange={handleChange}
                            required
                        />
                        <Textarea
                            name="description"
                            placeholder="Description"
                            value={form.description}
                            onChange={handleChange}
                            required
                        />
                        <div className="flex gap-4">
                            <Input
                                name="canvasWidth"
                                type="number"
                                value={form.canvasWidth}
                                onChange={handleChange}
                                required
                            />
                            <Input
                                name="canvasHeight"
                                type="number"
                                value={form.canvasHeight}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <Button className="w-full">Next</Button>
                    </form>

                    <div className="relative hidden bg-muted md:block">
                        <img
                            src="https://images.pexels.com/photos/23232336/pexels-photo-23232336/free-photo-of-woman-in-a-costume-and-mask-holding-a-weapon.jpeg"
                            alt="Image"
                            className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
