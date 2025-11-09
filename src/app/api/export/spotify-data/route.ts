import { NextRequest, NextResponse } from 'next/server'

// GET /api/export/spotify-data - Export filtered data for Python analysis
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const format = searchParams.get('format') || 'json'
    const trackIds = searchParams.get('tracks')?.split(',').filter(Boolean) || []
    const artistIds = searchParams.get('artists')?.split(',').filter(Boolean) || []
    const albumIds = searchParams.get('albums')?.split(',').filter(Boolean) || []

    // Mock data structure for export (replace with real Spotify API data)
    const exportData = {
      metadata: {
        export_timestamp: new Date().toISOString(),
        artist_focus: 'Ella V',
        total_tracks: trackIds.length,
        total_artists: artistIds.length,
        total_albums: albumIds.length,
        format: format
      },
      tracks: trackIds.map((id, index) => ({
        id: id,
        name: `Track ${index + 1}`,
        popularity: Math.floor(Math.random() * 100),
        duration_ms: 180000 + Math.floor(Math.random() * 120000),
        audio_features: {
          danceability: Math.random(),
          energy: Math.random(),
          valence: Math.random(),
          tempo: 60 + Math.random() * 140,
          acousticness: Math.random(),
          instrumentalness: Math.random(),
          speechiness: Math.random(),
          liveness: Math.random(),
          loudness: -20 + Math.random() * 15
        },
        release_date: '2024-01-01',
        artist_name: 'Ella V'
      })),
      artists: artistIds.map((id, index) => ({
        id: id,
        name: index === 0 ? 'Ella V' : `Similar Artist ${index}`,
        popularity: Math.floor(Math.random() * 100),
        followers: Math.floor(Math.random() * 10000),
        genres: ['finnish rap', 'conscious hip hop', 'nordic music'],
        monthly_listeners: Math.floor(Math.random() * 50000)
      })),
      albums: albumIds.map((id, index) => ({
        id: id,
        name: `Album ${index + 1}`,
        release_date: `2024-0${(index % 12) + 1}-01`,
        total_tracks: 8 + Math.floor(Math.random() * 8),
        artist_name: 'Ella V'
      })),
      analysis_suggestions: {
        python_libraries: ['pandas', 'plotly', 'seaborn', 'scikit-learn'],
        analysis_types: [
          'Audio feature correlation analysis',
          'Popularity prediction modeling',
          'Genre clustering analysis',
          'Temporal trend analysis',
          'Comparative artist analysis'
        ],
        sample_code: {
          pandas_import: "import pandas as pd\nimport plotly.express as px",
          data_loading: "df = pd.json_normalize(data['tracks'])",
          basic_viz: "fig = px.scatter(df, x='popularity', y='audio_features.energy', title='Popularity vs Energy')"
        }
      }
    }

    // Handle different export formats
    switch (format.toLowerCase()) {
      case 'csv':
        // Convert tracks to CSV format
        const csvHeaders = ['id', 'name', 'popularity', 'duration_ms', 'danceability', 'energy', 'valence', 'tempo']
        const csvRows = exportData.tracks.map(track => [
          track.id,
          `"${track.name}"`,
          track.popularity,
          track.duration_ms,
          track.audio_features.danceability.toFixed(3),
          track.audio_features.energy.toFixed(3),
          track.audio_features.valence.toFixed(3),
          track.audio_features.tempo.toFixed(1)
        ])
        
        const csvContent = [csvHeaders, ...csvRows].map(row => row.join(',')).join('\n')
        
        return new NextResponse(csvContent, {
          headers: {
            'Content-Type': 'text/csv',
            'Content-Disposition': `attachment; filename="ella_v_data_${Date.now()}.csv"`
          }
        })

      case 'parquet':
        // For Parquet, return instructions since we can't generate binary format easily
        return NextResponse.json({
          message: 'Parquet export not implemented in this demo',
          suggestion: 'Use the JSON export and convert to Parquet using pandas.to_parquet()',
          sample_python: `
import pandas as pd
import requests

# Fetch JSON data
response = requests.get('${request.url.replace('format=parquet', 'format=json')}')
data = response.json()

# Convert to DataFrame and save as Parquet
df = pd.json_normalize(data['tracks'])
df.to_parquet('ella_v_tracks.parquet')
          `.trim()
        })

      default: // JSON format
        return NextResponse.json(exportData, {
          headers: {
            'Content-Type': 'application/json',
            'Content-Disposition': `attachment; filename="ella_v_data_${Date.now()}.json"`
          }
        })
    }

  } catch (error) {
    console.error('Export error:', error)
    return NextResponse.json(
      { error: 'Failed to export data' },
      { status: 500 }
    )
  }
}

// POST /api/export/spotify-data - Export with complex filter criteria
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      tracks = [], 
      artists = [], 
      albums = [],
      filters = {},
      analysis_type = 'comparative'
    } = body

    // Enhanced export data with filtering applied
    const exportData = {
      metadata: {
        export_timestamp: new Date().toISOString(),
        artist_focus: 'Ella V',
        analysis_type,
        filters_applied: filters,
        data_points: tracks.length + artists.length + albums.length
      },
      filtered_data: {
        tracks: tracks,
        artists: artists,
        albums: albums
      },
      analysis_ready: {
        comparative_analysis: tracks.length > 1 || artists.length > 1,
        temporal_analysis: tracks.some((t: any) => t.release_date),
        audio_analysis: tracks.some((t: any) => t.audio_features),
        social_impact_analysis: true // Ella V focus
      },
      python_integration: {
        recommended_setup: [
          "pip install pandas plotly seaborn spotipy",
          "import pandas as pd",
          "import plotly.graph_objects as go",
          "from datetime import datetime"
        ],
        data_structure: {
          tracks: "DataFrame with audio features and metadata",
          artists: "DataFrame with popularity and genre data",
          albums: "DataFrame with release and track count data"
        },
        analysis_examples: [
          "Audio feature correlation heatmap",
          "Popularity trend analysis",
          "Genre distribution visualization",
          "Artist similarity clustering"
        ]
      }
    }

    return NextResponse.json(exportData, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

  } catch (error) {
    console.error('Complex export error:', error)
    return NextResponse.json(
      { error: 'Failed to export filtered data' },
      { status: 500 }
    )
  }
}