import { ArrowRight, ArrowUpRight, CaretDown } from '@phosphor-icons/react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function SelectedWork({ projects }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [expandedSlug, setExpandedSlug] = useState(null)

  if (!projects?.length) return null

  const activeProject = projects[activeIndex] ?? projects[0]
  const activeVisual = activeProject.visuals[0]

  const selectProject = (index) => {
    setActiveIndex(index)
  }

  const toggleProject = (project) => {
    setExpandedSlug((currentSlug) => currentSlug === project.slug ? null : project.slug)
    selectProject(projects.indexOf(project))
  }

  return (
    <section className="selected-work section-shell" id="work" aria-labelledby="selected-work-title">
      <header className="selected-work-heading">
        <div>
          <span className="section-kicker">SELECTED WORK / 作品案例</span>
          <h2 id="selected-work-title">三种产品问题，三套落地方法。</h2>
        </div>
        <p>从真实业务约束出发，记录判断、产出与证据边界。</p>
      </header>

      <div className="selected-work-layout">
        <div className="selected-work-list" role="list" aria-label="项目案例目录">
          {projects.map((project, index) => {
            const expanded = expandedSlug === project.slug
            const active = activeIndex === index

            return (
              <article
                className={`selected-work-item${active ? ' is-active' : ''}${expanded ? ' is-expanded' : ''}`}
                key={project.slug}
                role="listitem"
                onMouseEnter={() => selectProject(index)}
                onFocus={() => selectProject(index)}
              >
                <button
                  className="selected-work-trigger"
                  type="button"
                  aria-controls={`selected-work-summary-${project.slug}`}
                  aria-expanded={expanded}
                  onClick={() => toggleProject(project)}
                >
                  <span className="selected-work-index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                  <span className="selected-work-trigger-copy">
                    <span className="selected-work-kind">{project.kind}</span>
                    <span className="selected-work-title">{project.title}</span>
                  </span>
                  <CaretDown className="selected-work-caret" size={21} aria-hidden="true" />
                </button>

                <div className="selected-work-summary" id={`selected-work-summary-${project.slug}`} hidden={!expanded}>
                  <p>{project.subtitle}</p>
                  <ul className="tag-list" aria-label={`${project.title}关键词`}>
                    {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
                  </ul>
                  <Link className="selected-work-link" to={`/projects/${project.slug}`}>
                    查看完整案例 <ArrowUpRight size={18} aria-hidden="true" />
                  </Link>
                </div>
              </article>
            )
          })}
        </div>

        <aside className="selected-work-preview" aria-live="polite">
          <div className={`selected-work-preview-frame visual-${activeProject.slug}`}>
            <img key={activeVisual.src} src={activeVisual.src} alt={activeVisual.alt} loading={activeIndex === 0 ? 'eager' : 'lazy'} />
          </div>
          <div className="selected-work-preview-caption">
            <div>
              <span>{activeProject.time}</span>
              <strong>{activeProject.title}</strong>
            </div>
            <Link to={`/projects/${activeProject.slug}`} aria-label={`打开${activeProject.title}完整案例`}>
              <ArrowRight size={20} aria-hidden="true" />
            </Link>
          </div>
          <p className="selected-work-preview-note">{activeVisual.caption}</p>
        </aside>
      </div>
    </section>
  )
}
