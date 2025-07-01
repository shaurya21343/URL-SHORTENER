import React from 'react'
import LoginForm from '@/components/loginForm'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'

const page = async() => {
    const session = await auth()
    if (session) {
        // If user is already authenticated, redirect to home page
        redirect('/'); 
    }
  return (

        <LoginForm />

  )
}

export default page