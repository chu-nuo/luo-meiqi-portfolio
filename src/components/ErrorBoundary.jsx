import React from 'react'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="state-page">
          <p className="eyebrow">页面遇到问题</p>
          <h1>这部分暂时没有加载出来。</h1>
          <p>请刷新页面。如果问题持续，可以通过邮箱联系我。</p>
          <button className="button button-primary" onClick={() => window.location.reload()}>
            重新加载
          </button>
        </main>
      )
    }

    return this.props.children
  }
}
