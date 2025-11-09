// Multi-platform music API client configuration
// Supports Spotify, SoundCloud, Apple Music, Tidal, and Genius

export interface PlatformConfig {
  spotify: {
    clientId: string
    clientSecret: string
    redirectUri: string
  }
  soundcloud: {
    clientId: string
    clientSecret: string
  }
  appleMusic: {
    developerToken: string
    teamId: string
    keyId: string
  }
  tidal: {
    clientId: string
    clientSecret: string
  }
  genius: {
    accessToken: string
  }
}

export interface UnifiedTrack {
  id: string
  platform: 'spotify' | 'soundcloud' | 'apple_music' | 'tidal'
  name: string
  artist: string
  album?: string
  duration_ms: number
  popularity: number
  release_date: string
  preview_url?: string
  stream_count?: number
  likes_count?: number
  reposts_count?: number
  play_count?: number
  audio_features?: {
    danceability: number
    energy: number
    valence: number
    tempo: number
    acousticness: number
    instrumentalness: number
  }
  lyrics?: {
    full_text: string
    language: string
    themes: string[]
    sentiment_score: number
    word_count: number
    explicit: boolean
  }
}

export interface UnifiedArtist {
  id: string
  platform: 'spotify' | 'soundcloud' | 'apple_music' | 'tidal'
  name: string
  followers: number
  popularity: number
  genres: string[]
  bio?: string
  location?: string
  monthly_listeners?: number
  total_plays?: number
  verified: boolean
}

export class MultiPlatformAPI {
  private config: Partial<PlatformConfig>

  constructor(config: Partial<PlatformConfig>) {
    this.config = config
  }

  // Spotify API methods (already implemented)
  async getSpotifyTracks(accessToken: string, artistName: string): Promise<UnifiedTrack[]> {
    const response = await fetch(`https://api.spotify.com/v1/search?q=artist:"${artistName}"&type=track&limit=50`, {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    })
    
    if (!response.ok) throw new Error(`Spotify API error: ${response.status}`)
    
    const data = await response.json()
    return data.tracks.items.map((track: any) => this.normalizeSpotifyTrack(track))
  }

  // SoundCloud API methods
  async getSoundCloudTracks(artistName: string): Promise<UnifiedTrack[]> {
    if (!this.config.soundcloud?.clientId) {
      throw new Error('SoundCloud client ID not configured')
    }

    const response = await fetch(
      `https://api.soundcloud.com/tracks?q=${encodeURIComponent(artistName)}&client_id=${this.config.soundcloud.clientId}&limit=50`
    )
    
    if (!response.ok) throw new Error(`SoundCloud API error: ${response.status}`)
    
    const data = await response.json()
    return data.map((track: any) => this.normalizeSoundCloudTrack(track))
  }

  // Apple Music API methods
  async getAppleMusicTracks(artistName: string): Promise<UnifiedTrack[]> {
    if (!this.config.appleMusic?.developerToken) {
      throw new Error('Apple Music developer token not configured')
    }

    const response = await fetch(
      `https://api.music.apple.com/v1/catalog/us/search?term=${encodeURIComponent(artistName)}&types=songs&limit=50`,
      {
        headers: {
          'Authorization': `Bearer ${this.config.appleMusic.developerToken}`,
          'Music-User-Token': '' // User token for personalized data
        }
      }
    )
    
    if (!response.ok) throw new Error(`Apple Music API error: ${response.status}`)
    
    const data = await response.json()
    return data.results.songs.data.map((track: any) => this.normalizeAppleMusicTrack(track))
  }

  // Tidal API methods
  async getTidalTracks(artistName: string): Promise<UnifiedTrack[]> {
    if (!this.config.tidal?.clientId) {
      throw new Error('Tidal client ID not configured')
    }

    // Note: Tidal API requires special access and authentication
    const response = await fetch(
      `https://api.tidalhifi.com/v1/search/tracks?query=${encodeURIComponent(artistName)}&limit=50`,
      {
        headers: {
          'X-Tidal-Token': this.config.tidal.clientId
        }
      }
    )
    
    if (!response.ok) throw new Error(`Tidal API error: ${response.status}`)
    
    const data = await response.json()
    return data.items.map((track: any) => this.normalizeTidalTrack(track))
  }

