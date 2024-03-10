import { CreateJobSchema, createJobSchema } from '@/lib/validation/jobs'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog'
import { useRouter } from "next/navigation"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import LoadingButton from './ui/loading-button'
import { Jobs } from '@prisma/client'
import { useToast } from "@/components/ui/use-toast"

interface IAddEditJob {
    open: boolean,
    setOpen: (open: boolean) => void,
    jobToedit?: Jobs
}

export default function AddEditJobDialog({ open, setOpen, jobToedit }: IAddEditJob) {

    const [deleteInProgress, setDeleteInProgress] = useState(false)

    const form = useForm<CreateJobSchema>({
        resolver: zodResolver(createJobSchema),
        defaultValues: {
            title: jobToedit?.title || "",
            description: jobToedit?.description || "",
            companylogo: jobToedit?.companylogo || "",
            companyname: jobToedit?.companyname || "",
            country: jobToedit?.country || "",
            site: jobToedit?.site || "",
        }
    })

    const { toast } = useToast()

    const router = useRouter()

    async function onSubmit(input: CreateJobSchema) {
        try {

            if (jobToedit) {
                const response = await fetch("/api/jobs", {
                    method: 'PUT',
                    body: JSON.stringify({
                        id: jobToedit.id,
                        ...input
                    })
                })
                if (!response.ok) throw Error("Status code: " + response.status);
                toast({
                    title: "Job Posting",
                    description: "Post updated",
                })
            } else {
                const response = await fetch("/api/jobs", {
                    method: "POST",
                    body: JSON.stringify(input)
                })

                if (!response.ok) throw Error("Status code: " + response.status)
                form.reset()
                toast({
                    title: "Job Posting",
                    description: "Job Post Added",
                })
            }

            router.refresh()
            setOpen(false);

        } catch (error) {
            console.error(error);
            toast({
                title: "Something went wrong",
                description: "Internal Server Error. Please try again",
            })
        }
    }

    async function deleteJob() {
        if (!jobToedit) return;
        setDeleteInProgress(true)
        try {
            const response = await fetch("/api/jobs", {
                method: 'DELETE',
                body: JSON.stringify({
                    id: jobToedit.id,
                })
            })
            if (!response.ok) throw Error("Status code: " + response.status);
            router.refresh()
            setOpen(false);
        } catch (error) {
            console.error(error);
            toast({
                title: "Something went wrong",
                description: "Internal Server Error. Please try again",
            })
        } finally {
            setDeleteInProgress(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{jobToedit ? "Update Job" : "Create Job"}</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Job Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g Marketing Analyst" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="country"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Country</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g Philippines" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="companylogo"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Company Logo</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Cloudinary logo link" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="companyname"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Company Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g " {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="site"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Joblisting Source</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g Jobstreet link" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Job Description</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="e.g Salary, Requirements" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter className="gap-1 sm:gap-0">
                            {
                                jobToedit && (
                                    <LoadingButton variant={"outline"} type="button" loading={deleteInProgress} disabled={form.formState.isSubmitting} onClick={deleteJob}>Delete</LoadingButton>
                                )
                            }
                            <LoadingButton type="submit" loading={form.formState.isSubmitting} disabled={deleteInProgress}>Submit</LoadingButton>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
