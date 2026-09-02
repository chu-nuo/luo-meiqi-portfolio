import { ArrowRight, CaretLeft, CaretRight, EnvelopeSimple, FileText, List, MapPin, X } from '@phosphor-icons/react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { experiences, profile, projects } from '../data'
import '../replica.css'

const sections = [
  ['selected-work', 'Selected Work'],
  ['about', 'About'],
  ['experience', 'Experience'],
  ['photography', 'Photography'],
  ['contact', 'Contact'],
]

function InkTrail() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined
    const context = canvas.getContext('2d')
    if (!context) return undefined
    const points = []
    const pointer = { x: 0, y: 0, active: false }
    let width = 0
    let height = 0
    let frame = 0
    let lastPoint = null

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * ratio
      canvas.height = height * ratio
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
    }
    const addPoint = (event) => {
      const point = { x: event.clientX, y: event.clientY }
      pointer.x = point.x
      pointer.y = point.y
      pointer.active = true
      if (lastPoint && Math.hypot(point.x - lastPoint.x, point.y - lastPoint.y) < 5) return
      lastPoint = point
      points.push({ ...point, radius: 16 + Math.random() * 18, life: 1 })
      if (points.length > 36) points.shift()
    }
    const stopTrail = () => {
      pointer.active = false
      lastPoint = null
      points.forEach((point) => { point.life *= 0.22 })
    }
    const render = () => {
      context.fillStyle = 'rgba(245,245,243,.14)'
      context.fillRect(0, 0, width, height)
      for (let index = points.length - 1; index >= 0; index -= 1) {
        const point = points[index]
        point.life -= 0.055
        point.radius *= 1.012
        if (point.life <= 0) {
          points.splice(index, 1)
          continue
        }
        const gradient = context.createRadialGradient(point.x, point.y, 0, point.x, point.y, point.radius)
        gradient.addColorStop(0, `rgba(0,47,167,${point.life * 0.18})`)
        gradient.addColorStop(0.55, `rgba(61,106,232,${point.life * 0.09})`)
        gradient.addColorStop(1, 'rgba(61,106,232,0)')
        context.fillStyle = gradient
        context.beginPath()
        context.arc(point.x, point.y, point.radius, 0, Math.PI * 2)
        context.fill()
      }
      if (pointer.active) {
        const brush = context.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, 30)
        brush.addColorStop(0, 'rgba(0,47,167,.22)')
        brush.addColorStop(.45, 'rgba(61,106,232,.11)')
        brush.addColorStop(1, 'rgba(61,106,232,0)')
        context.fillStyle = brush
        context.beginPath()
        context.arc(pointer.x, pointer.y, 30, 0, Math.PI * 2)
        context.fill()
      }
      frame = window.requestAnimationFrame(render)
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', addPoint, { passive: true })
    window.addEventListener('blur', stopTrail)
    document.addEventListener('mouseleave', stopTrail)
    frame = window.requestAnimationFrame(render)
    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', addPoint)
      window.removeEventListener('blur', stopTrail)
      document.removeEventListener('mouseleave', stopTrail)
    }
  }, [])

  return <canvas ref={canvasRef} className="ink-canvas" aria-hidden="true" />
}
function OrbitNav() {
  const [hovered, setHovered] = useState('')
  const [exploding, setExploding] = useState(false)
  const orbitItems = useMemo(() => sections.flatMap(([id, label], index) => [
    { id, label, offset: `${index * 17}%` },
    { id: `${id}-dot`, label: '·', offset: `${index * 17 + 8}%`, decorative: true },
  ]), [])
  const navigate = (id) => {
    setExploding(true)
    window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      setExploding(false)
    }, 280)
  }

  return (
    <div className="orbit-nav" aria-label="页面栏目导航">
      <div className={exploding ? 'orbit-orb is-exploding' : 'orbit-orb'} />
      <div className="orbit-label">{hovered}</div>
      <div className={exploding ? 'orbit-ring is-exploding' : 'orbit-ring'}>
        <svg viewBox="0 0 600 600" role="img" aria-label="圆形栏目导航">
          <defs>
            <path id="orbit-path" d="M 300 300 m -235 0 a 235 235 0 1 1 470 0 a 235 235 0 1 1 -470 0" />
          </defs>
          {orbitItems.map((item) => item.decorative ? (
            <text key={item.id} className="orbit-dot"><textPath href="#orbit-path" startOffset={item.offset}>{item.label}</textPath></text>
          ) : (
            <text
              key={item.id}
              className={hovered === item.label ? 'orbit-text is-hovered' : 'orbit-text'}
              onMouseEnter={() => setHovered(item.label)}
              onMouseLeave={() => setHovered('')}
              onClick={() => navigate(item.id)}
            >
              <textPath href="#orbit-path" startOffset={item.offset}>{item.label}</textPath>
            </text>
          ))}
        </svg>
      </div>
    </div>
  )
}
function Hero() {
  const [typed, setTyped] = useState('')
  const fullText = '我用用户洞察定义问题，也用 Agent 与 AI Coding 把方案做成可验证的产品。'

  useEffect(() => {
    let index = 0
    const timer = window.setInterval(() => {
      index += 1
      setTyped(fullText.slice(0, index))
      if (index >= fullText.length) window.clearInterval(timer)
    }, 42)
    return () => window.clearInterval(timer)
  }, [])

  return (
    <section id="hero" className="replica-hero">
      <InkTrail />
      <div className="hero-left-orb" aria-hidden="true" />
      <div className="hero-copy">
        <p className="mono eyebrow">AI PRODUCT MANAGER · SELECTED WORK</p>
        <h1>把复杂问题，<em>做成可体验的产品。</em></h1>
        <p className="hero-lead">{typed}<span className="type-cursor" aria-hidden="true" /></p>
        <div className="hero-actions">
          <a className="replica-button primary" href="#selected-work">查看精选作品 <ArrowRight size={16} /></a>
          <a className="replica-button secondary" href={`mailto:${profile.email}?subject=简历请求`}><FileText size={16} /> 请求简历</a>
        </div>
        <p className="hero-meta">天津财经大学珠江学院 · 视觉传达设计 · 2027 届 · 意向城市：杭州</p>
      </div>
      <div className="hero-stage">
        <OrbitNav />
        <figure className="hero-cover">
          <img src={`${import.meta.env.BASE_URL}projects/changan/cover.webp`} alt="长安的荔枝主题团建策划案封面" />
          <figcaption><span className="mono">SELECTED WORK / 03</span><strong>长安的荔枝</strong></figcaption>
        </figure>
      </div>
    </section>
  )
}

