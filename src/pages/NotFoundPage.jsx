import { ArrowLeft } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <main id="main-content" className="state-page" tabIndex="-1">
      <p className="eyebrow">404 / PAGE NOT FOUND</p>
      <h1>这个页面还没有被定义。</h1>
      <p>你可以回到首页继续查看项目案例与经历。</p>
      <Link className="button button-primary" to="/"><ArrowLeft size={18} />返回首页</Link>
    </main>
  )
}
