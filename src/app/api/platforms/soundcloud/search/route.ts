import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q') || ''

    if (!query) {
      return NextResponse.json({ error: 'Search query required' }, { status: 400 })
    }

    // SoundCloud public API (no authentication required for basic search)
    const clientId = process.env.SOUNDCLOUD_CLIENT_ID || 'demo_client_id'
    
    // Note: For production, you'll need a real SoundCloud API key
    // For demo, return mock data that matches Ella V's style
    const mockSoundCloudData = {
      tracks: [
        {
          id: 'sc_track_1',
          platform: 'soundcloud',
          name: 'Peace & Unity (SoundCloud Version)',
          artist: 'Ella V',
          duration_ms: 204000,
          popularity: 78,
          release_date: '2024-03-15',
          stream_count: 12547,
          likes_count: 892,
          reposts_count: 234,
          platform_specific: {
            soundcloud_permalink: 'https://soundcloud.com/ella-v/peace-unity',
            waveform_url: 'https://soundcloud.com/waveforms/ella-v-peace-unity.png'
          }
        },
        {
          id: 'sc_track_2',
          platform: 'soundcloud',
          name: 'Mental Clarity (Demo)',
          artist: 'Ella V',
          duration_ms: 252000,
          popularity: 65,
          release_date: '2024-02-10',
          stream_count: 8934,
          likes_count: 567,
          reposts_count: 123,
          platform_specific: {
            soundcloud_permalink: 'https://soundcloud.com/ella-v/mental-clarity'
          }
        },
        {
          id: 'sc_track_3',
          platform: 'soundcloud',
          name: 'Voices Rise',
          artist: 'Ella V',
          duration_ms: 198000,
          popularity: 82,
          release_date: '2024-04-20',
          stream_count: 15672,
          likes_count: 1243,
          reposts_count: 456,
          platform_specific: {
            soundcloud_permalink: 'https://soundcloud.com/ella-v/voices-rise'
          }
        }
      ]
    }

    // In production, this would be:
    /*
    const response = await fetch(
      `https://api.soundcloud.com/tracks?q=${encodeURIComponent(query)}&client_id=${clientId}&limit=50`
    )
    
    if (!response.ok) {
      throw new Error(`SoundCloud API error: ${response.status}`)
    }
    
    const data = await response.json()
    
    const tracks = data.map((track: any) => ({
      id: track.id.toString(),
      platform: 'soundcloud',
      name: track.title,
      artist: track.user.username,
      duration_ms: track.duration,
      popularity: Math.min(100, Math.floor(track.playback_count / 1000)),
      release_date: track.created_at,
      stream_count: track.playback_count,
      likes_count: track.likes_count,
      reposts_count: track.reposts_count,
      preview_url: track.stream_url
    }))
    */

    return NextResponse.json({
      platform: 'soundcloud',
      tracks: mockSoundCloudData.tracks,
      total_results: mockSoundCloudData.tracks.length,
      note: 'Demo data - replace with real SoundCloud API integration'
    })

  } catch (error) {
    console.error('SoundCloud search error:', error)
    return NextResponse.json(
      { error: 'Failed to search SoundCloud data' },
      { status: 500 }
    )
  }
}