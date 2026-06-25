import ChainletterPage from './projects/ChainletterPage.jsx'
import KyruusHealthPage from './projects/KyruusHealthPage.jsx'
import RoomerangPage from './projects/RoomerangPage.jsx'
import VoiceboxPage from './projects/VoiceboxPage.jsx'

export const PROJECT_PAGES = {
  voicebox: VoiceboxPage,
  roomerang: RoomerangPage,
  chainletter: ChainletterPage,
  'kyruus-health': KyruusHealthPage,
}

export function getProjectPage(slug) {
  return PROJECT_PAGES[slug] ?? null
}
