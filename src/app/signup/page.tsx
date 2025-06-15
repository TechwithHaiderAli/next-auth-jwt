'use client'
import { useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
export default function SignupPage() {
  const [username, setusername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading,setloading]=useState(false);

  const router=useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!username || !email || !password) {
      setError('All fields are required.')
      return
    }
   try {

        setloading(true)
       const response=await  axios.post("api/users/signup",{username,email,password});
       console.log(response.data);
       console.log(response.status);
       router.push("/login")
       
    
   } catch (error:any) {
    console.log(`${error.message}\n Sign Up Failed` );
    
    toast.error(error.message)
   }
   finally{
    setloading(false)
   }
    setError('')
    console.log('Signing up with:', { username, email, password })
    // Call backend/signup logic here
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 p-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-2xl shadow-xl text-white">
        <h2 className="text-3xl font-bold text-center mb-6">Create an Account</h2>

        <form onSubmit={handleSignup} className="space-y-5">
          <div>
            <label className="block text-sm mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setusername(e.target.value)}
              className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="UserName"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition-all text-white py-2 px-4 rounded-xl font-semibold"
          >
            {loading?"Processing":"SignUp"}
          </button>
        </form>

        <p className="text-sm text-center mt-6 text-gray-300">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-400 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  )
}
