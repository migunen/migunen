import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q') || ''
    const accessToken = searchParams.get('access_token')

    if (!accessToken) {
      return NextResponse.json({ error: 'Spotify access token required' }, { status: 401 })
    }

    if (!query) {
      return NextResponse.json({ error: 'Search query required' }, { status: 400 })
    }

    // Search Spotify for the artist
    const searchResponse = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track,artist&limit=50`,
      {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      }
    )

    if (!searchResponse.ok) {
      if (searchResponse.status === 401) {
        return NextResponse.json({ error: 'Invalid or expired Spotify token' }, { status: 401 })
      }
      throw new Error(`Spotify API error: ${searchResponse.status}`)
    }

    const searchData = await searchResponse.json()

    // Normalize Spotify data to unified format
    const tracks = searchData.tracks.items.map((track: any) => ({
      id: track.id,
      platform: 'spotify',
      name: track.name,
      artist: track.artists.map((a: any) => a.name).join(', '),
      album: track.album.name,
      duration_ms: track.duration_ms,
      popularity: track.popularity,
      release_date: track.album.release_date,
      preview_url: track.preview_url,
      platform_specific: {
        spotify_id: track.id,
        external_url: track.external_urls.spotify
      }
    }))

    // Get audio features for tracks
    if (tracks.length > 0) {
      const trackIds = tracks.map((t: any) => t.id).slice(0, 20).join(',')
      const featuresResponse = await fetch(
        `https://api.spotify.com/v1/audio-features?ids=${trackIds}`,
        {
          headers: { 'Authorization': `Bearer ${accessToken}` }
        }
      )

      if (featuresResponse.ok) {
        const featuresData = await featuresResponse.json()
        
        tracks.forEach((track: any, index: number) => {
          const features = featuresData.audio_features[index]
          if (features) {
            track.audio_features = {
              danceability: features.danceability,
              energy: features.energy,
              valence: features.valence,
              tempo: features.tempo,
              acousticness: features.acousticness,
              instrumentalness: features.instrumentalness
            }
          }
        })
      }
    }

    return NextResponse.json({
      platform: 'spotify',
      tracks,
      artists: searchData.artists.items.map((artist: any) => ({
        id: artist.id,
        platform: 'spotify',
        name: artist.name,
        followers: artist.followers.total,
        popularity: artist.popularity,
        genres: artist.genres,
        verified: artist.images.length > 0
      })),
      total_results: searchData.tracks.total
    })

  } catch (error) {
    console.error('Spotify search error:', error)
    return NextResponse.json(
      { error: 'Failed to search Spotify data' },
      { status: 500 }
    )
  }
}