function StickyNav() {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const closeMenu = () => setMenuOpen(false)
    window.addEventListener('hashchange', closeMenu)
    return () => window.removeEventListener('hashchange', closeMenu)
  }, [])

  return (
    <header className={menuOpen ? 'replica-nav menu-open' : 'replica-nav'}>
      <a href="#hero" className="replica-brand"><strong>Grace / LMQ</strong><span>AI PRODUCT MANAGER</span></a>
      <nav id="mobile-navigation" aria-label="主导航">
        <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
        <a href="#selected-work" onClick={() => setMenuOpen(false)}>Work</a>
        <a href="#experience" onClick={() => setMenuOpen(false)}>Experience</a>
        <a href="#photography" onClick={() => setMenuOpen(false)}>Photography</a>
        <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
      </nav>
      <div className="replica-nav-actions">
        <a href={`mailto:${profile.email}?subject=简历请求`} aria-label="请求简历"><FileText size={16} /> <span>Résumé</span></a>
        <a href={`mailto:${profile.email}`} aria-label="发送邮件"><EnvelopeSimple size={17} /></a>
        <button type="button" className="replica-menu-button" aria-label={menuOpen ? '关闭导航菜单' : '打开导航菜单'} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? <X size={20} /> : <List size={20} />}</button>
      </div>
    </header>
  )
}

function SectionHeading({ index, title, text }) {
  return (
    <header className="replica-heading">
      <p className="mono eyebrow">{index} / {title}</p>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </header>
  )
}

