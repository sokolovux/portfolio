export default function TestPage() {
  return (
    <div className="container py-5 d-flex flex-column gap-5">

      <section className="d-flex flex-column gap-4">
          <h4>L1 section title</h4>
          <p>Here's content from the L1 section. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          <div className='d-flex flex-column gap-3'>
            <div className="d-flex flex-column gap-2">
              <h6>L2 section title</h6>
              <p>Here's content from the L2 section. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              <div className="ps-3 py-2 border-start d-flex flex-column gap-2">
                <h6>L3 section title</h6>
                <p>Here's content from the L3 section. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              </div>
              <div className="ps-3 py-2 border-start d-flex flex-column gap-2">
                <h6>L3 section title</h6>
                <p>Here's content from the L3 section. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              </div>
            </div>
            <div className="d-flex flex-column gap-2">
              <h6>L2 section title</h6>
              <p>Here's content from the L2 section. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              <div className="ps-3 border-start d-flex flex-column gap-1">
                <h6>L3 section title</h6>
                <p>Here's content from the L3 section. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              </div>
            </div>
        </div>
      </section>

    </div>
  )
}
