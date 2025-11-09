"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'


interface AnalyticsSidebarProps {
  onSettingsChange: (settings: AnalyticsSettings) => void
  isOpen: boolean
  onToggle: () => void
}

export interface AnalyticsSettings {
  timeWindow: {
    period: 'custom' | '7d' | '30d' | '90d' | '6m' | '1y' | 'all'
    customRange?: { start: Date; end: Date }
  }
  streamingMetrics: {
    showStreamCounts: boolean
    showGrowthRates: boolean
    showComparativeRanking: boolean
    normalizeByFollowers: boolean
  }
  visualizationOptions: {
    chartType: 'bar' | 'line' | 'area' | 'radar'
    showTrendlines: boolean
    groupByGenre: boolean
    includeAudioFeatures: boolean
  }
  platformFilters: {
    spotify: boolean
    soundcloud: boolean
    appleMusic: boolean
    tidal: boolean
  }
  socialImpactFilters: {
    showSDGScores: boolean
    themeFiltering: string[]
    minImpactScore: number
    focusOnEducation: boolean
    focusOnEquality: boolean
    focusOnPeace: boolean
  }
  dataExportSettings: {
    includeRawData: boolean
    includeCalculatedMetrics: boolean
    includeAudioFeatures: boolean
    includeLyricalAnalysis: boolean
    exportFormat: 'json' | 'csv' | 'parquet'
  }
}

