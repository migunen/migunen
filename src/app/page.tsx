import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function HomePage() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <div className="space-y-4">
          <h1 className="text-5xl font-bold text-white leading-tight">
            Music Stats Pro
            <span className="block text-3xl text-red-500 mt-2">
              Analytics Dashboard for Artists
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Comprehensive music analytics that go beyond basic streaming numbers. 
            Understand your impact, track your growth, and measure your cultural influence.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/dashboard">
            <Button size="lg" className="w-full sm:w-auto bg-red-600 hover:bg-red-700">
              View Dashboard
            </Button>
          </Link>
          <Link href="/analytics">
            <Button size="lg" variant="outline" className="w-full sm:w-auto border-red-600 text-red-600 hover:bg-red-600 hover:text-white">
              Advanced Analytics
            </Button>
          </Link>
        </div>
      </section>

      {/* Artist Spotlight */}
      <section className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-2">Featured Artist</h2>
          <p className="text-gray-300">Currently tracking analytics for</p>
        </div>

        <Card className="bg-gray-900 border-red-600/30 max-w-4xl mx-auto">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <CardTitle className="text-2xl text-white">Ella V</CardTitle>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-red-600 text-white">Finnish Rap Artist</Badge>
                  <Badge variant="outline" className="border-red-600 text-red-400">
                    Peace & Love Advocate
                  </Badge>
                  <Badge variant="outline" className="border-red-600/50 text-red-400">
                    Educator & Mentor
                  </Badge>
                </div>
              </div>
              <div className="w-24 h-24 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-2xl">EV</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-300 leading-relaxed">
              An aspiring rap artist from Finland who creates music for peace and love, 
              aiming to uplift communities and especially the youth. Her profession outside 
              of music is teaching, and her challenging background often resonates in her 
              lyrics as she strives to make a societal impact and distribute positive feelings.
            </p>
            
            <div className="grid md:grid-cols-3 gap-4 mt-6">
              <div className="text-center p-4 bg-black/40 rounded-lg border border-red-600/20">
                <h4 className="text-white font-semibold">Themes</h4>
                <p className="text-sm text-gray-400 mt-1">Mental Health, Equality, Nature</p>
              </div>
              <div className="text-center p-4 bg-black/40 rounded-lg border border-red-600/20">
                <h4 className="text-white font-semibold">Mission</h4>
                <p className="text-sm text-gray-400 mt-1">Positive Impact Through Music</p>
              </div>
              <div className="text-center p-4 bg-black/40 rounded-lg border border-red-600/20">
                <h4 className="text-white font-semibold">Reach</h4>
                <p className="text-sm text-gray-400 mt-1">Global Listeners</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* UN SDGs Section */}
      <section className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-2">Social Impact Tracking</h2>
          <p className="text-gray-300">Measuring contribution to UN Sustainable Development Goals</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="bg-gray-900 border-red-600/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  4
                </div>
                Quality Education
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 text-sm">
                Rap as a tool for learning, literacy, and youth empowerment, 
                encouraging creativity and self-expression through music.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-red-600/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <div className="w-8 h-8 bg-red-700 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  10
                </div>
                Reduced Inequalities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 text-sm">
                Amplifying voices of marginalized communities, addressing racism, 
                poverty, and social exclusion through authentic storytelling.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-red-600/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <div className="w-8 h-8 bg-red-800 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  16
                </div>
                Peace & Justice
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 text-sm">
                Promoting dialogue about fairness and accountability through 
                powerful storytelling that strengthens societal institutions.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Preview */}
      <section className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-2">Advanced Analytics Features</h2>
          <p className="text-gray-300">Comprehensive insights beyond basic streaming data</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              title: "Geographic Analysis",
              description: "Track global listener distribution and cultural impact across countries"
            },
            {
              title: "Temporal Insights", 
              description: "Understand streaming patterns over time and seasonal trends"
            },
            {
              title: "Content Performance",
              description: "Analyze which themes and messages resonate most with audiences"
            },
            {
              title: "Social Impact Metrics",
              description: "Measure contribution to social causes and community upliftment"
            }
          ].map((feature, index) => (
            <Card key={index} className="bg-gray-900 border-red-600/30 hover:border-red-500 transition-colors">
              <CardHeader>
                <CardTitle className="text-white text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Custom Visualization Areas Note */}
      <section className="text-center space-y-4">
        <div className="bg-red-600/20 border border-red-400/30 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-white mb-2">Custom Visualization Ready</h3>
          <p className="text-gray-300">
            This dashboard includes designated areas for your custom Python/Plotly visualizations, 
            Streamlit integrations, and advanced data analysis tools.
          </p>
          <div className="mt-4">
            <Badge variant="outline" className="border-red-400 text-red-400 mx-1">
              Python Integration
            </Badge>
            <Badge variant="outline" className="border-red-400 text-red-400 mx-1">
              Plotly Support
            </Badge>
            <Badge variant="outline" className="border-red-400 text-red-400 mx-1">
              Streamlit Ready
            </Badge>
          </div>
        </div>
      </section>
    </div>
  )
}