import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const timeWindow = searchParams.get('timeWindow') || '90d'
    const platform = searchParams.get('platform') || 'spotify'
    const artistName = searchParams.get('artist') || 'Ella V'
    const includeGrowth = searchParams.get('includeGrowth') === 'true'
    const includeEngagement = searchParams.get('includeEngagement') === 'true'

    // Mock streaming data for different time windows
    // In production, this would fetch real data from Spotify Analytics API
    
    const generateStreamingData = () => {
      const trackData = [
        {
          track_id: 'peace_unity',
          track_name: 'Peace & Unity',
          artist_name: 'Ella V',
          platform: 'spotify',
          streaming_metrics: getStreamingMetrics('Peace & Unity', timeWindow, platform),
          audio_features: {
            danceability: 0.65,
            energy: 0.78,
            valence: 0.89,
            tempo: 95.2
          },
          social_impact: {
            themes: {
              peace_love: 95,
              social_justice: 85,
              education: 78
            },
            sdg_scores: {
              sdg_4: 88,
              sdg_10: 75,
              sdg_16: 92
            }
          }
        },
        {
          track_id: 'mental_clarity',
          track_name: 'Mental Clarity',
          artist_name: 'Ella V',
          platform: 'spotify',
          streaming_metrics: getStreamingMetrics('Mental Clarity', timeWindow, platform),
          audio_features: {
            danceability: 0.45,
            energy: 0.62,
            valence: 0.71,
            tempo: 88.7
          },
          social_impact: {
            themes: {
              mental_health: 95,
              empowerment: 82,
              identity: 88
            },
            sdg_scores: {
              sdg_4: 85,
              sdg_10: 68,
              sdg_16: 71
            }
          }
        },
        {
          track_id: 'voices_rise',
          track_name: 'Voices Rise',
          artist_name: 'Ella V',
          platform: 'spotify',
          streaming_metrics: getStreamingMetrics('Voices Rise', timeWindow, platform),
          audio_features: {
            danceability: 0.72,
            energy: 0.88,
            valence: 0.83,
            tempo: 102.4
          },
          social_impact: {
            themes: {
              empowerment: 92,
              social_justice: 89,
              equality: 85
            },
            sdg_scores: {
              sdg_4: 78,
              sdg_10: 89,
              sdg_16: 83
            }
          }
        },
        {
          track_id: 'roots_wings',
          track_name: 'Roots & Wings',
          artist_name: 'Ella V',
          platform: 'spotify',
          streaming_metrics: getStreamingMetrics('Roots & Wings', timeWindow, platform),
          audio_features: {
            danceability: 0.58,
            energy: 0.71,
            valence: 0.76,
            tempo: 92.8
          },
          social_impact: {
            themes: {
              nature: 88,
              identity: 92,
              growth: 85
            },
            sdg_scores: {
              sdg_4: 82,
              sdg_10: 78,
              sdg_16: 80
            }
          }
        }
      ]

      return trackData
    }

    function getStreamingMetrics(trackName: string, timeWindow: string, platform: string) {
      const baseStreams: { [key: string]: number } = {
        'Peace & Unity': 15420,
        'Mental Clarity': 12890,
        'Voices Rise': 18760,
        'Roots & Wings': 9340,
        'Northern Lights': 7890,
        'Inner Strength': 11230
      }

      let baseStream = baseStreams[trackName] || 8000
      
      // Adjust for time window
      const timeMultipliers: { [key: string]: number } = {
        '7d': 0.12,
        '30d': 0.5,
        '90d': 1.0,
        '6m': 2.2,
        '1y': 4.5,
        'all': 8.0
      }

      const totalStreams = Math.floor(baseStream * (timeMultipliers[timeWindow] || 1.0))
      
      // Platform adjustments
      const platformMultipliers: { [key: string]: number } = {
        'spotify': 1.0,
        'soundcloud': 0.6,
        'apple_music': 0.4,
        'tidal': 0.15
      }

      const platformStreams = Math.floor(totalStreams * (platformMultipliers[platform] || 1.0))

      // Generate daily data for time series
      const days = getDaysForTimeWindow(timeWindow)
      const dailyAverage = Math.floor(platformStreams / days)
      const dailyData = []

      for (let i = 0; i < Math.min(days, 90); i++) {
        const date = new Date()
        date.setDate(date.getDate() - (days - i))
        
        // Add realistic variation (±30%)
        const variation = (Math.random() - 0.5) * 0.6
        const streams = Math.max(0, Math.floor(dailyAverage * (1 + variation)))
        
        dailyData.push({
          date: date.toISOString().split('T')[0],
          streams,
          cumulative_streams: dailyData.reduce((sum, d) => sum + d.streams, streams)
        })
      }

      // Calculate growth metrics
      const previousPeriodStreams = Math.floor(platformStreams * (0.6 + Math.random() * 0.3))
      const growthRate = ((platformStreams - previousPeriodStreams) / previousPeriodStreams) * 100

      return {
        total_streams: platformStreams,
        daily_average: dailyAverage,
        peak_day_streams: Math.max(...dailyData.map(d => d.streams)),
        growth_rate: growthRate,
        engagement_metrics: {
          completion_rate: 88 + Math.random() * 10,
          skip_rate: Math.random() * 12,
          save_rate: 65 + Math.random() * 30,
          share_rate: Math.random() * 8
        },
        time_series_data: dailyData,
        comparative_ranking: Math.floor(Math.random() * 10) + 1,
        platform_performance: {
          [platform]: {
            streams: platformStreams,
            engagement: 85 + Math.random() * 10,
            discovery_rate: 15 + Math.random() * 20
          }
        }
      }
    }

    function getDaysForTimeWindow(timeWindow: string): number {
      const dayMapping: { [key: string]: number } = {
        '7d': 7,
        '30d': 30,
        '90d': 90,
        '6m': 180,
        '1y': 365,
        'all': 730
      }
      return dayMapping[timeWindow] || 90
    }

    const streamingData = generateStreamingData()

    return NextResponse.json({
      success: true,
      time_window: timeWindow,
      platform: platform,
      artist: artistName,
      data: streamingData,
      metadata: {
        generated_at: new Date().toISOString(),
        includes_growth: includeGrowth,
        includes_engagement: includeEngagement,
        data_points: streamingData.length
      },
      python_integration: {
        usage_example: `
import requests
import pandas as pd

# Fetch streaming data
response = requests.get('${request.url}')
data = response.json()

# Convert to DataFrame
df = pd.json_normalize(data['data'])
print(f"Total streams (${timeWindow}): {streamingData.total_streams:,}")
        `.trim()
      }
    })

  } catch (error) {
    console.error('Streaming data error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch streaming data' },
      { status: 500 }
    )
  }
}