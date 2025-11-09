"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function MessageAnalysis() {
  return (
    <Card className="bg-black/40 border-white/10">
      <CardHeader>
        <CardTitle className="text-white">Message Analysis</CardTitle>
        <p className="text-sm text-gray-400">Analysis of positive messaging and thematic content</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white/5 rounded p-4 text-center">
              <div className="text-xl font-bold text-white">Peace & Love</div>
              <div className="text-sm text-gray-400">Primary Theme</div>
            </div>
            <div className="bg-white/5 rounded p-4 text-center">
              <div className="text-xl font-bold text-white">Mental Health</div>
              <div className="text-sm text-gray-400">Key Focus</div>
            </div>
            <div className="bg-white/5 rounded p-4 text-center">
              <div className="text-xl font-bold text-white">Equality</div>
              <div className="text-sm text-gray-400">Social Impact</div>
            </div>
          </div>
          
          <div className="p-8 bg-rose-500/10 border border-rose-400/30 rounded-lg">
            <h4 className="text-white font-semibold mb-2">🎤 Your Message Analysis Visualization</h4>
            <p className="text-rose-300 mb-6">
              Advanced natural language processing and thematic analysis of Ella V's lyrical content 
              and social messaging impact.
            </p>
            
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="bg-rose-500/20 rounded p-4">
                <h5 className="text-rose-300 font-semibold text-sm mb-2">Sentiment Evolution</h5>
                <p className="text-rose-200 text-xs">Track emotional tone changes across discography</p>
              </div>
              <div className="bg-rose-500/20 rounded p-4">
                <h5 className="text-rose-300 font-semibold text-sm mb-2">Theme Correlation</h5>
                <p className="text-rose-200 text-xs">Analyze theme popularity vs social impact</p>
              </div>
            </div>
            
            <div className="bg-rose-500/20 rounded p-4 font-mono text-xs text-rose-200">
              # Advanced message analysis
              <br />
              import nltk, textblob, wordcloud
              <br />
              # Sentiment analysis and theme extraction
              <br />
              # Social impact correlation analysis
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}