function About() {
  return (
    <section id="about" className="replica-section about-section">
      <div className="about-portrait">
        <img src={`${import.meta.env.BASE_URL}profile-photo.jpg`} alt="罗美琪个人照片" loading="lazy" />
        <span className="mono">OBSERVE / FRAME / SHIP</span>
      </div>
      <div className="about-content">
        <SectionHeading index="01" title="About" text="从视觉传达设计出发，把用户洞察、内容表达与 AI 产品机制连接起来。" />
        <p className="about-manifesto">I like messy problems.<br />I trace them to a <em>mechanism</em>,<br />then turn it into a product people can use.</p>
        <div className="about-tags"><span>CONSUMER AI</span><span>PRODUCT STRATEGY</span><span>AI WORKFLOW</span></div>
        <div className="about-copy">
          <p>我的经历从互联网产品延伸到 AI 产品，从 C 端英语学习与内容体验走向 B 端门店工作台。</p>
          <p>我曾在百词斩负责英语读书“每日任务”，也在易佳佳参与多智能体、RAG 知识治理、消息中心与 AI-Human 服务闭环。</p>
          <p>视觉传达设计训练让我重视信息层级与体验表达，而产品实践让我持续把洞察转成流程、原型和可交付方案。</p>
          <p className="about-education">天津财经大学珠江学院 · 视觉传达设计 · 2027 届</p>
        </div>
      </div>
    </section>
  )
}

function SelectedWork() {
  const [active, setActive] = useState(0)
  const tabs = [
    { label: '易佳佳', title: '把门店销售、产品咨询与售后排障组织成 AI-Human 服务闭环。', points: ['Agent 2.0 + Workflow', '30+ 份知识材料治理', 'Pad 消息中心与后台配置', 'PRD / Figma 原型 / 联调验收'], project: projects[0] },
    { label: '百词斩 · 英语读书', title: '把原文解析、AI 任务生成、难度分级与挑战打卡串成每日学习闭环。', points: ['20+ 竞品任务系统', '每日任务与进度状态', 'AI 个性化任务生成', '次日留存 +15% / 周活跃 +20%'], project: projects[1] },
    { label: '陀螺旅行', title: '把文化 IP 转化为可执行、可计分、可复盘的线下团建体验。', points: ['200+ 样本调研', '4 个用户角色', '3 条主支线任务', '3 轮设计与执行迭代'], project: projects[2] },
    { label: '大广赛', title: '用“五色青丝”串联端午文化、品牌体验与校园传播。', points: ['3 人团队统筹', '限定礼盒与快闪店', 'H5 测试与传播矩阵', '省级三等奖'], project: projects[3] },
  ]
  const item = tabs[active]
  const preview = item.project.visuals[0]

  return (
    <section id="selected-work" className="replica-section work-section">
      <SectionHeading index="02" title="Selected Work" text="四个项目覆盖 AI 工作台、英语学习、线下团建与整合营销，对应求职目录中的真实材料。" />
      <div className="work-layout">
        <div className="work-tabs" role="tablist" aria-label="精选作品">
          {tabs.map((tab, index) => (
            <button key={tab.label} type="button" role="tab" aria-selected={active === index} className={active === index ? 'work-tab active' : 'work-tab'} onClick={() => setActive(index)}>
              <span className="mono">0{index + 1}</span>
              <strong>{tab.label}</strong>
              <ArrowRight size={18} />
            </button>
          ))}
        </div>
        <article className="work-detail" key={item.label}>
          <figure className={`work-preview visual-${item.project.slug}`}>
            <img src={preview.src} alt={preview.alt} />
            <figcaption><span className="mono">ACTIVE PREVIEW / 0{active + 1}</span><strong>{item.label}</strong></figcaption>
          </figure>
          <div className="work-detail-copy">
            <p className="mono eyebrow">PRODUCT SYSTEM / 2026</p>
            <h3>{item.title}</h3>
            <ul>{item.points.map((point) => <li key={point}>{point}</li>)}</ul>
            <div className="work-detail-footer"><span>{item.project.kind}</span><a href={`/projects/${item.project.slug}`}>查看案例 <ArrowRight size={15} /></a></div>
          </div>
        </article>
      </div>
    </section>
  )
}

