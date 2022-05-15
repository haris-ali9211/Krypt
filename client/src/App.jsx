import { Loader, Footer, Navbar, Services, Transcation, Welcom } from "./Component"
const App = () => {

  return (
    <div className="min-h-screen">
      <div className="gradient-bg-welcome">
        <Navbar />
        <Welcom />
      </div>
      <Services />
      <Transcation />
      <Footer />
    </div>
  )
}

export default App
