import { PlatformSelector } from '@/components/multi-platform/platform-selector'
import { LyricalDashboard } from '@/components/lyrics/lyrical-dashboard'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

export default function PlatformsPage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-white">Multi-Platform Analytics</h1>
        <p className="text-gray-300 max-w-4xl">
          Comprehensive music analytics across Spotify, SoundCloud, Apple Music, Tidal, and Genius. 
          Connect multiple platforms to get a complete picture of Ella V's reach, engagement, 
          and social impact across the entire music ecosystem.
        </p>
      </div>

      {/* Platform Connection Hub */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Platform Connections</h2>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-red-400 text-sm">Live Integration Ready</span>
          </div>
        </div>
        
        <PlatformSelector />
      </section>

      {/* Lyrical Analysis Dashboard */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Genius Lyrical Analysis</h2>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
            <span className="text-yellow-400 text-sm">AI-Powered Theme Analysis</span>
          </div>
        </div>
        
        <LyricalDashboard analyses={[]} tracks={[]} />
      </section>

      {/* Cross-Platform Insights */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white">Cross-Platform Insights</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Platform Performance Comparison */}
          <Card className="bg-gray-900 border-red-600/30">
            <CardHeader>
              <CardTitle className="text-white">Platform Performance Matrix</CardTitle>
              <p className="text-gray-400 text-sm">
                How Ella V's content performs across different music platforms
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-4 gap-2 text-xs text-gray-400 text-center">
                  <div></div>
                  <div>Streams</div>
                  <div>Engagement</div>
                  <div>Social Impact</div>
                </div>
                
                {[
                  { platform: "Spotify", streams: "12.5k", engagement: "89%", impact: "High", color: "text-green-400" },
                  { platform: "SoundCloud", streams: "8.9k", engagement: "94%", impact: "Very High", color: "text-orange-400" },
                  { platform: "Apple Music", streams: "4.2k", engagement: "76%", impact: "Medium", color: "text-gray-400" },
                  { platform: "Tidal", streams: "1.8k", engagement: "98%", impact: "High", color: "text-blue-400" }
                ].map((platform) => (
                  <div key={platform.platform} className="grid grid-cols-4 gap-2 text-center py-2 border-b border-white/5">
                    <div className={`text-sm font-medium ${platform.color}`}>{platform.platform}</div>
                    <div className="text-white text-sm">{platform.streams}</div>
                    <div className="text-white text-sm">{platform.engagement}</div>
                    <div className="text-white text-sm">{platform.impact}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Unified Social Impact Score */}
          <Card className="bg-gray-900 border-red-600/30">
            <CardHeader>
              <CardTitle className="text-white">Unified Social Impact Score</CardTitle>
              <p className="text-gray-400 text-sm">
                Combined impact measurement across all connected platforms
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="text-center">
                  <div className="text-6xl font-bold text-white mb-2">87.4</div>
                  <div className="text-gray-400">Overall Impact Score</div>
                  <div className="text-sm text-green-400 mt-1">Exceptional Social Influence</div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Platform Consistency</span>
                    <span className="text-white font-semibold">94%</span>
                  </div>
                  <Progress value={94} className="h-2" />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Message Clarity</span>
                    <span className="text-white font-semibold">91%</span>
                  </div>
                  <Progress value={91} className="h-2" />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Social Resonance</span>
                    <span className="text-white font-semibold">89%</span>
                  </div>
                  <Progress value={89} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Advanced Multi-Platform Analysis Areas */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white">Custom Multi-Platform Analysis</h2>
        
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Cross-Platform Correlation Analysis */}
          <div className="bg-gray-900 border-2 border-red-600/50 rounded-lg p-8 text-center">
            <h3 className="text-xl font-semibold text-white mb-4">🔗 Cross-Platform Correlation</h3>
            <p className="text-gray-400 mb-6">
              Analyze how performance on one platform affects others. Track viral spread 
              patterns and cross-platform audience migration for Ella V's content.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-red-600/20 rounded p-3">
                <h4 className="text-red-300 font-semibold text-sm">Viral Tracking</h4>
                <p className="text-red-200 text-xs">Monitor content spread across platforms</p>
              </div>
              <div className="bg-red-600/20 rounded p-3">
                <h4 className="text-red-300 font-semibold text-sm">Audience Migration</h4>
                <p className="text-red-200 text-xs">Track cross-platform listener behavior</p>
              </div>
            </div>
            
            <div className="bg-red-600/20 rounded p-4 font-mono text-sm text-red-200">
              # Multi-platform correlation analysis
              <br />
              # spotify_data + soundcloud_data + genius_data
              <br />
              # Cross-platform performance modeling
            </div>
          </div>

          {/* Unified Content Strategy */}
          <div className="bg-gray-900 border-2 border-red-600/50 rounded-lg p-8 text-center">
            <h3 className="text-xl font-semibold text-white mb-4">🎯 Content Strategy Optimization</h3>
            <p className="text-gray-400 mb-6">
              AI-powered recommendations for optimal content strategy across platforms. 
              Analyze which themes work best on each platform for maximum social impact.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-red-600/20 rounded p-3">
                <h4 className="text-red-300 font-semibold text-sm">Platform Optimization</h4>
                <p className="text-red-200 text-xs">Best themes for each platform</p>
              </div>
              <div className="bg-red-600/20 rounded p-3">
                <h4 className="text-red-300 font-semibold text-sm">Impact Prediction</h4>
                <p className="text-red-200 text-xs">Forecast social impact potential</p>
              </div>
            </div>
            
            <div className="bg-red-600/20 rounded p-4 font-mono text-sm text-red-200">
              # Content strategy optimization
              <br />
              # Theme-platform performance mapping
              <br />
              # Social impact prediction models
            </div>
          </div>
        </div>
      </section>

      {/* Integration Summary */}
      <section>
        <Card className="bg-gradient-to-r from-red-900/20 to-black/40 border-red-600/50">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Complete Music Ecosystem Analysis</h3>
            <p className="text-gray-300 mb-6 max-w-3xl mx-auto">
              This multi-platform integration provides the most comprehensive view of Ella V's 
              musical impact, combining streaming data, community engagement, lyrical analysis, 
              and social impact measurement across the entire digital music landscape.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">5</div>
                <div className="text-sm text-gray-400">Platforms</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-400">15+</div>
                <div className="text-sm text-gray-400">Data Points</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">3</div>
                <div className="text-sm text-gray-400">SDG Goals</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">7</div>
                <div className="text-sm text-gray-400">Themes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-400">Real-time</div>
                <div className="text-sm text-gray-400">Updates</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}