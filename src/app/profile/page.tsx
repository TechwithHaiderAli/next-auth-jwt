'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import axios from 'axios'

export default function ProfilePage() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogout = async () => {
    setLoading(true)
    try {
      await axios.get('/api/users/logout')
      router.push('/login')
    } catch (error: any) {
      console.error('Logout failed:', error.message)
    } finally {
      setLoading(false)
    }
  }

  const user = {
    name: 'Haider Ali',
    email: 'haider@example.com',
    bio: 'A full-stack developer with a passion for clean UI, performance, and coffee ☕️.',
    location: 'Lahore, Pakistan',
    joined: 'January 2023',
    avatarUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=Haider',
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-6 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-white/10 backdrop-blur-lg border border-white/20 text-white p-8 rounded-2xl shadow-lg">
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Avatar */}
          <img
            src={user.avatarUrl}
            alt={user.name}
            className="w-32 h-32 rounded-full border-4 border-white shadow-md object-cover"
          />

          {/* Profile Info */}
          <div className="text-center md:text-left space-y-2">
            <h2 className="text-3xl font-bold">{user.name}</h2>
            <p className="text-sm text-gray-300">{user.email}</p>
            <p className="text-sm text-gray-300">{user.location}</p>
            <p className="mt-3">{user.bio}</p>
            <p className="text-xs text-gray-400 mt-1">Joined {user.joined}</p>

            <button
              onClick={handleLogout}
              disabled={loading}
              className={`mt-4 px-4 py-2 rounded-xl font-medium transition-all ${
                loading ? 'bg-red-400' : 'bg-red-600 hover:bg-red-700'
              }`}
            >
              {loading ? 'Logging out...' : 'Logout'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
