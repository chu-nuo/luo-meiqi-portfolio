import { ArrowUpRight } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'

export default function ProjectRow({ project, featured = false }) {
  const cover = project.visuals[0]

  return (
    <article className={featured ? 'project-card featured' : 'project-card'}>
      <Link className="project-media" to={`/projects/${project.slug}`} aria-label={`查看${project.title}案例`}>
        <img src={cover.src} alt={cover.alt} loading={featured ? 'eager' : 'lazy'} />
      </Link>
      <div className="project-card-copy">
        <p className="project-kind">{project.kind}</p>
        <h3>{project.title}</h3>
        <p>{project.subtitle}</p>
        <ul className="tag-list" aria-label="项目关键词">
          {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
        </ul>
        <div className="project-card-footer">
          <span>{project.time}</span>
          <Link to={`/projects/${project.slug}`}>
            查看完整案例 <ArrowUpRight size={19} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  )
}
