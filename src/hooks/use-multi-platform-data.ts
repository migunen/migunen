"use client"

import { useState, useCallback } from 'react'

export interface PlatformTokens {
  spotify?: string
  soundcloud?: string
  appleMusic?: string
  tidal?: string
  genius?: string
}

export interface MultiPlatformTrack {
  id: string
  platform: 'spotify' | 'soundcloud' | 'apple_music' | 'tidal'
  name: string
  artist: string
  album?: string
  duration_ms: number
  popularity: number
  release_date: string
  stream_count?: number
  likes_count?: number
  audio_features?: {
    danceability?: number
    energy?: number
    valence?: number
    tempo?: number
  }
  lyrics?: {
    full_text?: string
    themes?: string[]
    sentiment_score?: number
    word_count?: number
    language?: string
  }
  platform_specific?: {
    spotify_id?: string
    soundcloud_permalink?: string
    apple_music_id?: string
    tidal_id?: string
    genius_id?: string
  }
}

export interface LyricalAnalysis {
  track_id: string
  track_name: string
  artist_name: string
  lyrics: {
    full_text: string
    verse_count: number
    chorus_count: number
    word_count: number
    unique_words: number
    reading_level: number
  }
  themes: {
    mental_health: number
    social_justice: number
    peace_love: number
    nature: number
    empowerment: number
    identity: number
    education: number
  }
  sentiment: {
    overall_score: number
    positive_percentage: number
    negative_percentage: number
    neutral_percentage: number
    emotional_intensity: number
  }
  impact_metrics: {
    sdg_4_education: number
    sdg_10_equality: number
    sdg_16_peace_justice: number
    social_message_strength: number
  }
  linguistic_analysis: {
    language: string
    complexity_score: number
    metaphor_count: number
    rhyme_scheme: string
    rhythm_pattern: string
  }
}

