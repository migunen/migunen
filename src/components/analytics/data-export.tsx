"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export function DataExport() {
  const exportFormats = [
    {
      format: "JSON",
      description: "Raw Spotify API data for custom analysis",
      usage: "Python, JavaScript, R analysis",
      icon: "📄"
    },
    {
      format: "CSV",
      description: "Tabular data for spreadsheet analysis",
      usage: "Excel, Google Sheets, Pandas",
      icon: "📊"
    },
    {
      format: "Parquet",
      description: "Optimized format for big data analysis",
      usage: "Apache Spark, Pandas, Dask",
      icon: "🗃️"
    },
    {
      format: "API Access",
      description: "Real-time data integration endpoints",
      usage: "Custom applications, Streamlit",
      icon: "🔌"
    }
  ]

  const dataCategories = [
    { category: "Streaming Data", endpoints: 3, size: "~45KB", updated: "Real-time" },
    { category: "Geographic Analytics", endpoints: 2, size: "~12KB", updated: "Daily" },
    { category: "Audience Insights", endpoints: 4, size: "~28KB", updated: "Weekly" },
    { category: "Social Impact Metrics", endpoints: 2, size: "~15KB", updated: "Daily" },
    { category: "Lyrical Analysis", endpoints: 3, size: "~67KB", updated: "Per release" }
  ]

  const handleExport = (format: string) => {
    // Placeholder for export functionality
    console.log(`Exporting data in ${format} format...`)
  }

  return (
    <Card className="bg-black/40 border-white/10">
      <CardHeader>
        <CardTitle className="text-white">Data Export & API Access</CardTitle>
        <p className="text-sm text-gray-400">
          Export Ella V's data for custom analysis and integration with your tools
        </p>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Export Formats */}
        <div className="space-y-4">
          <h4 className="text-white font-semibold">Available Export Formats</h4>
          <div className="grid md:grid-cols-2 gap-4">
            {exportFormats.map((format) => (
              <div key={format.format} className="bg-white/5 rounded-lg p-5 space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{format.icon}</span>
                  <div>
                    <h5 className="text-white font-semibold">{format.format}</h5>
                    <p className="text-gray-400 text-sm">{format.description}</p>
                  </div>
                </div>
                <p className="text-gray-300 text-sm">
                  <span className="text-cyan-400">Best for:</span> {format.usage}
                </p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full border-white/20 text-white hover:bg-white/10"
                  onClick={() => handleExport(format.format)}
                >
                  Export as {format.format}
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Data Categories */}
        <div className="space-y-4">
          <h4 className="text-white font-semibold">Available Data Categories</h4>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left text-gray-400 text-sm py-3 px-4">Category</th>
                  <th className="text-left text-gray-400 text-sm py-3 px-4">Endpoints</th>
                  <th className="text-left text-gray-400 text-sm py-3 px-4">Size</th>
                  <th className="text-left text-gray-400 text-sm py-3 px-4">Updated</th>
                  <th className="text-left text-gray-400 text-sm py-3 px-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {dataCategories.map((category) => (
                  <tr key={category.category} className="border-b border-white/5">
                    <td className="py-3 px-4">
                      <span className="text-white font-medium">{category.category}</span>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="outline" className="text-xs">
                        {category.endpoints} APIs
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-gray-300 text-sm">{category.size}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-gray-300 text-sm">{category.updated}</span>
                    </td>
                    <td className="py-3 px-4">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-400/10"
                      >
                        Export
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* API Documentation */}
        <div className="space-y-4">
          <h4 className="text-white font-semibold">API Integration Examples</h4>
          <div className="bg-gray-900/50 rounded-lg p-6 space-y-4">
            <div className="space-y-3">
              <h5 className="text-cyan-400 font-semibold">Python Integration</h5>
              <div className="bg-black/40 rounded p-4 font-mono text-sm text-gray-300">
                <span className="text-green-400"># Fetch Ella V's streaming data</span><br/>
                <span className="text-blue-400">import</span> requests<br/>
                <span className="text-blue-400">import</span> pandas <span className="text-blue-400">as</span> pd<br/>
                <br/>
                response = requests.get(<span className="text-yellow-400">"https://your-app.vercel.app/api/data/streaming"</span>)<br/>
                data = pd.DataFrame(response.json())<br/>
                <span className="text-green-400"># Ready for your custom analysis!</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <h5 className="text-purple-400 font-semibold">Streamlit Integration</h5>
              <div className="bg-black/40 rounded p-4 font-mono text-sm text-gray-300">
                <span className="text-green-400"># Streamlit dashboard integration</span><br/>
                <span className="text-blue-400">import</span> streamlit <span className="text-blue-400">as</span> st<br/>
                <span className="text-blue-400">import</span> plotly.graph_objects <span className="text-blue-400">as</span> go<br/>
                <br/>
                data = fetch_ella_data(<span className="text-yellow-400">"geographic"</span>)<br/>
                fig = create_world_map(data)<br/>
                st.plotly_chart(fig)
              </div>
            </div>
          </div>
        </div>

        {/* Integration Ready Notice */}
        <div className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-lg p-6 text-center">
          <h4 className="text-white font-semibold mb-2">🔗 Ready for Your Custom Analysis</h4>
          <p className="text-gray-300 mb-4">
            All data export formats are optimized for seamless integration with your 
            Python notebooks, Plotly visualizations, and Streamlit applications.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <Badge variant="outline" className="border-python text-yellow-400">
              Python Ready
            </Badge>
            <Badge variant="outline" className="border-plotly text-blue-400">
              Plotly Compatible
            </Badge>
            <Badge variant="outline" className="border-streamlit text-red-400">
              Streamlit Ready
            </Badge>
            <Badge variant="outline" className="border-jupyter text-orange-400">
              Jupyter Optimized
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}