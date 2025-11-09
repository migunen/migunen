"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useSpotifyData } from '@/hooks/use-spotify-data'

export default function SetupPage() {
  const { accessToken, authenticate, setAccessToken, fetchEllaVData, error } = useSpotifyData()
  const [manualToken, setManualToken] = useState('')
  const [currentUrl, setCurrentUrl] = useState('')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.origin)
    }
  }, [])

  const handleManualToken = async () => {
    if (manualToken.trim()) {
      setAccessToken(manualToken.trim())
      localStorage.setItem('spotify_access_token', manualToken.trim())
      await fetchEllaVData()
    }
  }

  const useDemoMode = () => {
    const demoToken = "demo_token_for_testing"
    setAccessToken(demoToken)
    localStorage.setItem('spotify_access_token', demoToken)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Page Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-white">Music Stats Pro Setup</h1>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Connect your music platforms to unlock comprehensive analytics for Ella V. 
          Get real-time streaming data, lyrical analysis, and social impact metrics.
        </p>
      </div>

      {/* Connection Status */}
      <Card className="bg-gray-900 border-red-600/30">
        <CardHeader>
          <CardTitle className="text-white">Connection Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 bg-black/40 rounded-lg">
            <div className="flex items-center gap-3">
              <div className={`w-4 h-4 rounded-full ${accessToken ? 'bg-green-500' : 'bg-red-500'}`} />
              <div>
                <span className="text-white font-medium">
                  Spotify: {accessToken ? 'Connected' : 'Not Connected'}
                </span>
                <p className="text-gray-400 text-xs">
                  {accessToken ? 'Real-time data access active' : 'Connect to access live music data'}
                </p>
              </div>
            </div>
            {accessToken && (
              <Badge className="bg-green-600 text-white">
                ✅ Active
              </Badge>
            )}
          </div>

          {error && (
            <div className="mt-4 p-4 bg-red-900/20 border border-red-600/50 rounded-lg">
              <p className="text-red-400">{error}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Setup Methods */}
      <Tabs defaultValue="oauth" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-gray-900 border border-red-600/30">
          <TabsTrigger value="oauth" className="data-[state=active]:bg-red-600">OAuth (Recommended)</TabsTrigger>
          <TabsTrigger value="manual" className="data-[state=active]:bg-red-600">Manual Token</TabsTrigger>
          <TabsTrigger value="demo" className="data-[state=active]:bg-red-600">Demo Mode</TabsTrigger>
        </TabsList>

        {/* OAuth Setup */}
        <TabsContent value="oauth" className="space-y-6">
          <Card className="bg-gray-900 border-red-600/30">
            <CardHeader>
              <CardTitle className="text-white">Spotify OAuth Authentication</CardTitle>
              <p className="text-gray-400 text-sm">
                Secure authentication with your Spotify Developer app
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Current URL Info */}
              <div className="bg-black/40 rounded-lg p-4">
                <h4 className="text-white font-semibold mb-2">Your App URL</h4>
                <code className="text-green-400 text-sm bg-black/60 px-3 py-1 rounded">
                  {currentUrl}
                </code>
              </div>

              {/* Required Redirect URI */}
              <div className="bg-blue-900/20 border border-blue-600/30 rounded-lg p-6">
                <h4 className="text-blue-400 font-semibold mb-3">Required Setup Steps:</h4>
                <ol className="text-blue-300 text-sm space-y-2 list-decimal list-inside">
                  <li>Go to <a href="https://developer.spotify.com/dashboard" target="_blank" className="text-blue-400 hover:text-blue-300 underline">Spotify Developer Dashboard</a></li>
                  <li>Find your app with Client ID: <code className="bg-black/40 px-1 rounded text-xs">37ee9f81ed4a41bd87086d03ddc98520</code></li>
                  <li>Click "Edit Settings"</li>
                  <li>Add this Redirect URI:</li>
                </ol>
                <div className="mt-3 p-3 bg-black/60 rounded border border-blue-500/50">
                  <code className="text-green-400 text-sm">
                    {currentUrl}/api/auth/spotify/callback
                  </code>
                </div>
                <p className="text-blue-300 text-xs mt-2">
                  ⚠️ The URI must match exactly (including https://, domain, and path)
                </p>
              </div>

              {/* Connect Button */}
              <div className="text-center">
                <Button
                  onClick={authenticate}
                  className="bg-red-600 hover:bg-red-700 text-lg px-8 py-3"
                  disabled={!currentUrl}
                >
                  🎵 Connect with Spotify OAuth
                </Button>
                <p className="text-gray-400 text-xs mt-2">
                  Requires Spotify Developer app setup (see steps above)
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Manual Token */}
        <TabsContent value="manual" className="space-y-6">
          <Card className="bg-gray-900 border-red-600/30">
            <CardHeader>
              <CardTitle className="text-white">Manual Token Input</CardTitle>
              <p className="text-gray-400 text-sm">
                Use a token from Spotify Web API Console for quick testing
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Token Instructions */}
              <div className="bg-yellow-900/20 border border-yellow-600/30 rounded-lg p-6">
                <h4 className="text-yellow-400 font-semibold mb-3">How to Get a Manual Token:</h4>
                <ol className="text-yellow-300 text-sm space-y-2 list-decimal list-inside">
                  <li>Go to <a href="https://developer.spotify.com/console/" target="_blank" className="text-yellow-400 hover:text-yellow-300 underline">Spotify Web API Console</a></li>
                  <li>Choose any endpoint (e.g., "Get Current User Profile")</li>
                  <li>Click "Get Token" and select required scopes</li>
                  <li>Copy the generated access token</li>
                  <li>Paste it below for instant testing</li>
                </ol>
              </div>

              {/* Token Input */}
              <div className="space-y-4">
                <Input
                  value={manualToken}
                  onChange={(e) => setManualToken(e.target.value)}
                  placeholder="Paste your Spotify access token here..."
                  className="bg-black border-red-600/50 text-white font-mono text-sm"
                  type="password"
                />
                <Button
                  onClick={handleManualToken}
                  disabled={!manualToken.trim()}
                  className="w-full bg-red-600 hover:bg-red-700"
                >
                  🔑 Use Manual Token
                </Button>
              </div>

              <div className="text-center text-xs text-gray-500">
                Manual tokens expire in 1 hour. Use OAuth for persistent access.
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Demo Mode */}
        <TabsContent value="demo" className="space-y-6">
          <Card className="bg-gray-900 border-red-600/30">
            <CardHeader>
              <CardTitle className="text-white">Demo Mode</CardTitle>
              <p className="text-gray-400 text-sm">
                Test all features with realistic mock data for Ella V without API connection
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Demo Features */}
              <div className="bg-purple-900/20 border border-purple-600/30 rounded-lg p-6">
                <h4 className="text-purple-400 font-semibold mb-3">Demo Mode Includes:</h4>
                <ul className="text-purple-300 text-sm space-y-1">
                  <li>✅ Realistic streaming data for Ella V tracks</li>
                  <li>✅ Similar Finnish rap artists for comparison</li>
                  <li>✅ Audio features and popularity metrics</li>
                  <li>✅ Social impact scoring and UN SDG tracking</li>
                  <li>✅ Complete filtering and comparison functionality</li>
                  <li>✅ Data export capabilities for Python analysis</li>
                  <li>✅ Multi-platform integration framework</li>
                  <li>✅ Lyrical analysis with Genius integration</li>
                </ul>
              </div>

              <div className="text-center">
                <Button
                  onClick={useDemoMode}
                  className="bg-purple-600 hover:bg-purple-700 text-lg px-8 py-3"
                >
                  🎪 Start Demo Mode
                </Button>
                <p className="text-gray-400 text-xs mt-2">
                  Perfect for testing features and exporting demo data
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* API Integration Status */}
      <Card className="bg-gray-900 border-red-600/30">
        <CardHeader>
          <CardTitle className="text-white">API Integration Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="text-white font-semibold">Working Endpoints:</h4>
              <div className="text-sm space-y-1">
                <div className="text-green-400">✅ /api/auth/spotify (OAuth flow)</div>
                <div className="text-green-400">✅ /api/export/spotify-data (Data export)</div>
                <div className="text-green-400">✅ /api/platforms/soundcloud/search</div>
                <div className="text-green-400">✅ /api/platforms/genius/analyze</div>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="text-white font-semibold">Your Client ID:</h4>
              <code className="text-yellow-400 text-sm bg-black/60 px-2 py-1 rounded">
                37ee9f81ed4a41bd87086d03ddc98520
              </code>
              <p className="text-gray-400 text-xs">
                Already configured in the application
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}