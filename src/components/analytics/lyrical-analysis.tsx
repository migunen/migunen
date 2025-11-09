"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export function LyricalAnalysis() {
  // Mock lyrical analysis data
  const themes = [
    { theme: "Mental Health", frequency: 34, sentiment: 0.82, color: "bg-blue-500" },
    { theme: "Peace & Love", frequency: 28, sentiment: 0.91, color: "bg-green-500" },
    { theme: "Social Justice", frequency: 22, sentiment: 0.76, color: "bg-purple-500" },
    { theme: "Nature", frequency: 18, sentiment: 0.88, color: "bg-emerald-500" },
    { theme: "Empowerment", frequency: 16, sentiment: 0.85, color: "bg-pink-500" },
    { theme: "Identity", frequency: 12, sentiment: 0.79, color: "bg-indigo-500" }
  ]

  const keyPhrases = [
    { phrase: "rise above", count: 12, impact: "high" },
    { phrase: "mental clarity", count: 8, impact: "high" },
    { phrase: "unity in diversity", count: 7, impact: "medium" },
    { phrase: "inner peace", count: 6, impact: "high" },
    { phrase: "voice of change", count: 5, impact: "medium" }
  ]

  return (
    <Card className="bg-black/40 border-white/10">
      <CardHeader>
        <CardTitle className="text-white">Lyrical Content Analysis</CardTitle>
        <p className="text-sm text-gray-400">
          Thematic breakdown and sentiment analysis of Ella V's lyrics
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Theme Distribution */}
        <div className="space-y-4">
          <h4 className="text-white font-semibold">Thematic Distribution</h4>
          {themes.map((theme) => (
            <div key={theme.theme} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-white text-sm">{theme.theme}</span>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {theme.frequency}% occurrence
                  </Badge>
                  <Badge 
                    variant={theme.sentiment > 0.8 ? "default" : "secondary"}
                    className="text-xs"
                  >
                    {(theme.sentiment * 100).toFixed(0)}% positive
                  </Badge>
                </div>
              </div>
              <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${theme.color} transition-all duration-500`}
                  style={{ width: `${theme.frequency * 2.5}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Key Phrases */}
        <div className="space-y-4">
          <h4 className="text-white font-semibold">Impactful Phrases</h4>
          <div className="grid grid-cols-1 gap-2">
            {keyPhrases.map((phrase) => (
              <div key={phrase.phrase} className="flex items-center justify-between bg-white/5 rounded p-3">
                <span className="text-white text-sm font-medium">"{phrase.phrase}"</span>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400 text-xs">{phrase.count} times</span>
                  <Badge 
                    variant={phrase.impact === "high" ? "default" : "secondary"}
                    className="text-xs"
                  >
                    {phrase.impact} impact
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Custom Analysis Area */}
        <div className="p-6 bg-purple-500/10 border border-purple-400/30 rounded-lg">
          <h4 className="text-white font-semibold mb-2">🎤 Your Custom Lyrical Analysis</h4>
          <p className="text-purple-300 text-sm mb-4">
            Advanced natural language processing area for deeper lyrical insights:
          </p>
          <ul className="text-purple-300 text-sm space-y-1 mb-4">
            <li>• Word cloud visualization of most impactful terms</li>
            <li>• Sentiment progression across discography</li>
            <li>• Thematic evolution over time analysis</li>
            <li>• Comparative analysis with industry themes</li>
          </ul>
          <div className="bg-purple-500/20 rounded p-4 font-mono text-xs text-purple-200">
            # NLP analysis for Ella V's lyrics
            <br />
            import nltk, textblob, wordcloud
            <br />
            # Advanced sentiment & theme extraction
            <br />
            # Custom word cloud generation
          </div>
        </div>

        {/* Sentiment Trends */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center bg-white/5 rounded p-4">
            <div className="text-2xl font-bold text-white">86%</div>
            <div className="text-sm text-gray-400">Overall Positivity</div>
          </div>
          <div className="text-center bg-white/5 rounded p-4">
            <div className="text-2xl font-bold text-white">127</div>
            <div className="text-sm text-gray-400">Unique Themes</div>
          </div>
          <div className="text-center bg-white/5 rounded p-4">
            <div className="text-2xl font-bold text-white">92%</div>
            <div className="text-sm text-gray-400">Message Clarity</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}