export function AnalyticsSidebar({ onSettingsChange, isOpen, onToggle }: AnalyticsSidebarProps) {
  const [settings, setSettings] = useState<AnalyticsSettings>({
    timeWindow: {
      period: '90d'
    },
    streamingMetrics: {
      showStreamCounts: true,
      showGrowthRates: true,
      showComparativeRanking: false,
      normalizeByFollowers: false
    },
    visualizationOptions: {
      chartType: 'bar',
      showTrendlines: true,
      groupByGenre: false,
      includeAudioFeatures: true
    },
    platformFilters: {
      spotify: true,
      soundcloud: true,
      appleMusic: false,
      tidal: false
    },
    socialImpactFilters: {
      showSDGScores: true,
      themeFiltering: [],
      minImpactScore: 0,
      focusOnEducation: true,
      focusOnEquality: true,
      focusOnPeace: true
    },
    dataExportSettings: {
      includeRawData: true,
      includeCalculatedMetrics: true,
      includeAudioFeatures: true,
      includeLyricalAnalysis: true,
      exportFormat: 'json'
    }
  })

  // Notify parent when settings change
  useEffect(() => {
    onSettingsChange(settings)
  }, [settings, onSettingsChange])

  const updateSettings = (section: keyof AnalyticsSettings, updates: Partial<any>) => {
    setSettings(prev => ({
      ...prev,
      [section]: { ...prev[section], ...updates }
    }))
  }

  const socialThemes = [
    'mental_health', 'social_justice', 'peace_love', 'nature', 
    'empowerment', 'identity', 'education', 'equality'
  ]

  const timeWindowOptions = [
    { value: '7d', label: 'Last 7 days', description: 'Recent performance' },
    { value: '30d', label: 'Last 30 days', description: 'Monthly trends' },
    { value: '90d', label: 'Last 3 months', description: 'Quarterly analysis' },
    { value: '6m', label: 'Last 6 months', description: 'Semi-annual trends' },
    { value: '1y', label: 'Last year', description: 'Annual performance' },
    { value: 'all', label: 'All time', description: 'Complete history' },
    { value: 'custom', label: 'Custom range', description: 'Select specific dates' }
  ]

  return (
    <div className={`fixed top-0 right-0 h-full bg-gray-900 border-l border-red-600/30 transition-transform duration-300 z-50 ${
      isOpen ? 'translate-x-0' : 'translate-x-full'
    }`} style={{ width: '420px' }}>
      
      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-4 border-b border-red-600/30">
        <h2 className="text-xl font-bold text-white">Analytics Control Panel</h2>
        <Button
          onClick={onToggle}
          variant="ghost"
          size="sm"
          className="text-white hover:bg-red-600/20"
        >
          ✕
        </Button>
      </div>

      {/* Sidebar Content */}
      <div className="h-full overflow-y-auto pb-20 p-4 space-y-6">
        
        {/* Time Window Controls */}
        <Card className="bg-black/40 border-red-600/30">
          <CardHeader>
            <CardTitle className="text-white text-lg">📅 Time Window</CardTitle>
            <p className="text-gray-400 text-sm">Control analytics time period</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-white font-medium mb-2 block">Period</label>
              <Select 
                value={settings.timeWindow.period} 
                onValueChange={(value: any) => updateSettings('timeWindow', { period: value })}
              >
                <SelectTrigger className="bg-black border-red-600/50 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {timeWindowOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <div>
                        <div>{option.label}</div>
                        <div className="text-xs text-gray-500">{option.description}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {settings.timeWindow.period === 'custom' && (
              <div>
                <label className="text-white font-medium mb-2 block">Custom Date Range</label>
                <div className="bg-yellow-900/20 border border-yellow-600/30 rounded p-3">
                  <p className="text-yellow-300 text-xs">
                    Custom date picker integration would go here
                  </p>
                </div>
              </div>
            )}

            <div className="bg-red-600/10 border border-red-500/30 rounded p-3">
              <p className="text-red-300 text-xs">
                Current: <span className="font-semibold">
                  {timeWindowOptions.find(o => o.value === settings.timeWindow.period)?.label}
                </span>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Streaming Metrics Controls */}
        <Card className="bg-black/40 border-red-600/30">
          <CardHeader>
            <CardTitle className="text-white text-lg">🎵 Streaming Metrics</CardTitle>
            <p className="text-gray-400 text-sm">Configure streaming data display</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-white text-sm">Show Stream Counts</span>
                <Switch
                  checked={settings.streamingMetrics.showStreamCounts}
                  onCheckedChange={(checked) => updateSettings('streamingMetrics', { showStreamCounts: checked })}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-white text-sm">Show Growth Rates</span>
                <Switch
                  checked={settings.streamingMetrics.showGrowthRates}
                  onCheckedChange={(checked) => updateSettings('streamingMetrics', { showGrowthRates: checked })}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-white text-sm">Comparative Ranking</span>
                <Switch
                  checked={settings.streamingMetrics.showComparativeRanking}
                  onCheckedChange={(checked) => updateSettings('streamingMetrics', { showComparativeRanking: checked })}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-white text-sm">Normalize by Followers</span>
                <Switch
                  checked={settings.streamingMetrics.normalizeByFollowers}
                  onCheckedChange={(checked) => updateSettings('streamingMetrics', { normalizeByFollowers: checked })}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Visualization Options */}
        <Card className="bg-black/40 border-red-600/30">
          <CardHeader>
            <CardTitle className="text-white text-lg">📊 Visualization</CardTitle>
            <p className="text-gray-400 text-sm">Chart types and display options</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-white font-medium mb-2 block">Chart Type</label>
              <Select 
                value={settings.visualizationOptions.chartType}
                onValueChange={(value: any) => updateSettings('visualizationOptions', { chartType: value })}
              >
                <SelectTrigger className="bg-black border-red-600/50 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bar">Bar Chart</SelectItem>
                  <SelectItem value="line">Line Chart</SelectItem>
                  <SelectItem value="area">Area Chart</SelectItem>
                  <SelectItem value="radar">Radar Chart</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-white text-sm">Show Trendlines</span>
                <Switch
                  checked={settings.visualizationOptions.showTrendlines}
                  onCheckedChange={(checked) => updateSettings('visualizationOptions', { showTrendlines: checked })}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-white text-sm">Group by Genre</span>
                <Switch
                  checked={settings.visualizationOptions.groupByGenre}
                  onCheckedChange={(checked) => updateSettings('visualizationOptions', { groupByGenre: checked })}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-white text-sm">Include Audio Features</span>
                <Switch
                  checked={settings.visualizationOptions.includeAudioFeatures}
                  onCheckedChange={(checked) => updateSettings('visualizationOptions', { includeAudioFeatures: checked })}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Platform Filters */}
        <Card className="bg-black/40 border-red-600/30">
          <CardHeader>
            <CardTitle className="text-white text-lg">🌐 Platform Filters</CardTitle>
            <p className="text-gray-400 text-sm">Select active music platforms</p>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg">🎵</span>
                <span className="text-white text-sm">Spotify</span>
              </div>
              <Switch
                checked={settings.platformFilters.spotify}
                onCheckedChange={(checked) => updateSettings('platformFilters', { spotify: checked })}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg">🔊</span>
                <span className="text-white text-sm">SoundCloud</span>
              </div>
              <Switch
                checked={settings.platformFilters.soundcloud}
                onCheckedChange={(checked) => updateSettings('platformFilters', { soundcloud: checked })}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg">🍎</span>
                <span className="text-white text-sm">Apple Music</span>
              </div>
              <Switch
                checked={settings.platformFilters.appleMusic}
                onCheckedChange={(checked) => updateSettings('platformFilters', { appleMusic: checked })}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg">🌊</span>
                <span className="text-white text-sm">Tidal</span>
              </div>
              <Switch
                checked={settings.platformFilters.tidal}
                onCheckedChange={(checked) => updateSettings('platformFilters', { tidal: checked })}
              />
            </div>
          </CardContent>
        </Card>

        {/* Social Impact Filters */}
        <Card className="bg-black/40 border-red-600/30">
          <CardHeader>
            <CardTitle className="text-white text-lg">🎯 Social Impact</CardTitle>
            <p className="text-gray-400 text-sm">UN SDG and theme filtering</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-white font-medium mb-2 block">
                Minimum Impact Score: {settings.socialImpactFilters.minImpactScore}
              </label>
              <Slider
                value={[settings.socialImpactFilters.minImpactScore]}
                onValueChange={(value) => updateSettings('socialImpactFilters', { minImpactScore: value[0] })}
                max={100}
                step={5}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <label className="text-white font-medium">SDG Focus Areas</label>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-500 rounded-full text-white text-xs flex items-center justify-center font-bold">4</div>
                    <span className="text-white text-sm">Education</span>
                  </div>
                  <Switch
                    checked={settings.socialImpactFilters.focusOnEducation}
                    onCheckedChange={(checked) => updateSettings('socialImpactFilters', { focusOnEducation: checked })}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-purple-500 rounded-full text-white text-xs flex items-center justify-center font-bold">10</div>
                    <span className="text-white text-sm">Equality</span>
                  </div>
                  <Switch
                    checked={settings.socialImpactFilters.focusOnEquality}
                    onCheckedChange={(checked) => updateSettings('socialImpactFilters', { focusOnEquality: checked })}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-500 rounded-full text-white text-xs flex items-center justify-center font-bold">16</div>
                    <span className="text-white text-sm">Peace & Justice</span>
                  </div>
                  <Switch
                    checked={settings.socialImpactFilters.focusOnPeace}
                    onCheckedChange={(checked) => updateSettings('socialImpactFilters', { focusOnPeace: checked })}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Export Settings */}
        <Card className="bg-black/40 border-red-600/30">
          <CardHeader>
            <CardTitle className="text-white text-lg">💾 Export Settings</CardTitle>
            <p className="text-gray-400 text-sm">Configure data export options</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-white font-medium mb-2 block">Export Format</label>
              <Select 
                value={settings.dataExportSettings.exportFormat}
                onValueChange={(value: any) => updateSettings('dataExportSettings', { exportFormat: value })}
              >
                <SelectTrigger className="bg-black border-red-600/50 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="json">JSON (Complete)</SelectItem>
                  <SelectItem value="csv">CSV (Pandas Ready)</SelectItem>
                  <SelectItem value="parquet">Parquet (Big Data)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-white text-sm">Include Raw Data</span>
                <Switch
                  checked={settings.dataExportSettings.includeRawData}
                  onCheckedChange={(checked) => updateSettings('dataExportSettings', { includeRawData: checked })}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-white text-sm">Include Calculated Metrics</span>
                <Switch
                  checked={settings.dataExportSettings.includeCalculatedMetrics}
                  onCheckedChange={(checked) => updateSettings('dataExportSettings', { includeCalculatedMetrics: checked })}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-white text-sm">Include Audio Features</span>
                <Switch
                  checked={settings.dataExportSettings.includeAudioFeatures}
                  onCheckedChange={(checked) => updateSettings('dataExportSettings', { includeAudioFeatures: checked })}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-white text-sm">Include Lyrical Analysis</span>
                <Switch
                  checked={settings.dataExportSettings.includeLyricalAnalysis}
                  onCheckedChange={(checked) => updateSettings('dataExportSettings', { includeLyricalAnalysis: checked })}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-black/40 border-red-600/30">
          <CardHeader>
            <CardTitle className="text-white text-lg">⚡ Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              className="w-full bg-red-600 hover:bg-red-700"
              onClick={() => {
                // Export with current settings
                const exportUrl = `/api/export/spotify-data?format=${settings.dataExportSettings.exportFormat}&timeWindow=${settings.timeWindow.period}`
                window.open(exportUrl, '_blank')
              }}
            >
              💾 Export Current Data
            </Button>
            
            <Button 
              variant="outline"
              className="w-full border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
              onClick={() => {
                // Reset to default settings
                setSettings({
                  timeWindow: { period: '90d' },
                  streamingMetrics: {
                    showStreamCounts: true,
                    showGrowthRates: true,
                    showComparativeRanking: false,
                    normalizeByFollowers: false
                  },
                  visualizationOptions: {
                    chartType: 'bar',
                    showTrendlines: true,
                    groupByGenre: false,
                    includeAudioFeatures: true
                  },
                  platformFilters: {
                    spotify: true,
                    soundcloud: true,
                    appleMusic: false,
                    tidal: false
                  },
                  socialImpactFilters: {
                    showSDGScores: true,
                    themeFiltering: [],
                    minImpactScore: 0,
                    focusOnEducation: true,
                    focusOnEquality: true,
                    focusOnPeace: true
                  },
                  dataExportSettings: {
                    includeRawData: true,
                    includeCalculatedMetrics: true,
                    includeAudioFeatures: true,
                    includeLyricalAnalysis: true,
                    exportFormat: 'json'
                  }
                })
              }}
            >
              🔄 Reset to Defaults
            </Button>

            <Button 
              variant="outline"
              className="w-full border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white"
              onClick={() => {
                // Generate Python code with current settings
                const pythonCode = `
# Generated Python code for current settings
import pandas as pd
import plotly.express as px
import requests

# Fetch data with current filters
response = requests.get('${window.location.origin}/api/export/spotify-data?format=json&timeWindow=${settings.timeWindow.period}')
data = response.json()

# Convert to DataFrame
tracks_df = pd.json_normalize(data['tracks'])

# Create visualization based on settings
fig = px.${settings.visualizationOptions.chartType}(
    tracks_df, 
    x='name', 
    y='popularity',
    title='Ella V - ${settings.timeWindow.period} Analysis'
)

fig.show()
                `.trim()
                
                navigator.clipboard.writeText(pythonCode)
                alert('Python code copied to clipboard!')
              }}
            >
              🐍 Copy Python Code
            </Button>
          </CardContent>
        </Card>

        {/* Settings Summary */}
        <Card className="bg-black/40 border-red-600/30">
          <CardHeader>
            <CardTitle className="text-white text-lg">📋 Current Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Time Window:</span>
                <Badge variant="outline" className="border-red-600 text-red-400">
                  {settings.timeWindow.period}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Chart Type:</span>
                <Badge variant="outline" className="border-red-600 text-red-400">
                  {settings.visualizationOptions.chartType}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Active Platforms:</span>
                <Badge variant="outline" className="border-red-600 text-red-400">
                  {Object.values(settings.platformFilters).filter(Boolean).length}/4
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Export Format:</span>
                <Badge variant="outline" className="border-red-600 text-red-400">
                  {settings.dataExportSettings.exportFormat}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sidebar Toggle Button (when closed) */}
      {!isOpen && (
        <Button
          onClick={onToggle}
          className="fixed top-1/2 right-0 transform -translate-y-1/2 bg-red-600 hover:bg-red-700 rounded-l-lg rounded-r-none px-3 py-6 z-40"
        >
          ⚙️
        </Button>
      )}
    </div>
  )
}