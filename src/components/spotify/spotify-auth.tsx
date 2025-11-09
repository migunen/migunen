"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { Input } from '@/components/ui/input'
import { useSpotifyData } from '@/hooks/use-spotify-data'

export function SpotifyAuth() {
  const { accessToken, authenticate, loading, error, setAccessToken, fetchEllaVData } = useSpotifyData()
  const [manualToken, setManualToken] = useState('')
  const [showManualInput, setShowManualInput] = useState(false)

  const handleManualToken = async () => {
    if (manualToken.trim()) {
      setAccessToken(manualToken.trim())
      localStorage.setItem('spotify_access_token', manualToken.trim())
      await fetchEllaVData()
    }
  }

  const handleDisconnect = () => {
    localStorage.removeItem('spotify_access_token')
    setAccessToken(null)
    window.location.reload()
  }

  // Demo token for testing (this would be a real token in production)
  const useDemoToken = () => {
    const demoToken = "demo_token_for_testing"
    setAccessToken(demoToken)
    localStorage.setItem('spotify_access_token', demoToken)
  }

  return (
    <Card className="bg-gray-900 border-red-600/30">
      <CardHeader>
        <CardTitle className="text-white">Spotify Integration</CardTitle>
        <p className="text-sm text-gray-400">
          Connect to Spotify Web API for real-time music analytics
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Connection Status */}
        <div className="flex items-center justify-between p-4 bg-black/40 rounded-lg">
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${accessToken ? 'bg-green-500' : 'bg-red-500'}`} />
            <div>
              <span className="text-white font-medium">
                {accessToken ? 'Connected' : 'Disconnected'}
              </span>
              <p className="text-gray-400 text-xs">
                {accessToken ? 'Real-time data access active' : 'No access token found'}
              </p>
            </div>
          </div>
          {accessToken && (
            <Button 
              onClick={handleDisconnect}
              variant="outline"
              size="sm"
              className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
            >
              Disconnect
            </Button>
          )}
        </div>

        {/* Error Display */}
        {error && (
          <div className="p-4 bg-red-900/20 border border-red-600/50 rounded-lg">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {/* Authentication Options */}
        {!accessToken && (
          <div className="space-y-4">
            <div className="grid gap-4">
              {/* OAuth Authentication */}
              <div className="space-y-3">
                <h4 className="text-white font-semibold">OAuth Authentication</h4>
                <p className="text-gray-400 text-sm">
                  Recommended method for secure authentication with Spotify
                </p>
                <Button
                  onClick={authenticate}
                  className="w-full bg-red-600 hover:bg-red-700"
                  disabled={loading}
                >
                  {loading ? 'Connecting...' : '🎵 Connect with Spotify'}
                </Button>
                <p className="text-xs text-gray-500 text-center">
                  Requires Spotify Developer App configuration
                </p>
              </div>

              {/* Manual Token Input */}
              <div className="space-y-3">
                <h4 className="text-white font-semibold">Manual Token (Testing)</h4>
                <Button
                  onClick={() => setShowManualInput(!showManualInput)}
                  variant="outline"
                  className="w-full border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
                >
                  {showManualInput ? 'Hide' : 'Show'} Manual Token Input
                </Button>
                
                {showManualInput && (
                  <div className="space-y-2">
                    <Input
                      value={manualToken}
                      onChange={(e) => setManualToken(e.target.value)}
                      placeholder="Paste your Spotify access token here..."
                      className="bg-black border-red-600/50 text-white"
                      type="password"
                    />
                    <Button
                      onClick={handleManualToken}
                      disabled={!manualToken.trim()}
                      className="w-full bg-red-600 hover:bg-red-700"
                    >
                      Use Manual Token
                    </Button>
                    <p className="text-xs text-gray-500">
                      Get tokens from{' '}
                      <a 
                        href="https://developer.spotify.com/console/" 
                        target="_blank" 
                        className="text-red-400 hover:text-red-300"
                      >
                        Spotify Web API Console
                      </a>
                    </p>
                  </div>
                )}
              </div>

              {/* Demo Mode */}
              <div className="space-y-3">
                <h4 className="text-white font-semibold">Demo Mode</h4>
                <p className="text-gray-400 text-sm">
                  Test all features with realistic mock data for Ella V
                </p>
                <Button
                  onClick={useDemoToken}
                  variant="outline"
                  className="w-full border-gray-600 text-gray-400 hover:bg-gray-600 hover:text-white"
                >
                  🎪 Use Demo Mode
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Connected Features */}
        {accessToken && (
          <div className="space-y-4">
            <h4 className="text-white font-semibold">Available Features</h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-black/40 p-3 rounded border border-red-600/20">
                <div className="text-green-400 text-sm font-medium">✅ Track Analysis</div>
                <div className="text-gray-400 text-xs">Real streaming data</div>
              </div>
              <div className="bg-black/40 p-3 rounded border border-red-600/20">
                <div className="text-green-400 text-sm font-medium">✅ Artist Comparison</div>
                <div className="text-gray-400 text-xs">Similar artists data</div>
              </div>
              <div className="bg-black/40 p-3 rounded border border-red-600/20">
                <div className="text-green-400 text-sm font-medium">✅ Audio Features</div>
                <div className="text-gray-400 text-xs">Detailed track analysis</div>
              </div>
              <div className="bg-black/40 p-3 rounded border border-red-600/20">
                <div className="text-green-400 text-sm font-medium">✅ Data Export</div>
                <div className="text-gray-400 text-xs">Python integration ready</div>
              </div>
            </div>
          </div>
        )}

        {/* Setup Instructions */}
        <div className="space-y-2">
          <h4 className="text-white font-semibold">Setup Instructions</h4>
          <div className="text-sm text-gray-400 space-y-1">
            <p>1. Create app at <span className="text-red-400">developer.spotify.com</span></p>
            <p>2. Add redirect URI: <code className="bg-black/40 px-1 rounded text-xs">{typeof window !== 'undefined' ? window.location.origin : ''}/api/auth/spotify/callback</code></p>
            <p>3. Use Client ID in environment variables</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}