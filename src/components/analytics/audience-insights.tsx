"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export function AudienceInsights() {
  // Mock audience data
  const demographics = [
    { group: "18-24", percentage: 32, growth: "+15%" },
    { group: "25-34", percentage: 28, growth: "+22%" },
    { group: "35-44", percentage: 24, growth: "+8%" },
    { group: "45-54", percentage: 12, growth: "+18%" },
    { group: "55+", percentage: 4, growth: "+25%" }
  ]

  const interests = [
    { interest: "Mental Health Awareness", overlap: 87 },
    { interest: "Social Justice", overlap: 74 },
    { interest: "Environmental Issues", overlap: 68 },
    { interest: "Education & Learning", overlap: 82 },
    { interest: "Youth Empowerment", overlap: 91 }
  ]

  const listeningBehavior = [
    { metric: "Average Session", value: "24 min", change: "+12%" },
    { metric: "Skip Rate", value: "6.2%", change: "-18%" },
    { metric: "Replay Rate", value: "34%", change: "+23%" },
    { metric: "Playlist Adds", value: "67%", change: "+31%" }
  ]

  return (
    <Card className="bg-black/40 border-white/10">
      <CardHeader>
        <CardTitle className="text-white">Audience Insights</CardTitle>
        <p className="text-sm text-gray-400">
          Deep dive into listener demographics, behavior, and interests
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Age Demographics */}
        <div className="space-y-4">
          <h4 className="text-white font-semibold">Age Distribution</h4>
          {demographics.map((demo) => (
            <div key={demo.group} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-white text-sm w-12">{demo.group}</span>
                <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-400 to-cyan-400 transition-all duration-500"
                    style={{ width: `${demo.percentage * 2.5}%` }}
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-white text-sm">{demo.percentage}%</span>
                <Badge variant="default" className="text-xs">
                  {demo.growth}
                </Badge>
              </div>
            </div>
          ))}
        </div>

        {/* Interest Overlap */}
        <div className="space-y-4">
          <h4 className="text-white font-semibold">Audience Interest Alignment</h4>
          {interests.map((item) => (
            <div key={item.interest} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-white text-sm">{item.interest}</span>
                <span className="text-cyan-400 text-sm font-semibold">{item.overlap}%</span>
              </div>
              <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-cyan-400 to-blue-400 transition-all duration-500"
                  style={{ width: `${item.overlap}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Listening Behavior */}
        <div className="space-y-4">
          <h4 className="text-white font-semibold">Listening Behavior</h4>
          <div className="grid grid-cols-2 gap-4">
            {listeningBehavior.map((behavior) => (
              <div key={behavior.metric} className="bg-white/5 rounded p-4 text-center">
                <div className="text-white font-semibold text-lg">{behavior.value}</div>
                <div className="text-gray-400 text-sm">{behavior.metric}</div>
                <Badge variant="default" className="text-xs mt-2">
                  {behavior.change}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Custom Audience Analysis Area */}
        <div className="p-6 bg-cyan-500/10 border border-cyan-400/30 rounded-lg">
          <h4 className="text-white font-semibold mb-2">👥 Your Custom Audience Analysis</h4>
          <p className="text-cyan-300 text-sm mb-4">
            Advanced audience segmentation and behavior analysis:
          </p>
          <ul className="text-cyan-300 text-sm space-y-1 mb-4">
            <li>• Cohort analysis and listener journey mapping</li>
            <li>• Geographic clustering and cultural preferences</li>
            <li>• Cross-platform audience overlap analysis</li>
            <li>• Predictive audience growth modeling</li>
          </ul>
          <div className="bg-cyan-500/20 rounded p-4 font-mono text-xs text-cyan-200">
            # Advanced audience analytics
            <br />
            import pandas as pd, seaborn as sns
            <br />
            # Audience segmentation & behavioral analysis
            <br />
            # Custom cohort and retention analysis
          </div>
        </div>

        {/* Engagement Quality */}
        <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg p-4">
          <h4 className="text-white font-semibold mb-3">Engagement Quality Score</h4>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">92.4</div>
            <p className="text-gray-300 text-sm">
              Exceptional audience engagement with high retention and interaction rates
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}