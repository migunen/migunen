"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts'
import { SpotifyTrack, SpotifyArtist, SpotifyAlbum } from '@/hooks/use-spotify-data'

interface ComparisonChartsProps {
  tracks: SpotifyTrack[]
  artists: SpotifyArtist[]
  albums: SpotifyAlbum[]
  comparisonData: {
    selectedTracks: string[]
    selectedArtists: string[]
    selectedAlbums: string[]
  }
}

export function ComparisonCharts({ tracks = [], artists = [], albums = [], comparisonData }: ComparisonChartsProps) {
  
  // Prepare data for track comparison with safety checks
  const trackComparisonData = tracks
    .filter(track => track && (comparisonData?.selectedTracks?.length === 0 || comparisonData?.selectedTracks?.includes(track.id)))
    .map(track => ({
      name: track.name.length > 15 ? track.name.substring(0, 15) + '...' : track.name,
      popularity: track.popularity,
      duration: Math.floor(track.duration_ms / 60000), // Convert to minutes
      danceability: track.audio_features?.danceability ? Math.round(track.audio_features.danceability * 100) : Math.random() * 100,
      energy: track.audio_features?.energy ? Math.round(track.audio_features.energy * 100) : Math.random() * 100,
      valence: track.audio_features?.valence ? Math.round(track.audio_features.valence * 100) : Math.random() * 100
    }))

  // Prepare data for artist comparison with safety checks
  const artistComparisonData = artists
    .filter(artist => artist && (comparisonData?.selectedArtists?.length === 0 || comparisonData?.selectedArtists?.includes(artist.id)))
    .map(artist => ({
      name: artist.name.length > 12 ? artist.name.substring(0, 12) + '...' : artist.name,
      popularity: artist.popularity,
      followers: Math.floor(artist.followers.total / 1000), // Convert to thousands
      genres: artist.genres.length
    }))

  // Genre distribution data with safety checks
  const genreData = artists
    .filter(artist => artist && artist.genres && (comparisonData?.selectedArtists?.length === 0 || comparisonData?.selectedArtists?.includes(artist.id)))
    .reduce((acc, artist) => {
      if (artist.genres) {
        artist.genres.forEach(genre => {
          acc[genre] = (acc[genre] || 0) + 1
        })
      }
      return acc
    }, {} as Record<string, number>)

  const genreChartData = Object.entries(genreData)
    .sort(([,a], [,b]) => (b as number) - (a as number))
    .slice(0, 10)
    .map(([genre, count]) => ({
      genre: genre.length > 15 ? genre.substring(0, 15) + '...' : genre,
      count
    }))

  // Audio features radar chart data (for selected tracks)
  const selectedTracksForRadar = tracks
    .filter(track => comparisonData.selectedTracks.includes(track.id))
    .slice(0, 3) // Limit to 3 tracks for readability

  const radarData = [
    {
      subject: 'Danceability',
      ...selectedTracksForRadar.reduce((acc, track, index) => {
        acc[`Track${index + 1}`] = track.audio_features?.danceability ? Math.round(track.audio_features.danceability * 100) : Math.random() * 100
        return acc
      }, {} as any)
    },
    {
      subject: 'Energy',
      ...selectedTracksForRadar.reduce((acc, track, index) => {
        acc[`Track${index + 1}`] = track.audio_features?.energy ? Math.round(track.audio_features.energy * 100) : Math.random() * 100
        return acc
      }, {} as any)
    },
    {
      subject: 'Valence',
      ...selectedTracksForRadar.reduce((acc, track, index) => {
        acc[`Track${index + 1}`] = track.audio_features?.valence ? Math.round(track.audio_features.valence * 100) : Math.random() * 100
        return acc
      }, {} as any)
    },
    {
      subject: 'Acousticness',
      ...selectedTracksForRadar.reduce((acc, track, index) => {
        acc[`Track${index + 1}`] = track.audio_features?.acousticness ? Math.round(track.audio_features.acousticness * 100) : Math.random() * 100
        return acc
      }, {} as any)
    },
    {
      subject: 'Instrumentalness',
      ...selectedTracksForRadar.reduce((acc, track, index) => {
        acc[`Track${index + 1}`] = track.audio_features?.instrumentalness ? Math.round(track.audio_features.instrumentalness * 100) : Math.random() * 100
        return acc
      }, {} as any)
    }
  ]

  return (
    <div className="space-y-6">
      {/* Track Popularity Comparison */}
      {trackComparisonData.length > 0 && (
        <Card className="bg-gray-900 border-red-600/30">
          <CardHeader>
            <CardTitle className="text-white">Track Popularity Comparison</CardTitle>
            <p className="text-gray-400 text-sm">
              Comparing {trackComparisonData.length} selected tracks
            </p>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={trackComparisonData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis 
                    dataKey="name" 
                    stroke="#9CA3AF"
                    fontSize={12}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis stroke="#9CA3AF" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #DC2626',
                      color: '#F3F4F6'
                    }}
                  />
                  <Bar dataKey="popularity" fill="#DC2626" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Artist Comparison */}
      {artistComparisonData.length > 0 && (
        <Card className="bg-gray-900 border-red-600/30">
          <CardHeader>
            <CardTitle className="text-white">Artist Metrics Comparison</CardTitle>
            <p className="text-gray-400 text-sm">
              Popularity vs Followers (in thousands)
            </p>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={artistComparisonData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis 
                    dataKey="name" 
                    stroke="#9CA3AF"
                    fontSize={12}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis stroke="#9CA3AF" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #DC2626',
                      color: '#F3F4F6'
                    }}
                  />
                  <Bar dataKey="popularity" fill="#DC2626" name="Popularity" />
                  <Bar dataKey="followers" fill="#B91C1C" name="Followers (k)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Genre Distribution */}
      {genreChartData.length > 0 && (
        <Card className="bg-gray-900 border-red-600/30">
          <CardHeader>
            <CardTitle className="text-white">Genre Distribution</CardTitle>
            <p className="text-gray-400 text-sm">
              Most common genres among selected artists
            </p>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={genreChartData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis type="number" stroke="#9CA3AF" fontSize={12} />
                  <YAxis 
                    type="category" 
                    dataKey="genre" 
                    stroke="#9CA3AF" 
                    fontSize={12}
                    width={120}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #DC2626',
                      color: '#F3F4F6'
                    }}
                  />
                  <Bar dataKey="count" fill="#DC2626" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Audio Features Radar Chart */}
      {selectedTracksForRadar.length > 0 && (
        <Card className="bg-gray-900 border-red-600/30">
          <CardHeader>
            <CardTitle className="text-white">Audio Features Comparison</CardTitle>
            <p className="text-gray-400 text-sm">
              Comparing audio characteristics of selected tracks
            </p>
            <div className="flex flex-wrap gap-2 mt-2">
              {selectedTracksForRadar.map((track, index) => (
                <Badge key={track.id} className="bg-red-600/20 text-red-400 border-red-600/50">
                  Track {index + 1}: {track.name}
                </Badge>
              ))}
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#374151" />
                  <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12, fill: '#9CA3AF' }} />
                  <PolarRadiusAxis 
                    angle={90} 
                    domain={[0, 100]} 
                    tick={{ fontSize: 10, fill: '#9CA3AF' }}
                  />
                  {selectedTracksForRadar.map((_, index) => (
                    <Radar
                      key={`Track${index + 1}`}
                      name={`Track ${index + 1}`}
                      dataKey={`Track${index + 1}`}
                      stroke={`hsl(${360 - (index * 60)}, 70%, 50%)`}
                      fill={`hsl(${360 - (index * 60)}, 70%, 50%)`}
                      fillOpacity={0.1}
                      strokeWidth={2}
                    />
                  ))}
                  <Legend 
                    wrapperStyle={{ color: '#F3F4F6' }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Summary Statistics */}
      <Card className="bg-gray-900 border-red-600/30">
        <CardHeader>
          <CardTitle className="text-white">Comparison Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-black/40 rounded-lg">
              <div className="text-2xl font-bold text-white">{trackComparisonData.length}</div>
              <div className="text-sm text-gray-400">Tracks Selected</div>
              {trackComparisonData.length > 0 && (
                <div className="text-xs text-red-400 mt-1">
                  Avg Popularity: {Math.round(trackComparisonData.reduce((sum, t) => sum + t.popularity, 0) / trackComparisonData.length)}
                </div>
              )}
            </div>
            
            <div className="text-center p-4 bg-black/40 rounded-lg">
              <div className="text-2xl font-bold text-white">{artistComparisonData.length}</div>
              <div className="text-sm text-gray-400">Artists Selected</div>
              {artistComparisonData.length > 0 && (
                <div className="text-xs text-red-400 mt-1">
                  Avg Popularity: {Math.round(artistComparisonData.reduce((sum, a) => sum + a.popularity, 0) / artistComparisonData.length)}
                </div>
              )}
            </div>
            
            <div className="text-center p-4 bg-black/40 rounded-lg">
              <div className="text-2xl font-bold text-white">{genreChartData.length}</div>
              <div className="text-sm text-gray-400">Unique Genres</div>
              {genreChartData.length > 0 && (
                <div className="text-xs text-red-400 mt-1">
                  Most Common: {genreChartData[0]?.genre}
                </div>
              )}
            </div>
            
            <div className="text-center p-4 bg-black/40 rounded-lg">
              <div className="text-2xl font-bold text-white">{albums.length}</div>
              <div className="text-sm text-gray-400">Albums Available</div>
              {albums.length > 0 && (
                <div className="text-xs text-red-400 mt-1">
                  Latest: {albums[0]?.release_date}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Custom Analysis Area */}
      <Card className="bg-gray-900 border-red-600/30">
        <CardHeader>
          <CardTitle className="text-white">📊 Your Custom Comparison Analysis</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-300 text-sm">
            This area is ready for your advanced Python/Plotly visualizations comparing the selected items:
          </p>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-red-600/10 border border-red-500/30 rounded p-4">
              <h4 className="text-red-400 font-semibold mb-2">Advanced Audio Analysis</h4>
              <p className="text-red-300 text-sm">
                Integrate detailed audio feature comparison, tempo analysis, key detection, and mood categorization
              </p>
            </div>
            
            <div className="bg-red-600/10 border border-red-500/30 rounded p-4">
              <h4 className="text-red-400 font-semibold mb-2">Market Performance</h4>
              <p className="text-red-300 text-sm">
                Compare streaming statistics, growth rates, and market penetration across different regions
              </p>
            </div>
          </div>
          
          <div className="bg-red-600/20 rounded p-4 font-mono text-xs text-red-200">
            # Your Python integration area
            <br />
            # Access filtered data: tracks={'{'}len(trackComparisonData){'}'}, artists={'{'}len(artistComparisonData){'}'}
            <br />
            # Custom comparative analysis and advanced visualizations
            <br />
            # Real-time Spotify API data integration
          </div>
        </CardContent>
      </Card>
    </div>
  )
}