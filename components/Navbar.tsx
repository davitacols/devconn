"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Moon,
  Sun,
  Search,
  Menu,
  X,
  User,
  Bell,
  Bookmark,
  MessageSquare,
  Compass,
  BookOpen,
  Users,
  Calendar,
  Settings,
  HelpCircle
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
  const { theme, setTheme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [unreadNotifications, setUnreadNotifications] = useState(3)
  const router = useRouter()

  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem('token'))
  }, [])

  const handleSignOut = () => {
    localStorage.removeItem('token')
    setIsAuthenticated(false)
    router.push('/')
  }

  const mainNavItems = [
    { href: '/explore', label: 'Explore', icon: <Compass className="h-4 w-4" /> },
    { href: '/learn', label: 'Learn', icon: <BookOpen className="h-4 w-4" /> },
    { href: '/community', label: 'Community', icon: <Users className="h-4 w-4" /> },
    { href: '/events', label: 'Events', icon: <Calendar className="h-4 w-4" /> },
  ]

  const userNavItems = [
    { href: '/profile', label: 'Profile', icon: <User className="h-4 w-4" /> },
    { href: '/bookmarks', label: 'Bookmarks', icon: <Bookmark className="h-4 w-4" /> },
    { href: '/messages', label: 'Messages', icon: <MessageSquare className="h-4 w-4" /> },
    { href: '/settings', label: 'Settings', icon: <Settings className="h-4 w-4" /> },
  ]

  return (
    <nav className="border-b bg-white/80 backdrop-blur-md dark:bg-gray-800/80 sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
              DevConn
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {mainNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center space-x-1 text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Desktop Right Section */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search */}
            <form className="relative">
              <Input
                type="search"
                placeholder="Search DevConn..."
                className="pl-10 pr-4 py-2 w-64 bg-gray-100 dark:bg-gray-700 border-none"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </form>

            {/* Write Button */}
            <Link href="/write">
              <Button variant="outline">Write</Button>
            </Link>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="relative"
            >
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>

            {/* Auth Section */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                {/* Notifications */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative"
                  onClick={() => setShowNotifications(!showNotifications)}
                >
                  <Bell className="h-[1.2rem] w-[1.2rem]" />
                  {unreadNotifications > 0 && (
                    <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                      {unreadNotifications}
                    </span>
                  )}
                </Button>

                {/* User Menu */}
                <div className="relative group">
                  <Button variant="ghost" size="icon">
                    <User className="h-[1.2rem] w-[1.2rem]" />
                  </Button>
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 hidden group-hover:block">
                    {userNavItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        {item.icon}
                        <span className="ml-2">{item.label}</span>
                      </Link>
                    ))}
                    <hr className="my-1 border-gray-200 dark:border-gray-700" />
                    <button
                      onClick={handleSignOut}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link href="/login">
                <Button>Sign In</Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-white dark:bg-gray-800 py-4"
          >
            <div className="container mx-auto px-4 space-y-4">
              {/* Mobile Search */}
              <form className="relative">
                <Input
                  type="search"
                  placeholder="Search DevConn..."
                  className="pl-10 pr-4 py-2 w-full bg-gray-100 dark:bg-gray-700 border-none"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </form>

              {/* Mobile Navigation Items */}
              {mainNavItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <Button variant="ghost" className="w-full justify-start">
                    {item.icon}
                    <span className="ml-2">{item.label}</span>
                  </Button>
                </Link>
              ))}

              <hr className="border-gray-200 dark:border-gray-700" />

              {/* Mobile Auth Section */}
              {isAuthenticated ? (
                <>
                  {userNavItems.map((item) => (
                    <Link key={item.href} href={item.href}>
                      <Button variant="ghost" className="w-full justify-start">
                        {item.icon}
                        <span className="ml-2">{item.label}</span>
                      </Button>
                    </Link>
                  ))}
                  <Button onClick={handleSignOut} className="w-full">Sign Out</Button>
                </>
              ) : (
                <Link href="/login">
                  <Button className="w-full">Login</Button>
                </Link>
              )}

              {/* Mobile Theme Toggle */}
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                {theme === "dark" ? (
                  <>
                    <Sun className="h-4 w-4 mr-2" />
                    <span>Light Mode</span>
                  </>
                ) : (
                  <>
                    <Moon className="h-4 w-4 mr-2" />
                    <span>Dark Mode</span>
                  </>
                )}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}