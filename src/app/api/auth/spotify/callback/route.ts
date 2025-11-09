import { NextRequest, NextResponse } from 'next/server'

// Handle Spotify OAuth callback
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const error = searchParams.get('error')
  const state = searchParams.get('state')

  if (error) {
    return NextResponse.redirect(
      new URL(`/setup?error=${encodeURIComponent(error)}`, request.url)
    )
  }

  if (!code) {
    return NextResponse.redirect(
      new URL('/setup?error=no_code', request.url)
    )
  }

  try {
    // Exchange code for access token
    const clientId = process.env.SPOTIFY_CLIENT_ID
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET
    const redirectUri = process.env.SPOTIFY_REDIRECT_URI || 'http://localhost:3000/api/auth/spotify/callback'

    if (!clientId || !clientSecret) {
      throw new Error('Spotify credentials not configured')
    }

    const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri
      })
    })

    if (!tokenResponse.ok) {
      throw new Error(`Token exchange failed: ${tokenResponse.statusText}`)
    }

    const tokens = await tokenResponse.json()

    // In production, you'd store these securely
    // For demo, we'll pass them via URL params (not secure for production!)
    const callbackUrl = new URL('/dashboard', request.url)
    callbackUrl.searchParams.set('access_token', tokens.access_token)
    callbackUrl.searchParams.set('refresh_token', tokens.refresh_token)
    callbackUrl.searchParams.set('expires_in', tokens.expires_in.toString())

    return NextResponse.redirect(callbackUrl)

  } catch (error) {
    console.error('Spotify callback error:', error)
    return NextResponse.redirect(
      new URL(`/setup?error=${encodeURIComponent('Authentication failed')}`, request.url)
    )
  }
}