// Spotify Web API client configuration
// This is server-side only - never import in client components

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET
const SPOTIFY_REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI || 'http://localhost:3000/api/auth/spotify/callback'

export const spotifyConfig = {
  clientId: SPOTIFY_CLIENT_ID,
  clientSecret: SPOTIFY_CLIENT_SECRET,
  redirectUri: SPOTIFY_REDIRECT_URI,
  scopes: [
    'user-read-private',
    'user-read-email', 
    'streaming',
    'user-top-read',
    'user-read-recently-played',
    'playlist-read-private',
    'user-library-read'
  ]
}

export interface SpotifyTokens {
  access_token: string
  refresh_token: string
  expires_in: number
  token_type: string
  scope: string
}

export interface SpotifyArtistData {
  id: string
  name: string
  followers: {
    total: number
  }
  popularity: number
  genres: string[]
  images: Array<{
    url: string
    height: number
    width: number
  }>
}

export interface SpotifyTrackData {
  id: string
  name: string
  popularity: number
  duration_ms: number
  explicit: boolean
  preview_url: string | null
  artists: Array<{
    id: string
    name: string
  }>
}

export class SpotifyAPI {
  private accessToken: string

  constructor(accessToken: string) {
    this.accessToken = accessToken
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `https://api.spotify.com/v1${endpoint}`
    
    const response = await fetch(url, {
      ...options,
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
        ...options.headers
      }
    })

    if (!response.ok) {
      throw new Error(`Spotify API error: ${response.status} ${response.statusText}`)
    }

    return response.json()
  }

  // Get current user profile
  async getCurrentUser() {
    return this.request('/me')
  }

  // Get user's top tracks
  async getTopTracks(timeRange: 'short_term' | 'medium_term' | 'long_term' = 'medium_term', limit = 20) {
    return this.request(`/me/top/tracks?time_range=${timeRange}&limit=${limit}`)
  }

  // Get user's top artists
  async getTopArtists(timeRange: 'short_term' | 'medium_term' | 'long_term' = 'medium_term', limit = 20) {
    return this.request(`/me/top/artists?time_range=${timeRange}&limit=${limit}`)
  }

  // Get recently played tracks
  async getRecentlyPlayed(limit = 50) {
    return this.request(`/me/player/recently-played?limit=${limit}`)
  }

  // Get artist information
  async getArtist(artistId: string) {
    return this.request(`/artists/${artistId}`)
  }

  // Get artist's top tracks
  async getArtistTopTracks(artistId: string, country = 'US') {
    return this.request(`/artists/${artistId}/top-tracks?country=${country}`)
  }

  // Get track information
  async getTrack(trackId: string) {
    return this.request(`/tracks/${trackId}`)
  }

  // Get track audio features
  async getTrackAudioFeatures(trackId: string) {
    return this.request(`/audio-features/${trackId}`)
  }

  // Search for artists, tracks, etc.
  async search(query: string, type: string[] = ['artist', 'track'], limit = 20) {
    const typeString = type.join(',')
    return this.request(`/search?q=${encodeURIComponent(query)}&type=${typeString}&limit=${limit}`)
  }
}

// Server-side token management
export async function getSpotifyAccessToken(code: string): Promise<SpotifyTokens> {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64')}`
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: SPOTIFY_REDIRECT_URI!
    })
  })

  if (!response.ok) {
    throw new Error(`Failed to get access token: ${response.statusText}`)
  }

  return response.json()
}

export async function refreshSpotifyToken(refreshToken: string): Promise<SpotifyTokens> {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64')}`
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken
    })
  })

  if (!response.ok) {
    throw new Error(`Failed to refresh token: ${response.statusText}`)
  }

  return response.json()
}

// Generate Spotify OAuth URL
export function getSpotifyAuthUrl(): string {
  const params = new URLSearchParams({
    client_id: SPOTIFY_CLIENT_ID!,
    response_type: 'code',
    redirect_uri: SPOTIFY_REDIRECT_URI!,
    scope: spotifyConfig.scopes.join(' '),
    state: Math.random().toString(36).substring(7) // Simple state for security
  })

  return `https://accounts.spotify.com/authorize?${params.toString()}`
}