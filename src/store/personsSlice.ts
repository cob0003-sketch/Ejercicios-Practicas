import type { StateCreator } from "zustand"
import type { Persons, Person } from "../types"

export type PersonsSlice = {
    persons: Persons
    addPerson: (person: Person) => void
    deletePerson: (person: Person) => void
}

export const createPersonsSlice: StateCreator<PersonsSlice> = (set) => ({
    persons: [],
    addPerson: (persona) => {
        //! Poner state por que el valor depende del state anterior
        set((state) => {
            const existe = state.persons.some(p => p.nombre === persona.nombre && p.apellido === persona.apellido)
            if (existe) {
                return state
            } else {
                return {
                    persons: [...state.persons, persona]
                }
            }
        })
    },
    deletePerson: (persona) => {
        set((state) => ({
            persons: state.persons.filter(p => !(p.nombre === persona.nombre && p.apellido === persona.apellido))
        }))
    }

})