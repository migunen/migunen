"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function CommunityReach() {
  return (
    <Card className="bg-black/40 border-white/10">
      <CardHeader>
        <CardTitle className="text-white">Community Reach</CardTitle>
        <p className="text-sm text-gray-400">Geographic and demographic reach analysis</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="bg-white/5 rounded p-4">
            <h4 className="text-white font-semibold mb-2">Global Reach</h4>
            <div className="text-lg text-white">15 countries reached</div>
          </div>
          <div className="p-6 bg-teal-500/10 border border-teal-400/30 rounded-lg">
            <h4 className="text-white font-semibold mb-2">🌍 Your Community Analysis</h4>
            <p className="text-teal-300 text-sm mb-4">Community reach visualization and demographic analysis</p>
            <div className="bg-teal-500/20 rounded p-4 font-mono text-xs text-teal-200">
              # Community reach analysis
              <br />
              # Geographic distribution mapping
              <br />
              # Demographic impact assessment
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}