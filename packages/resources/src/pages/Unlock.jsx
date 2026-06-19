import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

const UNLOCKED_KEY = 'rs_unlocked'
const PASSCODE = import.meta.env.VITE_APP_PASSCODE

export default function Unlock() {
  const navigate = useNavigate()
  const [passcode, setPasscode] = useState('')
  const [error, setError] = useState(false)

  if (sessionStorage.getItem(UNLOCKED_KEY) === 'true') {
    return <Navigate to="/" replace />
  }

  function handleSubmit() {
    if (passcode === PASSCODE && PASSCODE) {
      sessionStorage.setItem(UNLOCKED_KEY, 'true')
      navigate('/')
      return
    }

    setError(true)
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      handleSubmit()
    }
  }

  return (
    <div className="container min-vh-100 d-flex align-items-center py-5 px-3">
      <div className="row justify-content-center w-100">
        <div className="col-12 col-sm-10 col-md-8 col-lg-5 col-xl-4">
          <h1 className="h4 text-center mb-4">Enter passcode</h1>
          <div className="d-flex flex-column gap-3">
            <input
              type="password"
              className="form-control py-3"
              value={passcode}
              onChange={(event) => {
                setPasscode(event.target.value)
                setError(false)
              }}
              onKeyDown={handleKeyDown}
              aria-label="Passcode"
            />
            {error && <p className="text-danger mb-0">Incorrect passcode.</p>}
            <button type="button" className="btn btn-primary py-3" onClick={handleSubmit}>
              Unlock
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
