import React, { useState } from 'react'
import { Outlet, NavLink, useLocation } from 'react-router-dom'
import {
  Sparkles,
  LayoutDashboard,
  TrendingUp,
  Landmark,
  LifeBuoy,
  Settings,
  Bell,
  Menu,
  X,
  ExternalLink,
  ChevronRight,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface NavItem {
  name: string
  to: string
  icon: React.ComponentType<{ className?: string }>
  badge?: string
}

const navItems: NavItem[] = [
  { name: 'Visão Geral', to: '/', icon: LayoutDashboard },
  { name: 'Cogito Sales', to: '/sales', icon: TrendingUp },
  { name: 'Cogito Finance', to: '/finance', icon: Landmark },
  { name: 'Cogito Help', to: '/help', icon: LifeBuoy },
]

export default function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  // Dynamic header title/subtitle based on current path
  const getHeaderInfo = () => {
    switch (location.pathname) {
      case '/sales':
        return {
          title: 'Cogito Sales',
          subtitle:
            'Sua inteligência comercial para identificar oportunidades, priorizar ações e recuperar vendas.',
          tag: 'Módulo Comercial',
        }
      case '/finance':
        return {
          title: 'Cogito Finance',
          subtitle: 'Pergunte sobre seus números. O Cogito encontra, consolida e explica.',
          tag: 'Inteligência Financeira',
        }
      case '/help':
        return {
          title: 'Cogito Help',
          subtitle: 'Seu assistente para utilizar o CRM e ERP da I3Tech.',
          tag: 'Assistente Operacional',
        }
      case '/':
      default:
        return {
          title: 'Cogito',
          subtitle: 'Inteligência integrada ao CRM e ERP da I3Tech',
          tag: 'Camada de IA Ativa',
        }
    }
  }

  const headerInfo = getHeaderInfo()

  return (
    <div className="min-h-screen bg-[#F7F8FA] flex flex-col md:flex-row text-[#111827]">
      {/* ========================================================= */}
      {/* MOBILE TOP BAR (screens <= 640px) */}
      {/* ========================================================= */}
      <header className="sm:hidden flex items-center justify-between px-4 py-3.5 bg-[#0E1B3D] text-white sticky top-0 z-40 shadow-sm border-b border-[#1E293B]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-inner shadow-white/20">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-base tracking-tight text-white">Cogito</span>
              <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.2 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                I3Tech
              </span>
            </div>
            <p className="text-[11px] text-gray-400 leading-none">Camada de IA</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Notification bell */}
          <button
            type="button"
            aria-label="Notificações"
            className="relative p-2 text-gray-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 ring-2 ring-[#0E1B3D]" />
          </button>

          {/* Hamburger toggle */}
          <button
            type="button"
            aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-gray-200 hover:text-white rounded-lg hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* MOBILE DRAWER OVERLAY */}
      {mobileMenuOpen && (
        <div className="sm:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer content */}
          <div className="relative w-72 max-w-[85vw] bg-[#0E1B3D] text-white h-full flex flex-col justify-between p-4 shadow-2xl z-10 animate-fade-in">
            <div>
              {/* Drawer brand */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-base text-white">Cogito</span>
                    <p className="text-[11px] text-blue-200/70">CRM & ERP I3Tech</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 text-gray-400 hover:text-white rounded-md"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation items */}
              <div className="space-y-1.5">
                <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2">
                  Navegação
                </p>
                {navItems.map((item) => {
                  const Icon = item.icon
                  const isActive = location.pathname === item.to
                  return (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      onClick={() => setMobileMenuOpen(false)}
                      className={({ isActive: active }) =>
                        cn(
                          'flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                          active
                            ? 'bg-blue-600 text-white shadow-sm'
                            : 'text-gray-300 hover:bg-white/10 hover:text-white',
                        )
                      }
                    >
                      <div className="flex items-center gap-3">
                        <Icon
                          className={cn('w-4 h-4', isActive ? 'text-white' : 'text-gray-400')}
                        />
                        <span>{item.name}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-white/50" />
                    </NavLink>
                  )
                })}
              </div>

              {/* I3Tech Context pill */}
              <div className="mt-6 p-3 rounded-lg bg-white/5 border border-white/10 text-xs text-gray-300 space-y-1">
                <div className="flex items-center gap-1.5 text-blue-300 font-medium">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Ambiente demonstrativo</span>
                </div>
                <p className="text-[11px] text-gray-400 leading-relaxed">
                  Dados ilustrativos para associações e proteção veicular.
                </p>
              </div>
            </div>

            {/* Mobile user profile footer */}
            <div className="pt-4 border-t border-white/10">
              <div className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-blue-600/90 text-white font-bold flex items-center justify-center text-sm shadow">
                    V
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white leading-tight">Vinicius</p>
                    <p className="text-[11px] text-gray-400">Administrador</p>
                  </div>
                </div>
                <button
                  type="button"
                  title="Configurações"
                  className="p-1.5 text-gray-400 hover:text-white transition-colors"
                >
                  <Settings className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* DESKTOP & TABLET SIDEBAR */}
      {/* ========================================================= */}
      <aside className="hidden sm:flex flex-col justify-between shrink-0 bg-[#0E1B3D] text-white border-r border-[#1E293B] transition-all duration-200 z-30 sm:w-16 lg:w-60 min-h-screen sticky top-0 h-screen select-none">
        {/* Top: Logo & Nav items */}
        <div className="flex flex-col">
          {/* Logo container */}
          <div className="h-16 flex items-center px-3 lg:px-5 border-b border-white/10">
            <NavLink
              to="/"
              className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg p-1"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div className="hidden lg:flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-lg tracking-tight text-white leading-none">
                    Cogito
                  </span>
                  <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                    I3Tech
                  </span>
                </div>
                <span className="text-[11px] text-gray-400 mt-0.5 font-normal">
                  Camada de Inteligência
                </span>
              </div>
            </NavLink>
          </div>

          {/* Section heading (desktop only) */}
          <div className="hidden lg:block px-5 pt-6 pb-2">
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400/80">
              Módulos Inteligentes
            </p>
          </div>

          {/* Navigation link list */}
          <nav className="p-2 lg:px-3 space-y-1.5 mt-2 sm:mt-4">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    cn(
                      'group relative flex items-center gap-3.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150',
                      isActive
                        ? 'bg-blue-600 text-white font-semibold shadow-sm'
                        : 'text-gray-300 hover:bg-white/10 hover:text-white',
                    )
                  }
                  title={item.name}
                >
                  {({ isActive }) => (
                    <>
                      {/* Active indicator bar on desktop */}
                      {isActive && (
                        <span className="hidden lg:block absolute left-0 top-1.5 bottom-1.5 w-1 rounded-r bg-white" />
                      )}
                      <Icon
                        className={cn(
                          'w-5 h-5 shrink-0 transition-colors',
                          isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-200',
                        )}
                      />
                      <span className="hidden lg:inline-block truncate">{item.name}</span>
                    </>
                  )}
                </NavLink>
              )
            })}
          </nav>
        </div>

        {/* Bottom: Context banner + User Profile Card */}
        <div className="p-2 lg:p-3 border-t border-white/10 space-y-2">
          {/* Subtle ERP/CRM badge */}
          <div className="hidden lg:block p-2.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs">
            <div className="flex items-center gap-1.5 text-blue-300 font-medium mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              <span>Ambiente demonstrativo</span>
            </div>
            <p className="text-[11px] text-gray-400 leading-snug">
              Dados ilustrativos para CRM & ERP de proteção veicular.
            </p>
          </div>

          {/* User profile card */}
          <div className="flex items-center justify-between p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-bold flex items-center justify-center text-xs shrink-0 shadow">
                V
              </div>
              <div className="hidden lg:block min-w-0">
                <p className="text-xs font-semibold text-white truncate leading-tight">Vinicius</p>
                <p className="text-[10px] text-gray-400 truncate">Administrador</p>
              </div>
            </div>
            <button
              type="button"
              aria-label="Configurações do usuário"
              title="Configurações do usuário"
              className="hidden lg:inline-flex text-gray-400 hover:text-white transition-colors p-1 rounded hover:bg-white/10"
            >
              <Settings className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </aside>

      {/* ========================================================= */}
      {/* MAIN VIEWPORT (Header + Content) */}
      {/* ========================================================= */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="bg-white border-b border-[#E5E7EB] sticky top-0 z-20 px-4 sm:px-6 lg:px-8 py-3.5 transition-shadow">
          <div className="max-w-[1200px] mx-auto flex items-center justify-between gap-4">
            {/* Left: Screen title & subtitle */}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-0.5">
                <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#0E1B3D] tracking-tight truncate">
                  {headerInfo.title}
                </h1>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-blue-50 text-blue-700 border border-blue-100">
                  {headerInfo.tag}
                </span>
              </div>
              <p className="hidden sm:block text-xs sm:text-sm text-[#6B7280] truncate">
                {headerInfo.subtitle}
              </p>
            </div>

            {/* Right: Actions, Notification bell & User avatar */}
            <div className="flex items-center gap-3 shrink-0">
              {/* Notification bell with red dot */}
              <button
                type="button"
                aria-label="Notificações do sistema"
                className="relative p-2 text-gray-500 hover:text-[#0E1B3D] hover:bg-gray-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                title="3 notificações do Cogito"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#EF4444] ring-2 ring-white" />
              </button>

              <div className="h-6 w-px bg-gray-200 hidden sm:block" />

              {/* User Avatar */}
              <div className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-full bg-[#0E1B3D] text-white font-semibold flex items-center justify-center text-xs shadow-sm ring-2 ring-blue-100"
                  title="Vinicius (Administrador)"
                >
                  V
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-xs font-semibold text-gray-900 leading-tight">Vinicius</p>
                  <p className="text-[10px] text-gray-500">I3Tech Gestão</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content Canvas */}
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-[1200px] w-full mx-auto">
          <Outlet />
        </main>

        {/* Global Footer note */}
        <footer className="border-t border-[#E5E7EB] bg-white py-4 px-4 sm:px-6 text-center text-xs text-[#6B7280]">
          <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-gray-500">
              <span className="inline-block w-2 h-2 rounded-full bg-blue-500" />
              <span>Cogito Mockups — Protótipo de camada de IA para CRM e ERP da I3Tech</span>
            </div>
            <p className="text-[11px] text-gray-400">
              Protótipo — dados ilustrativos, sem conexão ativa.
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}
