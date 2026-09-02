import { useEffect, useState } from 'react'
import { ArrowUpRight, List, Moon, Sun, X } from '@phosphor-icons/react'
import { Link, useLocation } from 'react-router-dom'
import { profile, projects } from '../data'

export default function AppShell({ children }) {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('portfolio-theme')
    if (savedTheme) return savedTheme
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('portfolio-theme', theme)
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#11151c' : '#f3f5f8')
  }, [theme])

  useEffect(() => {
    setMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'auto' })

    const slug = location.pathname.match(/^\/projects\/([^/]+)\/?$/)?.[1]
    const project = projects.find((item) => item.slug === slug)
    const description = document.querySelector('meta[name="description"]')

    if (project) {
      document.title = `${project.title} | 罗美琪产品作品集`
      description?.setAttribute('content', project.subtitle)
    } else if (location.pathname === '/') {
      document.title = '罗美琪 | AI 产品经理作品集'
      description?.setAttribute('content', '罗美琪的 AI 产品经理作品集，聚焦 AI Agent、RAG 知识治理、业务流程设计与 0-1 产品落地。')
    } else {
      document.title = '页面未找到 | 罗美琪产品作品集'
      description?.setAttribute('content', '该页面不存在，请返回罗美琪的产品经理作品集首页。')
    }

    requestAnimationFrame(() => {
      const hashTarget = location.hash ? document.querySelector(location.hash) : null
      if (hashTarget) {
        hashTarget.scrollIntoView({ behavior: 'auto' })
      } else {
        document.querySelector('main')?.focus({ preventScroll: true })
      }
    })
  }, [location.hash, location.pathname])

  const homeHref = import.meta.env.BASE_URL
  const navItems = [
    { label: '案例', href: `${homeHref}#selected-work` },
    { label: '关于', href: `${homeHref}#about` },
    { label: '经历', href: `${homeHref}#experience` },
    { label: '联系', href: `${homeHref}#contact` },
  ]

  return (
    <>
      <a className="skip-link" href="#main-content">跳到主要内容</a>
      <header className="site-header">
        <Link className="wordmark" to="/" aria-label="罗美琪作品集首页">
          <span>LMQ</span>
          <small>PRODUCT / AI</small>
        </Link>
        <nav className={menuOpen ? 'site-nav is-open' : 'site-nav'} aria-label="主要导航">
          {navItems.map((item) => (
            <a key={item.label} href={item.href}>{item.label}</a>
          ))}
        </nav>
        <div className="header-actions">
          <button
            className="icon-button"
            type="button"
            aria-label={theme === 'light' ? '切换到深色主题' : '切换到浅色主题'}
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          >
            {theme === 'light' ? <Moon size={19} /> : <Sun size={19} />}
          </button>
          <a className="header-contact" href={`mailto:${profile.email}`}>
            联系我 <ArrowUpRight size={17} aria-hidden="true" />
          </a>
          <button
            className="menu-button"
            type="button"
            aria-label={menuOpen ? '关闭导航' : '打开导航'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={22} /> : <List size={22} />}
          </button>
        </div>
      </header>
      {children}
      <footer className="site-footer">
        <div>
          <strong>罗美琪</strong>
          <span>AI 产品经理 / 产品经理</span>
        </div>
        <p>内容与材料整理于 2026.09</p>
      </footer>
    </>
  )
}
