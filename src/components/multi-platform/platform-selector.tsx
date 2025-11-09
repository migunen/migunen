"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { useMultiPlatformData } from '@/hooks/use-multi-platform-data'

export function PlatformSelector() {
  const { 
    tokens, 
    loading, 
    errors, 
    setPlatformToken, 
    removePlatformToken,
    fetchAllPlatformData,
    authenticateSpotify,
    authenticateSoundCloud
  } = useMultiPlatformData()

  const [manualTokens, setManualTokens] = useState<{ [key: string]: string }>({})
  const [enabledPlatforms, setEnabledPlatforms] = useState({
    spotify: true,
    soundcloud: true,
    appleMusic: true,
    tidal: true,
    genius: true
  })

  const platforms = [
    {
      key: 'spotify',
      name: 'Spotify',
      description: 'Streaming data, audio features, popularity metrics',
      color: 'bg-green-500',
      icon: '🎵',
      status: tokens.spotify ? 'connected' : 'disconnected',
      authMethod: 'oauth',
      onConnect: authenticateSpotify
    },
    {
      key: 'soundcloud',
      name: 'SoundCloud', 
      description: 'Community engagement, likes, reposts, comments',
      color: 'bg-orange-500',
      icon: '🔊',
      status: tokens.soundcloud ? 'connected' : 'disconnected',
      authMethod: 'oauth',
      onConnect: authenticateSoundCloud
    },
    {
      key: 'appleMusic',
      name: 'Apple Music',
      description: 'iOS ecosystem data, curated playlist performance',
      color: 'bg-gray-500',
      icon: '🍎',
      status: tokens.appleMusic ? 'connected' : 'disconnected',
      authMethod: 'token'
    },
    {
      key: 'tidal',
      name: 'Tidal',
      description: 'High-fidelity streaming, audiophile engagement',
      color: 'bg-blue-500',
      icon: '🌊',
      status: tokens.tidal ? 'connected' : 'disconnected',
      authMethod: 'token'
    },
    {
      key: 'genius',
      name: 'Genius',
      description: 'Lyrical analysis, annotations, social impact themes',
      color: 'bg-yellow-500',
      icon: '📝',
      status: tokens.genius ? 'connected' : 'disconnected',
      authMethod: 'token'
    }
  ]

  const handleManualToken = (platform: string) => {
    const token = manualTokens[platform]?.trim()
    if (token) {
      setPlatformToken(platform as keyof typeof tokens, token)
      setManualTokens(prev => ({ ...prev, [platform]: '' }))
    }
  }

  const handleFetchAllData = async () => {
    await fetchAllPlatformData('Ella V')
  }

  const getStatusColor = (status: string) => {
    return status === 'connected' ? 'text-green-400' : 'text-red-400'
  }

  const getStatusIcon = (status: string) => {
    return status === 'connected' ? '✅' : '❌'
  }

  return (
    <div className="space-y-6">
      {/* Platform Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {platforms.map((platform) => (
          <Card key={platform.key} className="bg-gray-900 border-red-600/30">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 ${platform.color} rounded-full flex items-center justify-center text-white`}>
                    <span className="text-lg">{platform.icon}</span>
                  </div>
                  <div>
                    <CardTitle className="text-white text-lg">{platform.name}</CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-sm ${getStatusColor(platform.status)}`}>
                        {getStatusIcon(platform.status)} {platform.status}
                      </span>
                    </div>
                  </div>
                </div>
                
                <Switch
                  checked={enabledPlatforms[platform.key as keyof typeof enabledPlatforms]}
                  onCheckedChange={(checked) => 
                    setEnabledPlatforms(prev => ({ ...prev, [platform.key]: checked }))
                  }
                />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-400 text-sm">
                {platform.description}
              </p>

              {/* Connection Method */}
              {!tokens[platform.key as keyof typeof tokens] && enabledPlatforms[platform.key as keyof typeof enabledPlatforms] && (
                <div className="space-y-3">
                  {platform.authMethod === 'oauth' ? (
                    <Button
                      onClick={platform.onConnect}
                      className="w-full bg-red-600 hover:bg-red-700"
                      disabled={loading[platform.key]}
                    >
                      {loading[platform.key] ? 'Connecting...' : `Connect ${platform.name}`}
                    </Button>
                  ) : (
                    <div className="space-y-2">
                      <Input
                        placeholder={`${platform.name} access token...`}
                        value={manualTokens[platform.key] || ''}
                        onChange={(e) => setManualTokens(prev => ({ ...prev, [platform.key]: e.target.value }))}
                        className="bg-black border-red-600/50 text-white"
                        type="password"
                      />
                      <Button
                        onClick={() => handleManualToken(platform.key)}
                        disabled={!manualTokens[platform.key]?.trim()}
                        className="w-full bg-red-600 hover:bg-red-700"
                        size="sm"
                      >
                        Add Token
                      </Button>
                    </div>
                  )}
                </div>
              )}

              {/* Connected Status */}
              {tokens[platform.key as keyof typeof tokens] && (
                <div className="space-y-2">
                  <Badge variant="outline" className="border-green-600 text-green-600 w-full justify-center">
                    Connected & Active
                  </Badge>
                  <Button
                    onClick={() => removePlatformToken(platform.key as keyof typeof tokens)}
                    variant="outline"
                    size="sm"
                    className="w-full border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
                  >
                    Disconnect
                  </Button>
                </div>
              )}

              {/* Error Display */}
              {errors[platform.key] && (
                <div className="p-2 bg-red-900/20 border border-red-600/50 rounded text-red-400 text-xs">
                  {errors[platform.key]}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Platform Summary */}
      <Card className="bg-gray-900 border-red-600/30">
        <CardHeader>
          <CardTitle className="text-white">Platform Integration Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            {platforms.map((platform) => (
              <div key={platform.key} className="text-center">
                <div className={`w-8 h-8 ${platform.color} rounded-full mx-auto mb-2 flex items-center justify-center`}>
                  <span className="text-white text-sm">{platform.icon}</span>
                </div>
                <div className="text-xs text-gray-400">{platform.name}</div>
                <div className={`text-xs ${getStatusColor(platform.status)}`}>
                  {platform.status}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={handleFetchAllData}
              className="bg-red-600 hover:bg-red-700"
              disabled={Object.values(tokens).filter(Boolean).length === 0}
            >
              🔄 Fetch Data from All Connected Platforms
            </Button>
            
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>Connected platforms:</span>
              <Badge variant="outline" className="border-red-600 text-red-600">
                {Object.values(tokens).filter(Boolean).length} / {platforms.length}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Setup Guide */}
      <Card className="bg-gray-900 border-red-600/30">
        <CardHeader>
          <CardTitle className="text-white">Multi-Platform Setup Guide</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="text-white font-semibold">OAuth Platforms</h4>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>• <span className="text-green-400">Spotify</span>: Full OAuth 2.0 flow implemented</li>
                <li>• <span className="text-orange-400">SoundCloud</span>: OAuth ready for client ID</li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="text-white font-semibold">Token-Based Platforms</h4>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>• <span className="text-gray-400">Apple Music</span>: Developer JWT token required</li>
                <li>• <span className="text-blue-400">Tidal</span>: API access token needed</li>
                <li>• <span className="text-yellow-400">Genius</span>: Access token for lyrical analysis</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 p-4 bg-red-600/10 border border-red-500/30 rounded">
            <h4 className="text-red-400 font-semibold mb-2">🎵 For Ella V's Complete Analysis</h4>
            <p className="text-red-300 text-sm">
              Connect all platforms to get comprehensive insights: Spotify for audio features, 
              SoundCloud for community engagement, Apple Music for iOS metrics, 
              Tidal for audiophile data, and Genius for deep lyrical analysis.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}