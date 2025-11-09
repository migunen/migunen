import { NextRequest, NextResponse } from 'next/server'
import { SpotifyAPI } from '@/lib/spotify'

// GET /api/spotify/data - Get comprehensive Spotify data for Ella V
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const accessToken = searchParams.get('access_token')
    const dataType = searchParams.get('type') || 'overview'

    if (!accessToken) {
      return NextResponse.json(
        { error: 'Access token is required' },
        { status: 401 }
      )
    }

    const spotify = new SpotifyAPI(accessToken)

    let data
    switch (dataType) {
      case 'overview':
        // Get comprehensive overview data
        const [user, topTracks, topArtists, recentTracks] = await Promise.all([
          spotify.getCurrentUser(),
          spotify.getTopTracks('medium_term', 10),
          spotify.getTopArtists('medium_term', 10),
          spotify.getRecentlyPlayed(20)
        ])
        
        data = {
          user,
          topTracks: topTracks.items,
          topArtists: topArtists.items,
          recentTracks: recentTracks.items
        }
        break

      case 'tracks':
        const tracks = await spotify.getTopTracks(
          searchParams.get('time_range') as any || 'medium_term',
          parseInt(searchParams.get('limit') || '20')
        )
        data = tracks.items
        break

      case 'artists':
        const artists = await spotify.getTopArtists(
          searchParams.get('time_range') as any || 'medium_term',
          parseInt(searchParams.get('limit') || '20')
        )
        data = artists.items
        break

      case 'recent':
        const recent = await spotify.getRecentlyPlayed(
          parseInt(searchParams.get('limit') || '50')
        )
        data = recent.items
        break

      default:
        return NextResponse.json(
          { error: 'Invalid data type requested' },
          { status: 400 }
        )
    }

    // Add mock social impact data for Ella V
    const socialImpactData = {
      sdgScores: {
        education: 92, // SDG 4
        equality: 84, // SDG 10
        peace: 80 // SDG 16
      },
      overallImpact: 85.3,
      communityReach: 12,
      positiveMessages: 94,
      themes: {
        mentalHealth: 34,
        peaceLove: 28,
        socialJustice: 22,
        nature: 18,
        empowerment: 16,
        identity: 12
      }
    }

    return NextResponse.json({
      success: true,
      data,
      socialImpact: socialImpactData,
      timestamp: new Date().toISOString(),
      artist: 'Ella V'
    })

  } catch (error) {
    console.error('Error fetching Spotify data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch data from Spotify API' },
      { status: 500 }
    )
  }
}