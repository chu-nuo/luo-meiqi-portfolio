import {
  ArrowLeft,
  ArrowRight,
  ArrowSquareOut,
  CheckCircle,
  ClockCounterClockwise,
  FileText,
} from '@phosphor-icons/react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import Reveal from '../components/Reveal'
import { projects } from '../data'

const evidenceMeta = {
  verified: { label: '材料核验', Icon: CheckCircle },
  recorded: { label: '简历记录', Icon: FileText },
  pending: { label: '待补充', Icon: ClockCounterClockwise },
}

export default function ProjectPage() {
  const { slug } = useParams()
  const isYijiajia = slug === 'yijiajia'
  const isAiEnglish = slug === 'ai-english'
  const [zoomedVisual, setZoomedVisual] = useState(null)
  const project = projects.find((item) => item.slug === slug)

  if (!project) return <Navigate to="/404" replace />

  const currentIndex = projects.findIndex((item) => item.slug === slug)
  const nextProject = projects[(currentIndex + 1) % projects.length]
  const cover = project.visuals[0]
  const zoomedItem = project.visuals.find((visual) => visual.src === zoomedVisual)
  useEffect(() => {
    if (!isYijiajia && !isAiEnglish) return undefined
    const modeClass = isYijiajia ? 'case-yijiajia-mode' : 'case-ai-english-mode'
    document.body.classList.add(modeClass)
    return () => document.body.classList.remove(modeClass)
  }, [isYijiajia, isAiEnglish])

  useEffect(() => {
    if (!zoomedVisual) return undefined
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setZoomedVisual(null)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [zoomedVisual])

  return (
    <main id="main-content" className={isYijiajia ? 'case-page case-yijiajia' : isAiEnglish ? 'case-page case-ai-english' : 'case-page'} tabIndex="-1">
      <section className="case-hero section-shell">
        <div className="case-hero-copy">
          <Link className="back-link" to="/#selected-work"><ArrowLeft size={18} />返回案例列表</Link>
          <p className="project-kind">{isYijiajia ? 'AGENT & AI PRODUCTS / B 端工作流' : project.kind}</p>
          <h1>{project.title}</h1>
          <p className="case-subtitle">{isYijiajia ? '从单一问答入口，走向多智能体协作与 AI-Human 服务闭环。' : project.subtitle}</p>
          <div className="case-actions">
            {project.externalLink && (
              <a className="button button-primary" href={project.externalLink.href} target="_blank" rel="noreferrer">
                {project.externalLink.label} <ArrowSquareOut size={18} />
              </a>
            )}
          </div>
        </div>
        <figure className={`case-hero-visual visual-${project.slug}`}>
          <img src={cover.src} alt={cover.alt} fetchPriority="high" />
          <figcaption>{cover.caption}</figcaption>
        </figure>
        <dl className="case-meta">
          <div><dt>角色</dt><dd>{project.role}</dd></div>
          <div><dt>时间</dt><dd>{project.time}</dd></div>
          <div><dt>组织</dt><dd>{project.company}</dd></div>
          <div><dt>公开状态</dt><dd>部分材料可公开</dd></div>
        </dl>
      </section>

      <section className="case-lead section-shell">
        <span>一句话概览</span>
        <p>{project.lead}</p>
      </section>

      <Reveal>
        <section className="case-section section-shell" aria-labelledby="problem-title">
          <header className="case-section-heading">
            <span>业务问题</span>
            <h2 id="problem-title">先确认真正要解决什么。</h2>
          </header>
          <div className="case-section-content problem-layout">
            <div className="narrative-block">
              <h3>背景</h3>
              <p>{project.background}</p>
            </div>
            <div className="question-list">
              {project.problem.map((item) => <p key={item}>{item}</p>)}
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="case-section section-shell" aria-labelledby="responsibility-title">
          <header className="case-section-heading">
            <span>我的职责</span>
            <h2 id="responsibility-title">把方案推进到可交付状态。</h2>
          </header>
          <ol className="responsibility-list">
            {project.responsibilities.map((item) => <li key={item}>{item}</li>)}
          </ol>
        </section>
      </Reveal>

      <Reveal>
        <section className="case-section section-shell" aria-labelledby="decision-title">
          <header className="case-section-heading">
            <span>关键判断</span>
            <h2 id="decision-title">机制比功能数量更重要。</h2>
          </header>
          <div className="decision-grid">
            {project.solution.map((item) => (
              <article key={item.label}>
                <h3>{item.label}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
          <div className="flow-board" aria-label="产品机制流程">
            {project.flow.map((item, index) => (
              <div key={item} className="flow-node">
                <strong>{item}</strong>
                {index < project.flow.length - 1 && <ArrowRight size={18} aria-hidden="true" />}
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="case-section section-shell" aria-labelledby="visual-title">
          <header className="case-section-heading">
            <span>真实材料</span>
            <h2 id="visual-title">用原始产出说明做过什么。</h2>
          </header>
          <div className={`case-gallery gallery-${project.visuals.length}`}>
            {project.visuals.map((visual) => {
              const toggleZoom = () => isAiEnglish && setZoomedVisual(visual.src)
              return (
              <figure key={visual.src} className={visual.portrait ? 'portrait' : ''} onDoubleClick={toggleZoom} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); toggleZoom() } }} role={isAiEnglish ? 'button' : undefined} tabIndex={isAiEnglish ? 0 : undefined} aria-label={isAiEnglish ? `双击放大${visual.alt}` : undefined}>
                <img src={visual.src} alt={visual.alt} loading="lazy" />
                <figcaption>{visual.caption}</figcaption>
              </figure>
            )})}
          </div>
          {isAiEnglish && zoomedItem && createPortal(
            <div className="case-image-lightbox" role="dialog" aria-modal="true" aria-label="放大的英语读书 UI" onDoubleClick={() => setZoomedVisual(null)}>
              <img src={zoomedItem.src} alt={zoomedItem.alt} />
              <p>双击缩小 · Esc 关闭</p>
            </div>,
            document.body,
          )}
        </section>
      </Reveal>

      <Reveal>
        <section className="case-section section-shell" aria-labelledby="result-title">
          <header className="case-section-heading">
            <span>产出与结果</span>
            <h2 id="result-title">结果与边界一起写清楚。</h2>
          </header>
          <div className="result-layout">
            <div className="output-list">
              {project.outputs.map((item) => <p key={item}><CheckCircle size={20} />{item}</p>)}
            </div>
            <blockquote>{project.result}</blockquote>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="evidence-section section-shell" aria-labelledby="evidence-title">
          <header>
            <span className="section-kicker">证据边界</span>
            <h2 id="evidence-title">不把目标写成结果。</h2>
            <p>网站将公开材料核验、简历记录和待补充证据分开呈现。</p>
          </header>
          <div className="evidence-list">
            {project.evidence.map((item) => {
              const { label, Icon } = evidenceMeta[item.status]
              return (
                <article key={item.text} className={item.status}>
                  <Icon size={20} aria-hidden="true" />
                  <div><strong>{label}</strong><p>{item.text}</p></div>
                </article>
              )
            })}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="reflection-section section-shell" aria-labelledby="reflection-title">
          <header className="case-section-heading">
            <span>复盘</span>
            <h2 id="reflection-title">下一次会做得更准。</h2>
          </header>
          <div>
            {project.reflection.map((item) => <p key={item}>{item}</p>)}
          </div>
        </section>
      </Reveal>

      <section className="case-next section-shell">
        <div>
          <span className="section-kicker">下一个案例</span>
          <h2>{nextProject.title}</h2>
        </div>
        <Link to={`/projects/${nextProject.slug}`}>查看案例 <ArrowRight size={20} /></Link>
      </section>
    </main>
  )
}
