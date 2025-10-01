import { useState } from "react"
import Contador from "./components/Contador"
import Header from "./components/Header"
import { useStoreApp } from "./store/useStore"
import type { Person } from "./types/index"
import { motion, AnimatePresence } from "framer-motion";



// type Person = {
//   nombre: string
//   apellido: string
// }

const initialPerson: Person = {
  nombre: '',
  apellido: ''
}


function App() {
  //! State
  // const [persons, setPersons] = useState<Persons>([])
  const [person, setPerson] = useState<Person>(initialPerson)
  const persons = useStoreApp((state) => state.persons)
  const addPerson = useStoreApp((state) => state.addPerson)
  const deletePerson = useStoreApp((state) => state.deletePerson)
 


  //! Funciones para manejar el formulario
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (person.nombre.trim() === '' || person.apellido.trim() === '') {
      console.log('Rellena todos los campos')
    } else {
      // setPersons((prev) => [...prev, person])
      addPerson(person)
      setPerson(initialPerson)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target
    setPerson((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <>
      <Header />

      <main>
        <p className="hello-world">Hello World</p>

        <section className="section">
          <h2>Secciónn para el Contador</h2>
          <Contador />
        </section>

        <section className="section">
          <h2>Seccion Formulario</h2>
          <div className="container-form">
            <form action=""
              onSubmit={handleSubmit}>
              <label htmlFor="nombre">
                Nombre:
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={person.nombre}
                onChange={handleChange}
                placeholder="Escribe tu Nombre" />
              <label htmlFor="apellido">
                Apellido:
              </label>
              <input
                type="text"
                id="apellido"
                name="apellido"
                value={person.apellido}
                onChange={handleChange}
                placeholder="Escribe tu apellido" />

              <button
                type="submit">
                Enviar
              </button>
            </form>
          </div>

          <div className="section">

            <h2>Tabla Resultados</h2>
            {persons.length > 0 ?
              <table className="table">
                <thead className="thead">
                  <tr>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Borrar</th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {persons.map(person => (
                      <motion.tr
                        key={person.nombre + person.apellido}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{
                          duration: 0.4,
                          ease: "easeInOut"
                        }}>
                        <td>
                          {person.nombre}
                        </td>
                        <td>
                          {person.apellido}
                        </td>
                        <td>
                          <button
                            type="button"
                            className="btn-borrar"
                            onClick={() => deletePerson(person)}>X</button>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table> :
              <AnimatePresence>
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, ease: "linear" }}
                  style={{ fontSize: "1.8rem", textAlign: "center" }}
                >
                  No hay registros para mostrar</motion.p>
              </AnimatePresence>
            }

          </div>
        </section>
      </main>
    </>
  )
}

export default App
