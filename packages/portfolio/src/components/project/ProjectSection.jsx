import Divider from '../Divider.jsx'

export default function ProjectSection({ id, title, children, dividerBefore = false }) {
  return (
    <>
      {dividerBefore ? <Divider /> : null}
      <section className="container py-5 d-flex flex-column gap-3">
        <h4 id={id}>{title}</h4>
        {children}
      </section>
    </>
  )
}
