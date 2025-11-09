"use client"

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'


export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle login logic
    console.log('Login attempt:', formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Welcome Message */}
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-red-700 rounded-full flex items-center justify-center mx-auto">
            <span className="text-white font-bold text-xl">MA</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
          <p className="text-gray-400 leading-relaxed">
            Unlock a world of knowledge at your fingertips with our mobile app. 
            Discover, learn, and stay informed effortlessly.
          </p>
        </div>

        {/* Login Form */}
        <Card className="bg-gray-900 border-red-600/30">
          <CardHeader>
            <CardTitle className="text-white text-center">Sign In</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="hello@reallygreatsite.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-red-600 focus:ring-red-600"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-300">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password must be at least 8 characters"
                  value={formData.password}
                  onChange={handleChange}
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-red-600 focus:ring-red-600"
                  required
                />
                <p className="text-xs text-gray-500">Password must be at least 8 characters</p>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3"
              >
                Login
              </Button>

              <div className="text-center">
                <Button 
                  variant="ghost" 
                  className="text-red-400 hover:text-red-300 hover:bg-red-600/10"
                >
                  Forgot Password?
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Music Genre Selection */}
        <Card className="bg-gray-900 border-red-600/30">
          <CardHeader>
            <CardTitle className="text-white text-center">Music Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <p className="text-gray-300 text-sm">
                Hey, aku penasaran nih, jenis musik apa sih yang biasanya kamu suka dengar?
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {['Blues', 'Classical', 'Hip-hop', 'Reggae', 'Rhythm and Blues', 'Electronic'].map((genre) => (
                <Button 
                  key={genre}
                  variant="outline" 
                  className="border-red-600/50 text-red-400 hover:bg-red-600 hover:text-white text-sm"
                >
                  {genre}
                </Button>
              ))}
            </div>
            
            <div className="text-center">
              <Link href="/dashboard">
                <Button className="bg-red-600 hover:bg-red-700 text-white px-8">
                  Continue
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Sign Up Link */}
        <div className="text-center">
          <p className="text-gray-400">
            Don't have an account?{' '}
            <Link href="/auth/signup" className="text-red-400 hover:text-red-300 font-semibold">
              Sign Up
            </Link>
          </p>
        </div>

        {/* Features Preview */}
        <div className="grid grid-cols-3 gap-4 mt-8">
          <div className="text-center">
            <div className="w-12 h-12 bg-red-600/20 rounded-lg flex items-center justify-center mx-auto mb-2">
              <span className="text-red-400">🎵</span>
            </div>
            <p className="text-xs text-gray-400">Music Analytics</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-red-600/20 rounded-lg flex items-center justify-center mx-auto mb-2">
              <span className="text-red-400">💳</span>
            </div>
            <p className="text-xs text-gray-400">Banking Dashboard</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-red-600/20 rounded-lg flex items-center justify-center mx-auto mb-2">
              <span className="text-red-400">⚙️</span>
            </div>
            <p className="text-xs text-gray-400">Smart Settings</p>
          </div>
        </div>
      </div>
    </div>
  )
}