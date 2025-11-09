"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'

import { useSpotifyData, SpotifyTrack, SpotifyArtist, SpotifyAlbum } from '@/hooks/use-spotify-data'

interface SpotifyFiltersProps {
  onFiltersChange: (filters: FilteredData) => void
}

interface FilteredData {
  tracks: SpotifyTrack[]
  artists: SpotifyArtist[]
  albums: SpotifyAlbum[]
  comparisonData: {
    selectedTracks: string[]
    selectedArtists: string[]
    selectedAlbums: string[]
  }
}

export function SpotifyFilters({ onFiltersChange }: SpotifyFiltersProps) {
  const { tracks = [], artists = [], albums = [], similarArtists = [], searchSpotifyContent, loading } = useSpotifyData()
  
  // Filter states
  const [selectedTracks, setSelectedTracks] = useState<string[]>([])
  const [selectedArtists, setSelectedArtists] = useState<string[]>([])
  const [selectedAlbums, setSelectedAlbums] = useState<string[]>([])
  const [timeRange, setTimeRange] = useState<'short_term' | 'medium_term' | 'long_term'>('medium_term')
  const [minPopularity, setMinPopularity] = useState<number>(0)
  const [maxPopularity, setMaxPopularity] = useState<number>(100)
  
  // Search states
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<{
    artists: SpotifyArtist[]
    tracks: SpotifyTrack[]
    albums: SpotifyAlbum[]
  }>({ artists: [], tracks: [], albums: [] })
  const [showSearch, setShowSearch] = useState(false)

  // Handle search with error handling
  const handleSearch = async () => {
    if (!searchQuery.trim()) return
    
    try {
      const results = await searchSpotifyContent?.(searchQuery, ['artist', 'track', 'album'])
      setSearchResults(results || { artists: [], tracks: [], albums: [] })
      setShowSearch(true)
    } catch (error) {
      console.error('Search error:', error)
      setSearchResults({ artists: [], tracks: [], albums: [] })
      setShowSearch(false)
    }
  }

  // Apply filters and notify parent
  useEffect(() => {
    const filteredTracks = tracks.filter(track => {
      const popularityMatch = track.popularity >= minPopularity && track.popularity <= maxPopularity
      const selectedMatch = selectedTracks.length === 0 || selectedTracks.includes(track.id)
      return popularityMatch && selectedMatch
    })

    const filteredArtists = [...artists, ...similarArtists].filter(artist => {
      const popularityMatch = artist.popularity >= minPopularity && artist.popularity <= maxPopularity
      const selectedMatch = selectedArtists.length === 0 || selectedArtists.includes(artist.id)
      return popularityMatch && selectedMatch
    })

    const filteredAlbums = albums.filter(album => {
      const selectedMatch = selectedAlbums.length === 0 || selectedAlbums.includes(album.id)
      return selectedMatch
    })

    onFiltersChange({
      tracks: filteredTracks,
      artists: filteredArtists,
      albums: filteredAlbums,
      comparisonData: {
        selectedTracks,
        selectedArtists,
        selectedAlbums
      }
    })
  }, [tracks, artists, albums, similarArtists, selectedTracks, selectedArtists, selectedAlbums, minPopularity, maxPopularity, onFiltersChange])

  // Handle checkbox changes
  const handleTrackChange = (trackId: string, checked: boolean) => {
    setSelectedTracks(prev => 
      checked ? [...prev, trackId] : prev.filter(id => id !== trackId)
    )
  }

  const handleArtistChange = (artistId: string, checked: boolean) => {
    setSelectedArtists(prev =>
      checked ? [...prev, artistId] : prev.filter(id => id !== artistId)
    )
  }

  const handleAlbumChange = (albumId: string, checked: boolean) => {
    setSelectedAlbums(prev =>
      checked ? [...prev, albumId] : prev.filter(id => id !== albumId)
    )
  }

  // Add from search results
  const addFromSearch = (item: SpotifyTrack | SpotifyArtist | SpotifyAlbum, type: 'track' | 'artist' | 'album') => {
    switch (type) {
      case 'track':
        if (!selectedTracks.includes(item.id)) {
          setSelectedTracks(prev => [...prev, item.id])
        }
        break
      case 'artist':
        if (!selectedArtists.includes(item.id)) {
          setSelectedArtists(prev => [...prev, item.id])
        }
        break
      case 'album':
        if (!selectedAlbums.includes(item.id)) {
          setSelectedAlbums(prev => [...prev, item.id])
        }
        break
    }
  }

  return (
    <div className="space-y-6">
      {/* Search and Add Comparison Items */}
      <Card className="bg-gray-900 border-red-600/30">
        <CardHeader>
          <CardTitle className="text-white">Add Items for Comparison</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Search artists, tracks, albums..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-black border-red-600/50 text-white"
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <Button 
              onClick={handleSearch}
              className="bg-red-600 hover:bg-red-700"
              disabled={loading}
            >
              Search
            </Button>
          </div>

          {showSearch && (
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {/* Search Results - Artists */}
              {searchResults.artists.length > 0 && (
                <div>
                  <h4 className="text-white font-semibold mb-2">Artists</h4>
                  <div className="space-y-2">
                    {searchResults.artists.slice(0, 5).map((artist) => (
                      <div key={artist.id} className="flex items-center justify-between bg-black/40 p-3 rounded">
                        <div>
                          <span className="text-white font-medium">{artist.name}</span>
                          <p className="text-gray-400 text-sm">Popularity: {artist.popularity}</p>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => addFromSearch(artist, 'artist')}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          Add
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Search Results - Tracks */}
              {searchResults.tracks.length > 0 && (
                <div>
                  <h4 className="text-white font-semibold mb-2">Tracks</h4>
                  <div className="space-y-2">
                    {searchResults.tracks.slice(0, 5).map((track) => (
                      <div key={track.id} className="flex items-center justify-between bg-black/40 p-3 rounded">
                        <div>
                          <span className="text-white font-medium">{track.name}</span>
                          <p className="text-gray-400 text-sm">
                            by {track.artists.map(a => a.name).join(', ')} • Popularity: {track.popularity}
                          </p>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => addFromSearch(track, 'track')}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          Add
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Search Results - Albums */}
              {searchResults.albums.length > 0 && (
                <div>
                  <h4 className="text-white font-semibold mb-2">Albums</h4>
                  <div className="space-y-2">
                    {searchResults.albums.slice(0, 5).map((album) => (
                      <div key={album.id} className="flex items-center justify-between bg-black/40 p-3 rounded">
                        <div>
                          <span className="text-white font-medium">{album.name}</span>
                          <p className="text-gray-400 text-sm">
                            by {album.artists.map(a => a.name).join(', ')} • {album.total_tracks} tracks
                          </p>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => addFromSearch(album, 'album')}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          Add
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Filter Controls */}
      <Card className="bg-gray-900 border-red-600/30">
        <CardHeader>
          <CardTitle className="text-white">Filter Options</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Time Range */}
          <div>
            <label className="text-white font-medium mb-2 block">Time Range</label>
            <Select value={timeRange} onValueChange={(value: any) => setTimeRange(value)}>
              <SelectTrigger className="bg-black border-red-600/50 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="short_term">Last 4 weeks</SelectItem>
                <SelectItem value="medium_term">Last 6 months</SelectItem>
                <SelectItem value="long_term">All time</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Popularity Range */}
          <div>
            <label className="text-white font-medium mb-2 block">Popularity Range</label>
            <div className="flex gap-2 items-center">
              <Input
                type="number"
                min="0"
                max="100"
                value={minPopularity}
                onChange={(e) => setMinPopularity(Number(e.target.value))}
                className="bg-black border-red-600/50 text-white"
                placeholder="Min"
              />
              <span className="text-gray-400">to</span>
              <Input
                type="number"
                min="0"
                max="100"
                value={maxPopularity}
                onChange={(e) => setMaxPopularity(Number(e.target.value))}
                className="bg-black border-red-600/50 text-white"
                placeholder="Max"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ella V's Tracks Selection */}
      {tracks.length > 0 && (
        <Card className="bg-gray-900 border-red-600/30">
          <CardHeader>
            <CardTitle className="text-white">Ella V's Tracks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {tracks.map((track) => (
                <div key={track.id} className="flex items-center space-x-3">
                  <Checkbox
                    id={`track-${track.id}`}
                    checked={selectedTracks.includes(track.id)}
                    onCheckedChange={(checked) => handleTrackChange(track.id, !!checked)}
                  />
                  <label htmlFor={`track-${track.id}`} className="flex-1 cursor-pointer">
                    <div className="text-white font-medium">{track.name}</div>
                    <div className="text-gray-400 text-sm">
                      Popularity: {track.popularity} • Duration: {Math.floor(track.duration_ms / 60000)}:{String(Math.floor((track.duration_ms % 60000) / 1000)).padStart(2, '0')}
                    </div>
                  </label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Similar Artists Selection */}
      {similarArtists.length > 0 && (
        <Card className="bg-gray-900 border-red-600/30">
          <CardHeader>
            <CardTitle className="text-white">Similar Artists</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {similarArtists.map((artist) => (
                <div key={artist.id} className="flex items-center space-x-3">
                  <Checkbox
                    id={`artist-${artist.id}`}
                    checked={selectedArtists.includes(artist.id)}
                    onCheckedChange={(checked) => handleArtistChange(artist.id, !!checked)}
                  />
                  <label htmlFor={`artist-${artist.id}`} className="flex-1 cursor-pointer">
                    <div className="text-white font-medium">{artist.name}</div>
                    <div className="text-gray-400 text-sm">
                      Popularity: {artist.popularity} • Followers: {artist.followers.total.toLocaleString()}
                    </div>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {artist.genres.slice(0, 3).map((genre) => (
                        <Badge key={genre} variant="outline" className="border-red-600/50 text-red-400 text-xs">
                          {genre}
                        </Badge>
                      ))}
                    </div>
                  </label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Albums Selection */}
      {albums.length > 0 && (
        <Card className="bg-gray-900 border-red-600/30">
          <CardHeader>
            <CardTitle className="text-white">Albums</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {albums.map((album) => (
                <div key={album.id} className="flex items-center space-x-3">
                  <Checkbox
                    id={`album-${album.id}`}
                    checked={selectedAlbums.includes(album.id)}
                    onCheckedChange={(checked) => handleAlbumChange(album.id, !!checked)}
                  />
                  <label htmlFor={`album-${album.id}`} className="flex-1 cursor-pointer">
                    <div className="text-white font-medium">{album.name}</div>
                    <div className="text-gray-400 text-sm">
                      Released: {album.release_date} • {album.total_tracks} tracks
                    </div>
                  </label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Active Filters Summary */}
      <Card className="bg-gray-900 border-red-600/30">
        <CardHeader>
          <CardTitle className="text-white">Active Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="text-sm text-gray-400">
              Selected: {selectedTracks.length} tracks, {selectedArtists.length} artists, {selectedAlbums.length} albums
            </div>
            <div className="text-sm text-gray-400">
              Popularity: {minPopularity} - {maxPopularity}
            </div>
            <div className="text-sm text-gray-400">
              Time range: {timeRange.replace('_', ' ')}
            </div>
            
            <Button
              onClick={() => {
                setSelectedTracks([])
                setSelectedArtists([])
                setSelectedAlbums([])
                setMinPopularity(0)
                setMaxPopularity(100)
              }}
              variant="outline"
              className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
            >
              Clear All Filters
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}