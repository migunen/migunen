"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export function Navigation() {
  const pathname = usePathname()

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/platforms', label: 'Platforms' },
    { href: '/analytics', label: 'Analytics' },
    { href: '/social-impact', label: 'Social Impact' },
    { href: '/setup', label: 'Setup' },
  ]

  return (
    <nav className="border-b border-red-600/20 bg-black">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-red-700 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">MS</span>
            </div>
            <span className="text-white font-semibold text-xl">Music Stats Pro</span>
            <Badge className="ml-2 bg-red-600 text-white">
              for Ella V
            </Badge>
          </div>
          
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={pathname === item.href ? "default" : "ghost"}
                  className={pathname === item.href 
                    ? "bg-red-600 text-white hover:bg-red-700" 
                    : "text-white hover:text-white hover:bg-red-600/20"
                  }
                >
                  {item.label}
                </Button>
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-2">
            <Button 
              onClick={() => window.location.href = '/setup'}
              variant="outline" 
              className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
            >
              🎵 Setup
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}