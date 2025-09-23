import Contador from "./components/Contador"
import Header from "./components/Header"


function App() {


  return (
    <>
      <Header />

      <main>
        <p className="hello-world">Hello World</p>

        <section className="section-contador">
          <h2>Secciónn para el Contador</h2>
          <Contador />
        </section>
      </main>
    </>
  )
}

export default App
