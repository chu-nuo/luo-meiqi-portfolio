import {
  ArrowRight,
  CheckCircle,
  Copy,
  EnvelopeSimple,
  MapPin,
} from '@phosphor-icons/react'
import { useState } from 'react'
import ProjectRow from '../components/ProjectRow'
import Reveal from '../components/Reveal'
import { capabilityGroups, experiences, profile, projects, sideWork } from '../data'

export default function HomePage() {
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  return (
    <main id="main-content" tabIndex="-1">
      <section className="hero section-shell" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow">2027 届 AI 产品经理候选人</p>
          <h1 id="hero-title">把 AI 方案做进<br />真实业务流程</h1>
          <p className="hero-intro">{profile.positioning}</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#work">
              查看代表案例 <ArrowRight size={18} aria-hidden="true" />
            </a>
            <a className="button button-secondary" href={`mailto:${profile.email}`}>
              联系我 <EnvelopeSimple size={18} aria-hidden="true" />
            </a>
          </div>
        </div>

        <figure className="hero-visual">
          <div className="hero-image-wrap">
            <img
              src={projects[0].visuals[0].src}
              alt={projects[0].visuals[0].alt}
              width="2600"
              height="1560"
              fetchPriority="high"
            />
          </div>
          <figcaption>
            <span>代表案例</span>
            <strong>易佳佳 AI 门店助手</strong>
            <small>当前版本界面，已完成公开信息检查</small>
          </figcaption>
        </figure>
      </section>

      <section className="proof-strip" aria-label="核心项目记录">
        {profile.proof.map((item) => (
          <div key={item.label}>
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </div>
        ))}
      </section>

      <Reveal>
        <section className="section-shell work-section" id="work" aria-labelledby="work-title">
          <header className="section-intro">
            <span className="section-kicker">代表案例</span>
            <h2 id="work-title">三种产品问题，三套落地方法。</h2>
            <p>每个案例都说明问题、关键判断、真实产出和证据边界。没有公开证明的数据，不会被包装成结果。</p>
          </header>
          <div className="project-grid">
            {projects.map((project, index) => (
              <ProjectRow key={project.slug} project={project} featured={index === 0} />
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="side-work section-shell" aria-labelledby="side-work-title">
          <div className="side-work-copy">
            <span className="section-kicker">策略与表达补充</span>
            <h2 id="side-work-title">{sideWork.title}</h2>
            <p className="side-work-lead">{sideWork.subtitle}</p>
            <p>{sideWork.description}</p>
            <ul className="tag-list" aria-label="补充作品关键词">
              {sideWork.tags.map((tag) => <li key={tag}>{tag}</li>)}
            </ul>
          </div>
          <div className="side-work-gallery" aria-label="养元青策划案页面预览">
            {sideWork.visuals.map((visual) => (
              <img key={visual.src} src={visual.src} alt={visual.alt} loading="lazy" />
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="method-section section-shell" aria-labelledby="method-title">
          <header className="section-intro compact">
            <span className="section-kicker">我的工作方式</span>
            <h2 id="method-title">先找到约束，再设计机制。</h2>
          </header>
          <ol className="method-list">
            <li>
              <strong>定义真实问题</strong>
              <p>区分角色、场景、目标与限制，先判断什么值得做。</p>
            </li>
            <li>
              <strong>对齐可交付方案</strong>
              <p>用 PRD、原型、流程、状态与技术边界推动团队达成一致。</p>
            </li>
            <li>
              <strong>留下验证证据</strong>
              <p>提前定义指标、评测集和验收标准，明确已验证与待验证。</p>
            </li>
          </ol>
        </section>
      </Reveal>

      <Reveal>
        <section className="capability-section section-shell" id="skills" aria-labelledby="skills-title">
          <header className="section-intro compact">
            <span className="section-kicker">岗位能力映射</span>
            <h2 id="skills-title">JD 关键词，需要项目证据支撑。</h2>
          </header>
          <div className="capability-groups">
            {capabilityGroups.map((group) => (
              <article key={group.title}>
                <h3>{group.title}</h3>
                <ul>
                  {group.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
                <p><strong>对应证据</strong>{group.proof}</p>
              </article>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="experience-section section-shell" id="experience" aria-labelledby="experience-title">
          <div className="experience-intro">
            <span className="section-kicker">经历与教育</span>
            <h2 id="experience-title">AI、学习产品与线下体验。</h2>
            <div className="education-card">
              <span>2023.09 - 2027.06</span>
              <strong>天津财经大学珠江学院</strong>
              <p>视觉传达设计，本科<br />GPA 3.74 / 4.00，专业前 10%</p>
              <small>院三好学生、优秀班干部、三等奖学金、单科奖学金 2 次</small>
            </div>
          </div>
          <div className="timeline">
            {experiences.map((experience) => (
              <article key={`${experience.company}-${experience.time}`}>
                <time>{experience.time}</time>
                <div>
                  <h3>{experience.role}</h3>
                  <strong>{experience.company}</strong>
                  <p>{experience.summary}</p>
                </div>
              </article>
            ))}
            <article>
              <time>2025.03 - 至今</time>
              <div>
                <h3>美术设计组组长</h3>
                <strong>“古韵新声”非遗音游交互设计，省级大创</strong>
                <p>完成 3 轮问卷、200+ 有效样本与 5 款音游竞品研究，项目处于开发阶段。</p>
              </div>
            </article>
          </div>
        </section>
      </Reveal>

      <section className="contact-section section-shell" id="contact" aria-labelledby="contact-title">
        <div className="contact-copy">
          <span className="section-kicker">联系</span>
          <h2 id="contact-title">如果你需要能把 AI 方案落地的产品新人。</h2>
          <p>欢迎联系我讨论 AI 产品、0-1 项目或实习机会。</p>
        </div>
        <div className="contact-actions">
          <a href={`mailto:${profile.email}`}><EnvelopeSimple size={21} />{profile.email}<ArrowRight size={20} /></a>
         <div><MapPin size={21} /><span>意向城市：{profile.city}</span></div>
          <button type="button" onClick={copyEmail}>
            {copied ? <CheckCircle size={21} /> : <Copy size={21} />}
            {copied ? '邮箱已复制' : '复制邮箱'}
          </button>
          <span className="sr-only" aria-live="polite">{copied ? '邮箱地址已复制到剪贴板' : ''}</span>
        </div>
      </section>
    </main>
  )
}