export function useMultiPlatformData() {
  const [tokens, setTokens] = useState<PlatformTokens>({})
  const [multiPlatformTracks, setMultiPlatformTracks] = useState<MultiPlatformTrack[]>([])
  const [lyricalAnalyses, setLyricalAnalyses] = useState<LyricalAnalysis[]>([])
  const [loading, setLoading] = useState<{ [platform: string]: boolean }>({})
  const [errors, setErrors] = useState<{ [platform: string]: string }>({})

  // Initialize tokens from localStorage
  const initializeTokens = useCallback(() => {
    if (typeof window !== 'undefined') {
      setTokens({
        spotify: localStorage.getItem('spotify_access_token') || undefined,
        soundcloud: localStorage.getItem('soundcloud_access_token') || undefined,
        appleMusic: localStorage.getItem('apple_music_token') || undefined,
        tidal: localStorage.getItem('tidal_access_token') || undefined,
        genius: localStorage.getItem('genius_access_token') || undefined,
      })
    }
  }, [])

  // Set platform token
  const setPlatformToken = useCallback((platform: keyof PlatformTokens, token: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(`${platform}_access_token`, token)
      setTokens(prev => ({ ...prev, [platform]: token }))
    }
  }, [])

  // Remove platform token
  const removePlatformToken = useCallback((platform: keyof PlatformTokens) => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(`${platform}_access_token`)
      setTokens(prev => ({ ...prev, [platform]: undefined }))
    }
  }, [])

  // Fetch data from all connected platforms
  const fetchAllPlatformData = useCallback(async (artistName: string = 'Ella V') => {
    const platforms = Object.keys(tokens).filter(platform => tokens[platform as keyof PlatformTokens])
    
    for (const platform of platforms) {
      setLoading(prev => ({ ...prev, [platform]: true }))
      setErrors(prev => ({ ...prev, [platform]: '' }))
      
      try {
        switch (platform) {
          case 'spotify':
            if (tokens.spotify) {
              const spotifyTracks = await fetchSpotifyData(tokens.spotify, artistName)
              setMultiPlatformTracks(prev => [...prev.filter(t => t.platform !== 'spotify'), ...spotifyTracks])
            }
            break
            
          case 'soundcloud':
            if (tokens.soundcloud) {
              const soundcloudTracks = await fetchSoundCloudData(artistName)
              setMultiPlatformTracks(prev => [...prev.filter(t => t.platform !== 'soundcloud'), ...soundcloudTracks])
            }
            break
            
          case 'appleMusic':
            if (tokens.appleMusic) {
              const appleTracks = await fetchAppleMusicData(tokens.appleMusic, artistName)
              setMultiPlatformTracks(prev => [...prev.filter(t => t.platform !== 'apple_music'), ...appleTracks])
            }
            break
            
          case 'tidal':
            if (tokens.tidal) {
              const tidalTracks = await fetchTidalData(tokens.tidal, artistName)
              setMultiPlatformTracks(prev => [...prev.filter(t => t.platform !== 'tidal'), ...tidalTracks])
            }
            break
        }
      } catch (error) {
        setErrors(prev => ({ 
          ...prev, 
          [platform]: error instanceof Error ? error.message : `Failed to fetch ${platform} data`
        }))
      } finally {
        setLoading(prev => ({ ...prev, [platform]: false }))
      }
    }
  }, [tokens])

  // Platform-specific fetch functions
  const fetchSpotifyData = async (accessToken: string, artistName: string): Promise<MultiPlatformTrack[]> => {
    const response = await fetch(`/api/platforms/spotify/search?q=${encodeURIComponent(artistName)}&access_token=${accessToken}`)
    if (!response.ok) throw new Error('Spotify fetch failed')
    const data = await response.json()
    return data.tracks || []
  }

  const fetchSoundCloudData = async (artistName: string): Promise<MultiPlatformTrack[]> => {
    const response = await fetch(`/api/platforms/soundcloud/search?q=${encodeURIComponent(artistName)}`)
    if (!response.ok) throw new Error('SoundCloud fetch failed')
    const data = await response.json()
    return data.tracks || []
  }

  const fetchAppleMusicData = async (token: string, artistName: string): Promise<MultiPlatformTrack[]> => {
    const response = await fetch(`/api/platforms/apple-music/search?q=${encodeURIComponent(artistName)}&token=${token}`)
    if (!response.ok) throw new Error('Apple Music fetch failed')
    const data = await response.json()
    return data.tracks || []
  }

  const fetchTidalData = async (token: string, artistName: string): Promise<MultiPlatformTrack[]> => {
    const response = await fetch(`/api/platforms/tidal/search?q=${encodeURIComponent(artistName)}&token=${token}`)
    if (!response.ok) throw new Error('Tidal fetch failed')
    const data = await response.json()
    return data.tracks || []
  }

  // Lyrical analysis with Genius
  const analyzeLyrics = useCallback(async (tracks: MultiPlatformTrack[]): Promise<LyricalAnalysis[]> => {
    if (!tokens.genius) {
      console.log('Genius token not available for lyrical analysis')
      return []
    }

    setLoading(prev => ({ ...prev, genius: true }))
    
    try {
      const analysisPromises = tracks.map(async (track) => {
        const response = await fetch('/api/platforms/genius/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            track_name: track.name,
            artist_name: track.artist,
            access_token: tokens.genius
          })
        })
        
        if (!response.ok) throw new Error(`Genius analysis failed for ${track.name}`)
        return response.json()
      })

      const analyses = await Promise.allSettled(analysisPromises)
      const successfulAnalyses = analyses
        .filter((result): result is PromiseFulfilledResult<LyricalAnalysis> => result.status === 'fulfilled')
        .map(result => result.value)

      setLyricalAnalyses(successfulAnalyses)
      return successfulAnalyses
      
    } catch (error) {
      setErrors(prev => ({ ...prev, genius: 'Lyrical analysis failed' }))
      return []
    } finally {
      setLoading(prev => ({ ...prev, genius: false }))
    }
  }, [tokens.genius])

  // Get comprehensive analytics across all platforms
  const getCrossplatformAnalytics = useCallback(() => {
    const platformCounts = multiPlatformTracks.reduce((acc, track) => {
      acc[track.platform] = (acc[track.platform] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    const totalStreams = multiPlatformTracks.reduce((sum, track) => {
      return sum + (track.stream_count || track.play_count || 0)
    }, 0)

    const averagePopularity = multiPlatformTracks.length > 0 
      ? multiPlatformTracks.reduce((sum, track) => sum + track.popularity, 0) / multiPlatformTracks.length
      : 0

    const themeDistribution = lyricalAnalyses.reduce((acc, analysis) => {
      Object.entries(analysis.themes).forEach(([theme, score]) => {
        acc[theme] = (acc[theme] || 0) + score
      })
      return acc
    }, {} as Record<string, number>)

    return {
      platform_distribution: platformCounts,
      total_tracks: multiPlatformTracks.length,
      total_streams: totalStreams,
      average_popularity: averagePopularity,
      lyrical_themes: themeDistribution,
      platforms_connected: Object.values(tokens).filter(Boolean).length,
      social_impact_score: lyricalAnalyses.length > 0 
        ? lyricalAnalyses.reduce((sum, a) => sum + 
            (a.impact_metrics.sdg_4_education + a.impact_metrics.sdg_10_equality + a.impact_metrics.sdg_16_peace_justice) / 3
          , 0) / lyricalAnalyses.length
        : 0
    }
  }, [multiPlatformTracks, lyricalAnalyses, tokens])

  // Platform authentication helpers
  const authenticateSpotify = () => {
    const clientId = '37ee9f81ed4a41bd87086d03ddc98520'
    const redirectUri = 'https://sb-3a691yq25qfn.vercel.run/api/auth/spotify/callback'
    const scopes = ['user-read-private', 'user-read-email', 'user-top-read', 'user-read-recently-played'].join(' ')
    
    const authUrl = `https://accounts.spotify.com/authorize?` +
      `client_id=${clientId}&` +
      `response_type=code&` +
      `redirect_uri=${encodeURIComponent(redirectUri)}&` +
      `scope=${encodeURIComponent(scopes)}&` +
      `state=${Math.random().toString(36).substring(7)}`

    window.location.href = authUrl
  }

  const authenticateSoundCloud = () => {
    // SoundCloud OAuth flow
    const clientId = 'YOUR_SOUNDCLOUD_CLIENT_ID'
    const redirectUri = 'https://sb-3a691yq25qfn.vercel.run/api/auth/soundcloud/callback'
    
    const authUrl = `https://soundcloud.com/connect?` +
      `client_id=${clientId}&` +
      `redirect_uri=${encodeURIComponent(redirectUri)}&` +
      `response_type=code`

    window.location.href = authUrl
  }

  return {
    tokens,
    multiPlatformTracks,
    lyricalAnalyses,
    loading,
    errors,
    initializeTokens,
    setPlatformToken,
    removePlatformToken,
    fetchAllPlatformData,
    analyzeLyrics,
    getCrossplatformAnalytics,
    authenticateSpotify,
    authenticateSoundCloud
  }
}