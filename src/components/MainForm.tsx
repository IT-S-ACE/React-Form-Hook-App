import React, { useEffect } from 'react'
import { useForm, useFieldArray, FieldErrors } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'

export const MainForm = () => {

  type FormValues = {
    username: string,
    email: string,
    channel: string,
    social: {
      twitter: string,
      facebook: string,
    },
    phoneNumbers: string[],
    phNumber: {
      number: string
    }[],
    age: number,
    dob: Date,
  }

  const form = useForm<FormValues>({
    defaultValues: {
      username: 'Batman',
      email: '',
      channel: '',
      social: {
        twitter: '',
        facebook: '',
      },
      phoneNumbers: ['', ''],
      phNumber: [{ number: '' }],
      age: 0,
      dob: new Date(),
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
  const { register, control, handleSubmit, formState , watch, getValues, setValue, reset} = form

  const { fields, append, remove } = useFieldArray({
    name: 'phNumber',
    control
  })

  // const WatchForm = watch()

  const { errors , touchedFields , dirtyFields , isDirty , isValid,isSubmitting , isSubmitted , isSubmitSuccessful , submitCount} = formState


  console.log({touchedFields , dirtyFields , isDirty , isValid})

  console.log({isSubmitting, isSubmitted , isSubmitSuccessful, submitCount})

  const onSubmit = (data: FormValues) => {
    console.log('Form Submitted', data)
  }

  //Handle the form submission error
  const onError = (error : FieldErrors<FormValues>) => {
    console.log('Form Error', error)
  }

  // getValues prorperty
  const handleGetValues = () =>{
    console.log('Get Values', getValues(['username', 'email', 'channel']))
  }

  // setValues prorperty
  const handleSetValues = () =>{
    setValue('username','', {
      shouldValidate: true,
      shouldDirty : true,
      shouldTouch: true
    })
  }

  // handle reset field values if submitted successfully
  useEffect(() =>{
    if(isSubmitSuccessful){
      reset();
    }
  },[isSubmitSuccessful , reset])

  // Watch Property
  // useEffect(() => {
  //   const subscription = watch((value) => {
  //     console.log(value)
  //   })
  //   return () => subscription.unsubscribe()
  // } , [watch])

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <div className='form-control'>
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            id='username'
            {...register("username",
              {
                required: {
                  value: true,
                  message: 'Username is required',
                }
              })} />
          <p className='error'>{errors.username?.message}</p>
        </div>

        <div className='form-control'>
          <label htmlFor="email">Email: </label>
          <input
            type="text"
            id='email'
            {...register("email",
              {
                pattern: {
                  value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                  message: 'Invalid email format',
                },
                validate: {
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
            )} />
          <p className='error'>{errors.email?.message}</p>
        </div>

        <div className='form-control'>
          <label htmlFor="channel">Channel: </label>
          <input
            type="text"
            id='channel'
            {...register("channel",
              {
                required: {
                  value: true,
                  message: 'Channel is required',
                }
              })} />
          <p className='error'>{errors.channel?.message}</p>
        </div>

        <div className='form-control'>
          <label htmlFor="age">Age: </label>
          <input
            type="text"
            id='age'
            {...register("age",
              {
                valueAsNumber: true,
                required: {
                  value: true,
                  message: 'Age is required',
                }
              })} />
          <p className='error'>{errors.age?.message}</p>
        </div>

        <div className='form-control'>
          <label htmlFor="dob">Date of birth: </label>
          <input
            type="text"
            id='dob'
            {...register("dob",
              {
                valueAsDate: true,
                required: {
                  value: true,
                  message: 'Date of birth is required',
                }
              })} />
          <p className='error'>{errors.dob?.message}</p>
        </div>



        <div className='form-control'>
          <label htmlFor="twitter">Twitter: </label>
          <input
            type="text"
            id='twitter'
            {...register("social.twitter", {
              disabled : watch("channel") === '', // if channel is empty then it will still be disabled else it will not
              required: "Enter Twitter Profile"
            })} />
        </div>

        <div className='form-control'>
          <label htmlFor="facebook">FaceBook: </label>
          <input
            type="text"
            id='facebook'
            {...register("social.facebook")} />
        </div>

        <div className='form-control'>
          <label htmlFor="primary-phone">Primary phone number: </label>
          <input
            type="text"
            id='primary-phone'
            {...register("phoneNumbers.0")} />
        </div>

        <div className='form-control'>
          <label htmlFor="secondary-phone">Secondary phone number: </label>
          <input
            type="text"
            id='secondary-phone'
            {...register("phoneNumbers.1")} />
        </div>

        <div>
          <label> List of phone numbers</label>
          <div>
            {fields.map((field, index) => {
              return (
                <div className='form-control' key={field.id}>
                  <input type="text"
                    {...register(`phNumber.${index}.number` as const)}
                  />
                  {index > 0 && (
                    <button type='button' onClick={() => remove(index)}>
                      Remove
                    </button>
                  )}
                </div>
              )
            })}
            <button type='button' onClick={() => append({ number: '' })}>
              Add phone number
            </button>
          </div>
        </div>

        <button 
        // disabled={!isDirty || !isValid} // disabled the button until all fields are dirty or valid(filled with the correct values)
        >Submit</button>
        <button type='button' onClick={() => reset()}>Reset</button>
        <button type='button' onClick={handleGetValues}>Get Values</button>
        <button type='button' onClick={handleSetValues}>Set Values</button>
      </form>
      <DevTool control={control} />
    </div>
  )
}
