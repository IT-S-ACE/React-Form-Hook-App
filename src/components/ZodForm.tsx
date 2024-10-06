import React from 'react'
import { useForm } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const schema = z.object({
    username: z.string().nonempty("Username is required"),
    email: z
    .string()
    .nonempty("Email is required")
    .email("Email format is not valid"),
    channel: z.string().nonempty("Channel is required"),
})


type FormValues = {
    username: string,
    email: string,
    channel: string
}

const ZodForm = () => {

    const form = useForm<FormValues>({
        defaultValues:{
            username:'',
            email:'',
            channel:''
        },
        resolver: zodResolver(schema)
    })

    const onSubmit = (data: FormValues) => {
        console.log("Form submitted", data)
    }

    const {register, handleSubmit, formState, control}  = form

    const {errors} = formState
    return (
    <div>
        <h1>Zod Form</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='form-control'>
                <label htmlFor="username">Username :</label>
                <input type="text" 
                id='username'
                {...register('username')}
                />
                <p className='error'>{errors.username?.message}</p>
            </div>
            
            <div className='form-control'>
                <label htmlFor="email">Email :</label>
                <input type="email" 
                id='email'
                {...register('email')}
                />
                <p className='error'>{errors.email?.message}</p>
            </div>
            <div className='form-control'>
                <label htmlFor="channel">Channel :</label>
                <input type="text" 
                id='channel'
                {...register('channel')}
                />
                <p className='error'>{errors.channel?.message}</p>
            </div>

        </form>
        <DevTool control={control} />
    </div>
  )
}

export default ZodForm