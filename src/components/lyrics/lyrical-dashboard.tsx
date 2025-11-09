"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface LyricalDashboardProps {
  analyses: any[]
  tracks: any[]
}

export function LyricalDashboard({ analyses, tracks }: LyricalDashboardProps) {
  // Mock comprehensive lyrical analysis data for Ella V
  const mockAnalyses = [
    {
      track_name: "Peace & Unity",
      artist_name: "Ella V",
      lyrics: {
        word_count: 245,
        unique_words: 156,
        reading_level: 8.2,
        verse_count: 3,
        chorus_count: 1
      },
      themes: {
        mental_health: 45,
        social_justice: 85,
        peace_love: 95,
        nature: 25,
        empowerment: 78,
        identity: 65,
        education: 82
      },
      sentiment: {
        overall_score: 0.89,
        positive_percentage: 84,
        negative_percentage: 6,
        neutral_percentage: 10,
        emotional_intensity: 92
      },
      impact_metrics: {
        sdg_4_education: 88,
        sdg_10_equality: 75,
        sdg_16_peace_justice: 92,
        social_message_strength: 85
      },
      linguistic_analysis: {
        complexity_score: 7.8,
        metaphor_count: 12,
        rhyme_scheme: 'ABAB',
        rhythm_pattern: 'iambic'
      },
      key_phrases: [
        { phrase: "peace and unity", frequency: 8, impact: "high" },
        { phrase: "rise above", frequency: 5, impact: "high" },
        { phrase: "together we stand", frequency: 4, impact: "medium" }
      ]
    },
    {
      track_name: "Mental Clarity",
      artist_name: "Ella V",
      lyrics: {
        word_count: 198,
        unique_words: 142,
        reading_level: 7.5,
        verse_count: 2,
        chorus_count: 2
      },
      themes: {
        mental_health: 95,
        social_justice: 35,
        peace_love: 78,
        nature: 88,
        empowerment: 82,
        identity: 92,
        education: 75
      },
      sentiment: {
        overall_score: 0.76,
        positive_percentage: 72,
        negative_percentage: 12,
        neutral_percentage: 16,
        emotional_intensity: 78
      },
      impact_metrics: {
        sdg_4_education: 82,
        sdg_10_equality: 68,
        sdg_16_peace_justice: 71,
        social_message_strength: 79
      },
      linguistic_analysis: {
        complexity_score: 8.2,
        metaphor_count: 18,
        rhyme_scheme: 'AABA',
        rhythm_pattern: 'syncopated'
      },
      key_phrases: [
        { phrase: "mental clarity", frequency: 6, impact: "high" },
        { phrase: "find your center", frequency: 4, impact: "high" },
        { phrase: "inner peace", frequency: 3, impact: "medium" }
      ]
    }
  ]

  const combinedAnalyses = analyses.length > 0 ? analyses : mockAnalyses

  // Calculate overall metrics
  const overallMetrics = {
    averageSentiment: combinedAnalyses.reduce((sum, a) => sum + a.sentiment.overall_score, 0) / combinedAnalyses.length,
    totalWords: combinedAnalyses.reduce((sum, a) => sum + a.lyrics.word_count, 0),
    averageComplexity: combinedAnalyses.reduce((sum, a) => sum + a.linguistic_analysis.complexity_score, 0) / combinedAnalyses.length,
    socialImpact: combinedAnalyses.reduce((sum, a) => sum + a.impact_metrics.social_message_strength, 0) / combinedAnalyses.length
  }

  const getThemeColor = (theme: string) => {
    const colors: { [key: string]: string } = {
      mental_health: "from-blue-500 to-cyan-500",
      social_justice: "from-purple-500 to-violet-500",
      peace_love: "from-green-500 to-emerald-500",
      nature: "from-emerald-500 to-teal-500",
      empowerment: "from-pink-500 to-rose-500",
      identity: "from-indigo-500 to-purple-500",
      education: "from-orange-500 to-amber-500"
    }
    return colors[theme] || "from-gray-500 to-gray-600"
  }

  return (
    <div className="space-y-6">
      {/* Overall Lyrical Metrics */}
      <Card className="bg-gray-900 border-red-600/30">
        <CardHeader>
          <CardTitle className="text-white">Lyrical Analysis Overview</CardTitle>
          <p className="text-gray-400 text-sm">
            Comprehensive analysis of Ella V's lyrical content and social impact messaging
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{(overallMetrics.averageSentiment * 100).toFixed(0)}%</div>
              <div className="text-sm text-gray-400">Positive Sentiment</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{overallMetrics.totalWords}</div>
              <div className="text-sm text-gray-400">Total Words</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{overallMetrics.averageComplexity.toFixed(1)}</div>
              <div className="text-sm text-gray-400">Complexity Score</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{overallMetrics.socialImpact.toFixed(0)}/100</div>
              <div className="text-sm text-gray-400">Social Impact</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Analysis Tabs */}
      <Tabs defaultValue="themes" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 bg-gray-900 border border-red-600/30">
          <TabsTrigger value="themes" className="data-[state=active]:bg-red-600">Themes</TabsTrigger>
          <TabsTrigger value="sentiment" className="data-[state=active]:bg-red-600">Sentiment</TabsTrigger>
          <TabsTrigger value="impact" className="data-[state=active]:bg-red-600">Social Impact</TabsTrigger>
          <TabsTrigger value="linguistics" className="data-[state=active]:bg-red-600">Linguistics</TabsTrigger>
        </TabsList>

        {/* Thematic Analysis */}
        <TabsContent value="themes" className="space-y-4">
          <Card className="bg-gray-900 border-red-600/30">
            <CardHeader>
              <CardTitle className="text-white">Thematic Breakdown</CardTitle>
              <p className="text-gray-400 text-sm">Analysis of themes across all tracks</p>
            </CardHeader>
            <CardContent>
              {combinedAnalyses.map((analysis, trackIndex) => (
                <div key={trackIndex} className="mb-8 last:mb-0">
                  <h4 className="text-white font-semibold mb-4">{analysis.track_name}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(analysis.themes).map(([theme, score]: [string, any]) => (
                      <div key={theme} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-300 capitalize">{theme.replace('_', ' ')}</span>
                          <span className="text-white font-semibold">{score}%</span>
                        </div>
                        <div className="relative">
                          <Progress value={score} className="h-3" />
                          <div className={`absolute inset-0 bg-gradient-to-r ${getThemeColor(theme)} rounded-full opacity-80`} 
                               style={{ width: `${score}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sentiment Analysis */}
        <TabsContent value="sentiment" className="space-y-4">
          <Card className="bg-gray-900 border-red-600/30">
            <CardHeader>
              <CardTitle className="text-white">Sentiment Analysis</CardTitle>
              <p className="text-gray-400 text-sm">Emotional tone and positivity analysis</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {combinedAnalyses.map((analysis, index) => (
                  <div key={index} className="bg-black/40 rounded-lg p-6">
                    <h4 className="text-white font-semibold mb-4">{analysis.track_name}</h4>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-green-400">Positive</span>
                            <span className="text-white">{analysis.sentiment.positive_percentage}%</span>
                          </div>
                          <Progress value={analysis.sentiment.positive_percentage} className="h-2" />
                        </div>
                        
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-red-400">Negative</span>
                            <span className="text-white">{analysis.sentiment.negative_percentage}%</span>
                          </div>
                          <Progress value={analysis.sentiment.negative_percentage} className="h-2" />
                        </div>
                        
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-gray-400">Neutral</span>
                            <span className="text-white">{analysis.sentiment.neutral_percentage}%</span>
                          </div>
                          <Progress value={analysis.sentiment.neutral_percentage} className="h-2" />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="text-center bg-white/5 rounded-lg p-4">
                          <div className="text-3xl font-bold text-white">{(analysis.sentiment.overall_score * 100).toFixed(0)}</div>
                          <div className="text-sm text-gray-400">Overall Score</div>
                        </div>
                        
                        <div className="text-center bg-white/5 rounded-lg p-4">
                          <div className="text-3xl font-bold text-white">{analysis.sentiment.emotional_intensity}</div>
                          <div className="text-sm text-gray-400">Emotional Intensity</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Social Impact Analysis */}
        <TabsContent value="impact" className="space-y-4">
          <Card className="bg-gray-900 border-red-600/30">
            <CardHeader>
              <CardTitle className="text-white">Social Impact Analysis</CardTitle>
              <p className="text-gray-400 text-sm">UN SDG alignment and social message effectiveness</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {combinedAnalyses.map((analysis, index) => (
                  <div key={index} className="bg-black/40 rounded-lg p-6">
                    <h4 className="text-white font-semibold mb-4">{analysis.track_name}</h4>
                    
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="space-y-4">
                        <div className="text-center p-4 bg-blue-500/20 rounded-lg">
                          <div className="text-2xl font-bold text-blue-400">{analysis.impact_metrics.sdg_4_education}</div>
                          <div className="text-sm text-blue-300">SDG 4: Education</div>
                          <div className="text-xs text-gray-400 mt-1">Youth empowerment themes</div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="text-center p-4 bg-purple-500/20 rounded-lg">
                          <div className="text-2xl font-bold text-purple-400">{analysis.impact_metrics.sdg_10_equality}</div>
                          <div className="text-sm text-purple-300">SDG 10: Equality</div>
                          <div className="text-xs text-gray-400 mt-1">Social justice messaging</div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="text-center p-4 bg-green-500/20 rounded-lg">
                          <div className="text-2xl font-bold text-green-400">{analysis.impact_metrics.sdg_16_peace_justice}</div>
                          <div className="text-sm text-green-300">SDG 16: Peace & Justice</div>
                          <div className="text-xs text-gray-400 mt-1">Peace-building content</div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-red-600/10 border border-red-500/30 rounded-lg">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-red-400">{analysis.impact_metrics.social_message_strength}</div>
                        <div className="text-sm text-red-300">Social Message Strength</div>
                        <div className="text-xs text-gray-400 mt-1">Overall impact effectiveness</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Linguistic Analysis */}
        <TabsContent value="linguistics" className="space-y-4">
          <Card className="bg-gray-900 border-red-600/30">
            <CardHeader>
              <CardTitle className="text-white">Linguistic Analysis</CardTitle>
              <p className="text-gray-400 text-sm">Technical analysis of lyrical structure and language use</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {combinedAnalyses.map((analysis, index) => (
                  <div key={index} className="bg-black/40 rounded-lg p-6">
                    <h4 className="text-white font-semibold mb-4">{analysis.track_name}</h4>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Word Count</span>
                            <span className="text-white font-semibold">{analysis.lyrics.word_count}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Unique Words</span>
                            <span className="text-white font-semibold">{analysis.lyrics.unique_words}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Reading Level</span>
                            <span className="text-white font-semibold">{analysis.lyrics.reading_level}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Complexity Score</span>
                            <span className="text-white font-semibold">{analysis.linguistic_analysis.complexity_score}/10</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Verses</span>
                            <span className="text-white font-semibold">{analysis.lyrics.verse_count}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Chorus</span>
                            <span className="text-white font-semibold">{analysis.lyrics.chorus_count}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Metaphors</span>
                            <span className="text-white font-semibold">{analysis.linguistic_analysis.metaphor_count}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Rhyme Scheme</span>
                            <span className="text-white font-semibold">{analysis.linguistic_analysis.rhyme_scheme}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Key Phrases */}
                    <div className="mt-6">
                      <h5 className="text-white font-semibold mb-3">Key Phrases</h5>
                      <div className="flex flex-wrap gap-2">
                        {analysis.key_phrases.map((phrase: any, phraseIndex: number) => (
                          <Badge 
                            key={phraseIndex}
                            variant={phrase.impact === 'high' ? 'default' : 'outline'}
                            className="bg-red-600/20 text-red-400 border-red-600/50"
                          >
                            "{phrase.phrase}" ({phrase.frequency}x)
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Cross-Platform Lyrical Comparison */}
      <Card className="bg-gray-900 border-red-600/30">
        <CardHeader>
          <CardTitle className="text-white">Cross-Platform Lyrical Impact</CardTitle>
          <p className="text-gray-400 text-sm">
            How lyrical themes perform across different music platforms
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <h4 className="text-green-400 font-semibold mb-2">🎵 Spotify Performance</h4>
                <p className="text-green-300 text-sm">Peace & Unity themes show 89% positive engagement</p>
              </div>
              <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
                <h4 className="text-orange-400 font-semibold mb-2">🔊 SoundCloud Community</h4>
                <p className="text-orange-300 text-sm">Mental health content receives most reposts (78%)</p>
              </div>
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                <h4 className="text-yellow-400 font-semibold mb-2">📝 Genius Annotations</h4>
                <p className="text-yellow-300 text-sm">Social justice lyrics get most annotations (92%)</p>
              </div>
            </div>

            {/* Custom Analysis Area */}
            <div className="p-6 bg-red-600/10 border border-red-500/30 rounded-lg">
              <h4 className="text-white font-semibold mb-3">📊 Your Custom Lyrical Analysis</h4>
              <p className="text-red-300 mb-4">
                Advanced natural language processing and cross-platform lyrical impact analysis:
              </p>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="bg-red-600/20 rounded p-4">
                  <h5 className="text-red-300 font-semibold text-sm mb-2">Multi-Platform NLP</h5>
                  <p className="text-red-200 text-xs">
                    Compare lyrical impact across Spotify, SoundCloud, Apple Music, and Tidal
                  </p>
                </div>
                <div className="bg-red-600/20 rounded p-4">
                  <h5 className="text-red-300 font-semibold text-sm mb-2">Theme Evolution</h5>
                  <p className="text-red-200 text-xs">
                    Track how Ella V's social themes develop across platforms and time
                  </p>
                </div>
              </div>
              <div className="bg-red-600/20 rounded p-4 font-mono text-sm text-red-200">
                # Multi-platform lyrical analysis
                <br />
                import nltk, spacy, textblob
                <br />
                # Cross-platform sentiment correlation
                <br />
                # Theme performance by platform
                <br />
                # Social impact effectiveness tracking
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}