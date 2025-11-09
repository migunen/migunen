"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(true)
  const [notifications, setNotifications] = useState(true)
  const [biometric, setBiometric] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState('English')

  const languages = ['English', 'Indonesian', 'Spanish', 'French', 'German']
  const permissions = [
    { name: 'Camera', enabled: true, description: 'For QR code scanning and profile photos' },
    { name: 'Location', enabled: false, description: 'For nearby ATM and branch finder' },
    { name: 'Microphone', enabled: true, description: 'For voice commands and customer support' },
    { name: 'Notifications', enabled: true, description: 'For transaction alerts and updates' }
  ]

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-white">Settings</h1>
          <p className="text-gray-400">Manage your account and preferences</p>
        </div>

        {/* Profile Section */}
        <Card className="bg-gray-900 border-red-600/30">
          <CardHeader>
            <CardTitle className="text-white">Profile Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-6 mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center">
                <span className="text-white text-2xl font-bold">RG</span>
              </div>
              <div className="space-y-2">
                <h3 className="text-white font-semibold text-lg">Really Great User</h3>
                <p className="text-gray-400">Premium Member</p>
                <Badge className="bg-red-600 text-white">Verified Account</Badge>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label className="text-gray-400 text-sm">Username</Label>
                  <p className="text-white">@reallygreatsite</p>
                </div>
                <div>
                  <Label className="text-gray-400 text-sm">E-mail Address</Label>
                  <p className="text-white">hello@reallygreatsite.com</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <Label className="text-gray-400 text-sm">Phone Number</Label>
                  <p className="text-white">+123-456-7890</p>
                </div>
                <div>
                  <Label className="text-gray-400 text-sm">Account Type</Label>
                  <p className="text-white">Premium Banking & Music</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <Button className="bg-red-600 hover:bg-red-700 text-white">
                Edit Profile
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* App Preferences */}
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-gray-900 border-red-600/30">
            <CardHeader>
              <CardTitle className="text-white">App Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white font-medium">Dark Mode</Label>
                  <p className="text-gray-400 text-sm">Switch between light and dark themes</p>
                </div>
                <Switch 
                  checked={darkMode} 
                  onCheckedChange={setDarkMode}
                  className="data-[state=checked]:bg-red-600"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white font-medium">Push Notifications</Label>
                  <p className="text-gray-400 text-sm">Receive alerts and updates</p>
                </div>
                <Switch 
                  checked={notifications} 
                  onCheckedChange={setNotifications}
                  className="data-[state=checked]:bg-red-600"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white font-medium">Biometric Login</Label>
                  <p className="text-gray-400 text-sm">Use fingerprint or face ID</p>
                </div>
                <Switch 
                  checked={biometric} 
                  onCheckedChange={setBiometric}
                  className="data-[state=checked]:bg-red-600"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-red-600/30">
            <CardHeader>
              <CardTitle className="text-white">Language & Region</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-white font-medium mb-3 block">Language Selection</Label>
                <div className="grid grid-cols-2 gap-2">
                  {languages.map((language) => (
                    <Button
                      key={language}
                      variant={selectedLanguage === language ? "default" : "outline"}
                      onClick={() => setSelectedLanguage(language)}
                      className={selectedLanguage === language
                        ? "bg-red-600 hover:bg-red-700 text-white"
                        : "border-red-600/50 text-red-400 hover:bg-red-600 hover:text-white"
                      }
                      size="sm"
                    >
                      {language}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-700">
                <Label className="text-white font-medium">Selected Language</Label>
                <p className="text-red-400 font-semibold">{selectedLanguage}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Device Permissions */}
        <Card className="bg-gray-900 border-red-600/30">
          <CardHeader>
            <CardTitle className="text-white">Device Permissions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {permissions.map((permission, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-white font-medium">{permission.name}</h4>
                      <Badge 
                        className={permission.enabled 
                          ? 'bg-red-600 text-white' 
                          : 'bg-gray-600 text-gray-300'
                        }
                      >
                        {permission.enabled ? 'Enabled' : 'Disabled'}
                      </Badge>
                    </div>
                    <p className="text-gray-400 text-sm">{permission.description}</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
                  >
                    {permission.enabled ? 'Disable' : 'Enable'}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="bg-gray-900 border-red-600/30">
          <CardHeader>
            <CardTitle className="text-white">Security & Privacy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button variant="outline" className="w-full justify-start border-red-600/50 text-red-400 hover:bg-red-600 hover:text-white">
                <span className="mr-3">🔐</span>
                Change Password
              </Button>
              
              <Button variant="outline" className="w-full justify-start border-red-600/50 text-red-400 hover:bg-red-600 hover:text-white">
                <span className="mr-3">🔒</span>
                Two-Factor Authentication
              </Button>
              
              <Button variant="outline" className="w-full justify-start border-red-600/50 text-red-400 hover:bg-red-600 hover:text-white">
                <span className="mr-3">📱</span>
                Manage Connected Devices
              </Button>
              
              <Button variant="outline" className="w-full justify-start border-red-600/50 text-red-400 hover:bg-red-600 hover:text-white">
                <span className="mr-3">🛡️</span>
                Privacy Settings
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Account Actions */}
        <Card className="bg-gray-900 border-red-600/30">
          <CardHeader>
            <CardTitle className="text-white">Account Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button variant="outline" className="w-full border-red-600/50 text-red-400 hover:bg-red-600 hover:text-white">
                Download Account Data
              </Button>
              
              <Button variant="outline" className="w-full border-yellow-600/50 text-yellow-400 hover:bg-yellow-600 hover:text-black">
                Deactivate Account
              </Button>
              
              <Button className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold">
                Sign Out
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Support */}
        <Card className="bg-gray-900 border-red-600/30">
          <CardHeader>
            <CardTitle className="text-white">Support & Help</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <Button variant="outline" className="border-red-600/50 text-red-400 hover:bg-red-600 hover:text-white">
                Help Center
              </Button>
              <Button variant="outline" className="border-red-600/50 text-red-400 hover:bg-red-600 hover:text-white">
                Contact Support
              </Button>
              <Button variant="outline" className="border-red-600/50 text-red-400 hover:bg-red-600 hover:text-white">
                Report a Bug
              </Button>
              <Button variant="outline" className="border-red-600/50 text-red-400 hover:bg-red-600 hover:text-white">
                Send Feedback
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}