  // Genius API for lyrical analysis
  async getGeniusLyrics(trackName: string, artistName: string): Promise<any> {
    if (!this.config.genius?.accessToken) {
      throw new Error('Genius access token not configured')
    }

    // Search for the song
    const searchResponse = await fetch(
      `https://api.genius.com/search?q=${encodeURIComponent(`${trackName} ${artistName}`)}`,
      {
        headers: {
          'Authorization': `Bearer ${this.config.genius.accessToken}`
        }
      }
    )
    
    if (!searchResponse.ok) throw new Error(`Genius API error: ${searchResponse.status}`)
    
    const searchData = await searchResponse.json()
    
    if (searchData.response.hits.length === 0) {
      return null
    }

    const song = searchData.response.hits[0].result
    
    // Get detailed song information
    const songResponse = await fetch(
      `https://api.genius.com/songs/${song.id}`,
      {
        headers: {
          'Authorization': `Bearer ${this.config.genius.accessToken}`
        }
      }
    )
    
    if (!songResponse.ok) throw new Error(`Genius song API error: ${songResponse.status}`)
    
    const songData = await songResponse.json()
    return this.normalizeGeniusData(songData.response.song)
  }

  // Cross-platform search
  async searchAllPlatforms(query: string): Promise<{
    spotify: UnifiedTrack[]
    soundcloud: UnifiedTrack[]
    appleMusic: UnifiedTrack[]
    tidal: UnifiedTrack[]
  }> {
    const results = await Promise.allSettled([
      this.searchSpotify(query),
      this.searchSoundCloud(query),
      this.searchAppleMusic(query),
      this.searchTidal(query)
    ])

    return {
      spotify: results[0].status === 'fulfilled' ? results[0].value : [],
      soundcloud: results[1].status === 'fulfilled' ? results[1].value : [],
      appleMusic: results[2].status === 'fulfilled' ? results[2].value : [],
      tidal: results[3].status === 'fulfilled' ? results[3].value : []
    }
  }

  // Platform-specific search methods
  private async searchSpotify(query: string): Promise<UnifiedTrack[]> {
    // Implementation for Spotify search
    return []
  }

  private async searchSoundCloud(query: string): Promise<UnifiedTrack[]> {
    // Implementation for SoundCloud search
    return []
  }

  private async searchAppleMusic(query: string): Promise<UnifiedTrack[]> {
    // Implementation for Apple Music search
    return []
  }

  private async searchTidal(query: string): Promise<UnifiedTrack[]> {
    // Implementation for Tidal search
    return []
  }

  // Normalization methods to unify data formats
  private normalizeSpotifyTrack(track: any): UnifiedTrack {
    return {
      id: track.id,
      platform: 'spotify',
      name: track.name,
      artist: track.artists.map((a: any) => a.name).join(', '),
      album: track.album.name,
      duration_ms: track.duration_ms,
      popularity: track.popularity,
      release_date: track.album.release_date,
      preview_url: track.preview_url
    }
  }

  private normalizeSoundCloudTrack(track: any): UnifiedTrack {
    return {
      id: track.id.toString(),
      platform: 'soundcloud',
      name: track.title,
      artist: track.user.username,
      duration_ms: track.duration,
      popularity: Math.min(100, Math.floor(track.playback_count / 1000)), // Normalize to 0-100
      release_date: track.created_at,
      preview_url: track.stream_url,
      stream_count: track.playback_count,
      likes_count: track.likes_count,
      reposts_count: track.reposts_count
    }
  }

  private normalizeAppleMusicTrack(track: any): UnifiedTrack {
    return {
      id: track.id,
      platform: 'apple_music',
      name: track.attributes.name,
      artist: track.attributes.artistName,
      album: track.attributes.albumName,
      duration_ms: track.attributes.durationInMillis,
      popularity: 50, // Apple Music doesn't provide popularity scores
      release_date: track.attributes.releaseDate,
      preview_url: track.attributes.previews?.[0]?.url
    }
  }

  private normalizeTidalTrack(track: any): UnifiedTrack {
    return {
      id: track.id.toString(),
      platform: 'tidal',
      name: track.title,
      artist: track.artist.name,
      album: track.album.title,
      duration_ms: track.duration * 1000,
      popularity: track.popularity || 50,
      release_date: track.album.releaseDate || track.dateAdded
    }
  }

  private normalizeGeniusData(song: any): any {
    return {
      id: song.id,
      title: song.title,
      artist: song.primary_artist.name,
      album: song.album?.name,
      release_date: song.release_date_for_display,
      description: song.description?.plain,
      lyrics_url: song.url,
      themes: song.custom_song_art_image_url ? ['visual'] : [],
      stats: {
        page_views: song.stats?.pageviews,
        hot: song.stats?.hot
      }
    }
  }
}