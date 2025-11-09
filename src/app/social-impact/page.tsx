import { SDGTracker } from '@/components/social-impact/sdg-tracker'
import { ImpactMetrics } from '@/components/social-impact/impact-metrics'
import { CommunityReach } from '@/components/social-impact/community-reach'
import { MessageAnalysis } from '@/components/social-impact/message-analysis'

export default function SocialImpactPage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-white">Social Impact Dashboard</h1>
        <p className="text-gray-300 max-w-3xl">
          Measuring Ella V's contribution to UN Sustainable Development Goals through music. 
          Tracking the positive influence on communities, education, equality, and peace-building efforts.
        </p>
      </div>

      {/* UN SDG Tracker */}
      <SDGTracker />

      {/* Impact Metrics Grid */}
      <div className="grid lg:grid-cols-2 gap-8">
        <ImpactMetrics />
        <CommunityReach />
      </div>

      {/* Message Analysis */}
      <MessageAnalysis />

      {/* Custom Social Impact Analysis Areas */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white">Custom Social Impact Visualizations</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Community Impact Mapping */}
          <div className="bg-black/40 border-2 border-dashed border-green-400/50 rounded-lg p-8 text-center">
            <h3 className="text-lg font-semibold text-white mb-2">🌍 Community Impact Mapping</h3>
            <p className="text-gray-400 text-sm mb-4">
              Geographic visualization of social impact, community engagement levels, 
              and positive message reach across different regions and demographics.
            </p>
            <div className="bg-green-500/20 rounded p-4 text-xs text-green-300 font-mono">
              # Community impact visualization
              <br />
              import plotly.graph_objects as go
              <br />
              # Map social impact by region
              <br />
              # Track community engagement metrics
            </div>
          </div>

          {/* SDG Progress Tracking */}
          <div className="bg-black/40 border-2 border-dashed border-blue-400/50 rounded-lg p-8 text-center">
            <h3 className="text-lg font-semibold text-white mb-2">📊 SDG Progress Analytics</h3>
            <p className="text-gray-400 text-sm mb-4">
              Advanced tracking of progress toward UN SDG goals 4, 10, and 16 
              through quantitative metrics and qualitative impact assessment.
            </p>
            <div className="bg-blue-500/20 rounded p-4 text-xs text-blue-300 font-mono">
              # SDG progress tracking
              <br />
              import pandas as pd, seaborn as sns
              <br />
              # Quantify social impact metrics
              <br />
              # Track SDG goal progression
            </div>
          </div>
        </div>

        {/* Full-Width Impact Analysis */}
        <div className="bg-black/40 border-2 border-dashed border-purple-400/50 rounded-lg p-8 text-center">
          <h3 className="text-xl font-semibold text-white mb-2">🎯 Comprehensive Impact Analysis</h3>
          <p className="text-gray-400 mb-6">
            Full-scale analysis combining quantitative streaming data with qualitative social impact metrics. 
            This area supports complex multi-dimensional visualizations showing correlations between 
            music themes, listener demographics, social engagement, and measurable community outcomes.
          </p>
          
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-purple-500/20 rounded p-4">
              <h4 className="text-purple-300 font-semibold text-sm mb-2">Longitudinal Studies</h4>
              <p className="text-purple-200 text-xs">
                Track social impact changes over time with trend analysis and seasonal patterns
              </p>
            </div>
            <div className="bg-purple-500/20 rounded p-4">
              <h4 className="text-purple-300 font-semibold text-sm mb-2">Cross-Cultural Analysis</h4>
              <p className="text-purple-200 text-xs">
                Compare impact across different cultural contexts and geographic regions
              </p>
            </div>
            <div className="bg-purple-500/20 rounded p-4">
              <h4 className="text-purple-300 font-semibold text-sm mb-2">Outcome Correlation</h4>
              <p className="text-purple-200 text-xs">
                Correlate music engagement with real-world social outcomes and community metrics
              </p>
            </div>
          </div>
          
          <div className="bg-purple-500/20 rounded p-6 text-sm text-purple-200 font-mono">
            # Comprehensive social impact analysis
            <br />
            import numpy as np, scipy.stats as stats
            <br />
            # Multi-dimensional impact correlation analysis
            <br />
            # Longitudinal social outcome tracking
            <br />
            # Cultural context and demographic impact assessment
          </div>
        </div>
      </div>

      {/* Impact Summary */}
      <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-lg p-8 text-center">
        <h3 className="text-2xl font-bold text-white mb-4">Social Impact Summary</h3>
        <div className="grid md:grid-cols-4 gap-6">
          <div>
            <div className="text-3xl font-bold text-green-400">85.3</div>
            <div className="text-gray-300 text-sm">Overall Impact Score</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-400">12</div>
            <div className="text-gray-300 text-sm">Communities Reached</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-purple-400">3</div>
            <div className="text-gray-300 text-sm">SDGs Actively Supported</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-yellow-400">94%</div>
            <div className="text-gray-300 text-sm">Message Positivity</div>
          </div>
        </div>
        <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
          Ella V's music demonstrates exceptional social impact through authentic messaging 
          that resonates with diverse communities and actively contributes to positive social change.
        </p>
      </div>
    </div>
  )
}