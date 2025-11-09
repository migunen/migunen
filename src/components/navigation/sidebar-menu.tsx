"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

interface SidebarMenuProps {
  isOpen: boolean
  onToggle: () => void
}

export function SidebarMenu({ isOpen, onToggle }: SidebarMenuProps) {
  const pathname = usePathname()
  const [connectionStatus, setConnectionStatus] = useState({
    spotify: false,
    soundcloud: false,
    appleMusic: false,
    tidal: false,
    genius: false
  })

  // Check connection status
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const spotifyToken = localStorage.getItem('spotify_access_token')
      setConnectionStatus(prev => ({
        ...prev,
        spotify: !!spotifyToken && spotifyToken !== 'null'
      }))
    }
  }, [])

  const menuSections = [
    {
      title: "Main Navigation",
      items: [
        { 
          href: '/', 
          label: 'Home', 
          icon: '🏠',
          description: 'Landing page and app overview'
        },
        { 
          href: '/dashboard', 
          label: 'Dashboard', 
          icon: '📊',
          description: 'Real-time analytics and streaming data',
          badge: 'Live'
        },
        { 
          href: '/platforms', 
          label: 'Platforms', 
          icon: '🌐',
          description: 'Multi-platform integration hub'
        },
        { 
          href: '/analytics', 
          label: 'Analytics', 
          icon: '📈',
          description: 'Advanced data analysis and insights'
        },
        { 
          href: '/social-impact', 
          label: 'Social Impact', 
          icon: '🎯',
          description: 'UN SDG tracking and social metrics'
        }
      ]
    },
    {
      title: "Tools & Setup",
      items: [
        { 
          href: '/setup', 
          label: 'Setup', 
          icon: '⚙️',
          description: 'Platform authentication and configuration'
        }
      ]
    }
  ]

  const platformConnections = [
    { name: 'Spotify', icon: '🎵', connected: connectionStatus.spotify, color: 'text-green-400' },
    { name: 'SoundCloud', icon: '🔊', connected: connectionStatus.soundcloud, color: 'text-orange-400' },
    { name: 'Apple Music', icon: '🍎', connected: connectionStatus.appleMusic, color: 'text-gray-400' },
    { name: 'Tidal', icon: '🌊', connected: connectionStatus.tidal, color: 'text-blue-400' },
    { name: 'Genius', icon: '📝', connected: connectionStatus.genius, color: 'text-yellow-400' }
  ]

  const connectedPlatforms = platformConnections.filter(p => p.connected).length
  const connectionPercentage = (connectedPlatforms / platformConnections.length) * 100

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full bg-gradient-to-b from-gray-900 via-gray-900 to-black border-r border-red-600/30 shadow-2xl transition-transform duration-300 z-50 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`} style={{ width: '380px' }}>
        
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-6 border-b border-red-600/30 bg-black/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-red-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">MS</span>
            </div>
            <div>
              <h2 className="text-white font-bold text-lg">Music Stats Pro</h2>
              <p className="text-red-400 text-sm">for Ella V</p>
            </div>
          </div>
          <Button
            onClick={onToggle}
            variant="ghost"
            size="sm"
            className="text-white hover:bg-red-600/20 hover:text-red-400"
          >
            ✕
          </Button>
        </div>

        {/* Connection Status Overview */}
        <div className="p-6 border-b border-red-600/20">
          <h3 className="text-white font-semibold mb-4">Platform Connections</h3>
          <Card className="bg-black/40 border-red-600/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-300 text-sm">Connected Platforms</span>
                <Badge className="bg-red-600 text-white">
                  {connectedPlatforms}/{platformConnections.length}
                </Badge>
              </div>
              <Progress value={connectionPercentage} className="h-2 mb-3" />
              
              <div className="grid grid-cols-5 gap-2">
                {platformConnections.map((platform) => (
                  <div key={platform.name} className="text-center">
                    <div className={`text-lg ${platform.connected ? platform.color : 'text-gray-600'}`}>
                      {platform.icon}
                    </div>
                    <div className={`text-xs ${platform.connected ? 'text-white' : 'text-gray-500'}`}>
                      {platform.name}
                    </div>
                  </div>
                ))}
              </div>

              {connectedPlatforms === 0 && (
                <div className="mt-3 text-center">
                  <Button 
                    onClick={() => window.location.href = '/setup'}
                    size="sm"
                    className="bg-red-600 hover:bg-red-700 text-xs"
                  >
                    Connect Platforms
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Navigation Menu */}
        <div className="flex-1 overflow-y-auto">
          {menuSections.map((section) => (
            <div key={section.title} className="p-6 border-b border-red-600/10">
              <h3 className="text-gray-400 text-xs font-semibold uppercase tracking-wide mb-4">
                {section.title}
              </h3>
              <nav className="space-y-2">
                {section.items.map((item) => (
                  <Link key={item.href} href={item.href}>
                    <div className={`group flex items-center gap-3 p-3 rounded-lg transition-all duration-200 cursor-pointer ${
                      pathname === item.href 
                        ? 'bg-red-600 text-white shadow-lg' 
                        : 'text-gray-300 hover:bg-red-600/20 hover:text-white'
                    }`}>
                      <span className="text-lg flex-shrink-0">{item.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-medium truncate">{item.label}</span>
                          {item.badge && (
                            <Badge 
                              variant="outline" 
                              className={`text-xs ${
                                pathname === item.href 
                                  ? 'border-white text-white' 
                                  : 'border-red-600 text-red-400'
                              }`}
                            >
                              {item.badge}
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs opacity-75 truncate">
                          {item.description}
                        </p>
                      </div>
                      <div className={`text-xs opacity-50 group-hover:opacity-100 transition-opacity ${
                        pathname === item.href ? 'opacity-100' : ''
                      }`}>
                        →
                      </div>
                    </div>
                  </Link>
                ))}
              </nav>
            </div>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="p-6 border-t border-red-600/20 bg-black/20">
          <h3 className="text-white font-semibold mb-4">Ella V Quick Stats</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-black/40 rounded p-3 text-center">
              <div className="text-lg font-bold text-white">47.2K</div>
              <div className="text-xs text-gray-400">Total Streams</div>
            </div>
            <div className="bg-black/40 rounded p-3 text-center">
              <div className="text-lg font-bold text-green-400">+28%</div>
              <div className="text-xs text-gray-400">Growth Rate</div>
            </div>
            <div className="bg-black/40 rounded p-3 text-center">
              <div className="text-lg font-bold text-blue-400">15</div>
              <div className="text-xs text-gray-400">Countries</div>
            </div>
            <div className="bg-black/40 rounded p-3 text-center">
              <div className="text-lg font-bold text-purple-400">87</div>
              <div className="text-xs text-gray-400">Impact Score</div>
            </div>
          </div>
          
          <div className="mt-4 text-center">
            <Button 
              onClick={() => window.location.href = '/dashboard'}
              size="sm"
              className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
            >
              📊 View Full Dashboard
            </Button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-red-600/10 bg-black/40">
          <div className="text-center">
            <p className="text-gray-400 text-xs">
              Music Stats Pro v2.0
            </p>
            <p className="text-gray-500 text-xs">
              Analytics for Artists
            </p>
          </div>
        </div>
      </div>

      {/* Menu Toggle Button (when sidebar is closed) */}
      {!isOpen && (
        <Button
          onClick={onToggle}
          className="fixed top-6 left-6 z-30 bg-red-600 hover:bg-red-700 shadow-xl rounded-full p-3"
          size="sm"
        >
          <span className="text-lg">☰</span>
        </Button>
      )}

      {/* Mobile Menu Button (always visible) */}
      <Button
        onClick={onToggle}
        className="fixed bottom-6 left-6 z-30 bg-red-600 hover:bg-red-700 shadow-xl rounded-full p-3 md:hidden"
        size="sm"
      >
        <span className="text-lg">📱</span>
      </Button>
    </>
  )
}