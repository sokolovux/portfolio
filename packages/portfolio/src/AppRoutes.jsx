import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './layouts/Layout.jsx'
import AsciiDev from './pages/AsciiDev.jsx'
import AsciiDev2 from './pages/AsciiDev2.jsx'
import Capture from './pages/Capture.jsx'
import DesignSystem from './pages/DesignSystem.jsx'
import Landing from './pages/Landing.jsx'
import ProjectRoute from './pages/ProjectRoute.jsx'

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/work/:slug" element={<ProjectRoute />} />
        <Route path="/ds" element={<DesignSystem />} />
        <Route path="/ascii-dev" element={<AsciiDev />} />
        <Route path="/ascii-dev-2" element={<AsciiDev2 />} />
        <Route path="/capture" element={<Capture />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
