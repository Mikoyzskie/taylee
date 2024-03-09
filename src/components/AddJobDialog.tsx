import { CreateJobSchema, createJobSchema } from '@/lib/validation/jobs'
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog'
import { useRouter } from "next/navigation"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import LoadingButton from './ui/loading-button'

interface IAddJob {
    open: boolean,
    setOpen: (open: boolean) => void
}

export default function AddJobDialog({ open, setOpen }: IAddJob) {

    const form = useForm<CreateJobSchema>({
        resolver: zodResolver(createJobSchema),
        defaultValues: {
            title: "",
            description: "",
            companylogo: "",
            companyname: "",
            country: "",
        }
    })

    const router = useRouter()

    async function onSubmit(input: CreateJobSchema) {
        try {
            const response = await fetch("/api/jobs", {
                method: "POST",
                body: JSON.stringify(input)
            })

            if (!response.ok) throw Error("Status code: " + response.status)
            form.reset()

            router.refresh()
            setOpen(false);
        } catch (error) {
            console.error(error);
            alert("Something went wrong.")
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Job</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Note Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="title" {...field} />
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
                                    <FormLabel>country</FormLabel>
                                    <FormControl>
                                        <Input placeholder="country" {...field} />
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
                                    <FormLabel>companylogo</FormLabel>
                                    <FormControl>
                                        <Input placeholder="companylogo" {...field} />
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
                                    <FormLabel>companyname</FormLabel>
                                    <FormControl>
                                        <Input placeholder="companyname" {...field} />
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
                                    <FormLabel>description</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="description" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter className="gap-1 sm:gap-0">

                            <LoadingButton type="submit" loading={form.formState.isSubmitting}>Submit</LoadingButton>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
