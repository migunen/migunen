"use client"

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function WalletPage() {
  const transactions = [
    { id: 1, title: "Success Transfer to Fauget Cafe", date: "May 4th, 2024", amount: "-$24.50", status: "Success" },
    { id: 2, title: "Transfer to Claudia Alves", date: "May 3rd, 2024", amount: "-$150.00", status: "Success" },
    { id: 3, title: "Deposit from Bank", date: "May 2nd, 2024", amount: "+$1,200.00", status: "Success" },
    { id: 4, title: "Investment Return", date: "May 1st, 2024", amount: "+$89.50", status: "Failed" },
    { id: 5, title: "Music Streaming Subscription", date: "April 30th, 2024", amount: "-$9.99", status: "Success" }
  ]

  const investmentOptions = [
    { title: "Music Industry Fund", return: "30% - 45%", risk: "Medium", minInvest: "$500" },
    { title: "Tech Startup Portfolio", return: "45% - 75%", risk: "High", minInvest: "$1000" },
    { title: "Stable Income Bonds", return: "15% - 20%", risk: "Low", minInvest: "$100" }
  ]

  const cartItems = [
    { name: "Black Helmet V9", price: 440.00, discount: 44.00, quantity: 1 },
    { name: "Premium Music Subscription", price: 19.99, discount: 0, quantity: 12 }
  ]

  const totalCart = cartItems.reduce((sum, item) => sum + (item.price - item.discount) * item.quantity, 0)

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-white">Wallet & Banking</h1>
          <p className="text-gray-400">Manage your finances and investments</p>
        </div>

        {/* Main Balance Card */}
        <Card className="bg-gray-900 border-red-600/30 max-w-md mx-auto">
          <CardContent className="text-center p-8">
            <div className="space-y-4">
              <div className="w-20 h-20 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center mx-auto">
                <span className="text-white text-2xl">💳</span>
              </div>
              <div>
                <div className="text-4xl font-bold text-white">$5,500</div>
                <p className="text-gray-400">Available Balance</p>
              </div>
              <div className="grid grid-cols-4 gap-2">
                <Button className="bg-red-600 hover:bg-red-700 text-white text-xs py-2">
                  Deposit
                </Button>
                <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white text-xs py-2">
                  Withdraw
                </Button>
                <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white text-xs py-2">
                  Invest
                </Button>
                <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white text-xs py-2">
                  Top up
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Investment Portfolio */}
            <Card className="bg-gray-900 border-red-600/30">
              <CardHeader>
                <CardTitle className="text-white">Investment Portfolio</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-red-600/10 border border-red-600/30 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white font-semibold">Total Investments</span>
                    <span className="text-red-400 font-bold text-xl">$9,000</span>
                  </div>
                  <p className="text-gray-400 text-sm mb-1">Daniel Gallego - Portfolio Manager</p>
                  <p className="text-red-400 text-sm font-semibold">Annual Rate: 30% - 75%</p>
                </div>
                
                {investmentOptions.map((option, index) => (
                  <div key={index} className="bg-gray-800 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="text-white font-medium text-sm">{option.title}</h4>
                        <p className="text-gray-400 text-xs">Min. Investment: {option.minInvest}</p>
                      </div>
                      <Badge className={
                        option.risk === 'High' ? 'bg-red-600 text-white' :
                        option.risk === 'Medium' ? 'bg-yellow-600 text-white' :
                        'bg-green-600 text-white'
                      }>
                        {option.risk} Risk
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-red-400 font-semibold">{option.return}</span>
                      <Button size="sm" className="bg-red-600 hover:bg-red-700 text-xs">
                        Invest
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Shopping Cart */}
            <Card className="bg-gray-900 border-red-600/30">
              <CardHeader>
                <CardTitle className="text-white">Shopping Cart</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cartItems.map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gray-800 rounded-lg">
                    <div>
                      <p className="text-white font-medium text-sm">{item.name}</p>
                      <p className="text-gray-400 text-xs">Quantity: {item.quantity}</p>
                      {item.discount > 0 && (
                        <p className="text-red-400 text-xs">Discount (10%): -${item.discount.toFixed(2)}</p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-white font-semibold">${(item.price - item.discount).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
                
                <div className="border-t border-gray-700 pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-white font-semibold">Total:</span>
                    <span className="text-red-400 font-bold text-xl">${totalCart.toFixed(2)}</span>
                  </div>
                  <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                    Check Out
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Transaction History */}
            <Card className="bg-gray-900 border-red-600/30">
              <CardHeader>
                <CardTitle className="text-white">Transaction History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {transactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                      <div>
                        <p className="text-white font-medium text-sm">{transaction.title}</p>
                        <p className="text-gray-400 text-xs">{transaction.date}</p>
                      </div>
                      <div className="text-right">
                        <p className={`font-semibold text-sm ${
                          transaction.amount.startsWith('+') ? 'text-green-400' : 'text-gray-300'
                        }`}>
                          {transaction.amount}
                        </p>
                        <Badge 
                          className={transaction.status === 'Success' 
                            ? 'bg-red-600 text-white' 
                            : 'bg-gray-600 text-gray-300'
                          }
                        >
                          {transaction.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-gray-900 border-red-600/30">
              <CardHeader>
                <CardTitle className="text-white">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <Button className="bg-red-600 hover:bg-red-700 text-white p-4 h-auto flex flex-col gap-2">
                    <span className="text-xl">📤</span>
                    <span className="text-sm">Send Money</span>
                  </Button>
                  <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white p-4 h-auto flex flex-col gap-2">
                    <span className="text-xl">📥</span>
                    <span className="text-sm">Request Money</span>
                  </Button>
                  <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white p-4 h-auto flex flex-col gap-2">
                    <span className="text-xl">📊</span>
                    <span className="text-sm">View Reports</span>
                  </Button>
                  <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white p-4 h-auto flex flex-col gap-2">
                    <span className="text-xl">⚙️</span>
                    <span className="text-sm">Settings</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Financial Analytics Placeholder */}
            <Card className="bg-gray-900 border-red-600/30">
              <CardHeader>
                <CardTitle className="text-white">💳 Your Custom Financial Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-6 bg-red-600/10 border border-red-600/30 rounded-lg text-center">
                  <h3 className="text-white font-semibold mb-3">Custom Financial Data Visualization</h3>
                  <p className="text-gray-300 mb-4 text-sm">
                    Advanced financial analytics including spending patterns, 
                    investment performance tracking, and budget optimization.
                  </p>
                  <div className="bg-red-600/20 rounded p-4 font-mono text-xs text-red-200">
                    # Financial analytics integration
                    <br />
                    import plotly.graph_objects as go
                    <br />
                    # Spending pattern analysis
                    <br />
                    # Investment performance tracking
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}