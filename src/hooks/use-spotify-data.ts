"use client"

import { useState, useEffect, useCallback } from 'react'

export interface SpotifyTrack {
  id: string
  name: string
  artists: Array<{ id: string; name: string }>
  album: {
    id: string
    name: string
    release_date: string
    images: Array<{ url: string; height: number; width: number }>
  }
  popularity: number
  duration_ms: number
  external_urls: { spotify: string }
  preview_url: string | null
  audio_features?: {
    danceability: number
    energy: number
    valence: number
    tempo: number
    acousticness: number
    instrumentalness: number
  }
}

export interface SpotifyArtist {
  id: string
  name: string
  popularity: number
  genres: string[]
  followers: { total: number }
  images: Array<{ url: string; height: number; width: number }>
  external_urls: { spotify: string }
}

export interface SpotifyAlbum {
  id: string
  name: string
  artists: Array<{ id: string; name: string }>
  release_date: string
  total_tracks: number
  images: Array<{ url: string; height: number; width: number }>
  popularity?: number
  tracks?: SpotifyTrack[]
}

export interface FilterOptions {
  selectedTracks: string[]
  selectedAlbums: string[]
  selectedArtists: string[]
  timeRange: 'short_term' | 'medium_term' | 'long_term'
  dateRange: { start: string; end: string }
  genres: string[]
  minPopularity: number
  maxPopularity: number
}

