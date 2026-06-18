import TextScramble from '../components/TextScramble.jsx'

export default function Landing() {
  return (
    <div className="container py-5 text-center">
      <h1>Design for brands that give a shit</h1>
      <TextScramble
        text="UX/UI Designer & Engineer"
        tag="p"
        className="display-mono"
      />
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et </p>
    </div>
  )
}
