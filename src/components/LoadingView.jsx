export default function LoadingView() {
  return (
    <main className="loading-view" aria-busy="true" aria-label="页面加载中">
      <div className="loading-skeleton" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <p>正在整理案例证据...</p>
    </main>
  )
}
