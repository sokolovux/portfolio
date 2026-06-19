import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import PasscodeGate from './components/PasscodeGate.jsx'
import Layout from './layouts/Layout.jsx'
import Resources from './pages/Resources.jsx'
import Unlock from './pages/Unlock.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/unlock" element={<Unlock />} />
        <Route element={<PasscodeGate />}>
          <Route element={<Layout />}>
            <Route path="/" element={<Resources />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
