import Footer from '../components/Footer.jsx'
import Navbar from '../components/Navbar.jsx'
import PageTransition from '../components/PageTransition.jsx'
import RouteMeta from '../components/RouteMeta.jsx'

export default function Layout() {
  return (
    <>
      <RouteMeta />
      <Navbar />
      <PageTransition />
      <Footer />
    </>
  )
}
