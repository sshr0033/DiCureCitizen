
import { Link  } from 'react-router-dom'
import Navigation from './Navigation'
import Footer from './Footer'
import BackToTop from './BackToTop'

function Layout({ children }) {



  return (
    <div className="layout">
      <Navigation />
      <main className="main-content">
        {children}
      </main>
      <Footer />
      <BackToTop />
      
    </div>
  )
}

export default Layout