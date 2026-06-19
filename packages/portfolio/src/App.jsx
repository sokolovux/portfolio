import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Layout from './layouts/Layout.jsx'
import DesignSystem from './pages/DesignSystem.jsx'
import Landing from './pages/Landing.jsx'
import Voicebox from './pages/Voicebox.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/work/voicebox" element={<Voicebox />} />
          <Route path="/ds" element={<DesignSystem />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
