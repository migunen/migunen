"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function MusicPage() {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([])
  const [currentTrack, setCurrentTrack] = useState({
    title: "Mental Clarity",
    artist: "Hip-hop Artist",
    duration: "3:24"
  })

  const genres = [
    'Blues', 'Classical', 'Hip-hop', 'Reggae', 
    'Rhythm and Blues', 'Electronic', 'Jazz', 'Rock'
  ]

  const toggleGenre = (genre: string) => {
    setSelectedGenres(prev => 
      prev.includes(genre) 
        ? prev.filter(g => g !== genre)
        : [...prev, genre]
    )
  }

  const topTracks = [
    { title: "Peace & Unity", artist: "Various Artists", plays: "12.4K", genre: "Hip-hop" },
    { title: "Mental Clarity", artist: "Meditation Mix", plays: "8.7K", genre: "Classical" },
    { title: "Urban Rhythm", artist: "City Beats", plays: "15.2K", genre: "Hip-hop" },
    { title: "Blues Monday", artist: "Classic Collection", plays: "6.3K", genre: "Blues" }
  ]

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-white">Music Analytics</h1>
          <p className="text-gray-400">
            Hey, aku penasaran nih, jenis musik apa sih yang biasanya kamu suka dengar?
          </p>
        </div>

        {/* Music Player */}
        <Card className="bg-gray-900 border-red-600/30 max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-white text-center">Music Player</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-6">
              {/* Album Art */}
              <div className="w-32 h-32 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center mx-auto">
                <span className="text-white text-4xl">🎵</span>
              </div>
              
              {/* Track Info */}
              <div>
                <h3 className="text-white font-bold text-lg">{currentTrack.title}</h3>
                <p className="text-gray-400">{currentTrack.artist}</p>
                <p className="text-red-400 text-sm">{currentTrack.duration}</p>
              </div>
              
              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-red-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                </div>
                <div className="flex justify-between text-xs text-gray-400">
                  <span>1:32</span>
                  <span>3:24</span>
                </div>
              </div>
              
              {/* Playback Controls */}
              <div className="flex justify-center items-center gap-6">
                <Button size="sm" variant="outline" className="border-red-600/50 text-red-400 hover:bg-red-600 hover:text-white rounded-full w-10 h-10">
                  ⏮️
                </Button>
                <Button className="bg-red-600 hover:bg-red-700 rounded-full w-12 h-12">
                  ⏸️
                </Button>
                <Button size="sm" variant="outline" className="border-red-600/50 text-red-400 hover:bg-red-600 hover:text-white rounded-full w-10 h-10">
                  ⏭️
                </Button>
              </div>
              
              <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                Continue
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Genre Selection */}
        <Card className="bg-gray-900 border-red-600/30">
          <CardHeader>
            <CardTitle className="text-white text-center">Select Your Favorite Genres</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {genres.map((genre) => (
                <Button
                  key={genre}
                  variant={selectedGenres.includes(genre) ? "default" : "outline"}
                  onClick={() => toggleGenre(genre)}
                  className={selectedGenres.includes(genre)
                    ? "bg-red-600 hover:bg-red-700 text-white"
                    : "border-red-600/50 text-red-400 hover:bg-red-600 hover:text-white"
                  }
                >
                  {genre}
                </Button>
              ))}
            </div>
            
            {selectedGenres.length > 0 && (
              <div className="text-center">
                <p className="text-gray-400 mb-3">Selected Genres:</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {selectedGenres.map((genre) => (
                    <Badge key={genre} className="bg-red-600 text-white">
                      {genre}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Top Tracks */}
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-gray-900 border-red-600/30">
            <CardHeader>
              <CardTitle className="text-white">Top Tracks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topTracks.map((track, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">{index + 1}</span>
                      </div>
                      <div>
                        <p className="text-white font-medium text-sm">{track.title}</p>
                        <p className="text-gray-400 text-xs">{track.artist}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-red-400 font-semibold text-sm">{track.plays}</p>
                      <Badge className="bg-red-600/20 text-red-400 text-xs">
                        {track.genre}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-red-600/30">
            <CardHeader>
              <CardTitle className="text-white">Music Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Listening Time */}
                <div className="text-center p-4 bg-red-600/10 rounded-lg">
                  <div className="text-2xl font-bold text-white">124h</div>
                  <p className="text-gray-400 text-sm">This Month</p>
                  <p className="text-red-400 text-xs">+23% from last month</p>
                </div>
                
                {/* Favorite Genre */}
                <div className="text-center p-4 bg-gray-800 rounded-lg">
                  <div className="text-xl font-bold text-white">Hip-hop</div>
                  <p className="text-gray-400 text-sm">Most Played Genre</p>
                  <p className="text-red-400 text-xs">67% of listening time</p>
                </div>
                
                {/* Discovery Rate */}
                <div className="text-center p-4 bg-gray-800 rounded-lg">
                  <div className="text-xl font-bold text-white">12</div>
                  <p className="text-gray-400 text-sm">New Artists Discovered</p>
                  <p className="text-red-400 text-xs">This week</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Music Analytics Charts Placeholder */}
        <Card className="bg-gray-900 border-red-600/30">
          <CardHeader>
            <CardTitle className="text-white">🎵 Your Custom Music Analytics Visualization</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-8 bg-red-600/10 border border-red-600/30 rounded-lg text-center">
              <h3 className="text-white font-semibold mb-4">Custom Music Data Visualization Area</h3>
              <p className="text-gray-300 mb-6">
                This area is designed for your custom music analytics visualizations, 
                including listening patterns, genre preferences, and social music trends.
              </p>
              
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="bg-red-600/20 rounded p-4">
                  <h4 className="text-red-300 font-semibold text-sm mb-2">Listening Patterns</h4>
                  <p className="text-red-200 text-xs">Track daily and weekly listening habits with interactive charts</p>
                </div>
                <div className="bg-red-600/20 rounded p-4">
                  <h4 className="text-red-300 font-semibold text-sm mb-2">Genre Analysis</h4>
                  <p className="text-red-200 text-xs">Deep dive into music preference evolution over time</p>
                </div>
              </div>
              
              <div className="bg-red-600/20 rounded p-6 font-mono text-sm text-red-200">
                # Custom music analytics integration
                <br />
                import plotly.express as px
                <br />
                # Music listening pattern analysis
                <br />
                # Genre preference tracking and correlation
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}