export function useSpotifyData() {
  const [tracks, setTracks] = useState<SpotifyTrack[]>([])
  const [albums, setAlbums] = useState<SpotifyAlbum[]>([])
  const [artists, setArtists] = useState<SpotifyArtist[]>([])
  const [similarArtists, setSimilarArtists] = useState<SpotifyArtist[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [accessToken, setAccessToken] = useState<string | null>(null)

  // Initialize with stored token (with error handling)
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('spotify_access_token')
        if (token && token !== 'null' && token !== 'undefined') {
          setAccessToken(token)
        }
      }
    } catch (error) {
      console.error('Error accessing localStorage:', error)
      setError('Failed to load stored credentials')
    }
  }, [])

  const fetchData = useCallback(async (endpoint: string, options: RequestInit = {}) => {
    if (!accessToken) {
      throw new Error('No access token available')
    }

    const response = await fetch(`https://api.spotify.com/v1${endpoint}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    })

    if (!response.ok) {
      if (response.status === 401) {
        // Token expired, clear it
        localStorage.removeItem('spotify_access_token')
        setAccessToken(null)
        throw new Error('Token expired. Please re-authenticate.')
      }
      throw new Error(`Spotify API error: ${response.status}`)
    }

    return response.json()
  }, [accessToken])

  // Fetch Ella V's data (search for her first)
  const fetchEllaVData = useCallback(async () => {
    if (!accessToken) return

    setLoading(true)
    setError(null)

    try {
      // Search for Ella V
      const searchResults = await fetchData('/search?q=Ella%20V&type=artist&limit=1')
      
      // Always provide default mock data for demo/testing
      setArtists([{
        id: 'mock_ella_v',
        name: 'Ella V',
        popularity: 45,
        genres: ['finnish rap', 'conscious hip hop'],
        followers: { total: 1250 },
        images: [],
        external_urls: { spotify: '' }
      }])
      
      // Set mock tracks
      setTracks([
        {
          id: 'track_1',
          name: 'Peace & Unity',
          artists: [{ id: 'mock_ella_v', name: 'Ella V' }],
          album: {
            id: 'album_1',
            name: 'Messages of Hope',
            release_date: '2024-03-15',
            images: []
          },
          popularity: 42,
          duration_ms: 204000,
          external_urls: { spotify: '' },
          preview_url: null
        },
        {
          id: 'track_2', 
          name: 'Mental Clarity',
          artists: [{ id: 'mock_ella_v', name: 'Ella V' }],
          album: {
            id: 'album_1',
            name: 'Messages of Hope',
            release_date: '2024-03-15',
            images: []
          },
          popularity: 38,
          duration_ms: 252000,
          external_urls: { spotify: '' },
          preview_url: null
        },
        {
          id: 'track_3',
          name: 'Voices Rise',
          artists: [{ id: 'mock_ella_v', name: 'Ella V' }],
          album: {
            id: 'album_1',
            name: 'Messages of Hope',
            release_date: '2024-03-15',
            images: []
          },
          popularity: 51,
          duration_ms: 198000,
          external_urls: { spotify: '' },
          preview_url: null
        }
      ])

      // Set mock albums
      setAlbums([{
        id: 'album_1',
        name: 'Messages of Hope',
        artists: [{ id: 'mock_ella_v', name: 'Ella V' }],
        release_date: '2024-03-15',
        total_tracks: 8,
        images: []
      }])

      // Set mock similar artists
      setSimilarArtists([
        {
          id: 'similar_1',
          name: 'Pehmoaino',
          popularity: 67,
          genres: ['finnish rap', 'alternative hip hop'],
          followers: { total: 15420 },
          images: [],
          external_urls: { spotify: '' }
        },
        {
          id: 'similar_2',
          name: 'Portion Boys',
          popularity: 78,
          genres: ['finnish rap', 'trap'],
          followers: { total: 45230 },
          images: [],
          external_urls: { spotify: '' }
        },
        {
          id: 'similar_3',
          name: 'Mikael Gabriel',
          popularity: 82,
          genres: ['finnish rap', 'pop rap'],
          followers: { total: 156780 },
          images: [],
          external_urls: { spotify: '' }
        }
      ])

      if (searchResults?.artists?.items?.length === 0) {
        return
      }

      const ellaV = searchResults.artists.items[0]
      setArtists([ellaV])

      // Get her albums
      const albumsData = await fetchData(`/artists/${ellaV.id}/albums?include_groups=album,single&limit=20`)
      setAlbums(albumsData.items)

      // Get top tracks
      const topTracksData = await fetchData(`/artists/${ellaV.id}/top-tracks?country=FI`)
      setTracks(topTracksData.tracks)

      // Get similar artists
      const relatedData = await fetchData(`/artists/${ellaV.id}/related-artists`)
      setSimilarArtists(relatedData.artists.slice(0, 10))

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data')
      console.error('Spotify API error:', err)
    } finally {
      setLoading(false)
    }
  }, [accessToken, fetchData])

  // Enhanced search function for comparison (with better error handling)
  const searchSpotifyContent = useCallback(async (query: string, types: string[] = ['artist', 'track', 'album']) => {
    if (!query?.trim()) {
      return { artists: [], tracks: [], albums: [] }
    }

    // If no access token, return mock search results
    if (!accessToken) {
      return {
        artists: [
          { id: 'mock_artist_1', name: `Mock Artist for "${query}"`, popularity: 50, genres: ['demo'], followers: { total: 1000 }, images: [], external_urls: { spotify: '' } }
        ],
        tracks: [
          { id: 'mock_track_1', name: `Mock Track for "${query}"`, artists: [{ id: 'mock', name: 'Mock Artist' }], album: { id: 'mock', name: 'Mock Album', release_date: '2024-01-01', images: [] }, popularity: 50, duration_ms: 180000, external_urls: { spotify: '' }, preview_url: null }
        ],
        albums: []
      }
    }

    try {
      const typeString = types.join(',')
      const searchData = await fetchData(`/search?q=${encodeURIComponent(query)}&type=${typeString}&limit=20`)
      
      return {
        artists: searchData?.artists?.items || [],
        tracks: searchData?.tracks?.items || [],
        albums: searchData?.albums?.items || []
      }
    } catch (err) {
      console.error('Search error:', err)
      return { artists: [], tracks: [], albums: [] }
    }
  }, [accessToken, fetchData])

  // Get audio features for tracks (for advanced analytics)
  const getAudioFeatures = useCallback(async (trackIds: string[]) => {
    if (!accessToken || trackIds.length === 0) return []

    try {
      const ids = trackIds.join(',')
      const featuresData = await fetchData(`/audio-features?ids=${ids}`)
      return featuresData.audio_features
    } catch (err) {
      console.error('Audio features error:', err)
      return []
    }
  }, [accessToken, fetchData])

  // Authentication helper
  const authenticate = useCallback(() => {
    const clientId = '37ee9f81ed4a41bd87086d03ddc98520'
    if (!clientId) {
      setError('Spotify client ID not configured')
      return
    }

    const redirectUri = `${window.location.origin}/api/auth/spotify/callback`
    const scopes = [
      'user-read-private',
      'user-read-email',
      'user-top-read',
      'user-read-recently-played',
      'playlist-read-private',
      'user-library-read'
    ].join(' ')

    const authUrl = `https://accounts.spotify.com/authorize?` +
      `client_id=${clientId}&` +
      `response_type=code&` +
      `redirect_uri=${encodeURIComponent(redirectUri)}&` +
      `scope=${encodeURIComponent(scopes)}&` +
      `state=${Math.random().toString(36).substring(7)}`

    window.location.href = authUrl
  }, [])

  return {
    tracks,
    albums, 
    artists,
    similarArtists,
    loading,
    error,
    accessToken,
    fetchEllaVData,
    searchSpotifyContent,
    getAudioFeatures,
    authenticate,
    setAccessToken
  }
}