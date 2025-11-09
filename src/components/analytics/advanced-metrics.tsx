"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'

export function AdvancedMetrics() {
  // Mock advanced metrics data
  const metrics = [
    {
      category: "Audience Quality",
      score: 89,
      description: "High engagement and retention rates",
      change: "+12%",
      details: ["94% completion rate", "3.2 avg replays", "85% save rate"]
    },
    {
      category: "Cultural Impact",
      score: 76,
      description: "Positive social media sentiment and shares",
      change: "+23%", 
      details: ["78% positive sentiment", "2.1k social shares", "15 media mentions"]
    },
    {
      category: "Educational Value",
      score: 92,
      description: "Content addressing educational themes (SDG 4)",
      change: "+18%",
      details: ["Mental health awareness", "Youth empowerment", "Creative expression"]
    },
    {
      category: "Social Equity",
      score: 84,
      description: "Reaching underrepresented communities (SDG 10)",
      change: "+27%",
      details: ["12 minority communities", "Equal gender reach", "Economic diversity"]
    }
  ]

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-400"
    if (score >= 75) return "text-yellow-400" 
    if (score >= 60) return "text-orange-400"
    return "text-red-400"
  }



  return (
    <div className="space-y-6">
      <Card className="bg-black/40 border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Advanced Impact Metrics</CardTitle>
          <p className="text-sm text-gray-400">
            Comprehensive analysis of social impact, audience quality, and cultural influence
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Metrics Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {metrics.map((metric) => (
              <div key={metric.category} className="bg-white/5 rounded-lg p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-white font-semibold">{metric.category}</h3>
                  <div className="flex items-center gap-2">
                    <span className={`text-xl font-bold ${getScoreColor(metric.score)}`}>
                      {metric.score}
                    </span>
                    <Badge variant="default" className="text-xs">
                      {metric.change}
                    </Badge>
                  </div>
                </div>
                
                <Progress 
                  value={metric.score} 
                  className="h-3"
                />
                
                <p className="text-gray-400 text-sm">
                  {metric.description}
                </p>
                
                <div className="space-y-1">
                  {metric.details.map((detail, index) => (
                    <div key={index} className="flex items-center gap-2 text-xs">
                      <div className="w-2 h-2 bg-purple-400 rounded-full" />
                      <span className="text-gray-300">{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Overall Impact Score */}
          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg p-6 text-center">
            <h3 className="text-white text-xl font-bold mb-2">Overall Social Impact Score</h3>
            <div className="text-4xl font-bold text-white mb-2">85.3</div>
            <p className="text-gray-300 text-sm mb-4">
              Exceptional contribution to social causes and community upliftment
            </p>
            <div className="flex justify-center gap-6 text-sm">
              <div className="text-center">
                <div className="text-white font-semibold">SDG 4</div>
                <div className="text-gray-400">Education: 92/100</div>
              </div>
              <div className="text-center">
                <div className="text-white font-semibold">SDG 10</div>
                <div className="text-gray-400">Equality: 84/100</div>
              </div>
              <div className="text-center">
                <div className="text-white font-semibold">SDG 16</div>
                <div className="text-gray-400">Peace: 80/100</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}