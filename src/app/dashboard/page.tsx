"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { OverviewCards } from '@/components/dashboard/overview-cards'
import { GeographicChart } from '@/components/dashboard/geographic-chart'
import { TemporalChart } from '@/components/dashboard/temporal-chart'
import { TopTracks } from '@/components/dashboard/top-tracks'
import { RecentActivity } from '@/components/dashboard/recent-activity'
import { SpotifyFilters } from '@/components/filters/spotify-filters'
import { ComparisonCharts } from '@/components/charts/comparison-charts'
import { SpotifyAuth } from '@/components/spotify/spotify-auth'
import { SimilarArtistsComparison } from '@/components/comparison/similar-artists-comparison'
import { AnalyticsSidebar, AnalyticsSettings } from '@/components/controls/analytics-sidebar'
import { StreamingNumbers } from '@/components/streaming/streaming-numbers'
import { useSpotifyData } from '@/hooks/use-spotify-data'

interface FilteredData {
  tracks: any[]
  artists: any[]
  albums: any[]
  comparisonData: {
    selectedTracks: string[]
    selectedArtists: string[]
    selectedAlbums: string[]
  }
}

export default function DashboardPage() {
  const { accessToken, fetchEllaVData, authenticate, loading, error, artists = [], similarArtists = [], tracks = [] } = useSpotifyData()
  const [showFilters, setShowFilters] = useState(false)
  const [showSimilarArtists, setShowSimilarArtists] = useState(false)
  const [showSidebar, setShowSidebar] = useState(false)
  const [analyticsSettings, setAnalyticsSettings] = useState<AnalyticsSettings>({
    timeWindow: { period: '90d' },
    streamingMetrics: {
      showStreamCounts: true,
      showGrowthRates: true,
      showComparativeRanking: false,
      normalizeByFollowers: false
    },
    visualizationOptions: {
      chartType: 'bar',
      showTrendlines: true,
      groupByGenre: false,
      includeAudioFeatures: true
    },
    platformFilters: {
      spotify: true,
      soundcloud: true,
      appleMusic: false,
      tidal: false
    },
    socialImpactFilters: {
      showSDGScores: true,
      themeFiltering: [],
      minImpactScore: 0,
      focusOnEducation: true,
      focusOnEquality: true,
      focusOnPeace: true
    },
    dataExportSettings: {
      includeRawData: true,
      includeCalculatedMetrics: true,
      includeAudioFeatures: true,
      includeLyricalAnalysis: true,
      exportFormat: 'json'
    }
  })
  const [filteredData, setFilteredData] = useState<FilteredData>({
    tracks: [],
    artists: [],
    albums: [],
    comparisonData: {
      selectedTracks: [],
      selectedArtists: [],
      selectedAlbums: []
    }
  })

  // Handle OAuth callback and load data
  useEffect(() => {
    // Check for OAuth callback tokens in URL
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search)
      const tokenFromCallback = urlParams.get('access_token')
      
      if (tokenFromCallback) {
        localStorage.setItem('spotify_access_token', tokenFromCallback)
        // Clean up URL
        window.history.replaceState({}, document.title, window.location.pathname)
        // Token will be picked up by useSpotifyData hook
      }
    }
  }, [])

  useEffect(() => {
    if (accessToken) {
      fetchEllaVData()
    }
  }, [accessToken, fetchEllaVData])

  const handleFiltersChange = (newFilteredData: FilteredData) => {
    setFilteredData(newFilteredData)
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Dashboard Overview</h1>
            <p className="text-gray-300">
              Real-time analytics and insights for Ella V's music performance and social impact
            </p>
          </div>
          
          <div className="flex gap-2">
            {!accessToken && (
              <Button
                onClick={authenticate}
                className="bg-red-600 hover:bg-red-700"
                disabled={loading}
              >
                Connect Spotify
              </Button>
            )}
            <Button
              onClick={() => setShowFilters(!showFilters)}
              variant="outline"
              className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
            >
              {showFilters ? 'Hide' : 'Show'} Filters & Comparison
            </Button>
            <Button
              onClick={() => setShowSimilarArtists(!showSimilarArtists)}
              className="bg-red-600 hover:bg-red-700"
            >
              {showSimilarArtists ? 'Hide' : 'Compare'} Similar Artists
            </Button>
            <Button
              onClick={() => setShowSidebar(!showSidebar)}
              variant="outline"
              className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
            >
              ⚙️ {showSidebar ? 'Hide' : 'Show'} Analytics Controls
            </Button>
          </div>
        </div>

        {/* Spotify Connection Status */}
        {error && (
          <Card className="bg-red-900/20 border-red-600/50">
            <CardContent className="p-4">
              <p className="text-red-400">
                Spotify Error: {error}
                {error.includes('Token expired') && (
                  <Button 
                    onClick={authenticate} 
                    className="ml-4 bg-red-600 hover:bg-red-700" 
                    size="sm"
                  >
                    Reconnect
                  </Button>
                )}
              </p>
            </CardContent>
          </Card>
        )}

        {accessToken && (
          <Card className="bg-green-900/20 border-green-600/50">
            <CardContent className="p-4">
              <p className="text-green-400">
                ✅ Connected to Spotify - Real data integration active
                {loading && <span className="ml-2">Loading...</span>}
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Spotify Authentication */}
      {!accessToken && (
        <SpotifyAuth />
      )}

      {/* Similar Artists Comparison */}
      {showSimilarArtists && (
        <SimilarArtistsComparison
          ellaV={artists[0] || { id: 'ella_v', name: 'Ella V', popularity: 45 }}
          similarArtists={similarArtists}
          onCompare={(selectedArtists) => {
            setFilteredData(prev => ({
              ...prev,
              comparisonData: {
                ...prev.comparisonData,
                selectedArtists
              }
            }))
          }}
        />
      )}

      {/* Filters and Comparison Panel */}
      {showFilters && (
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-4">
            {accessToken && <SpotifyAuth />}
            <SpotifyFilters onFiltersChange={handleFiltersChange} />
          </div>
          <div className="lg:col-span-2">
            <ComparisonCharts
              tracks={filteredData.tracks}
              artists={filteredData.artists}
              albums={filteredData.albums}
              comparisonData={filteredData.comparisonData}
            />
          </div>
        </div>
      )}

      {/* Streaming Numbers Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Streaming Numbers & Analytics</h2>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="border-red-600 text-red-400">
              Period: {analyticsSettings.timeWindow.period}
            </Badge>
            <Badge variant="outline" className="border-red-600 text-red-400">
              {tracks.length} Tracks
            </Badge>
          </div>
        </div>
        
        <StreamingNumbers tracks={tracks} settings={analyticsSettings} />
      </div>

      {/* Overview Metrics */}
      <OverviewCards />

      {/* Main Charts Grid */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Geographic Analysis */}
        <GeographicChart />
        
        {/* Temporal Analysis */}
        <TemporalChart />
      </div>

      {/* Secondary Analytics */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Top Tracks Performance */}
        <div className="lg:col-span-2">
          <TopTracks />
        </div>
        
        {/* Recent Activity */}
        <div className="lg:col-span-1">
          <RecentActivity />
        </div>
      </div>

      {/* Real Spotify Data Integration Areas */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white">Real Spotify Data Integration</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Live Data Analysis Area */}
          <div className="bg-gray-900 border-2 border-red-600/50 rounded-lg p-8 text-center">
            <h3 className="text-lg font-semibold text-white mb-2">🔴 Live Spotify Data</h3>
            <p className="text-gray-400 text-sm mb-4">
              Real-time integration with Spotify's Web API. Track actual streaming data, 
              audio features, and artist metrics for Ella V and comparison artists.
            </p>
            <div className="bg-red-600/20 rounded p-4 text-xs text-red-300 font-mono">
              # Real Spotify API Integration
              <br />
              # Live streaming data, audio features
              <br />
              # Artist metrics and comparisons
              <br />
              Status: {accessToken ? 'Connected ✅' : 'Disconnected ❌'}
            </div>
          </div>

          {/* Advanced Filtering Area */}
          <div className="bg-gray-900 border-2 border-red-600/50 rounded-lg p-8 text-center">
            <h3 className="text-lg font-semibold text-white mb-2">🔍 Advanced Filtering</h3>
            <p className="text-gray-400 text-sm mb-4">
              Dynamic filtering and comparison tools. Select tracks, albums, and artists 
              to create custom comparative visualizations and analytics.
            </p>
            <div className="bg-red-600/20 rounded p-4 text-xs text-red-300 font-mono">
              # Interactive filtering system
              <br />
              # Multi-track/artist comparison
              <br />
              # Audio feature analysis
              <br />
              Active Filters: {filteredData.comparisonData.selectedTracks.length + filteredData.comparisonData.selectedArtists.length}
            </div>
          </div>
        </div>

        {/* Full-width Python Integration Area */}
        <div className="bg-gray-900 border-2 border-red-600/50 rounded-lg p-8 text-center">
          <h3 className="text-xl font-semibold text-white mb-2">📊 Your Python Analytics Integration</h3>
          <p className="text-gray-400 mb-4">
            This area integrates with your Python/Plotly analysis tools. The filtering system above 
            provides structured data that can be exported and analyzed with your custom tools.
          </p>
          
          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div className="bg-red-600/20 rounded p-4">
              <h4 className="text-red-300 font-semibold text-sm mb-2">Data Export</h4>
              <p className="text-red-200 text-xs">
                Export filtered datasets as JSON/CSV for pandas analysis
              </p>
            </div>
            <div className="bg-red-600/20 rounded p-4">
              <h4 className="text-red-300 font-semibold text-sm mb-2">Audio Features</h4>
              <p className="text-red-200 text-xs">
                Access detailed audio analysis data for advanced ML
              </p>
            </div>
            <div className="bg-red-600/20 rounded p-4">
              <h4 className="text-red-300 font-semibold text-sm mb-2">Streamlit Integration</h4>
              <p className="text-red-200 text-xs">
                Embed your Streamlit dashboards directly here
              </p>
            </div>
          </div>
          
          <div className="bg-red-600/20 rounded p-6 text-sm text-red-200 font-mono">
            # Access real Spotify data through API
            <br />
            # filtered_tracks = {filteredData.tracks.length}
            <br />
            # filtered_artists = {filteredData.artists.length}
            <br />
            # Custom comparative analysis with real streaming data
          </div>
        </div>
      </div>

      {/* Analytics Control Sidebar */}
      <AnalyticsSidebar
        onSettingsChange={setAnalyticsSettings}
        isOpen={showSidebar}
        onToggle={() => setShowSidebar(!showSidebar)}
      />
    </div>
  )
}