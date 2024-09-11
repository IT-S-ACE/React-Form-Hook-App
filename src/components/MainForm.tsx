import React from 'react'
import { useForm } from 'react-hook-form'
import {DevTool} from '@hookform/devtools'

export const MainForm = () => {

  type FormValues = {
    username: string,
    email: string,
    channel: string,
    social:{
      twitter : string,
      facebook : string,
    },
    phoneNumbers : string[]
  }

  const form = useForm<FormValues>({
    defaultValues: {
      username: 'Batman',
      email: '',
      channel: '',
      social:{
        twitter: '',
        facebook:'',
      },
      phoneNumbers: ['' , '']
    }

    //  From API
    // async () => {
    //   const response = await fetch('https://jsonplaceholder.typicode.com/users/1')
    //   const data = await response.json()
    //   return {
    //     username: 'Batman',
    //     email: data?.email,
    //     channel: ''
    //   }
    // }
  })
  const {register, control, handleSubmit, formState} = form

  const {errors} = formState

  const onSubmit = (data: FormValues) =>{
    console.log('Form Submitted', data)
  }

  return (
    <div>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className='form-control'>
            <label htmlFor="username">Username: </label>
            <input 
            type="text" 
            id='username' 
            {...register("username", 
            {required :{
              value:true,
              message: 'Username is required',
            }
            })}/>
            <p className='error'>{errors.username?.message}</p>
            </div>

            <div className='form-control'>
            <label htmlFor="email">Email: </label>
            <input 
            type="text" 
            id='email' 
            {...register("email",
              {pattern:{
                value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: 'Invalid email format',
              },
              validate:{
                notadmin: (fieldValue) => {
                  return (fieldValue !== 'admin@gmail.com' || 
                    'Enter a diffrent email address'
                  )
                },
                notBlockListed: (fieldValue) => {
                  return (
                    !fieldValue.endsWith('baddomain.com') ||
                    'This domain is not supported'
                  )
                }
              }
            }
            )}/>
            <p className='error'>{errors.email?.message}</p>
            </div>

            <div className='form-control'>
            <label htmlFor="channel">Channel: </label>
            <input 
            type="text" 
            id='channel' 
            {...register("channel", 
            {required:{
              value:true,
            message:'Channel is required',
            }
            })}/>
            <p className='error'>{errors.channel?.message}</p>
            </div>

            <div className='form-control'>
            <label htmlFor="twitter">Twitter: </label>
            <input 
            type="text" 
            id='twitter' 
            {...register("social.twitter")}/>
            </div>

            <div className='form-control'>
            <label htmlFor="facebook">FaceBook: </label>
            <input 
            type="text" 
            id='facebook' 
            {...register("social.facebook")}/>
            </div>

            <div className='form-control'>
            <label htmlFor="primary-phone">Primary phone number: </label>
            <input 
            type="text" 
            id='primary-phone' 
            {...register("phoneNumbers.0")}/>
            </div>

            <div className='form-control'>
            <label htmlFor="secondary-phone">Secondary phone number: </label>
            <input
            type="text"
            id='secondary-phone'
            {...register("phoneNumbers.1")}/>
            </div>

            <button>Submit</button>
        </form>
        <DevTool control={control}/>
    </div>
  )
}
