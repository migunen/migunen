import { AdvancedMetrics } from '@/components/analytics/advanced-metrics'
import { LyricalAnalysis } from '@/components/analytics/lyrical-analysis'
import { AudienceInsights } from '@/components/analytics/audience-insights'
import { PredictiveAnalytics } from '@/components/analytics/predictive-analytics'
import { DataExport } from '@/components/analytics/data-export'

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-white">Advanced Analytics</h1>
        <p className="text-gray-300">
          Deep dive into Ella V's music performance, audience insights, and social impact metrics
        </p>
      </div>

      {/* Advanced Metrics Overview */}
      <AdvancedMetrics />

      {/* Main Analytics Grid */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Lyrical Content Analysis */}
        <LyricalAnalysis />
        
        {/* Audience Demographics & Behavior */}
        <AudienceInsights />
      </div>

      {/* Full-Width Predictive Analytics */}
      <PredictiveAnalytics />

      {/* Custom Visualization Areas */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white">Your Custom Advanced Analytics</h2>
        
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Machine Learning Insights */}
          <div className="bg-black/40 border-2 border-dashed border-cyan-400/50 rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold text-white mb-2">🤖 ML Insights Area</h3>
            <p className="text-gray-400 text-sm mb-4">
              Machine learning predictions and pattern recognition for streaming behavior, 
              optimal release timing, and audience growth forecasting.
            </p>
            <div className="bg-cyan-500/20 rounded p-4 text-xs text-cyan-300 font-mono">
              # ML-powered insights
              <br />
              import sklearn, tensorflow
              <br />
              # Predictive models for Ella V
            </div>
          </div>

          {/* Network Analysis */}
          <div className="bg-black/40 border-2 border-dashed border-orange-400/50 rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold text-white mb-2">🕸️ Network Analysis</h3>
            <p className="text-gray-400 text-sm mb-4">
              Social network analysis showing connections between listeners, 
              viral spread patterns, and community formation around Ella V's music.
            </p>
            <div className="bg-orange-500/20 rounded p-4 text-xs text-orange-300 font-mono">
              # Network graph analysis
              <br />
              import networkx as nx
              <br />
              # Social connection mapping
            </div>
          </div>

          {/* Sentiment Analysis */}
          <div className="bg-black/40 border-2 border-dashed border-pink-400/50 rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold text-white mb-2">💭 Sentiment Analysis</h3>
            <p className="text-gray-400 text-sm mb-4">
              Natural language processing of lyrics, social media comments, 
              and fan feedback to measure emotional impact and reception.
            </p>
            <div className="bg-pink-500/20 rounded p-4 text-xs text-pink-300 font-mono">
              # NLP sentiment analysis
              <br />
              import nltk, textblob
              <br />
              # Emotional impact measurement
            </div>
          </div>
        </div>

        {/* Full-Width Advanced Visualization Areas */}
        <div className="space-y-6">
          {/* Interactive Dashboard Integration */}
          <div className="bg-black/40 border-2 border-dashed border-indigo-400/50 rounded-lg p-8 text-center">
            <h3 className="text-xl font-semibold text-white mb-2">📊 Interactive Dashboard Integration</h3>
            <p className="text-gray-400 mb-4">
              This area is designed for embedding your Streamlit apps, interactive Plotly dashboards, 
              or React-based custom visualizations that provide real-time data exploration capabilities.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="bg-indigo-500/20 rounded p-4">
                <h4 className="text-indigo-300 font-semibold text-sm mb-2">Streamlit Integration</h4>
                <p className="text-indigo-200 text-xs">
                  Embed your Streamlit apps directly into this dashboard for seamless data exploration
                </p>
              </div>
              <div className="bg-indigo-500/20 rounded p-4">
                <h4 className="text-indigo-300 font-semibold text-sm mb-2">D3.js Visualizations</h4>
                <p className="text-indigo-200 text-xs">
                  Custom D3.js components for highly interactive and dynamic data visualizations
                </p>
              </div>
            </div>
            <div className="bg-indigo-500/20 rounded p-6 text-sm text-indigo-200 font-mono">
              # Integration examples:
              <br />
              # 1. Streamlit: streamlit.embed(url="your-app-url")
              <br />
              # 2. React Component: &lt;CustomVisualization data={`${`data`}`} /&gt;
              <br />
              # 3. Plotly: plotly.embed(fig, div_id="custom-chart")
            </div>
          </div>

          {/* Cross-Platform Analytics */}
          <div className="bg-black/40 border-2 border-dashed border-emerald-400/50 rounded-lg p-8 text-center">
            <h3 className="text-xl font-semibold text-white mb-2">🌐 Cross-Platform Analytics</h3>
            <p className="text-gray-400 mb-4">
              Comprehensive analysis combining Spotify data with social media metrics, 
              YouTube analytics, and other platform data for a holistic view of Ella V's digital presence.
            </p>
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div className="bg-emerald-500/20 rounded p-3">
                <h4 className="text-emerald-300 font-semibold text-sm">Instagram API</h4>
                <p className="text-emerald-200 text-xs">Post engagement correlation</p>
              </div>
              <div className="bg-emerald-500/20 rounded p-3">
                <h4 className="text-emerald-300 font-semibold text-sm">YouTube Analytics</h4>
                <p className="text-emerald-200 text-xs">Video performance metrics</p>
              </div>
              <div className="bg-emerald-500/20 rounded p-3">
                <h4 className="text-emerald-300 font-semibold text-sm">TikTok Trends</h4>
                <p className="text-emerald-200 text-xs">Viral content analysis</p>
              </div>
            </div>
            <div className="bg-emerald-500/20 rounded p-6 text-sm text-emerald-200 font-mono">
              # Cross-platform integration
              <br />
              # Combine Spotify + Instagram + YouTube data
              <br />
              # Unified social impact measurement
            </div>
          </div>
        </div>
      </div>

      {/* Data Export and API Access */}
      <DataExport />
    </div>
  )
}