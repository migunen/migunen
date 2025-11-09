"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export function PredictiveAnalytics() {
  // Mock predictive data
  const predictions = [
    {
      metric: "Monthly Listeners",
      current: "2,156",
      predicted: "3,400",
      timeframe: "Next 3 months",
      confidence: 87,
      trend: "upward"
    },
    {
      metric: "Geographic Reach",
      current: "15 countries",
      predicted: "23 countries", 
      timeframe: "Next 6 months",
      confidence: 74,
      trend: "upward"
    },
    {
      metric: "Social Impact Score",
      current: "85.3",
      predicted: "91.7",
      timeframe: "Next quarter",
      confidence: 82,
      trend: "upward"
    }
  ]

  const recommendations = [
    {
      priority: "High",
      action: "Release track focusing on mental health themes",
      impact: "Potential +2.3k streams",
      timeline: "Next 2 weeks"
    },
    {
      priority: "Medium",
      action: "Collaborate with Finnish educational institutions",
      impact: "SDG 4 score improvement",
      timeline: "Next month"
    },
    {
      priority: "High",
      action: "Target German and Swedish markets",
      impact: "Geographic expansion",
      timeline: "Next 6 weeks"
    },
    {
      priority: "Medium",
      action: "Increase Instagram posting frequency",
      impact: "Stream correlation boost",
      timeline: "Immediate"
    }
  ]

  const getPriorityColor = (priority: string) => {
    return priority === "High" ? "border-red-400 text-red-400" : "border-yellow-400 text-yellow-400"
  }

  return (
    <Card className="bg-black/40 border-white/10">
      <CardHeader>
        <CardTitle className="text-white">Predictive Analytics & Recommendations</CardTitle>
        <p className="text-sm text-gray-400">
          AI-powered insights and actionable recommendations for Ella V's growth
        </p>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Growth Predictions */}
        <div className="space-y-6">
          <h4 className="text-white font-semibold text-lg">Growth Forecasts</h4>
          <div className="grid md:grid-cols-3 gap-6">
            {predictions.map((prediction) => (
              <div key={prediction.metric} className="bg-white/5 rounded-lg p-6 space-y-4">
                <div className="text-center">
                  <h5 className="text-white font-semibold mb-2">{prediction.metric}</h5>
                  <div className="space-y-2">
                    <div className="text-gray-400 text-sm">Current</div>
                    <div className="text-xl text-white font-bold">{prediction.current}</div>
                  </div>
                  <div className="text-2xl text-center my-2">↗️</div>
                  <div className="space-y-2">
                    <div className="text-gray-400 text-sm">Predicted</div>
                    <div className="text-xl text-green-400 font-bold">{prediction.predicted}</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Confidence</span>
                    <span className="text-white">{prediction.confidence}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-700 rounded-full">
                    <div 
                      className="h-2 bg-green-400 rounded-full transition-all duration-500"
                      style={{ width: `${prediction.confidence}%` }}
                    />
                  </div>
                  <p className="text-gray-400 text-xs mt-2">{prediction.timeframe}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="space-y-6">
          <h4 className="text-white font-semibold text-lg">AI-Powered Recommendations</h4>
          <div className="grid md:grid-cols-2 gap-4">
            {recommendations.map((rec, index) => (
              <div key={index} className="bg-white/5 rounded-lg p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className={`${getPriorityColor(rec.priority)} text-xs`}>
                    {rec.priority} Priority
                  </Badge>
                  <span className="text-gray-400 text-xs">{rec.timeline}</span>
                </div>
                <h5 className="text-white font-medium">{rec.action}</h5>
                <p className="text-green-400 text-sm">Expected: {rec.impact}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Custom Predictive Analytics Area */}
        <div className="p-8 bg-gradient-to-r from-violet-500/10 to-purple-500/10 border border-violet-400/30 rounded-lg">
          <h4 className="text-white font-semibold mb-4 text-lg">🔮 Your Custom Predictive Models</h4>
          <p className="text-violet-300 mb-6">
            Advanced machine learning models and forecasting algorithms for comprehensive 
            growth prediction and strategic planning.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-violet-500/20 rounded-lg p-6">
              <h5 className="text-violet-300 font-semibold mb-3">Time Series Forecasting</h5>
              <ul className="text-violet-200 text-sm space-y-1">
                <li>• ARIMA models for stream prediction</li>
                <li>• Seasonal decomposition analysis</li>
                <li>• Event impact forecasting</li>
                <li>• Multi-variate time series analysis</li>
              </ul>
            </div>
            
            <div className="bg-purple-500/20 rounded-lg p-6">
              <h5 className="text-purple-300 font-semibold mb-3">Classification Models</h5>
              <ul className="text-purple-200 text-sm space-y-1">
                <li>• Audience segment prediction</li>
                <li>• Viral content identification</li>
                <li>• Optimal release timing</li>
                <li>• Genre and theme optimization</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-violet-500/20 to-purple-500/20 rounded p-6 font-mono text-sm text-violet-200">
            # Advanced ML pipeline for Ella V
            <br />
            from sklearn.ensemble import RandomForestRegressor
            <br />
            from statsmodels.tsa.arima.model import ARIMA
            <br />
            import tensorflow as tf
            <br />
            <br />
            # Multi-model ensemble for growth prediction
            <br />
            # Real-time recommendation engine
            <br />
            # Custom metrics optimization
          </div>
        </div>

        {/* Success Probability Matrix */}
        <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg p-6">
          <h4 className="text-white font-semibold mb-4">Success Probability Matrix</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">94%</div>
              <div className="text-sm text-gray-400">Next Release Success</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">87%</div>
              <div className="text-sm text-gray-400">Viral Potential</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">91%</div>
              <div className="text-sm text-gray-400">Growth Sustainability</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">83%</div>
              <div className="text-sm text-gray-400">Market Expansion</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}