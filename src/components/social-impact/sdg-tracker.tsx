"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'

export function SDGTracker() {
  const sdgGoals = [
    {
      number: 4,
      title: "Quality Education",
      description: "Rap as a tool for learning, literacy, and youth empowerment",
      score: 92,
      progress: 78,
      color: "from-blue-500 to-blue-600",
      borderColor: "border-blue-400",
      initiatives: [
        "Educational lyrics promoting mental health awareness",
        "Youth empowerment through creative expression",
        "Collaboration with educational institutions"
      ]
    },
    {
      number: 10,
      title: "Reduced Inequalities", 
      description: "Amplifying voices of marginalized communities",
      score: 84,
      progress: 71,
      color: "from-purple-500 to-purple-600",
      borderColor: "border-purple-400",
      initiatives: [
        "Addressing racism and poverty in lyrics",
        "Reaching diverse geographic communities",
        "Supporting underrepresented voices"
      ]
    },
    {
      number: 16,
      title: "Peace, Justice & Strong Institutions",
      description: "Promoting dialogue about fairness and accountability",
      score: 80,
      progress: 68,
      color: "from-green-500 to-green-600", 
      borderColor: "border-green-400",
      initiatives: [
        "Peace and unity messaging in music",
        "Promoting social justice through storytelling",
        "Building stronger community connections"
      ]
    }
  ]

  return (
    <div className="space-y-6">
      <Card className="bg-black/40 border-white/10">
        <CardHeader>
          <CardTitle className="text-white text-2xl">UN Sustainable Development Goals Tracking</CardTitle>
          <p className="text-gray-400">
            Measuring Ella V's contribution to global sustainable development through music and social impact
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid gap-8">
            {sdgGoals.map((goal) => (
              <div key={goal.number} className={`bg-gradient-to-r ${goal.color}/10 border ${goal.borderColor}/30 rounded-lg p-8`}>
                <div className="grid md:grid-cols-3 gap-6">
                  {/* SDG Info */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-16 h-16 bg-gradient-to-r ${goal.color} rounded-full flex items-center justify-center`}>
                        <span className="text-white font-bold text-xl">{goal.number}</span>
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-xl">{goal.title}</h3>
                        <Badge variant="outline" className="mt-2">
                          Score: {goal.score}/100
                        </Badge>
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {goal.description}
                    </p>
                  </div>

                  {/* Progress Visualization */}
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-400">Overall Progress</span>
                        <span className="text-white font-semibold">{goal.progress}%</span>
                      </div>
                      <Progress value={goal.progress} className="h-3" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-400">Impact Score</span>
                        <span className="text-white font-semibold">{goal.score}/100</span>
                      </div>
                      <Progress value={goal.score} className="h-3" />
                    </div>

                    <div className="text-center p-4 bg-white/5 rounded-lg">
                      <div className="text-2xl font-bold text-white">{goal.score}</div>
                      <div className="text-sm text-gray-400">Impact Score</div>
                    </div>
                  </div>

                  {/* Key Initiatives */}
                  <div className="space-y-3">
                    <h4 className="text-white font-semibold">Key Initiatives</h4>
                    <ul className="space-y-2">
                      {goal.initiatives.map((initiative, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0" />
                          <span className="text-gray-300 text-sm">{initiative}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Overall SDG Impact Summary */}
          <div className="mt-8 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-lg p-6">
            <h3 className="text-white font-bold text-xl mb-4 text-center">Overall SDG Contribution</h3>
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-white">85.3</div>
                <div className="text-gray-400 text-sm">Combined Score</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-400">3</div>
                <div className="text-gray-400 text-sm">Active SDGs</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-400">72%</div>
                <div className="text-gray-400 text-sm">Avg Progress</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-400">High</div>
                <div className="text-gray-400 text-sm">Impact Level</div>
              </div>
            </div>
            <p className="text-gray-300 text-center mt-4 max-w-2xl mx-auto">
              Ella V's music demonstrates exceptional alignment with UN Sustainable Development Goals, 
              particularly excelling in education, equality, and peace-building through authentic storytelling.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}