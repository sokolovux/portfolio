import { Navigate, Outlet } from 'react-router-dom'

const UNLOCKED_KEY = 'rs_unlocked'

export default function PasscodeGate() {
  if (sessionStorage.getItem(UNLOCKED_KEY) !== 'true') {
    return <Navigate to="/unlock" replace />
  }

  return <Outlet />
}
