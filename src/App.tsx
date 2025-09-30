import { useEffect, useState } from "react"
import Contador from "./components/Contador"
import Header from "./components/Header"

export type Person = {
  nombre: string
  apellido: string
}

const initialPerson = {
  nombre: '',
  apellido: ''
}

export type Persons = Person[]


function App() {
  //! State
  const [persons, setPersons] = useState<Persons>([])
  const [person, setPerson] = useState<Person>(initialPerson)

 //!local storage
 useEffect(()=>{
  localStorage.setItem('persons', JSON.stringify(persons))
 }, [persons])

 useEffect(()=> {
  const result = localStorage.getItem('persons')
  if(result) {
    setPersons(JSON.parse(result)) 
  }
 }, [])


  //! Funciones para manejar el formulario
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (person.nombre.trim() === '' || person.apellido.trim() === '') {
      console.log('Rellena todos los campos')
    } else {
      setPersons((prev) => [...prev, person])
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

  const deletePerson = (person:Person)=> {
    //! Seria mas facil y más seguro con un id p.id !== person.id
    const filterclear = persons.filter(p => !(p.nombre === person.nombre && p.apellido === person.apellido))
    //! el metodo filter ya crea una copia por eso se puede poner directamente sin callback ni prev
    setPersons(filterclear)
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
                  {persons.map(person => (
                    <tr key={person.nombre + person.apellido}>
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
                         onClick={()=> deletePerson(person)}>X</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table> : <p style={{fontSize:"1.8rem", textAlign:"center"}}>No hay registros para mostrar</p>
            }
              
            </div>
        </section>
      </main>
    </>
  )
}

export default App
