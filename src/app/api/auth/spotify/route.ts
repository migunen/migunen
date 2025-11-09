import { NextRequest, NextResponse } from 'next/server'
import { getSpotifyAuthUrl, getSpotifyAccessToken } from '@/lib/spotify'

// GET /api/auth/spotify - Initiate Spotify OAuth flow
export async function GET() {
  try {
    const authUrl = getSpotifyAuthUrl()
    return NextResponse.redirect(authUrl)
  } catch (error) {
    console.error('Error generating Spotify auth URL:', error)
    return NextResponse.json(
      { error: 'Failed to generate auth URL' },
      { status: 500 }
    )
  }
}

// Handle Spotify OAuth callback
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { code } = body

    if (!code) {
      return NextResponse.json(
        { error: 'Authorization code is required' },
        { status: 400 }
      )
    }

    // Exchange code for access token
    const tokens = await getSpotifyAccessToken(code)

    // In a real app, you'd store these tokens securely (database, session, etc.)
    // For this demo, we'll return them to the client
    return NextResponse.json({
      success: true,
      tokens
    })
  } catch (error) {
    console.error('Error handling Spotify auth:', error)
    return NextResponse.json(
      { error: 'Failed to authenticate with Spotify' },
      { status: 500 }
    )
  }
}