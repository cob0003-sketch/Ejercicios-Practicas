import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'
import type { Person } from '../types/index'

export type useStoreAppType = {
    persons: Person[]
    addPerson: (person: Person) => void
    deletePerson: (person: Person) => void
}

export const useStoreApp = create<useStoreAppType>()(
    devtools(
        persist(
            (set) => ({
                persons: [],
                addPerson: (persona) => {
                    set((state) => ({
                        persons: [...state.persons, persona],
                    }))
                },
                deletePerson: (persona) => {
                    set((state) => ({
                        persons: state.persons.filter(p => !(p.nombre === persona.nombre && p.apellido === persona.apellido))
                    }))
                }

            }), {
            name: 'persons-storage',
            storage: createJSONStorage(() => localStorage)
        })
    ))