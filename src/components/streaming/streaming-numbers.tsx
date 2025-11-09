"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts'
import { AnalyticsSettings } from '@/components/controls/analytics-sidebar'

interface StreamingNumbersProps {
  tracks: any[]
  settings: AnalyticsSettings
}

export function StreamingNumbers({ tracks, settings }: StreamingNumbersProps) {
  const [streamingData, setStreamingData] = useState<any[]>([])

  // Generate realistic streaming data based on time window
  useEffect(() => {
    const generateStreamingData = () => {
      const timeWindow = settings.timeWindow.period
      
      const trackStreamingData = tracks.map((track, index) => {
        // Base streaming numbers for Ella V's tracks
        const baseStreams = {
          'Peace & Unity': 15420,
          'Mental Clarity': 12890,
          'Voices Rise': 18760,
          'Roots & Wings': 9340,
          'Northern Lights': 7890,
          'Inner Strength': 11230,
          'Unity March': 13450,
          'Hope Rising': 8670
        }

        const trackName = track.name || `Track ${index + 1}`
        let totalStreams = baseStreams[trackName as keyof typeof baseStreams] || (5000 + Math.random() * 15000)

        // Adjust based on time window
        const timeMultipliers = {
          '7d': 0.15,
          '30d': 0.6,
          '90d': 1.0,
          '6m': 1.8,
          '1y': 3.2,
          'all': 5.5,
          'custom': 1.0
        }

        totalStreams = Math.floor(totalStreams * timeMultipliers[timeWindow])

        // Generate time-series data for the period
        const dataPoints = getDataPointsForPeriod(timeWindow)
        const dailyData = generateDailyStreams(totalStreams, dataPoints)

        // Calculate growth rate
        const previousPeriodStreams = Math.floor(totalStreams * 0.7) // Simulate previous period
        const growthRate = ((totalStreams - previousPeriodStreams) / previousPeriodStreams) * 100

        // Calculate engagement metrics
        const engagementRate = 85 + Math.random() * 15 // 85-100%
        const skipRate = Math.random() * 15 // 0-15%
        const saveRate = 60 + Math.random() * 35 // 60-95%

        return {
          id: track.id || `track_${index}`,
          name: trackName,
          artist: track.artist || 'Ella V',
          platform: 'spotify',
          streaming_data: {
            total_streams: totalStreams,
            growth_rate: growthRate,
            daily_average: Math.floor(totalStreams / dataPoints),
            peak_day: Math.max(...dailyData.map(d => d.streams)),
            engagement_rate: engagementRate,
            skip_rate: skipRate,
            save_rate: saveRate
          },
          time_series: dailyData,
          popularity: track.popularity || (40 + Math.random() * 40),
          audio_features: track.audio_features || {
            danceability: Math.random(),
            energy: Math.random(),
            valence: Math.random(),
            tempo: 80 + Math.random() * 100
          },
          social_impact: {
            theme_scores: {
              mental_health: Math.floor(Math.random() * 100),
              social_justice: Math.floor(Math.random() * 100),
              peace_love: Math.floor(Math.random() * 100),
              education: Math.floor(Math.random() * 100)
            },
            sdg_alignment: Math.floor(70 + Math.random() * 30)
          }
        }
      })

      setStreamingData(trackStreamingData)
    }

    generateStreamingData()
  }, [tracks, settings.timeWindow.period])

  // Helper functions
  const getDataPointsForPeriod = (period: string): number => {
    const dataPoints = {
      '7d': 7,
      '30d': 30,
      '90d': 90,
      '6m': 180,
      '1y': 365,
      'all': 730,
      'custom': 90
    }
    return dataPoints[period as keyof typeof dataPoints] || 90
  }

  const generateDailyStreams = (totalStreams: number, days: number) => {
    const dailyData = []
    const averageDaily = totalStreams / days
    
    for (let i = 0; i < days; i++) {
      const date = new Date()
      date.setDate(date.getDate() - (days - i))
      
      // Add some realistic variation
      const variation = (Math.random() - 0.5) * 0.4 // ±20%
      const streams = Math.floor(averageDaily * (1 + variation))
      
      dailyData.push({
        date: date.toISOString().split('T')[0],
        streams: Math.max(0, streams),
        day_of_week: date.toLocaleDateString('en', { weekday: 'short' })
      })
    }
    
    return dailyData
  }

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  const getGrowthColor = (rate: number): string => {
    if (rate > 0) return 'text-green-400'
    if (rate < 0) return 'text-red-400'
    return 'text-gray-400'
  }

  return (
    <div className="space-y-6">
      {/* Streaming Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {streamingData.slice(0, 8).map((track) => (
          <Card key={track.id} className="bg-gray-900 border-red-600/30 hover:border-red-600/50 transition-colors">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-white text-sm font-semibold truncate">
                  {track.name}
                </CardTitle>
                <Badge variant="outline" className="border-red-600 text-red-600 text-xs">
                  {track.platform}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {/* Stream Count */}
              <div className="text-center">
                <div className="text-2xl font-bold text-white">
                  {formatNumber(track.streaming_data.total_streams)}
                </div>
                <div className="text-gray-400 text-xs">
                  Total Streams ({settings.timeWindow.period})
                </div>
              </div>

              {/* Growth Rate */}
              {settings.streamingMetrics.showGrowthRates && (
                <div className="text-center">
                  <div className={`text-lg font-semibold ${getGrowthColor(track.streaming_data.growth_rate)}`}>
                    {track.streaming_data.growth_rate > 0 ? '+' : ''}{track.streaming_data.growth_rate.toFixed(1)}%
                  </div>
                  <div className="text-gray-400 text-xs">Growth Rate</div>
                </div>
              )}

              {/* Engagement Metrics */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Engagement</span>
                  <span className="text-white">{track.streaming_data.engagement_rate.toFixed(1)}%</span>
                </div>
                <Progress value={track.streaming_data.engagement_rate} className="h-1" />
                
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Save Rate</span>
                  <span className="text-white">{track.streaming_data.save_rate.toFixed(1)}%</span>
                </div>
                <Progress value={track.streaming_data.save_rate} className="h-1" />
              </div>

              {/* Daily Average */}
              <div className="text-center bg-black/40 rounded p-2">
                <div className="text-white font-semibold">
                  {formatNumber(track.streaming_data.daily_average)}
                </div>
                <div className="text-gray-400 text-xs">Daily Average</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Time Series Visualization */}
      {streamingData.length > 0 && (
        <Card className="bg-gray-900 border-red-600/30">
          <CardHeader>
            <CardTitle className="text-white">Streaming Trends Over Time</CardTitle>
            <p className="text-gray-400 text-sm">
              Daily streaming data for selected time period: {settings.timeWindow.period}
            </p>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                {settings.visualizationOptions.chartType === 'area' ? (
                  <AreaChart data={streamingData[0]?.time_series || []}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="date" stroke="#9CA3AF" fontSize={12} />
                    <YAxis stroke="#9CA3AF" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #DC2626', color: '#F3F4F6' }}
                      labelFormatter={(value) => `Date: ${value}`}
                      formatter={(value: any) => [formatNumber(value), 'Streams']}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="streams" 
                      stroke="#DC2626" 
                      fill="#DC2626"
                      fillOpacity={0.3}
                      strokeWidth={2}
                    />
                  </AreaChart>
                ) : (
                  <LineChart data={streamingData[0]?.time_series || []}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="date" stroke="#9CA3AF" fontSize={12} />
                    <YAxis stroke="#9CA3AF" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #DC2626', color: '#F3F4F6' }}
                      labelFormatter={(value) => `Date: ${value}`}
                      formatter={(value: any) => [formatNumber(value), 'Streams']}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="streams" 
                      stroke="#DC2626" 
                      strokeWidth={3}
                      dot={{ fill: '#DC2626', strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                )}
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Detailed Streaming Analytics */}
      <Card className="bg-gray-900 border-red-600/30">
        <CardHeader>
          <CardTitle className="text-white">Detailed Streaming Analytics</CardTitle>
          <p className="text-gray-400 text-sm">
            Comprehensive streaming metrics for {settings.timeWindow.period} period
          </p>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left text-gray-400 text-sm py-3 px-2">Track</th>
                  <th className="text-left text-gray-400 text-sm py-3 px-2">Total Streams</th>
                  {settings.streamingMetrics.showGrowthRates && (
                    <th className="text-left text-gray-400 text-sm py-3 px-2">Growth</th>
                  )}
                  <th className="text-left text-gray-400 text-sm py-3 px-2">Daily Avg</th>
                  <th className="text-left text-gray-400 text-sm py-3 px-2">Engagement</th>
                  <th className="text-left text-gray-400 text-sm py-3 px-2">Peak Day</th>
                  {settings.streamingMetrics.showComparativeRanking && (
                    <th className="text-left text-gray-400 text-sm py-3 px-2">Rank</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {streamingData
                  .sort((a, b) => b.streaming_data.total_streams - a.streaming_data.total_streams)
                  .map((track, index) => (
                    <tr key={track.id} className="border-b border-white/5 hover:bg-white/5">
                      <td className="py-3 px-2">
                        <div>
                          <div className="text-white font-medium text-sm">{track.name}</div>
                          <div className="text-gray-400 text-xs">{track.artist}</div>
                        </div>
                      </td>
                      <td className="py-3 px-2">
                        <div className="text-white font-semibold">
                          {formatNumber(track.streaming_data.total_streams)}
                        </div>
                        {settings.streamingMetrics.normalizeByFollowers && (
                          <div className="text-gray-400 text-xs">
                            ({(track.streaming_data.total_streams / 1250).toFixed(1)} per follower)
                          </div>
                        )}
                      </td>
                      {settings.streamingMetrics.showGrowthRates && (
                        <td className="py-3 px-2">
                          <Badge 
                            variant={track.streaming_data.growth_rate > 0 ? 'default' : 'destructive'}
                            className="text-xs"
                          >
                            {track.streaming_data.growth_rate > 0 ? '+' : ''}{track.streaming_data.growth_rate.toFixed(1)}%
                          </Badge>
                        </td>
                      )}
                      <td className="py-3 px-2">
                        <span className="text-white font-medium">
                          {formatNumber(track.streaming_data.daily_average)}
                        </span>
                      </td>
                      <td className="py-3 px-2">
                        <div className="w-16">
                          <div className="text-white text-xs mb-1">
                            {track.streaming_data.engagement_rate.toFixed(0)}%
                          </div>
                          <Progress value={track.streaming_data.engagement_rate} className="h-1" />
                        </div>
                      </td>
                      <td className="py-3 px-2">
                        <span className="text-white font-medium">
                          {formatNumber(track.streaming_data.peak_day)}
                        </span>
                      </td>
                      {settings.streamingMetrics.showComparativeRanking && (
                        <td className="py-3 px-2">
                          <Badge 
                            variant="outline" 
                            className={`border-red-600 text-red-400 text-xs ${
                              index === 0 ? 'bg-red-600/20' : ''
                            }`}
                          >
                            #{index + 1}
                          </Badge>
                        </td>
                      )}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Platform Comparison */}
      {Object.values(settings.platformFilters).filter(Boolean).length > 1 && (
        <Card className="bg-gray-900 border-red-600/30">
          <CardHeader>
            <CardTitle className="text-white">Cross-Platform Streaming Comparison</CardTitle>
            <p className="text-gray-400 text-sm">
              How tracks perform across different platforms
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {streamingData.slice(0, 3).map((track) => (
                <div key={track.id} className="bg-black/40 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-3">{track.name}</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {settings.platformFilters.spotify && (
                      <div className="text-center">
                        <div className="text-green-400 font-semibold">
                          {formatNumber(track.streaming_data.total_streams)}
                        </div>
                        <div className="text-gray-400 text-xs">🎵 Spotify</div>
                      </div>
                    )}
                    {settings.platformFilters.soundcloud && (
                      <div className="text-center">
                        <div className="text-orange-400 font-semibold">
                          {formatNumber(Math.floor(track.streaming_data.total_streams * 0.6))}
                        </div>
                        <div className="text-gray-400 text-xs">🔊 SoundCloud</div>
                      </div>
                    )}
                    {settings.platformFilters.appleMusic && (
                      <div className="text-center">
                        <div className="text-gray-400 font-semibold">
                          {formatNumber(Math.floor(track.streaming_data.total_streams * 0.3))}
                        </div>
                        <div className="text-gray-400 text-xs">🍎 Apple Music</div>
                      </div>
                    )}
                    {settings.platformFilters.tidal && (
                      <div className="text-center">
                        <div className="text-blue-400 font-semibold">
                          {formatNumber(Math.floor(track.streaming_data.total_streams * 0.1))}
                        </div>
                        <div className="text-gray-400 text-xs">🌊 Tidal</div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Summary Metrics */}
      <Card className="bg-gray-900 border-red-600/30">
        <CardHeader>
          <CardTitle className="text-white">Summary Metrics</CardTitle>
          <p className="text-gray-400 text-sm">
            Aggregated streaming performance for {settings.timeWindow.period}
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">
                {formatNumber(streamingData.reduce((sum, track) => sum + track.streaming_data.total_streams, 0))}
              </div>
              <div className="text-gray-400 text-sm">Total Streams</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">
                +{(streamingData.reduce((sum, track) => sum + track.streaming_data.growth_rate, 0) / streamingData.length).toFixed(1)}%
              </div>
              <div className="text-gray-400 text-sm">Avg Growth</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-white">
                {(streamingData.reduce((sum, track) => sum + track.streaming_data.engagement_rate, 0) / streamingData.length).toFixed(1)}%
              </div>
              <div className="text-gray-400 text-sm">Avg Engagement</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-white">
                {streamingData.length}
              </div>
              <div className="text-gray-400 text-sm">Tracks Analyzed</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Custom Analysis Area */}
      <Card className="bg-gray-900 border-red-600/30">
        <CardHeader>
          <CardTitle className="text-white">📊 Your Custom Streaming Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-gray-300 text-sm">
              Advanced streaming analytics integration area for your Python/Plotly visualizations:
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-red-600/10 border border-red-500/30 rounded p-4">
                <h4 className="text-red-400 font-semibold mb-2">Time Series Analysis</h4>
                <p className="text-red-300 text-sm">
                  Advanced temporal analysis with seasonal decomposition and trend forecasting
                </p>
              </div>
              
              <div className="bg-red-600/10 border border-red-500/30 rounded p-4">
                <h4 className="text-red-400 font-semibold mb-2">Comparative Analysis</h4>
                <p className="text-red-300 text-sm">
                  Multi-track performance comparison with statistical significance testing
                </p>
              </div>
            </div>
            
            <div className="bg-red-600/20 rounded p-4 font-mono text-sm text-red-200">
              # Your streaming analytics integration
              <br />
              # time_window = "{settings.timeWindow.period}"
              <br />
              # total_streams = {streamingData.reduce((sum, track) => sum + track.streaming_data.total_streams, 0).toLocaleString()}
              <br />
              # tracks_analyzed = {streamingData.length}
              <br />
              # Custom temporal and comparative analysis
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}