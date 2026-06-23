export const CHAINLETTER_DESCRIPTION =
  'Lead UX/UI design for Chainletter, a blockchain credential platform for universities. Co-led product, IA, and UX writing. Shipped in 1.5 months.'

export const CHAINLETTER_LANDING_COLUMNS = [
  { title: 'Role', words: ['Lead', 'UX/UI', 'Designer'] },
  { title: 'Timeline', words: ['Feb 2025', 'Mar 2025', '1.5 months'] },
  { title: 'Team', words: ['Full Stack', 'Software', 'Engineer'] },
  { title: 'Tools', words: ['Figma', 'FigJam'] },
  { title: 'Skills', words: ['UX Design', 'Product Strategy', 'UX Writing'] },
]

export const CHAINLETTER_SECTIONS = [
  {
    title: 'Overview',
    paragraphs: [
      'Chainletter enables universities and credential-issuing institutions to distribute diplomas and official documents that are permanently verifiable on the blockchain. Once a file is recorded, its authenticity can be confirmed forever. No central authority required.',
      'I came on as the lead designer, but my role was broader than that. I co-led the product alongside the founding engineer, running stakeholder calls, synthesizing feedback from the founder, engineer, and finance lead, and making final product decisions. We built the full roadmap together and shipped in 1.5 months.',
    ],
  },
  {
    title: 'The starting point',
    subsections: [
      {
        paragraphs: [
          'This was the product when I joined. A functional but raw interface: terminology borrowed directly from the blockchain layer ("Postmarks," "Pinata groups"), a visual language closer to a government IT portal than a tool administrators would trust with official documents, and third-party dependencies surfaced as footnotes.',
        ],
        imageLabel: 'Chainletter dashboard before redesign',
      },
      {
        paragraphs: [
          'The Groups page was a raw data table with no status, no context, and debug panels visible at the bottom.',
        ],
        imageLabel: 'Chainletter groups table before redesign',
      },
      {
        paragraphs: [
          'The product worked. It just didn\'t feel like it could be trusted with a graduating class\'s diplomas.',
        ],
      },
    ],
  },
  {
    title: 'The core UX challenge',
    paragraphs: [
      'The primary users were school administrators in their 40s and 50s: people who distribute diplomas, not people who think about blockchain. The technology had to disappear entirely. If a user had to understand what blockchain meant to use the product, we\'d already failed.',
      'Three specific problems shaped the design:',
    ],
    subsections: [
      {
        title: 'Permanent actions with no undo',
        paragraphs: [
          'Recording a file on the blockchain is irreversible. A misclick isn\'t a mistake you fix. It\'s a mistake that lives forever. The UI had to make the stakes of each action viscerally clear without creating so much friction that the product became unusable.',
        ],
      },
      {
        title: 'Terminology that alienates',
        paragraphs: [
          'Words like "postmark," "ledger," and "Pinata group" are accurate but hostile to non-technical users. Every label, tooltip, and confirmation copy had to be rewritten in plain language without losing precision.',
        ],
      },
      {
        title: 'File upload error handling',
        paragraphs: [
          'Institutions are distributing official documents. A failed or corrupted upload has real consequences. Error states needed to be explicit, recoverable, and trust-preserving.',
        ],
      },
    ],
  },
  {
    title: 'The solution',
    subsections: [
      {
        paragraphs: [
          'Even the login screen set a new tone: warm, direct copy replacing the clinical default.',
        ],
        imageLabel: 'Chainletter login screen',
      },
      {
        paragraphs: [
          '"Postmark groups" became Collections. "Stamps" replaced "postmarks," still accurate, but immediately legible to anyone who has ever certified a document. The status system, Not stamped, Stamped (partial), Stamped, gave administrators a clear at-a-glance view of where every credential batch stood. The Princeton University context here is intentional: the product needed to feel worthy of institutional trust.',
        ],
        imageLabel: 'Chainletter collections dashboard with stamp status',
      },
      {
        title: 'The two-step collection creation flow',
        paragraphs: [
          'This was the most important design decision of the project. Administrators first define an internal name and description, visible only to their team. Then a separate external identity: the public-facing name, access type, and description that recipients and verifiers will see.',
        ],
        imageLabel: 'Create collection step 1, internal details',
      },
      {
        paragraphs: [
          'This separation wasn\'t a technical requirement. It was a UX insight: giving administrators a private working layer removed the anxiety of getting public-facing details wrong before they were ready to commit.',
        ],
        imageLabel: 'Create collection step 2, external details',
      },
      {
        title: 'Making permanence feel intentional',
        paragraphs: [
          'Before any collection is recorded on the blockchain, a confirmation modal surfaces the stakes plainly: "This collection will exist permanently in Chainletter." One decision point, clearly framed, impossible to miss.',
        ],
        imageLabel: 'Permanence confirmation modal',
      },
      {
        title: 'The collection workspace',
        paragraphs: [
          'The collection detail view separates the work surface (upload zone, file list) from the collection\'s identity (details panel). Internal and external names are both visible, reinforcing the two-layer mental model throughout the workflow, not just during creation.',
        ],
        imageLabel: 'Collection detail empty upload state',
      },
      {
        title: 'Error handling',
        paragraphs: [
          'When uploads fail, the error state surfaces each file individually with a specific reason, duplicate or unknown error, and gives two clear recovery paths: Try again or Continue. No vague failure message, no lost progress.',
        ],
        imageLabel: 'Upload error modal with file breakdown',
      },
      {
        title: 'The stamping moment',
        paragraphs: [
          'Even the loading state got attention. Stamping hundreds of files to the blockchain takes time. "Give us a moment..." acknowledges the wait without making it feel like something went wrong.',
        ],
        imageLabel: 'Stamping loading state',
      },
    ],
  },
  {
    title: 'Outcome',
    paragraphs: [
      'Chainletter shipped and was piloted at multiple universities. The product has since grown into Chainletter Labs, now serving legal, enterprise, and AI artifact verification use cases, with a developer API and institutional backing.',
    ],
  },
]
