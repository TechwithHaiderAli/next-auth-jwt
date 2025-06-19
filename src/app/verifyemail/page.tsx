'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

export default function VerifyEmailPage() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const router = useRouter()

  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('Verifying your email...')

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        if (!token) {
          setMessage('Invalid verification link.')
          setLoading(false)
          return
        }
        console.log("Token being sent:", token)

        const response = await axios.post('/api/users/verify', { token })

        if (response.status === 200) {
          toast.success('Email verified successfully!')
          setMessage('Your email has been verified.')
          // Optionally redirect after a delay
          setTimeout(() => router.push('/login'), 3000)
        } else {
          setMessage('Failed to verify email.')
        }
      } catch (error: any) {
        console.error(error)
        setMessage(
          error?.response?.data?.error || 'Verification failed. Try again.'
        )
      } finally {
        setLoading(false)
      }
    }

    verifyEmail()
  }, [token, router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-6 rounded shadow-md max-w-md text-center">
        <h1 className="text-2xl font-semibold mb-4">Email Verification</h1>
        <p className="text-gray-700">{loading ? 'Please wait...' : message}</p>
      </div>
    </div>
  )
}