function Experience() {
  const [active, setActive] = useState(0)
  return (
    <section id="experience" className="replica-section experience-section">
      <SectionHeading index="03" title="Experience" text="在 AI 门店助手、百词斩英语读书和线下团建中，持续练习把真实需求变成可交付机制。" />
      <div className="experience-stage">
        <div className="experience-cards">
          {experiences.map((item, index) => {
            const offset = index - active
            return <button key={item.company} type="button" className={index === active ? 'experience-card current' : 'experience-card'} style={{ '--offset': offset }} onClick={() => setActive(index)} aria-label={`查看 ${item.company} 经历`}>
              <span className="mono">{item.time}</span><h3>{item.role}</h3><strong>{item.company}</strong><p>{item.summary}</p>
            </button>
          })}
        </div>
        <div className="experience-controls"><button type="button" onClick={() => setActive(Math.max(0, active - 1))} disabled={active === 0} aria-label="上一段经历"><CaretLeft size={18} /></button><span className="mono">0{active + 1} / 0{experiences.length}</span><button type="button" onClick={() => setActive(Math.min(experiences.length - 1, active + 1))} disabled={active === experiences.length - 1} aria-label="下一段经历"><CaretRight size={18} /></button></div>
      </div>
    </section>
  )
}

function Photography() {
  const pages = [
    { image: `${import.meta.env.BASE_URL}projects/changan/cover.webp`, title: '从问题出发', copy: '先看见真实问题，再开始设计解决方案。' },
    { image: `${import.meta.env.BASE_URL}projects/changan/flow.webp`, title: '让流程变得可见', copy: '把角色、动作与反馈组织成一条可理解的路径。' },
    { image: `${import.meta.env.BASE_URL}projects/yangyuanqing/insight.webp`, title: '在画面之间停留', copy: '观察不是收集素材，也是训练自己辨认细节。' },
  ]
  const [index, setIndex] = useState(0)
  const changePage = (nextIndex) => {
    setIndex(Math.max(0, Math.min(pages.length, nextIndex)))
  }
  return (
    <section id="photography" className="replica-section photography-section">
      <SectionHeading index="04" title="Photography" text="用影像记录观察，也记录一个产品人在工作之外如何看世界。" />
      <div className="flipbook-wrap">
        <button type="button" onClick={() => changePage(Math.max(0, index - 1))} disabled={index === 0} aria-label="上一页"><CaretLeft size={24} /></button>
        <div className="flipbook" aria-label="摄影翻页书" aria-live="polite">
          <div className="flipbook-cover" aria-hidden="true"><span className="mono">VISUAL DIARY</span><strong>Observe<br />before<br />building.</strong></div>
          {pages.map((page, pageIndex) => (
            <article key={page.image} className={pageIndex < index ? 'book-sheet is-turned' : 'book-sheet'} style={{ '--page': pageIndex }}>
              <div className="book-face book-front"><img src={page.image} alt={`摄影作品第 ${pageIndex + 1} 页`} /><div><span className="mono">PAGE / 0{pageIndex + 1}</span><strong>{page.title}</strong></div></div>
              <div className="book-face book-back"><span className="mono">FIELD NOTE / 0{pageIndex + 1}</span><p>{page.copy}</p></div>
            </article>
          ))}
          <div className="flipbook-end" aria-hidden={index !== pages.length}><span className="mono">FIN</span><strong>There is always more to see.</strong></div>
        </div>
        <button type="button" onClick={() => changePage(index + 1)} disabled={index === pages.length} aria-label="下一页"><CaretRight size={24} /></button>
      </div>
      <div className="flipbook-status"><div className="flipbook-dots" aria-label="摄影页码">{Array.from({ length: pages.length + 1 }, (_, pageIndex) => <button key={pageIndex} type="button" className={pageIndex === index ? 'active' : ''} onClick={() => changePage(pageIndex)} aria-label={pageIndex === pages.length ? '结束页' : `第 ${pageIndex + 1} 页`} />)}</div><span className="mono">{String(index + 1).padStart(2, '0')} / {String(pages.length + 1).padStart(2, '0')}</span></div>
    </section>
  )
}
function Ballpit() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const wrapper = canvas?.parentElement
    if (!canvas || !wrapper) return undefined
    const context = canvas.getContext('2d')
    if (!context) return undefined
    const colors = ['#002fa7', '#1a47c9', '#3d6ae8', '#c9a962', '#bfc5d0']
    const balls = []
    let width = 0
    let height = 0
    let frame = 0
    const pointer = { x: -999, y: -999 }

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      width = wrapper.clientWidth
      height = wrapper.clientHeight
      canvas.width = width * ratio
      canvas.height = height * ratio
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
      if (!balls.length) {
        for (let index = 0; index < 70; index += 1) {
          balls.push({ x: Math.random() * width, y: Math.random() * height, radius: 2 + Math.random() * 5, vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35, color: colors[index % colors.length] })
        }
      }
    }
    const movePointer = (event) => {
      const bounds = canvas.getBoundingClientRect()
      pointer.x = event.clientX - bounds.left
      pointer.y = event.clientY - bounds.top
    }
    const leavePointer = () => { pointer.x = -999; pointer.y = -999 }
    const render = () => {
      context.clearRect(0, 0, width, height)
      balls.forEach((ball) => {
        const dx = ball.x - pointer.x
        const dy = ball.y - pointer.y
        const distance = Math.hypot(dx, dy)
        if (distance < 110 && distance > 0) {
          const force = (110 - distance) / 110 * .018
          ball.vx += dx / distance * force
          ball.vy += dy / distance * force
        }
        ball.vx *= .995
        ball.vy = ball.vy * .995 + .004
        ball.x += ball.vx
        ball.y += ball.vy
        if (ball.x < ball.radius || ball.x > width - ball.radius) ball.vx *= -1
        if (ball.y < ball.radius || ball.y > height - ball.radius) ball.vy *= -1
        ball.x = Math.max(ball.radius, Math.min(width - ball.radius, ball.x))
        ball.y = Math.max(ball.radius, Math.min(height - ball.radius, ball.y))
        context.beginPath()
        context.fillStyle = ball.color
        context.globalAlpha = .28 + ball.radius / 16
        context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2)
        context.fill()
      })
      context.globalAlpha = 1
      frame = window.requestAnimationFrame(render)
    }

    resize()
    window.addEventListener('resize', resize)
    wrapper.addEventListener('pointermove', movePointer, { passive: true })
    wrapper.addEventListener('pointerleave', leavePointer)
    frame = window.requestAnimationFrame(render)
    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
      wrapper.removeEventListener('pointermove', movePointer)
      wrapper.removeEventListener('pointerleave', leavePointer)
    }
  }, [])

  return <canvas ref={canvasRef} className="ballpit-canvas" aria-hidden="true" />
}

function Contact() {
  return (
    <section id="contact" className="replica-section contact-section">
      <Ballpit />
      <div className="contact-content"><SectionHeading index="05" title="Get in touch" text="如果你正在寻找能把 AI 方案落进真实业务的人，欢迎联系我。" /><div className="contact-links"><a href={`mailto:${profile.email}`}><EnvelopeSimple size={18} /> {profile.email} <ArrowRight size={16} /></a><span><MapPin size={18} /> {profile.city} / Open to Hangzhou</span></div></div>
    </section>
  )
}

export default function HomePage() {
  useEffect(() => {
    document.body.classList.add('replica-mode')
    return () => document.body.classList.remove('replica-mode')
  }, [])

  return <div className="replica-page"><StickyNav /><main id="main-content"><Hero /><About /><SelectedWork /><Experience /><Photography /><Contact /></main><footer className="replica-footer"><strong>Grace / LMQ</strong><span>Finding myself in what I build.</span><small>© {new Date().getFullYear()}</small></footer></div>
}
