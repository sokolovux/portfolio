import BtnCustom from '../components/BtnCustom.jsx'
import TextScramble from '../components/TextScramble.jsx'

export default function Landing() {
  return (
    <div className="container py-5 text-left d-flex flex-column gap-3">
      <TextScramble
        text="I design & build"
        tag="h1"
        className=""
      />
      <TextScramble
        text="UX/UI Designer & Engineer"
        tag="p"
        className="h6"
      />
      <div className="d-flex flex-wrap gap-2">
        <BtnCustom label="View work" />
        <BtnCustom variant="secondary" label="Contact" />
      </div>
    </div>
  )
}
