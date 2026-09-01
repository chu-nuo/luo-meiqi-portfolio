import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AppShell from './components/AppShell'
import ErrorBoundary from './components/ErrorBoundary'
import LoadingView from './components/LoadingView'
import './styles.css'

const HomePage = lazy(() => import('./pages/HomePage'))
const ProjectPage = lazy(() => import('./pages/ProjectPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))
const routerBasename = import.meta.env.BASE_URL.replace(/\/$/, '') || '/'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter basename={routerBasename}>
        <AppShell>
          <Suspense fallback={<LoadingView />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/projects/:slug" element={<ProjectPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </AppShell>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>,
)
