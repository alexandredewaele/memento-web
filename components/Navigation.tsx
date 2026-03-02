import React from 'react'
import { ScreenType } from '@/types'

interface NavigationProps {
  currentScreen: ScreenType
  onNavigate: (screen: ScreenType) => void
  username: string
  onLogout: () => void
}

const Navigation: React.FC<NavigationProps> = ({
  currentScreen,
  onNavigate,
  username,
  onLogout,
}) => {
  const tabs: { type: ScreenType; icon: string; label: string }[] = [
    { type: 'home', icon: 'home', label: 'Home' },
    { type: 'search', icon: 'search', label: 'Search' },
    { type: 'history', icon: 'calendar_today', label: 'History' },
    { type: 'profile', icon: 'person', label: 'Profile' },
  ]

  return (
    <aside className="w-20 md:w-64 shrink-0 h-screen flex flex-col bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 z-50 transition-all duration-300">
      {/* Logo */}
      <div className="py-6 flex justify-center md:justify-start md:px-6 items-center gap-3 border-b border-slate-100 dark:border-slate-800">
        <div className="w-9 h-9 rounded-xl shrink-0 bg-primary flex items-center justify-center shadow-md shadow-primary/30">
          <span className="material-icons-round text-white text-xl">
            auto_stories
          </span>
        </div>
        <span className="text-xl font-bold text-slate-900 dark:text-white tracking-tight hidden md:block">
          Memento
        </span>
      </div>

      {/* Nav items */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {tabs.map((tab) => {
          const isActive = currentScreen === tab.type
          return (
            <button
              key={tab.type}
              onClick={() => onNavigate(tab.type)}
              className={`w-full flex items-center justify-center md:justify-start gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? 'bg-primary/10 text-primary dark:bg-primary/20'
                  : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <span className="material-icons-round text-xl shrink-0">
                {tab.icon}
              </span>
              <span className="hidden md:block truncate">{tab.label}</span>
            </button>
          )
        })}

        {/* New Entry button */}
        <button
          onClick={() => onNavigate('new')}
          className={`w-full flex items-center justify-center md:justify-start gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all mt-2 ${
            currentScreen === 'new'
              ? 'bg-primary text-white shadow-lg shadow-primary/25'
              : 'bg-primary text-white shadow-md shadow-primary/20 hover:bg-blue-600'
          }`}
        >
          <span className="material-icons-round text-xl shrink-0">add</span>
          <span className="hidden md:block truncate">New Entry</span>
        </button>
      </nav>

      {/* User footer */}
      <div className="py-4 border-t border-slate-100 dark:border-slate-800">
        <button
          onClick={() => {
            if (window.confirm('Are you sure you want to sign out?')) {
              onLogout()
            }
          }}
          className="w-full flex items-center justify-center md:justify-start gap-3 md:px-2 py-2 mx-2 md:mx-4 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors group text-slate-700 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400"
          title={`Sign out (${username})`}
        >
          <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0">
            <span className="material-icons-round text-slate-400 group-hover:text-red-500 transition-colors text-xl">
              logout
            </span>
          </div>
          <span className="text-sm font-medium truncate flex-1 hidden md:block text-left">
            Sign Out
          </span>
        </button>
      </div>
    </aside>
  )
}

export default Navigation
