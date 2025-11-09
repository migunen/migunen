"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts'

interface SimilarArtistsComparisonProps {
  ellaV: any
  similarArtists: any[]
  onCompare: (artists: string[]) => void
}

export function SimilarArtistsComparison({ ellaV, similarArtists, onCompare }: SimilarArtistsComparisonProps) {
  const [selectedForComparison, setSelectedForComparison] = useState<string[]>([])
  const [comparisonMode, setComparisonMode] = useState<'side-by-side' | 'overlay'>('side-by-side')

  // Mock similar artists data (Finnish rap and conscious hip-hop)
  const mockSimilarArtists = [
    {
      id: 'artist_1',
      name: 'Pehmoaino',
      popularity: 67,
      followers: { total: 15420 },
      genres: ['finnish rap', 'alternative hip hop'],
      monthly_listeners: 8934,
      top_track_popularity: 72
    },
    {
      id: 'artist_2', 
      name: 'Portion Boys',
      popularity: 78,
      followers: { total: 45230 },
      genres: ['finnish rap', 'trap'],
      monthly_listeners: 23456,
      top_track_popularity: 85
    },
    {
      id: 'artist_3',
      name: 'Mikael Gabriel',
      popularity: 82,
      followers: { total: 156780 },
      genres: ['finnish rap', 'pop rap'],
      monthly_listeners: 87654,
      top_track_popularity: 89
    },
    {
      id: 'artist_4',
      name: 'Costee',
      popularity: 54,
      followers: { total: 12890 },
      genres: ['conscious rap', 'alternative hip hop'],
      monthly_listeners: 5678,
      top_track_popularity: 61
    }
  ]

  // Include Ella V in comparison data
  const ellaVData = {
    id: 'ella_v',
    name: 'Ella V',
    popularity: 45,
    followers: { total: 1250 },
    genres: ['finnish rap', 'conscious hip hop'],
    monthly_listeners: 2156,
    top_track_popularity: 42
  }

  const allArtists = [ellaVData, ...mockSimilarArtists]
  const artistsToUse = similarArtists.length > 0 ? [ellaV, ...similarArtists] : allArtists

  // Handle artist selection for comparison
  const toggleArtistSelection = (artistId: string) => {
    setSelectedForComparison(prev => {
      const newSelection = prev.includes(artistId)
        ? prev.filter(id => id !== artistId)
        : [...prev, artistId]
      
      onCompare(newSelection)
      return newSelection
    })
  }

  // Add Ella V by default
  useEffect(() => {
    if (!selectedForComparison.includes('ella_v')) {
      setSelectedForComparison(['ella_v'])
      onCompare(['ella_v'])
    }
  }, [selectedForComparison, onCompare])

  // Get data for selected artists
  const selectedArtistsData = artistsToUse.filter(artist => 
    selectedForComparison.includes(artist.id)
  )

  // Prepare comparison data for charts
  const comparisonData = selectedArtistsData.map(artist => ({
    name: artist.name,
    popularity: artist.popularity,
    followers: Math.floor(artist.followers.total / 1000), // In thousands
    monthly_listeners: Math.floor(artist.monthly_listeners / 1000), // In thousands
    top_track: artist.top_track_popularity || 50
  }))

  // Radar chart data for multi-dimensional comparison
  const radarData = [
    {
      metric: 'Popularity',
      ...selectedArtistsData.reduce((acc, artist) => {
        acc[artist.name] = artist.popularity
        return acc
      }, {} as any)
    },
    {
      metric: 'Followers (k)',
      ...selectedArtistsData.reduce((acc, artist) => {
        acc[artist.name] = Math.floor(artist.followers.total / 1000)
        return acc
      }, {} as any)
    },
    {
      metric: 'Monthly Listeners (k)',
      ...selectedArtistsData.reduce((acc, artist) => {
        acc[artist.name] = Math.floor(artist.monthly_listeners / 1000)
        return acc
      }, {} as any)
    },
    {
      metric: 'Top Track Score',
      ...selectedArtistsData.reduce((acc, artist) => {
        acc[artist.name] = artist.top_track_popularity || 50
        return acc
      }, {} as any)
    }
  ]

  return (
    <div className="space-y-6">
      {/* Artist Selection Grid */}
      <Card className="bg-gray-900 border-red-600/30">
        <CardHeader>
          <CardTitle className="text-white">Similar Artists Comparison</CardTitle>
          <p className="text-gray-400 text-sm">
            Select artists to compare with Ella V side-by-side
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Comparison Mode Toggle */}
            <div className="flex gap-2">
              <Button
                onClick={() => setComparisonMode('side-by-side')}
                variant={comparisonMode === 'side-by-side' ? 'default' : 'outline'}
                className={comparisonMode === 'side-by-side' 
                  ? "bg-red-600 hover:bg-red-700" 
                  : "border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
                }
                size="sm"
              >
                Side-by-Side
              </Button>
              <Button
                onClick={() => setComparisonMode('overlay')}
                variant={comparisonMode === 'overlay' ? 'default' : 'outline'}
                className={comparisonMode === 'overlay' 
                  ? "bg-red-600 hover:bg-red-700" 
                  : "border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
                }
                size="sm"
              >
                Overlay
              </Button>
            </div>

            {/* Artist Selection Grid */}
            <div className="grid md:grid-cols-2 gap-4">
              {artistsToUse.map((artist) => (
                <div key={artist.id} className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                  selectedForComparison.includes(artist.id) 
                    ? 'border-red-600 bg-red-600/20' 
                    : 'border-gray-600 bg-black/40 hover:border-red-600/50'
                }`}
                onClick={() => toggleArtistSelection(artist.id)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="text-white font-semibold">{artist.name}</h4>
                      {artist.id === 'ella_v' && (
                        <Badge className="bg-red-600 text-white text-xs mt-1">Primary Artist</Badge>
                      )}
                    </div>
                    <div className={`w-4 h-4 rounded border-2 ${
                      selectedForComparison.includes(artist.id) 
                        ? 'bg-red-600 border-red-600' 
                        : 'border-gray-400'
                    }`} />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <div className="text-gray-400">Popularity</div>
                      <div className="text-white font-semibold">{artist.popularity}/100</div>
                    </div>
                    <div>
                      <div className="text-gray-400">Followers</div>
                      <div className="text-white font-semibold">{(artist.followers.total / 1000).toFixed(1)}k</div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mt-2">
                    {artist.genres.slice(0, 2).map((genre: string) => (
                      <Badge key={genre} variant="outline" className="border-red-600/50 text-red-400 text-xs">
                        {genre}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Selection Buttons */}
            <div className="flex flex-wrap gap-2">
              <Button
                onClick={() => {
                  const finishRapArtists = artistsToUse
                    .filter(a => a.genres.some((g: string) => g.includes('finnish')))
                    .map(a => a.id)
                  setSelectedForComparison(finishRapArtists)
                  onCompare(finishRapArtists)
                }}
                variant="outline"
                size="sm"
                className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
              >
                📍 Compare Finnish Rap Artists
              </Button>
              
              <Button
                onClick={() => {
                  const consciousArtists = artistsToUse
                    .filter(a => a.genres.some((g: string) => g.includes('conscious')))
                    .map(a => a.id)
                  setSelectedForComparison(consciousArtists)
                  onCompare(consciousArtists)
                }}
                variant="outline"
                size="sm"
                className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
              >
                🎯 Compare Conscious Rap Artists
              </Button>

              <Button
                onClick={() => {
                  setSelectedForComparison(['ella_v'])
                  onCompare(['ella_v'])
                }}
                variant="outline"
                size="sm"
                className="border-gray-600 text-gray-400 hover:bg-gray-600 hover:text-white"
              >
                🔄 Reset to Ella V Only
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Side-by-Side Comparison Charts */}
      {selectedArtistsData.length > 1 && comparisonMode === 'side-by-side' && (
        <div className="grid md:grid-cols-2 gap-6">
          {/* Popularity vs Followers */}
          <Card className="bg-gray-900 border-red-600/30">
            <CardHeader>
              <CardTitle className="text-white">Popularity vs Followers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={comparisonData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="name" stroke="#9CA3AF" fontSize={12} angle={-45} textAnchor="end" height={80} />
                    <YAxis stroke="#9CA3AF" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #DC2626', color: '#F3F4F6' }}
                    />
                    <Bar dataKey="popularity" fill="#DC2626" name="Popularity" />
                    <Bar dataKey="followers" fill="#B91C1C" name="Followers (k)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Monthly Listeners */}
          <Card className="bg-gray-900 border-red-600/30">
            <CardHeader>
              <CardTitle className="text-white">Monthly Listeners</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={comparisonData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="name" stroke="#9CA3AF" fontSize={12} angle={-45} textAnchor="end" height={80} />
                    <YAxis stroke="#9CA3AF" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #DC2626', color: '#F3F4F6' }}
                    />
                    <Bar dataKey="monthly_listeners" fill="#DC2626" name="Monthly Listeners (k)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Overlay Comparison (Radar Chart) */}
      {selectedArtistsData.length > 1 && comparisonMode === 'overlay' && (
        <Card className="bg-gray-900 border-red-600/30">
          <CardHeader>
            <CardTitle className="text-white">Multi-Dimensional Artist Comparison</CardTitle>
            <p className="text-gray-400 text-sm">
              Overlay comparison of {selectedArtistsData.length} selected artists
            </p>
          </CardHeader>
          <CardContent>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#374151" />
                  <PolarAngleAxis dataKey="metric" tick={{ fontSize: 12, fill: '#9CA3AF' }} />
                  <PolarRadiusAxis 
                    angle={90} 
                    domain={[0, 100]} 
                    tick={{ fontSize: 10, fill: '#9CA3AF' }}
                  />
                  {selectedArtistsData.map((artist, index) => (
                    <Radar
                      key={artist.id}
                      name={artist.name}
                      dataKey={artist.name}
                      stroke={artist.id === 'ella_v' ? '#DC2626' : `hsl(${index * 60}, 70%, 50%)`}
                      fill={artist.id === 'ella_v' ? '#DC2626' : `hsl(${index * 60}, 70%, 50%)`}
                      fillOpacity={artist.id === 'ella_v' ? 0.3 : 0.1}
                      strokeWidth={artist.id === 'ella_v' ? 3 : 2}
                    />
                  ))}
                  <Legend wrapperStyle={{ color: '#F3F4F6' }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Detailed Artist Metrics Table */}
      {selectedArtistsData.length > 0 && (
        <Card className="bg-gray-900 border-red-600/30">
          <CardHeader>
            <CardTitle className="text-white">Detailed Metrics Comparison</CardTitle>
            <p className="text-gray-400 text-sm">
              Comprehensive metrics for {selectedArtistsData.length} selected artists
            </p>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left text-gray-400 text-sm py-3 px-4">Artist</th>
                    <th className="text-left text-gray-400 text-sm py-3 px-4">Popularity</th>
                    <th className="text-left text-gray-400 text-sm py-3 px-4">Followers</th>
                    <th className="text-left text-gray-400 text-sm py-3 px-4">Monthly Listeners</th>
                    <th className="text-left text-gray-400 text-sm py-3 px-4">Top Track</th>
                    <th className="text-left text-gray-400 text-sm py-3 px-4">Primary Genre</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedArtistsData.map((artist) => (
                    <tr key={artist.id} className="border-b border-white/5 hover:bg-white/5">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <span className={`text-white font-medium ${artist.id === 'ella_v' ? 'text-red-400' : ''}`}>
                            {artist.name}
                          </span>
                          {artist.id === 'ella_v' && (
                            <Badge className="bg-red-600 text-white text-xs">You</Badge>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <span className="text-white">{artist.popularity}/100</span>
                          <div className="w-16 h-2 bg-gray-700 rounded-full">
                            <div 
                              className="h-2 bg-red-600 rounded-full"
                              style={{ width: `${artist.popularity}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-white">{(artist.followers.total / 1000).toFixed(1)}k</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-white">{(artist.monthly_listeners / 1000).toFixed(1)}k</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-white">{artist.top_track_popularity || 'N/A'}</span>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant="outline" className="border-red-600/50 text-red-400 text-xs">
                          {artist.genres[0] || 'Unknown'}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Comparison Insights */}
      {selectedArtistsData.length > 1 && (
        <Card className="bg-gray-900 border-red-600/30">
          <CardHeader>
            <CardTitle className="text-white">Comparison Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-black/40 rounded p-4">
                  <h4 className="text-white font-semibold mb-2">Ella V's Position</h4>
                  <p className="text-gray-400 text-sm">
                    {ellaVData.popularity > 50 
                      ? "Above average popularity in comparison group"
                      : "Growing artist with strong potential for breakthrough"
                    }
                  </p>
                  <div className="mt-2">
                    <Badge className="bg-red-600 text-white text-xs">
                      Rank: #{selectedArtistsData
                        .sort((a, b) => b.popularity - a.popularity)
                        .findIndex(a => a.id === 'ella_v') + 1} of {selectedArtistsData.length}
                    </Badge>
                  </div>
                </div>

                <div className="bg-black/40 rounded p-4">
                  <h4 className="text-white font-semibold mb-2">Growth Potential</h4>
                  <p className="text-gray-400 text-sm">
                    Strong position in conscious rap niche with room for mainstream crossover
                  </p>
                  <div className="mt-2">
                    <Badge variant="outline" className="border-green-600 text-green-400 text-xs">
                      High Growth Potential
                    </Badge>
                  </div>
                </div>

                <div className="bg-black/40 rounded p-4">
                  <h4 className="text-white font-semibold mb-2">Social Impact</h4>
                  <p className="text-gray-400 text-sm">
                    Leading in social consciousness and positive messaging themes
                  </p>
                  <div className="mt-2">
                    <Badge variant="outline" className="border-blue-600 text-blue-400 text-xs">
                      Impact Leader
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Custom Analysis Area */}
              <div className="p-6 bg-red-600/10 border border-red-500/30 rounded-lg">
                <h4 className="text-white font-semibold mb-2">📊 Your Custom Similar Artists Analysis</h4>
                <p className="text-red-300 text-sm mb-4">
                  Advanced comparative analysis area for your Python/Plotly visualizations:
                </p>
                <ul className="text-red-300 text-sm space-y-1 mb-4">
                  <li>• Artist similarity clustering and positioning analysis</li>
                  <li>• Competitive landscape mapping and opportunity identification</li>
                  <li>• Genre evolution and market trend analysis</li>
                  <li>• Social impact comparison across similar artists</li>
                </ul>
                <div className="bg-red-600/20 rounded p-4 font-mono text-xs text-red-200">
                  # Similar artists analysis
                  <br />
                  # selected_artists = {selectedArtistsData.length}
                  <br />
                  # Ella V vs {selectedArtistsData.filter(a => a.id !== 'ella_v').map(a => a.name).join(', ')}
                  <br />
                  # Advanced competitive intelligence
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}